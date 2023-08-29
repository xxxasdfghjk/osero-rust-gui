import { styled } from "@material-ui/core";
import { Board, CellRow, CellStatus, getOpponentTurn, sliceBoard } from "../../lib/osero";
import OseroRow from "../molecules/OseroRow";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { currentTurnAtom, playerTurnAtom, lastPlaceAtom } from "../recoil/oseroAtoms";

type Props = {
    board: Board;
};
const OseroBoard = (props: Props) => {
    const [oseroBoard, setOseroBoard] = useState<Board>(props.board);
    const [currentTurn, setCurrentTurn] = useRecoilState(currentTurnAtom);
    const [_lastPlace, setLastPlace] = useRecoilState(lastPlaceAtom);
    const [playerTurn] = useRecoilState(playerTurnAtom);

    const onClickCell = (cell: number) => {
        if (playerTurn !== currentTurn) {
            console.log("differentColor");
        }
        if (oseroBoard[cell] === CellStatus.Empty) {
            const newBoard = [...oseroBoard];
            newBoard[cell] = currentTurn;
            setLastPlace(cell);
            setOseroBoard(newBoard as Board);
            setCurrentTurn((prev) => getOpponentTurn(prev));
        } else {
            console.log("cannot put there");
        }
    };

    return (
        <SBoardWrapper>
            {sliceBoard(oseroBoard).map((e, i) => (
                <OseroRow key={`${Math.random()}`} row={e as CellRow} onClickCell={onClickCell} rowNum={i}></OseroRow>
            ))}
        </SBoardWrapper>
    );
};

const SBoardWrapper = styled("div")({});

export default OseroBoard;
