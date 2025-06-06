const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let grid = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // lignes
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // colonnes
  [0, 4, 8],
  [2, 4, 6], // diagonales
];

function checkWinner() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
      return grid[a];
    }
  }
  if (!grid.includes(null)) return "Egalité";
  return null;
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (grid[index] || checkWinner()) return;

  grid[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("taken");

  const winner = checkWinner();
  if (!statusText) return;
  if (winner) {
    statusText.textContent =
      winner === "Egalité" ? "Match nul !" : `Joueur ${winner} a gagné !`;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `À ${currentPlayer} de jouer`;
  }
}

function resetGame() {
  grid = Array(9).fill(null);
  currentPlayer = "X";
  if (!statusText) return;
  statusText.textContent = "Joueur X commence";
  board.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }
}

resetBtn.addEventListener("click", resetGame);

createBoard();

const video = document.getElementById("bgVideo");

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  video.style.transform = `translate(${x}px, ${y}px)`;
});
const gameContainer = document.querySelector(".game-container");

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10 à +10 px
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  // Mouvement vidéo
  video.style.transform = `translate(${x}px, ${y}px)`;

  // Mouvement jeu (game-container)
  gameContainer.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
});
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth - 0.5;
  const mouseY = e.clientY / window.innerHeight - 0.5;

  // Vidéo : mouvement plus subtil (ex: max ±8px)
  const videoX = mouseX * 8;
  const videoY = mouseY * 8;
  video.style.transform = `translate(${videoX}px, ${videoY}px)`;

  // Jeu : mouvement plus marqué (ex: max ±20px)
  const gameX = mouseX * 20;
  const gameY = mouseY * 20;
  gameContainer.style.transform = `translate(calc(-50% + ${gameX}px), calc(-50% + ${gameY}px))`;
});
