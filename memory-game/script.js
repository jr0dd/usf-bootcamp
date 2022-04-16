const gameContainer = document.getElementById('game')

const cards = [
  'card1',
  'card2',
  'card3',
  'card4',
  'card5',
  'card6',
  'card1',
  'card2',
  'card3',
  'card4',
  'card5',
  'card6',
]

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter)

    // Decrease counter by 1
    counter--

    // And swap the last element with it
    let temp = array[counter]
    array[counter] = array[index]
    array[index] = temp
  }

  return array
}

const shuffledCards = shuffle(cards)

// this function loops over the array of cards
// it creates a new div and gives it a class with the value of the card
// it also adds an event listener for a click for each card
function createDivsForCards(cardArray) {
  for (let card of cardArray) {
    // create a new div
    const newDiv = document.createElement('div')

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(card)

    // add img to new div
    const newImg = document.createElement('img')

    // append img to new div
    newDiv.append(newImg)

    // append the div to the element with an id of game
    gameContainer.append(newDiv)
  }
}

const button = document.getElementById('start')
button.addEventListener('click', startGame)

// handle start of game
function startGame() {
  count = 0
  score = 0
  matches = cards.length / 2
  scoreBox.innerText = `Score: ${score}`
  const allImgs = document.querySelectorAll('img')
  for (const img of allImgs) {
    img.style.visibility = 'hidden'
  }
  const allCards = document.querySelectorAll('#game div')
  for (const card of allCards) {
    card.addEventListener('click', handleCardClick)
  }
  button.removeEventListener('click', startGame)
  button.innerText = 'Restart'
  button.setAttribute('id', 'restart')
  button.addEventListener('click', restartGame)
}

// handle restart of game
function restartGame() {
  count = 0
  score = 0
  matches = cards.length / 2
  scoreBox.innerText = `Score: ${score}`
  const allCards = document.querySelectorAll('#game div')
  for (const card of allCards) {
    card.classList.remove('matched')
    card.removeAttribute('id')
    card.addEventListener('click', handleCardClick)
  }
  const allImgs = document.querySelectorAll('img')
  for (const img of allImgs) {
    img.style.visibility = 'hidden'
  }
  return
}

// handle end of game
function endGame() {
  checkScore(score)
  if (checkScore(score)) {
    alert(`Awesome! You have the new low score of ${score}!`)
  } else {
    alert(`Good Job! Keep trying to beat the low score of ${topScore}!`)
  }
  button.removeEventListener('click', restartGame)
  button.innerText = 'Start'
  button.setAttribute('id', 'start')
  button.addEventListener('click', startGame)
  const allCards = document.querySelectorAll('#game div')
  for (const card of allCards) {
    card.removeEventListener('click', handleCardClick)
  }
  return
}

// Score elements
score = 0
const scoreBox = document.querySelector('#score')
scoreBox.innerText = `Score: ${score}`
const topScore = parseInt(localStorage.getItem('topScore'))
const topScoreBox = document.querySelector('#top-score')
topScoreBox.innerText = `Score to beat: ${topScore}`

function checkScore(score) {
  if (topScore > score || !localStorage.getItem('topScore')) {
    localStorage.setItem('topScore', score)
    return true
  }
  return false
}

count = 0
let matches = cards.length / 2

// main game click function
function handleCardClick(event) {
  const lastPick = event.target
  const firstPick = document.querySelector('#flipped')
  const lastImg = lastPick.querySelector('img')
  const firstImg = document.querySelector('#flipped img')
  count++

    switch (count) {
      case 1:
        firstFlip()
        break
      case 2:
        secondFlip()
        break
      case 3:
        thirdFlip()
        break
      default:
        break
    }

  function firstFlip() {
    lastImg.style.visibility = 'visible'
    lastPick.setAttribute('id', 'flipped')
    lastPick.removeEventListener('click', handleCardClick)
  }

  function secondFlip() {
    lastImg.style.visibility = 'visible'
    if (lastPick.className === firstPick.className) {
      matches--
      if (matches === 0) {
        return setTimeout(endGame, 300)
      }
      console.log('matched!')
      lastPick.classList.add('matched')
      firstPick.classList.add('matched')
      firstPick.removeAttribute('id')
      firstPick.removeEventListener('click', handleCardClick)
    } else {
      scoreBox.innerText = `Score ${(score += 2)}`
      return setTimeout(resetFlip, 1200)
    }
    return (count = 0)
  }

  function thirdFlip() {
    return console.error('you can only chose 2')
  }

  function resetFlip() {
    lastImg.style.visibility = 'hidden'
    firstImg.style.visibility = 'hidden'
    firstPick.removeAttribute('id')
    firstPick.addEventListener('click', handleCardClick)
    return (count = 0)
  }
}

// when the DOM loads
createDivsForCards(shuffledCards)
