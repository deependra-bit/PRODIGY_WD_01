let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let gameMode = "friend";

const board = document.getElementById("board");
const resetButton = document.getElementById("reset-btn");
const gameModeSelect = document.getElementById("game-mode");

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleCellClick(i));
    board.appendChild(cell);
  }
}

function handleCellClick(index) {
  if (gameBoard[index] !== "" || !gameActive) return;

  gameBoard[index] = currentPlayer;
  const cells = document.querySelectorAll(".board div");
  cells[index].textContent = currentPlayer;

  if (checkWinner()) {
    alert(`${currentPlayer} wins!`);
    gameActive = false;
  } else if (gameBoard.every((cell) => cell !== "")) {
    alert("It's a draw!");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (gameMode === "robot" && currentPlayer === "O") {
      aiMove();
    }
  }
}

function aiMove() {
  let availableMoves = [];
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === "") {
      availableMoves.push(i);
    }
  }

  const move =
    availableMoves[Math.floor(Math.random() * availableMoves.length)];

  gameBoard[move] = currentPlayer;
  const cells = document.querySelectorAll(".board div");
  cells[move].textContent = currentPlayer;

  if (checkWinner()) {
    alert(`${currentPlayer} wins!`);
    gameActive = false;
  } else if (gameBoard.every((cell) => cell !== "")) {
    alert("It's a draw!");
    gameActive = false;
  } else {
    currentPlayer = "X";
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return true;
    }
  }
  return false;
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  const cells = document.querySelectorAll(".board div");
  cells.forEach((cell) => (cell.textContent = ""));
}

resetButton.addEventListener("click", resetGame);

gameModeSelect.addEventListener("change", (event) => {
  gameMode = event.target.value;
  resetGame();
});

createBoard();
