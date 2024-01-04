/*-------------------------------- Constants --------------------------------*/
const cardContainer = document.querySelector(".container")
const cardFront = document.querySelectorAll(".front")
const cardList = ["homer", "marge", "bart", "lisa", "maggie", "krusty", "burns", "milhouse"]


/*---------------------------- Variables (state) ----------------------------*/
let board, moves, match, activeCard, mismatchShowing, winner, timer


/*------------------------ Cached Element References ------------------------*/
const cardEls = document.querySelectorAll('.card')
const scoreEl = document.querySelector('#score')
const messageEl = document.querySelector('#message')
const resetBtn = document.getElementById('reset-button')
let timerEl = document.getElementById('timer')

/*----------------------------- Event Listeners -----------------------------*/
cardEls.forEach(function(cardEl) {
  cardEl.addEventListener('click', handleClick)
})
resetBtn.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  board = []
  moves = 0
  match = 0
  activeCard = null
  mismatchShowing = false
  winner = false
  setupBoard()
  render()
}

function setupBoard() {
  let cards = cardList.concat(cardList)
  cards = shuffleCards(cards)
  cards.forEach((card) => {
    let cardObj = {
      name: card, 
      isFlipped: false
    }
    board.push(cardObj)
  })
}

// shuffle cards using Fisher-Yates shuffle function from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976

function shuffleCards(cards) {
  let currentIndex = cards.length, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [cards[currentIndex], cards[randomIndex]] = [
      cards[randomIndex], cards[currentIndex]];
  }
  return cards;
}

function handleClick(evt) {
  const cardIdx = parseInt(evt.target.id.replace('card', ''))
  if (board[cardIdx].isFlipped || mismatchShowing) {
    return 
  }
  if (activeCard !== null) {
    flipCard(cardIdx)
    checkForMatch(cardIdx)
  } else {
    activeCard = cardIdx
    flipCard(cardIdx)
  }
  checkForWinner()
  render()
}

function flipCard (cardIdx) {
  board[cardIdx].isFlipped = !board[cardIdx].isFlipped
}

function checkForMatch(cardIdx) {
  if (board[cardIdx].name === board[activeCard].name) {
    match ++
    activeCard = null
  } else {
    mismatchShowing = true
    setTimeout(() => {
      board[cardIdx].isFlipped = false
      board[activeCard].isFlipped = false
      render()
      activeCard = null
      mismatchShowing = false
    }, 1200)
  }
}

function checkForWinner() {
  if (match === 8) {
    winner = true
    confetti.start(3000)
  }
}

function updateBoard() {
  board.forEach(function(card, idx) {
    if (card.isFlipped) {
      cardEls[idx].textContent = card.name
    } else {
      cardEls[idx].textContent = ""
    }

  })
} 

function render() {
  updateBoard()
  // updateMessage()
}


//// 1. Define the required variables used to track the state of the Gamepad
////  - Use variable named: ‘board’, ‘turn’, ‘match’, 'score', ‘winner’
//// 2. Store cached element references
////  - Create cashed elements for: cards, score, game status message, reset button
//// 3. Upon loading, the game state should be initialized, and a function should be called to render this game state
////  - Create an ‘init’ function
////  - Create 16 elements representing the cards from the deck
////  - Create a function that will shuffle and randomize card deck
//  - Create a score status representing how many matches scored and how many turns tried
//// 4. The state of the game should be rendered to the user
////  - Create a render and update function to update card elements to indicate which cards have already been flipped
//  - Update card board, matches, score, and turns
// 5. Define the required constants
//   - Create a data array within its own file representing all possible cards and images used for the game
//// 6. Handle a player clicking a card with a `handleClick` function
////  - Flip card if clicked on 
////  - On second card click, flip card and check for a match 
////  - Determine a match and have cards stay flipped if true and flip back down if false
//  - Update turns and score per turn
////  - Determine winner when all sets are matched 
//  - Determine loser when turns run out and not all cards are matched
//// 7. Create Reset functionality
////  - Add a reset button with an event listener to clear the score and call the init function


