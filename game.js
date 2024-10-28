let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let gridSize = 20;
let snake = new Snake();
let food = createVector(Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize, Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize);
let score = 0;
let gameLoop;

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && snake.direction.y !== 1) snake.changeDirection(0, -1);
    if (event.key === 'ArrowDown' && snake.direction.y !== -1) snake.changeDirection(0, 1);
    if (event.key === 'ArrowLeft' && snake.direction.x !== 1) snake.changeDirection(-1, 0);
    if (event.key === 'ArrowRight' && snake.direction.x !== -1) snake.changeDirection(1, 0);
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.move(gridSize);
    if (snake.eat(food)) {
        score++;
        document.getElementById('score').textContent = score;
        food = createVector(Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize, Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize);
    }
    snake.show(ctx, gridSize);
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
    if (snake.checkCollision(canvas.width, canvas.height)) {
        clearInterval(gameLoop);
        alert("Game Over!");
        document.getElementById('restartButton').style.display = 'block';
    }
}

function resetGame() {
    snake = new Snake();
    score = 0;
    document.getElementById('score').textContent = score;
    food = createVector(
        Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize);
    document.getElementById('restartButton').style.display = 'none';
}

function startGame(speed) {
    clearInterval(gameLoop);
    resetGame();
    gameLoop = setInterval(draw, speed);
}
