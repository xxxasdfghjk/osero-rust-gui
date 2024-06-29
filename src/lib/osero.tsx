export class CellStatus {
    public static Empty = 0 as const;
    public static White = 1 as const;
    public static Black = 2 as const;
}

export class PlayerStatus {
    public static White = 1 as const;
    public static Black = 2 as const;
}

const GAME_STATUS = ["WHITE", "BLACK", "DRAW", "PROCEED", "YET"] as const;
export type GameStatus = (typeof GAME_STATUS)[number];

export type Empty = typeof CellStatus.Empty;
export type White = typeof CellStatus.White;
export type Black = typeof CellStatus.Black;
export type CellState = Empty | White | Black;
export type Turn = White | Black;
export type Board = [
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState,
    CellState
];
export type CellRow = [CellState, CellState, CellState, CellState, CellState, CellState, CellState, CellState];

export const getOpponentTurn = (turn: Turn) => (PlayerStatus.Black === turn ? PlayerStatus.White : PlayerStatus.Black);
export const sliceBoard = (board: Board) => board.flatMap((_, i, a) => (i % 8 === 0 ? [a.slice(i, i + 8)] : []));
export const INITIAL_BOARD: Board = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
