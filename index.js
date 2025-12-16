let board;
let board_w = 400;
let board_h = 600;
let context;

window.onload = function() {
    board = document.getElementById("board");
    board.width = board_w;
    board.height = board_h;
    context = board.getContext("2d");
}

bg_img = new Image();
bg_img.src = "assets/background.png";
bg_img.onload = function() {
    context.drawImage(bg_img);
}