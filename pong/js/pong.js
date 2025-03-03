// Canvas and Context
var c = document.querySelector(`#pong`);
var ctx = c.getContext(`2d`);

// Timer to make the game run at 60fps
var timer = setInterval(main, 1000/60);

// Global friction variable
var fy = .97;

var scores = document.querySelectorAll(`#score div`);

// Player 1 Setup
var player1 = new Player();
player1.pad = new Box();
var p1 = player1.pad;

p1.w = 20;
p1.h = 150;
p1.x = 0 + p1.w / 2;
p1.force = 1;
p1.dir = -1;

// Player 2 Setup
var player2 = new Player();
player2.pad = new Box();
var p2 = player2.pad;

p2.w = 20;
p2.h = 150;
p2.x = c.width - p2.w / 2;
p2.color = `cyan`;
p2.force = 1;

var player = [player1, player2];
var pad = [p1, p2];

// Ball Setup
var ball = new Box();
ball.w = 20;
ball.h = 20;
ball.vx = -2;
ball.vy = -2;
ball.color = `black`;

function main() {
    // Erase the canvas
    ctx.clearRect(0, 0, c.width, c.height);

    // Player 1 Controls
    if (keys[`w`]) {
        p1.vy += -p1.force;
    }
    if (keys[`s`]) {
        p1.vy += p1.force;
    }

    // Player 2 Controls
    if (keys[`ArrowUp`]) {
        p2.vy += -p2.force;
    }
    if (keys[`ArrowDown`]) {
        p2.vy += p2.force;
    }

    // Apply friction inside the loop for both players
    for (let i = 0; i < player.length; i++) {
        player[i].pad.vy *= fy;
    }

    // Player movement
    p1.move();
    p2.move();

    // Ball movement
    ball.move();

    // Prevent paddles from leaving canvas
    if (p1.y < p1.h / 2) p1.y = p1.h / 2;
    if (p1.y > c.height - p1.h / 2) p1.y = c.height - p1.h / 2;
    if (p2.y < p2.h / 2) p2.y = p2.h / 2;
    if (p2.y > c.height - p2.h / 2) p2.y = c.height - p2.h / 2;

    // Ball collision with walls
    if (ball.y < 0) {
        ball.y = 0;
        ball.vy = -ball.vy;
    }
    if (ball.y > c.height) {
        ball.y = c.height;
        ball.vy = -ball.vy;
    }

    // Ball collision with paddles
    if (ball.collide(p1)) {
        ball.x = p1.x + (p1.w / 2 + ball.w / 2) * p1.dir;
        ball.vx = -ball.vx;
    }
    if (ball.collide(p2)) {
        ball.x = p2.x + (p2.w / 2 + ball.w / 2) * p2.dir;
        ball.vx = -ball.vx;
    }

    // Ball out of bounds
    if (ball.x < 0) {
        player[1].score++;
        resetBall();
    }
    if (ball.x > c.width) {
        player[0].score++;
        resetBall();
    }

    // Draw the objects
    p1.draw();
    p2.draw();
    ball.draw();

    // Update scores
    for (let i = 0; i < player.length; i++) {
        scores[i].innerText = `Player ${i + 1}: ${player[i].score}`;
    }
}

// Reset Ball to Center
function resetBall() {
    ball.x = c.width / 2;
    ball.y = c.height / 2;
    ball.vx = Math.random() > 0.5 ? -2 : 2;
    ball.vy = Math.random() > 0.5 ? -2 : 2;
}
