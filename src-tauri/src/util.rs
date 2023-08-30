pub fn convert_array_to_bit_board(array: Vec<i32>) -> (u64, u64) {
    let mut white_board: u64 = 0;
    let mut black_board: u64 = 0;
    for i in 0..64 {
        if array[i] == 1 {
            white_board |= 1 << i
        } else if array[i] == 2 {
            black_board |= 1 << i
        }
    }
    return (white_board, black_board);
}

pub fn convert_bit_board_to_array(board: (u64, u64)) -> Vec<i32> {
    let white_board = board.0;
    let black_board = board.1;
    let mut res: Vec<i32> = vec![];

    for i in 0..64 {
        res.push(if white_board & (1 << i) > 0 {
            1
        } else if black_board & (1 << i) > 0 {
            2
        } else {
            0
        });
    }
    return res;
}

pub fn most_right_bit_index(bits: u64) -> i32 {
    for i in 0..64 {
        if bits & (1 << i) > 0 {
            return i;
        }
    }
    return -1;
}
