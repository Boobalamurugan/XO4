// JavaScript for 4x4 XO game

// Select the board and message elements
const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
const winModal = document.getElementById('winModal');
const winMessage = document.getElementById('winMessage');
const closeModal = document.getElementById('closeModal');
const restartButton = document.getElementById('restart');
const viewBoardButton = document.getElementById('viewBoard');

// Variables to track game state
let currentPlayer = 'X'; // X starts the game
let gameActive = true;
let gameState = Array(16).fill(''); // 4x4 board
let xPairs = 0;
let oPairs = 0;

// Winning combinations for 4x4 grid (rows, columns, diagonals)
const winningCombinations = [
    [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], // Rows
    [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], // Columns
    [0, 5, 10, 15], [3, 6, 9, 12] // Diagonals
];

// Function to create the game board
function createBoard() {
    gameState = Array(16).fill('');
    board.innerHTML = '';
    for (let i = 0; i < 16; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-index', i);
        square.addEventListener('click', handleClick);
        board.appendChild(square);
    }
}

// Function to handle a player's move
function handleClick(event) {
    const square = event.target;
    const index = square.getAttribute('data-index');

    if (gameState[index] !== '' || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    square.textContent = currentPlayer;
    square.classList.add(currentPlayer.toLowerCase()); // Add color class

    if (checkWinner()) {
        showWinMessage(`Player ${currentPlayer} wins!`);
        gameActive = false;
    } else if (!gameState.includes('')) {
        // If all cells are filled, check for pairs
        calculatePairs();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function to check for a winner
function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

// Function to calculate pairs of 'X' and 'O'
function calculatePairs() {
    xPairs = 0;
    oPairs = 0;

    // Check horizontal and vertical pairs
    for (let i = 0; i < 4; i++) {
        // Check rows for pairs
        for (let j = 0; j < 3; j++) {
            if (gameState[i * 4 + j] === 'X' && gameState[i * 4 + j + 1] === 'X') {
                xPairs++;
            } else if (gameState[i * 4 + j] === 'O' && gameState[i * 4 + j + 1] === 'O') {
                oPairs++;
            }
        }

        // Check columns for pairs
        for (let j = 0; j < 3; j++) {
            if (gameState[i + j * 4] === 'X' && gameState[i + (j + 1) * 4] === 'X') {
                xPairs++;
            } else if (gameState[i + j * 4] === 'O' && gameState[i + (j + 1) * 4] === 'O') {
                oPairs++;
            }
        }
    }

    // Determine the winner based on pairs
    if (xPairs > oPairs) {
        showWinMessage(`It's a draw! Player X has ${xPairs} pairs. Player O has ${oPairs} pairs. Player X is the winner!`);
    } else if (oPairs > xPairs) {
        showWinMessage(`It's a draw! Player O has ${oPairs} pairs. Player X has ${xPairs} pairs. Player O is the winner!`);
    } else {
        showWinMessage(`It's a draw! Both players have ${xPairs} pairs.`);
    }

    gameActive = false; // End the game
}

// Show winning message
function showWinMessage(text) {
    winMessage.textContent = text;
    winModal.style.display = "block";
}

// Close the modal
closeModal.addEventListener('click', () => {
    winModal.style.display = "none";
});

// Restart the game
restartButton.addEventListener('click', () => {
    currentPlayer = 'X';
    gameActive = true;
    xPairs = 0;
    oPairs = 0;
    message.textContent = `Player X's turn`;
    createBoard();
    winModal.style.display = "none"; // Close the modal
});

// View board button functionality
viewBoardButton.addEventListener('click', () => {
    winModal.style.display = "none"; // Close the modal to show the board
    alert(`Final Board State:\n${gameState.slice(0, 4).join(' | ')}\n${gameState.slice(4, 8).join(' | ')}\n${gameState.slice(8, 12).join(' | ')}\n${gameState.slice(12, 16).join(' | ')}`);
});

// Reset the game
resetButton.addEventListener('click', () => {
    currentPlayer = 'X';
    gameActive = true;
    xPairs = 0;
    oPairs = 0;
    message.textContent = `Player X's turn`;
    createBoard();
});

// Initialize the board when the page loads
createBoard();
