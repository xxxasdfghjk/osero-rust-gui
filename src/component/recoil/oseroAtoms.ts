import { atom } from "recoil";
import { CellStatus, Turn } from "../../lib/osero";

export const playerTurnAtom = atom<Turn>({
    key: "playerTurn",
    default: CellStatus.Black,
});

export const currentTurnAtom = atom<Turn>({
    key: "currentTurn",
    default: CellStatus.Black,
});

export const lastPlaceAtom = atom<number>({
    key: "lastPlace",
    default: -1,
});
