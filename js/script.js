const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ajustar o tamanho do canvas para dispositivos móveis
canvas.width = canvas.height = 400;

let gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let snakeLength = 1;
let food = generateRandomPosition();
let direction = { x: 0, y: 0 };
let score = 0;
const winningScore = 10;

// Escutar setas do teclado e botões de controle
window.addEventListener('keydown', handleKeyPress);
document.getElementById('up').addEventListener('click', () => setDirection(0, -1));
document.getElementById('down').addEventListener('click', () => setDirection(0, 1));
document.getElementById('left').addEventListener('click', () => setDirection(-1, 0));
document.getElementById('right').addEventListener('click', () => setDirection(1, 0));

// Iniciar o loop do jogo
setInterval(gameLoop, 100);

function gameLoop() {
    moveSnake();
    checkCollision();
    drawGame();
}

function drawGame() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    ctx.fillStyle = 'pink';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };
    snake.unshift(head);
    if (snake.length > snakeLength) {
        snake.pop();
    }
}

function checkCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        snakeLength++;
        food = generateRandomPosition();

        if (score >= winningScore) {
            endGame();
        }
    }

    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        resetGame();
    }
}

function generateRandomPosition() {
    const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    return { x, y };
}

function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            setDirection(0, -1);
            break;
        case 'ArrowDown':
            setDirection(0, 1);
            break;
        case 'ArrowLeft':
            setDirection(-1, 0);
            break;
        case 'ArrowRight':
            setDirection(1, 0);
            break;
    }
}

function setDirection(x, y) {
    direction = { x, y };
}

function resetGame() {
    alert('Você bateu! Tente novamente.');
    snake = [{ x: 200, y: 200 }];
    snakeLength = 1;
    direction = { x: 0, y: 0 };
    score = 0;
    food = generateRandomPosition();
}

function endGame() {
    alert('Parabéns! Você ganhou o prêmio!');
    document.getElementById('download-link').style.display = 'block';
}
