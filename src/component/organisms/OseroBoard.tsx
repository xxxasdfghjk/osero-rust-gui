import { styled } from "@material-ui/core";
import { Board, CellRow, CellStatus, GameStatus, INITIAL_BOARD, PlayerStatus, sliceBoard } from "../../lib/osero";
import OseroRow from "../molecules/OseroRow";
import { useEffect, useMemo, useReducer } from "react";
import { RustApi } from "../../lib/rustApi";

const getDiff = (boardA: Board, boardB: Board) => {
    const res = [];
    for (let i = 0; i < 64; i++) {
        if (boardA[i] !== 0 && boardB[i] !== boardA[i]) {
            res.push(i);
        }
    }
    return res;
};
type Stone = "BLACK" | "WHITE";

type GameState = {
    turn: Stone;
    turnNum: number;
    placeablePlace: number[];
    gameState: GameStatus;
    gameBoard: Board;
    lastPlace: number | null;
    reversed: number[];
    pendingPutStone: false | number;
    pendingComputer: boolean;
    pendingCalcAvailablePlace: boolean;
    pendingIsEnd: boolean;
};

type Action =
    | {
          type: "start";
      }
    | {
          type: "putStoneStart";
          payload: {
              place: number;
          };
      }
    | {
          type: "putStoneEnd";
          payload: {
              board: Board;
          };
      }
    | {
          type: "computerThinkStart";
      }
    | {
          type: "computerThinkEnd";
      }
    | {
          type: "calcIsEndStart";
      }
    | {
          type: "calcIsEndEnd";
          payload: { changeTurn: boolean };
      }
    | {
          type: "calcAvailablePlaceStart";
      }
    | {
          type: "calcAvailablePlaceEnd";
          payload: { places: number[] };
      }
    | {
          type: "gameEnd";
          payload: { result: "WHITE" | "BLACK" | "DRAW" };
      };

const initialState = {
    turnNum: 1,
    turn: "BLACK",
    placeablePlace: [],
    gameState: "YET",
    gameBoard: INITIAL_BOARD,
    lastPlace: null,
    reversed: [],
    pendingPutStone: false,
    pendingComputer: false,
    pendingCalcAvailablePlace: false,
    pendingIsEnd: false,
} satisfies GameState;

const getTurnNumeric = (turn: Stone) => {
    return turn === "BLACK" ? PlayerStatus.Black : PlayerStatus.White;
};

const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case "start":
            return { ...state, turn: "BLACK", gameState: "PROCEED", pendingCalcAvailablePlace: true };
        case "putStoneStart":
            return { ...state, pendingPutStone: action.payload.place, lastPlace: action.payload.place };
        case "putStoneEnd":
            // この時点ではターンを変えず、isEnd処理の後に変える
            const reversed = getDiff(action.payload.board, state.gameBoard);
            return {
                ...state,
                gameBoard: action.payload.board,
                pendingPutStone: false,
                pendingIsEnd: true,
                reversed,
            };
        case "computerThinkStart":
            return { ...state, pendingComputer: true };
        case "computerThinkEnd":
            return { ...state, pendingComputer: false };
        case "calcIsEndStart":
            return { ...state, pendingIsEnd: true };
        case "calcIsEndEnd":
            return {
                ...state,
                pendingIsEnd: false,
                turn: action.payload.changeTurn ? (state.turn === "WHITE" ? "BLACK" : "WHITE") : state.turn,
                pendingCalcAvailablePlace: true,
                turnNum: state.turnNum + 1,
            };
        case "calcAvailablePlaceStart":
            return { ...state, pendingCalcAvailablePlace: true };
        case "calcAvailablePlaceEnd":
            return { ...state, pendingCalcAvailablePlace: false, placeablePlace: action.payload.places };
        case "gameEnd":
            return { ...state, gameState: action.payload.result };
    }
};
type Props = {
    playerTurn: Stone;
};
const OseroBoard = (props: Props) => {
    const computerTurn = useMemo(() => (props.playerTurn === "BLACK" ? "WHITE" : "BLACK"), [props.playerTurn]);
    const [gameState, dispatch] = useReducer(gameReducer, initialState);
    useEffect(() => {
        dispatch({ type: "start" });
    }, []);
    useEffect(() => {
        if (gameState.pendingPutStone !== false) {
            RustApi.placeStone(getTurnNumeric(gameState.turn), gameState.gameBoard, gameState.pendingPutStone).then(
                (board) => {
                    dispatch({
                        type: "putStoneEnd",
                        payload: { board },
                    });
                }
            );
        }
    }, [gameState.pendingPutStone]);

    useEffect(() => {
        if (gameState.pendingCalcAvailablePlace !== false) {
            RustApi.availablePlaces(getTurnNumeric(gameState.turn), gameState.gameBoard).then((places) => {
                dispatch({
                    type: "calcAvailablePlaceEnd",
                    payload: { places },
                });
            });
        }
    }, [gameState.pendingCalcAvailablePlace]);

    const computerPlace = () => {
        RustApi.calcNextHand(getTurnNumeric(gameState.turn), gameState.gameBoard).then((position) => {
            dispatch({ type: "computerThinkEnd" });
            dispatch({ type: "putStoneStart", payload: { place: position } });
        });
    };

    useEffect(() => {
        if (gameState.turn === computerTurn) {
            setTimeout(() => {
                dispatch({ type: "computerThinkStart" });
                computerPlace();
            }, 100);
        }
    }, [gameState.turnNum]);
    useEffect(() => {
        if (gameState.pendingIsEnd === true) {
            RustApi.isEnd(gameState.gameBoard).then((e) => {
                const state = e;
                if (state === "PROCEED") {
                    RustApi.availablePlaces(
                        getTurnNumeric(gameState.turn === "BLACK" ? "WHITE" : "BLACK"),
                        gameState.gameBoard
                    ).then((e) => {
                        dispatch({ type: "calcIsEndEnd", payload: { changeTurn: e.length !== 0 } });
                    });
                } else {
                    dispatch({ type: "gameEnd", payload: { result: state } });
                }
            });
        }
    }, [gameState.pendingIsEnd]);

    const onClickCell = async (cell: number) => {
        if (
            gameState.gameState !== "PROCEED" ||
            props.playerTurn !== gameState.turn ||
            gameState.gameBoard[cell] !== CellStatus.Empty ||
            gameState.placeablePlace.indexOf(cell) === -1
        ) {
            return;
        }
        dispatch({ type: "putStoneStart", payload: { place: cell } });
    };

    return (
        <SBoardWrapper>
            {sliceBoard(gameState.gameBoard).map((e, i) => (
                <OseroRow
                    key={`${Math.random()}`}
                    row={e as CellRow}
                    onClickCell={onClickCell}
                    rowNum={i}
                    lastPlace={gameState.lastPlace}
                    reversed={gameState.reversed}
                    placeablePlace={gameState.placeablePlace}
                ></OseroRow>
            ))}
            {gameState.pendingComputer ? "Computer Thinking ... 🤔" : ""}
            {gameState.gameState === "PROCEED" ? (
                <></>
            ) : gameState.gameState === "WHITE" ? (
                <div>Won by white</div>
            ) : gameState.gameState === "BLACK" ? (
                <div>Won by black</div>
            ) : (
                <div>Draw</div>
            )}
        </SBoardWrapper>
    );
};

const SBoardWrapper = styled("div")({});

export default OseroBoard;
