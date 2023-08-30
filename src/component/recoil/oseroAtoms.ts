import { atom } from "recoil";
import { Board, CellStatus, INITIAL_BOARD, PlayerStatus, Turn } from "../../lib/osero";

export const playerTurnAtom = atom<Turn>({
    key: "playerTurn",
    default: CellStatus.Black,
});

export const currentTurnAtom = atom<Turn>({
    key: "currentTurn",
    default: CellStatus.Black,
});

export const gameBoardAtom = atom<{ turn: Turn; board: Board }>({
    key: "gameBoard",
    default: { turn: PlayerStatus.Black, board: INITIAL_BOARD },
});

export const lastPlaceAtom = atom<number>({
    key: "lastPlace",
    default: -1,
});

export const placeableAtom = atom<Array<number>>({
    key: "placeable",
    default: [],
});

export const reversedAtom = atom<Array<number>>({
    key: "reversed",
    default: [],
});
