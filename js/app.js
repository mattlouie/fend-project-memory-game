/*
 * Create a list that holds all of your cards
 */
let objects = document.getElementsByClassName("card");
const resetButton = document.querySelector(".restart");
const modal = document.querySelector(".modal");
const totalMoves = document.querySelector("#totalMoves");
const totalTime = document.querySelector("#totalTime");
const starRating = document.querySelector("#star-rating");
const newGameButton = document.querySelector("#new-game");
const closeButton = document.querySelector("#close-button");
const maxStars = 28;
const minStars = 36;
let cards = Array.from(objects);
let moves = 0;
let match = 0;
let ratingStar = "";
let firstClick = true;
let moveCounter = document.querySelector(".move-counter");
let stars = [...document.querySelectorAll(".fa-star")];
let toggledCards = [];
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let totalSeconds = 0;
let interval;
let matchedCards = [];
let deck = document.querySelector(".deck");
let totalStarCounter = 0;

 document.onLoad = gameStart();

function gameStart() {
  shuffle(cards);
  shuffledDeck();
  moves = 0;
}

// Shuffle Deck
function shuffledDeck() {
  for (let i = 0; i < cards.length; i++) {
    deck.innerHTML = "";
    // display shuffled cards
    for (let card of cards) {
      deck.appendChild(card);
    }
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

// Event listener to turn over cards
for (let card of cards) {
  card.addEventListener("click", turnOver);
}

// Turn over cards
function turnOver() {
  // Timer starts on first move
  if (moves == 0) {
    timeInterval();
  }
  addMove();
  //movesDisplay();
  moveCounter.innerHTML = moves;
  if (toggledCards.length < 2) {
    this.classList.add("open", "show", "unclick", "disabled");
    toggledCards.push(this);
  }
  if (toggledCards.length === 2) {
    checkMatch();
  }
  rating();
}

// Check to see if cards are a match, if they are, adds match properties and if they are not, returns the cards back face down
function checkMatch(currentCard, previousCard) {
  setTimeout(function() {
    if (toggledCards[0].innerHTML === toggledCards[1].innerHTML) {
      toggledCards[0].classList.toggle("match", "animated", "bounceOut", "disabled");
      toggledCards[1].classList.toggle("match", "animated", "bounceOut", "disabled");
      matchedCards.push(toggledCards[0]);
      matchedCards.push(toggledCards[1]);
    } else {
      toggledCards[0].classList.remove("open", "show", "unclick", "disabled");
      toggledCards[1].classList.remove("open", "show", "unclick", "disabled");
    }
    if (matchedCards.length == 16) {
      checkGameOver();
    }
    toggledCards = [];
  }, 500);
}

function addMove() {
  moves++;
  moves.innerHTML = moves;
}

// Count up timer provided from StackOverflow
function timeInterval() {
  interval = setInterval(displayTime, 1000);
}

function displayTime() {
  ++totalSeconds;
  seconds.innerHTML = pad(totalSeconds % 60);
  minutes.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// Displays modal after winning
function checkGameOver() {
  if (matchedCards.length == 16) {
    gameOverText();
  }
}

function gameOverText() {
  modal.style.top = "0";
  starRating.innerHTML = ratingStar;
  totalMoves.innerHTML = moves;
  totalTime.innerHTML = minutes.innerHTML + ":" + seconds.innerHTML;
  stopTime();
}

// Rating system to show three stars and then removes stars after a certain amount of moves
function rating () {
  if (moves < maxStars) {
    ratingStar = "<i class= 'star fas fa-star'></i><i class= 'star fas fa-star'></i><i class='star fas fa-star'></i>";
  } else if (moves < minStars) {
    stars[2].style.color = "#444";
    ratingStar = "<i class='star fas fa-star'></i><i class= 'star fas fa-star'></i>";
  } else {
    stars[1].style.color = "#444";
    ratingStar = "<i class='star fas fa-star'></i>";
  }
}

// Reset game function
resetButton.addEventListener('click', resetGame);

function stopTime() {
  clearInterval(incrementer);
}

function resetGame () {
   window.location = window.location;
}

newGameButton.addEventListener('click', function(){
  window.location = window.location;
});

closeButton.addEventListener('click', function(){
  modal.style.display = 'none';
});
