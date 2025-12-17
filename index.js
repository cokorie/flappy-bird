let board;
let board_w = 400;
let board_h = 600;
let context;

let player_w;
let player_h;
let player_x;
let player_y;

let score = 0;

let bg_x_pos = 0;

let player = {
    
}

window.onload = function() {
    board = document.getElementById("board");
    board.width = board_w;
    board.height = board_h;
    context = board.getContext("2d");
    
    // for drawing background 
    bg_img = new Image();
    bg_img.src = "assets/background.png";
    bg_img.onload = function() {
        context.drawImage(bg_img, 0, 536, 400, 64);
    }
}


context.drawImage(bg_img, bg_x_pos);