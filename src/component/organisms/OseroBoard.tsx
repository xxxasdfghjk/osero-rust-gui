import { styled } from "@material-ui/core";
import { Board, CellRow, CellStatus, GameState, getOpponentTurn, sliceBoard } from "../../lib/osero";
import OseroRow from "../molecules/OseroRow";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playerTurnAtom, lastPlaceAtom, placeableAtom, gameBoardAtom, reversedAtom } from "../recoil/oseroAtoms";
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

type Props = {
    board: Board;
};
const OseroBoard = (props: Props) => {
    const [gameBoard, setGameBoard] = useRecoilState(gameBoardAtom);
    const [playerTurn] = useRecoilState(playerTurnAtom);
    const [_las, setLastPlace] = useRecoilState(lastPlaceAtom);

    const [placeablePlace, setPlaceablePlace] = useRecoilState(placeableAtom);
    const [_rev, setReversed] = useRecoilState(reversedAtom);

    const [endState, setEndState] = useState<GameState>(-1);

    useEffect(() => {
        RustApi.availablePlaces(gameBoard.turn, props.board).then((places) => {
            setPlaceablePlace(places);
        });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (gameBoard.turn === playerTurn) {
                return;
            } else {
                computerPlace();
            }
        }, 0);
    }, [gameBoard]);
    const computerPlace = () => {
        RustApi.calcNextHand(gameBoard.turn, gameBoard.board).then((position) => {
            onClickCell(position, true);
        });
    };

    const onClickCell = async (cell: number, isComputer?: boolean) => {
        if (endState !== -1) {
            return;
        }
        if (playerTurn !== gameBoard.turn && !isComputer) {
            return;
        }
        if (gameBoard.board[cell] === CellStatus.Empty) {
            if (placeablePlace.indexOf(cell) == -1 && !isComputer) {
                console.log("you cannot put there");
                return;
            }
            const newBoard = await RustApi.placeStone(gameBoard.turn, gameBoard.board, cell);

            setLastPlace(cell);
            setReversed(getDiff(gameBoard.board, newBoard));

            const isEnd = await RustApi.isEnd(newBoard);

            if (isEnd !== -1) {
                setEndState(isEnd);
                return;
            }
            const availablePlace = await RustApi.availablePlaces(getOpponentTurn(gameBoard.turn), newBoard);
            if (availablePlace.length === 0) {
                const extraAvailablePlace = await RustApi.availablePlaces(gameBoard.turn, newBoard);
                setPlaceablePlace(extraAvailablePlace);
                setGameBoard({ turn: gameBoard.turn, board: newBoard });
            } else {
                setGameBoard({ turn: getOpponentTurn(gameBoard.turn), board: newBoard });
                setPlaceablePlace(availablePlace);
            }
        } else {
            console.log("cannot put there");
        }
    };

    return (
        <SBoardWrapper>
            {sliceBoard(gameBoard.board).map((e, i) => (
                <OseroRow key={`${Math.random()}`} row={e as CellRow} onClickCell={onClickCell} rowNum={i}></OseroRow>
            ))}
            {endState === -1 ? (
                <></>
            ) : endState === 0 ? (
                <div>Won by white</div>
            ) : endState === 1 ? (
                <div>Won by black</div>
            ) : (
                <div>Draw</div>
            )}
        </SBoardWrapper>
    );
};

const SBoardWrapper = styled("div")({});

export default OseroBoard;
