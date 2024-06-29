import { invoke } from "@tauri-apps/api";
import { Board, Turn } from "./osero";
export namespace RustApi {
  export const placeStone = async (
    turn: Turn,
    board: Board,
    position: number,
  ): Promise<Board> => {
    const res = await invoke("place_stone", {
      turn: turn - 1,
      board,
      position,
    });
    return res as Board;
  };

  export const calcNextHand = async (
    turn: Turn,
    board: Board,
  ): Promise<number> => {
    const res = await invoke("calc_next_hand", { turn: turn - 1, board });
    return res as number;
  };

  export const isEnd = async (board: Board) => {
    const res = (await invoke("is_end", { board })) as 0 | 1 | -1;
    return res === 0 ? "WHITE" : res === 1 ? "BLACK" : "PROCEED";
  };

  export const availablePlaces = async (
    turn: Turn,
    board: Board,
  ): Promise<Array<number>> => {
    const res = await invoke("available_places", { turn: turn - 1, board });
    return res as Array<number>;
  };
}
