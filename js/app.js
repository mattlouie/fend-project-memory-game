/*
 * Create a list that holds all of your cards
 */
const allCards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
const cards = allCards.concat(allCards);
const cardDeck = document.getElementById("deckSpace");
let shuffle= [];
let moves = 0;
let movesCounter = document.querySelector(".move-counter");
let timer = setInterval(updateDisplay, 1000)
let stars = document.querySelector(".stars");
let popup = document.getElementById("cardPopup");
let openCards = [];
let matchedCards = [];
let selectedCard = $("li.card");
let cardIDs = [];
let cardList = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

cardShuffle();
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 for (let card of cards) {
   card.addEventListener("click", turnOver);
 }

function turnOver() {
  if (moveCounter == 0) {
    timeInterval();
  }
  moveCounter++;
  moveCounterDisplay();
  moveCounter.innerHTML = moveCounter;
  if (openCards.length < 2) {
    this.classList.add("open", "show", "unclick");
    openCards.push(this);
  }
  if (openCards.legth === 2) {
    cardMatches();
  }
}

function cardMatches() {
  setTimeout(function() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      openCards[0].classList.add("match");
      openCards[1].classList.add("match");
      matchedCards.push(openCards[0]);
      matchedCards.push(openCards[1]);
    } else {
      openCards[0].classList.remove("open", "show", "unclick");
      openCards[1].classList.remove("open", "show", "unclick");
    }
    if (matchedCards.length == 16) {
      winGame();
    }
  }
}
