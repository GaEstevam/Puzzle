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
let gameInterval; // Armazena o intervalo do loop do jogo

// Escutar setas do teclado e botões de controle
window.addEventListener('keydown', handleKeyPress);
document.getElementById('up').addEventListener('click', () => setDirection(0, -1));
document.getElementById('down').addEventListener('click', () => setDirection(0, 1));
document.getElementById('left').addEventListener('click', () => setDirection(-1, 0));
document.getElementById('right').addEventListener('click', () => setDirection(1, 0));

// Função para iniciar o loop do jogo
function startGame() {
    gameInterval = setInterval(gameLoop, 150);
}
startGame();

function gameLoop() {
    moveSnake();
    checkCollision();
    drawGame();
}

function drawGame() {
    // Preencher fundo de preto
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar comida em vermelho
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Desenhar a cobra em rosa
    ctx.fillStyle = 'pink';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function moveSnake() {
    const head = { 
        x: snake[0].x + direction.x * gridSize, 
        y: snake[0].y + direction.y * gridSize 
    };

    snake.unshift(head); // Adiciona nova cabeça no início

    if (snake.length > snakeLength) {
        snake.pop(); // Remove o último segmento se a cobra não cresceu
    }
}

function checkCollision() {
    // Verificar se a cobra comeu a comida
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        snakeLength++;
        food = generateRandomPosition(); // Gera nova posição para a comida

        // Se atingir a pontuação de vitória, encerrar o jogo
        if (score >= winningScore) {
            endGame();
        }
    }

    // Verificar colisão com as bordas do canvas
    if (
        snake[0].x < 0 || snake[0].x >= canvas.width ||
        snake[0].y < 0 || snake[0].y >= canvas.height
    ) {
        resetGame(); // Reinicia o jogo ao bater
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
    clearInterval(gameInterval); // Parar o loop do jogo

    alert('Você bateu! Tente novamente.'); // Mensagem de colisão

    // Resetar estado do jogo
    snake = [{ x: 200, y: 200 }];
    snakeLength = 1;
    direction = { x: 0, y: 0 };
    score = 0;
    food = generateRandomPosition();

    // Reiniciar o loop do jogo
    startGame();
}

function endGame() {
    clearInterval(gameInterval); // Parar o loop do jogo

    // Exibir mensagem de vitória e tornar o link visível
    const result = document.getElementById('result');
    result.textContent = 'Parabéns! Você ganhou o prêmio!';

    const downloadLink = document.getElementById('download-link');
    downloadLink.style.display = 'block'; // Exibir link de download
}
