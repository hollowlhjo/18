function InitGame() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    cell.classList.add("game-cell");
    if (index === 0) {
      cell.classList.add("snake");
    }
  });
}
InitGame()