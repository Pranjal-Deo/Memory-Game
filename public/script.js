document.getElementById('startButton').addEventListener('click', startGame);

const gameBoard = document.getElementById('gameBoard');
let cards = [];
let selectedCards = [];
let matchedPairs = 0;

// Array of emojis to use in the game
const emojis = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍍', '🍑', '🍓']; // Example list of emojis

function startGame() {
    // Show the game board
    gameBoard.classList.remove('hidden');
    gameBoard.innerHTML = '';
    cards = createCardPairs();
    shuffle(cards);
    createBoard();
}

function createCardPairs() {
    // Duplicate each emoji to create pairs
    return emojis.flatMap(emoji => [emoji, emoji]);
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    matchedPairs = 0;
    selectedCards = [];
    cards.forEach(emoji => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = emoji;
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    // Prevent flipping if card is already matched or two cards are already selected
    if (card.classList.contains('matched') || selectedCards.length === 2 || selectedCards.includes(card)) {
        return;
    }
    card.textContent = card.dataset.value; // Show emoji on flip
    selectedCards.push(card);

    if (selectedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = selectedCards;
    if (card1.dataset.value === card2.dataset.value) {
        // Match found
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        if (matchedPairs === cards.length / 2) {
            setTimeout(() => alert('Congratulations! You have matched all pairs! 🎉'), 500);
        }
    } else {
        // No match - flip cards back over
        setTimeout(() => {
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }
    selectedCards = [];
}
