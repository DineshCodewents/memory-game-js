const cards = document.querySelectorAll('.card');
let flippedCard = false;
let board = false;
let firstCard, secondCard;
let attempts = 0;
let match = 0;

function flip() {
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
    } else {
        flippedCard = false;
        secondCard = this;
        forMatch();
    }
}
function forMatch() {
    const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCard() : unflipCard();
    updateScore(isMatch);
}
function disableCard() {
    firstCard.removeEventListener('click', flip);
    secondCard.removeEventListener('click', flip);
    resetBoard();
    match+1;
}

function unflipCard() {
    board = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 500);
}

function resetBoard() {
    [flippedCard, board] = [false, false];
    [firstCard, secondCard] = [null, null];
}
function updateScore(isMatch) {
    attempts++;
    document.getElementById('attempt').innerHTML = attempts;

    if (isMatch) {
        document.getElementById('match').innerHTML = ++match;
    }
}
(function shuffleCards() {
    cards.forEach((card) => {
        const randomOrder = Math.floor(Math.random() * 12);
        card.style.order = randomOrder;
    });
})();
cards.forEach((card) => card.addEventListener('click', flip));