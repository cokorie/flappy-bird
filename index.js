let board;
let board_w = 400;
let board_h = 600;
let context;

let woosh_sound = new Audio('assets/woosh.wav');
let slap_sound = new Audio('assets/slap.wav');
let score_sound = new Audio('assets/score.wav');

let player_w = 57;
let player_h = 58;
let player_x = 172;
let player_y = 300;
let velocity = 0;

let pipe_w = 79;
let pipe_h = 360;
let pipe_x = 600;
let pipe_y = getRandonInt(30, 280);
let gap = 220;
let pipe_velocity = -1.2;
let pipe_scored = false;

let score = 0;

let bg_x_pos = 0;
let ground_x_pos = 0;
let bg_scroll_spd = 0.5;
let ground_scroll_spd = 1;
let bg_width = 400;

let has_moved = false;

let player = {
    x: player_x,
    y: player_y,
    width: player_w,
    height: player_h
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

    // for drawing player
    player_img = new Image();
    player_img.src = "assets/player.png";
    player_img.onload = function() {
        context.drawImage(player_img, player.x, player.y, player.width, player.height);
    }

    // for drawing ground
    ground_img = new Image();
    ground_img.src = "assets/ground.png";
    ground_img.onload = function() {
        context.drawImage(ground_img, 0, 536, 400, 64);
    }

    // for drawing pipe pointing upward
    pipe_up_img = new Image();
    pipe_up_img.src = "assets/pipe_up.png";
    pipe_up_img.onload = function() {
        context.drawImage(pipe_up_img, 200, 200, 79, 300);
    }

    // for drawing pipe pointing upward
    pipe_down_img = new Image();
    pipe_down_img.src = "assets/pipe_down.png";
    pipe_down_img.onload = function() {
        context.drawImage(pipe_down_img, 200, 200, 79, 300);
    }

    requestAnimationFrame(update);
    document.addEventListener("keydown", jump);
}

function update() {
    requestAnimationFrame(update);

    bg_x_pos -= bg_scroll_spd;
    ground_x_pos -= ground_scroll_spd;

    if (bg_x_pos <= bg_width) {
        bg_x_pos = 0;
    }

    if (ground_x_pos <= bg_width) {
        ground_x_pos = 0;
    }

    if (has_moved == true) {
        velocity += 0.25;
        player.y += velocity; 
    }

    // for moving pipes during game
    pipe_x += pipe_velocity;

    // for easy pipe addition during game
    if (pipe_x < -pipe_w) {
        pipe_respawn();
    }

    if (checkCollision(player.x + 3, player.y + 3, 52, 52, pipe_x, pipe_y - 360, 79, 360) || 
        checkCollision(player.x + 3, player.y + 3, 52, 52, pipe_x, pipe_y + gap, 79, 360)
    ) {
        game_over();
    }

    // for tallying each score
    if (pipe_scored == false && player.x > pipe_x) {
        score += 1;
        pipe_scored = true;
        score_sound.play();
    }

    // to clear game for next play
    context.clearRect(0, 0, board.width, board.height);

    // for drawing background
    context.drawImage(bg_img, bg_x_pos, 0, 400, 600);
    context.drawImage(bg_img, bg_x_pos + 399, 0, 400, 600);

    // for drawing ground
    context.drawImage(ground_img, ground_x_pos, 536, 400, 64);
    context.drawImage(ground_img, ground_x_pos + 399, 536, 400, 64);

    // for drawing player
    context.drawImage(player_img, player.x, player.y, player.width, player.height);

    // for drawing down pipes
    context.drawImage(pipe_down_img, pipe_x, 0 - pipe_h + pipe_y, pipe_w, pipe_h);

    // for drawing up pipes
    context.drawImage(pipe_up_img, pipe_x, pipe_y + gap, pipe_w, pipe_h);

    // for endind game with jumping too high or low
    if (player.y < -64 || player.y > 536) {
        game_over();
    }

    context.fillStyle = "White";
    context.font;
}

function jump(key) {
    if (has_moved == false) {
        has_moved = true;
    }

    if (key.code == "Space") {
        velocity = -6;
        woosh_sound.currentTime = 0;
        woosh_sound.play();
    }
}

function getRandonInt() {
    return Math.floor(Math.random() * (max - min)) + min;
}

function pipe_respawn() {
    pipe_x = 400;
    pipe_y =  getRandonInt(30, 280);
    pipe_scored = false;
}

function pipe_reset() {
    pipe_x = 600;
    pipe_y = getRandonInt(30, 280);
    pipe_scored = false;
}

function game_over() {
    player.x = 172;
    player.y = 300;
    score = 0;
    has_moved = false;
    pipe_reset();
    slap_sound.play();
}

function checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2+w2 && x2 < x1+w1 && y1 < y2+h2 && y2 < y1+h1;
}