// configuarion de las opciones 
const emojis = ["🍎", "🍌", "🍇", "🍓", "🍍", "🥝", "🍉", "🍒"];
const cardsData = emojis.map((emoji, index) => ({ id: index, symbol: emoji }));

// Variables globales
let timerInterval;
let time = 0;
let score = 0;
let flippedCards = [];
let matchedCards = 0;

const board = document.getElementById("board");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

document.addEventListener("DOMContentLoaded", initializeGame);

// function principal para iniciar el juego
function initializeGame() {
  time = 0;
  score = 0;
  flippedCards = [];
  matchedCards = 0;
  clearInterval(timerInterval);

  timerDisplay.textContent = time;
  scoreDisplay.textContent = score;

  const shuffledCards = shuffle([...cardsData, ...cardsData]);
  createBoard(shuffledCards);

  timerInterval = setInterval(() => {
    time++;
    timerDisplay.textContent = time;
  }, 1000);

  restartBtn.addEventListener("click", restartGame);
}

// crear el tablero 
function createBoard(cards) {
  board.innerHTML = "";

  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.id = card.id;

    cardElement.textContent = "?"; // Muestra inicialmente un marcador
    cardElement.dataset.symbol = card.symbol;

    cardElement.addEventListener("click", () => flipCard(cardElement));
    board.appendChild(cardElement);
  });
}

// mezclar las cartas
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// funcion para voltear las cartas
function flipCard(card) {
  if (card.classList.contains("flipped") || card.classList.contains("matched") || flippedCards.length === 2) {
    return;
  }

  card.classList.add("flipped");
  card.textContent = card.dataset.symbol; 
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// funcion para verificar si las cartas coinciden
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.id === card2.dataset.id) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    flippedCards = [];
    matchedCards += 2;
    score += 10;
    scoreDisplay.textContent = score;

    if (matchedCards === cardsData.length * 2) {
      clearInterval(timerInterval);
      alert(`¡Felicidades! Completaste el juego en ${time} segundos con un puntaje de ${score}.`);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.textContent = "?";
      card2.textContent = "?";
      flippedCards = [];
    }, 1000);
  }
}

// reiniciar el game
function restartGame() {
  initializeGame();
}