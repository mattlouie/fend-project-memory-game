/*
 * Create a list that holds all of your cards
 */
const objects = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
//const cards = allCards.concat(allCards);
const cardDeck = document.getElementById("deckSpace");
let cards = Array.from(objects);
let moves = 0;
let match = 0;
let second = 0;
let stars1 = 22;
let stars2 = 18;
let stars3 = 14;
let movesCounter = document.querySelector(".move-counter");
//let timer = setInterval(updateDisplay, 1000)
let stars = document.querySelector(".stars");
let popup = document.getElementById("cardPopup");
let toggledCards = [];
let clockOff = true;
let time = 0;
let clockId;
let matchedCards = [];
let resetButton = document.querySelector(".restart");
let selectedCard = $("li.card");
let deck = document.querySelector(".deck");
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 function shuffleDeck() {
   const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
   const shuffledCards = shuffle(cardsToShuffle);
   for (card of shuffledCards) {
     deck.appendChild(card)
   }
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (isClickValid(clickTarget)) {
    if (clockOff) {
      startClock();
      clockOff = false;
    }
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
    if (toggledCards.length === 2) {
      checkMatch(clickTarget);
      addMove();
      checkScore();
    }
  }
});

resetButton.addEventListener('click', resetGame);

function isClickValid(clickTarget) {
  return (
    clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
    toggledCards.length < 2 &&
    !toggledCards.includes(clickTarget)
  );
}

function toggleCard(clickTarget) {
  clickTarget.classList.toggle('open');
  clickTarget.classList.toggle('show');
}

function addToggleCard(clickTarget) {
  toggledCards.push(clickTarget);
}

function checkMatch() {
  setTimeout(function() {
    if (
      toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className
    ) {
      toggledCards[0].classList.toggle('match');
      toggledCards[1].classList.toggle('match');
      matchedCards.push(toggledCards[0]);
      matchedCards.push(toggledCards[1]);
    } else {
      toggledCards[0].classList.remove('open', 'show', 'unclick');
      toggledCards[1].classList.remove('open', 'show', 'unclick');
    }
    if (matchedCards.length == 16) {
      winGame();
    }
    toggledCards = [];
  }, 500);
}

function addMove() {
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
}

function checkScore() {
  if (moves === 16 || moves === 24) {
    hideStar();
  }
}

function hideStar() {
  const starList = document.querySelectorAll('.starts li');
  for (star of starList) {
    if (star.style.display !== 'none') {
      star.style.display = 'none';
      break;
    }
  }
}
hideStar();
hideStar();

function startClock() {
  clockId = setInterval(() => {
    time++;
    displayTime();
  }, 1000);
}

function displayTime() {
  const clock = document.querySelector('.clock');
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
    clock.innerHTML = `${minutes}:${seconds}`;
  }
}

function stopClock() {
  clearInterval(clockId);
}

function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if (star.style.display !== 'none') {
      starCount++;
    }
  }
  return starCount;
}

function resetGame () {
  resetClockAndTime();
  resetMoves();
  resetStars();
  shuffle(cards);
}

function resetClockAndTime() {
  stopClock();
  clockOff = true;
  time = 0;
  displayTime();
}

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
  stars = 0;
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    star.style.display = 'inline';
  }
}
