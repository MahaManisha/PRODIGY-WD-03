let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;
let mode = 'player';

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]
];

function setMode(selectedMode) {
  mode = selectedMode;
  resetGame();
}

function renderBoard() {
  const boardContainer = document.getElementById('board');
  boardContainer.innerHTML = '';
  board.forEach((cell, i) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.innerText = cell;
    div.addEventListener('click', () => handleClick(i));
    boardContainer.appendChild(div);
  });
}

function handleClick(index) {
  if (board[index] !== '' || isGameOver) return;
  board[index] = currentPlayer;
  renderBoard();
  if (checkWin(currentPlayer)) {
    document.getElementById('status').innerText = `${currentPlayer} wins!`;
    isGameOver = true;
    return;
  } else if (!board.includes('')) {
    document.getElementById('status').innerText = "It's a draw!";
    isGameOver = true;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (mode === 'ai' && currentPlayer === 'O') {
    setTimeout(aiMove, 500);
  }
}

function checkWin(player) {
  return winConditions.some(condition =>
    condition.every(index => board[index] === player)
  );
}

function aiMove() {
  let emptyIndices = board.map((cell, i) => cell === '' ? i : null).filter(i => i !== null);
  let move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  handleClick(move);
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameOver = false;
  document.getElementById('status').innerText = '';
  renderBoard();
}

renderBoard();
