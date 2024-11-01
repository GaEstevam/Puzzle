const gameBoard = document.getElementById('gameBoard');

// Lista de 32 imagens para formar os pares
const images = [
  './assets/img1.jpeg', './assets/img2.jpeg', './assets/img3.jpeg', './assets/img4.jpeg',
  './assets/img5.jpeg', './assets/img6.jpeg', './assets/img7.jpeg', './assets/img8.jpeg',
  './assets/img9.jpeg', './assets/img10.jpeg', './assets/img11.jpeg', './assets/img12.jpeg',
  './assets/img13.jpeg', './assets/img14.jpeg', './assets/img15.jpeg', './assets/img16.jpeg',
  './assets/img17.jpeg', './assets/img18.jpeg', './assets/img19.jpeg', './assets/img20.jpeg',
  './assets/img21.jpeg', './assets/img22.jpeg', './assets/img23.jpeg', './assets/img24.jpeg',
  './assets/img25.jpeg', './assets/img26.jpeg', './assets/img27.jpeg', './assets/img28.jpeg',
  './assets/img29.jpeg', './assets/img30.jpeg', './assets/img31.jpeg', './assets/img32.jpeg'
];

// Duplicar a lista para criar pares
const cards = [...images, ...images];

// Embaralhar as cartas
cards.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lockBoard = false; // Bloqueia cliques durante a verificação de pares

// Função para criar e exibir as cartas no tabuleiro
cards.forEach((image) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front"></div>
      <div class="card-back" style="background-image: url('${image}')"></div>
    </div>
  `;
  card.addEventListener('click', flipCard);
  gameBoard.appendChild(card);
});

// Função para virar a carta
function flipCard() {
  if (lockBoard) return; // Evita cliques enquanto as cartas estão sendo verificadas
  if (this === firstCard) return; // Evita que a mesma carta seja clicada duas vezes

  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Verifica se as duas cartas viradas são um par
function checkForMatch() {
  const isMatch =
    firstCard.querySelector('.card-back').style.backgroundImage ===
    secondCard.querySelector('.card-back').style.backgroundImage;

  isMatch ? disableCards() : unflipCards();
}

// Desabilita as cartas se forem um par
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

// Desvira as cartas se não forem um par
function unflipCards() {
  lockBoard = true; // Bloqueia novos cliques até que as cartas sejam desviradas
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

// Reseta as variáveis para a próxima jogada
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}
