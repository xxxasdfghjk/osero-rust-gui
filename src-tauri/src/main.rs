// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use osero_rust_gui::util::{
    convert_array_to_bit_board, convert_bit_board_to_array, most_right_bit_index,
};
use rust_osero;

#[tauri::command]
fn place_stone(turn: i32, board: Vec<i32>, position: i32) -> Vec<i32> {
    convert_bit_board_to_array(rust_osero::osero::game::reverse_stone_new(
        &convert_array_to_bit_board(board),
        &turn,
        &(1 << position),
    ))
}
#[tauri::command]
fn calc_next_hand(turn: i32, board: Vec<i32>) -> i32 {
    let mut tree = rust_osero::computer::Tree {
        total_try_count: 0.0,
    };
    let mut node = rust_osero::computer::Node {
        last_hand: 0,
        color: turn,
        point: 0.0,
        node_try_count: 0.0,
        boards: convert_array_to_bit_board(board),
        children: vec![],
    };
    let res = tree.calc_next(&mut node);
    most_right_bit_index(res)
}
#[tauri::command]
fn is_end(board: Vec<i32>) -> i32 {
    rust_osero::osero::game::is_end(&convert_array_to_bit_board(board))
}

#[tauri::command]
fn available_places(turn: i32, board: Vec<i32>) -> Vec<i32> {
    rust_osero::osero::util::split_bit(&rust_osero::osero::game::available_places(
        &convert_array_to_bit_board(board),
        &turn,
    ))
    .iter()
    .map(|&e| most_right_bit_index(e))
    .collect()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            available_places,
            calc_next_hand,
            is_end,
            place_stone
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
