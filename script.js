const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startGame');

canvas.width = 500;
canvas.height = 400;

const boxSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = 'RIGHT';
let food = {
    x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
};
let score = 0;
let gameInterval;

function drawBox(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, boxSize, boxSize);
}

function drawSnake() {
    snake.forEach(segment => drawBox(segment.x, segment.y, 'lime'));
}

function drawFood() {
    drawBox(food.x, food.y, 'red');
}

function updateSnake() {
    const head = { ...snake[0] };

    if (direction === 'RIGHT') head.x += boxSize;
    if (direction === 'LEFT') head.x -= boxSize;
    if (direction === 'UP') head.y -= boxSize;
    if (direction === 'DOWN') head.y += boxSize;

    // Check collision with walls
    if (head.x >= canvas.width || head.x < 0 || head.y >= canvas.height || head.y < 0) {
        gameOver();
        return;
    }

    // Check collision with itself
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
        score += 1;
        scoreDisplay.textContent = score;
        food = {
            x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
            y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
        };
    } else {
        snake.pop();
    }
}

function gameOver() {
    clearInterval(gameInterval);
    alert('Game Over! Your final score is ' + score);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    updateSnake();
    drawSnake();
}

function startGame() {
    snake = [{ x: 200, y: 200 }];
    direction = 'RIGHT';
    score = 0;
    scoreDisplay.textContent = score;
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
}

document.addEventListener('keydown', event => {
    if ((event.key === 'ArrowUp' || event.key === 'w') && direction !== 'DOWN') direction = 'UP';
    if ((event.key === 'ArrowDown' || event.key === 's') && direction !== 'UP') direction = 'DOWN';
    if ((event.key === 'ArrowLeft' || event.key === 'a') && direction !== 'RIGHT') direction = 'LEFT';
    if ((event.key === 'ArrowRight' || event.key === 'd') && direction !== 'LEFT') direction = 'RIGHT';
});

startButton.addEventListener('click', startGame);
