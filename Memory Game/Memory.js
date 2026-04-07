const gameboard = document.querySelector('.gameboard');
const cardValues = ['🍎', '🍎', '🍌', '🍌', '🍒', '🍒', '🍇', '🍇'];
const shuffledValues = [...cardValues].sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
const totalPairs = 4;

function handleCardClick() {
    if (lockBoard) return;
    if (this.textContent !== '?') return;  
    if (firstCard === this) return;  

    if(this.textContent === '?') {
        this.textContent = this.dataset.value
    }
    if (firstCard === null) {
        firstCard = this
    } else if (secondCard === null) {
        secondCard = this;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedPairs += 1
        firstCard = null;
        secondCard = null;
        if (matchedPairs === totalPairs) {
            document.querySelector('.gamestatus').textContent = "You won!";        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.textContent = '?'
            secondCard.textContent = '?'
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }, 500);
    }
}
for (let i = 0; i < shuffledValues.length; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = '?';
    card.dataset.value = shuffledValues[i];
    card.addEventListener('click', handleCardClick)
    gameboard.appendChild(card);
}
