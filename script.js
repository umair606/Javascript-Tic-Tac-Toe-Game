const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('statusMessage');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerText = currentPlayer;
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    const a = gameState[winCondition[0]];
    const b = gameState[winCondition[1]];
    const c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusMessage.innerText = `${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusMessage.innerText = "It's a draw!";
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusMessage.innerText = `${currentPlayer}'s turn`;
}

function handleRestartGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusMessage.innerText = `${currentPlayer}'s turn`;
  cells.forEach(cell => cell.innerText = "");
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('restartButton').addEventListener('click', handleRestartGame);
