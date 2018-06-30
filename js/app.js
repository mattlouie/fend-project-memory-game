/*
 * Create a list that holds all of your cards
 */
let objects = document.getElementsByClassName("card");
//const cards = allCards.concat(allCards);
const cardDeck = document.getElementById("deckSpace");
const resetButton = document.querySelector(".restart");
const modal = document.querySelector(".modal");
const totalMoves = document.querySelector(".totalMoves")
const totalTime = document.querySelector(".totalTime")
let cards = Array.from(objects);
let moves = 0;
let match = 0;
let moveCounter = document.querySelector(".move-counter");
//let timer = setInterval(updateDisplay, 1000)
let stars = [...document.querySelectorAll(".fa-star")];
let popup = document.getElementById("cardPopup");
let toggledCards = [];
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let totalSeconds = 0;
let clockId;
let interval;
let matchedCards = [];
let selectedCard = $("li.card");
let deck = document.querySelector(".deck");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 document.onLoad = gameStart();

function gameStart() {
  shuffle(cards);
  shuffledDeck();
  moves = 0;
}

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

for (let card of cards) {
  card.addEventListener("click", turnOver);
}

/* deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (isClickValid(clickTarget)) {
      timeInterval();
    }
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
    if (toggledCards.length === 2) {
      checkMatch(clickTarget);
      addMove();
      //checkScore();
    }
  }); */

function turnOver() {
  // Timer starts on first move
  if (moves == 0) {
    timeInterval();
  }
  addMove();
  movesDisplay();
  moveCounter.innerHTML = moves;
  if (toggledCards.length < 2) {
    this.classList.add("open", "show", "unclick");
    toggledCards.push(this);
  }
  // shows cards in open cards array for 1 second if there are 2 cards
  if (toggledCards.length === 2) {
    checkMatch();
  }
}

resetButton.addEventListener('click', resetGame);

/*function isClickValid(clickTarget) {
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
} */

function checkMatch() {
  setTimeout(function() {
    if (toggledCards[0].innerHTML === toggledCards[1].innerHTML) {
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
  moves.innerHTML = moves;
}

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

function movesDisplay() {
  // if moves = 8 display 3 stars
  if (moves > 8) {
    stars[4].classList.add("hidden");
  }
  if (moves > 12) {
    stars[3].classList.add("hidden");
  }
  if (moves > 16) {
    stars[2].classList.add("hidden");
  }
  if (moves === 20) {
    stars[1].classList.add("hidden");
  }
}

function winGame() {
  clearInterval(interval);
  if (matchedCards.length == 16) {
    modal.style.display = "block";
    totalMoves.innerHTML = moves;
    totalTime.innerHTML = minutes.innerHTML + ":" + seconds.innerHTML;
    stars.forEach(function(star) {
      if (!star.classList.contains('hidden')) {
        totalStarCounter++;
        starRating.innerHTML = totalStarCounter + " stars.";
      } else if (totalStarCounter == 1) {
        starRating.innerHTML = totalStarCounter + " star."
      }
    });
  }
}

function resetGame () {
  //resetClockAndTime();
  //resetMoves();
  //resetStars();
  //shuffle(cards);
   window.location = window.location;
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
