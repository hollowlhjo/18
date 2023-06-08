class Snake {
  constructor(mas) {
    this.head = 0;
    this.archive = [this.head];
    this.segments = [];
    this.moving = "right";
    this.mayMove = ["right", "left", "down", "up"];
    }
    renderNewInt(int){
      if(int > -1){
        let oldInt = 0
        oldInt = int
        console.log(oldInt)
        return oldInt
      }
    }
    move(event) {
      let newPlace = 0
      let moving = "right"
      if (event.keyCode === 39 && moving != "left") {
        newPlace += 1 
        moving = "right"
        cellSnaked.renderNewInt(newPlace)
      } else if (event.keyCode === 37 && moving != "right") {
        newPlace -= 1
        moving = "left"
        cellSnaked.renderNewInt(newPlace)
      } else if (event.keyCode === 40 && moving != "up") {
        newPlace += 10
        moving = "down"
        cellSnaked.renderNewInt(newPlace)
      } else if (event.keyCode === 38 && moving != "down") {
        newPlace -= 10
        moving = "up"
        cellSnaked.renderNewInt(newPlace)
      }
  }
}
function createfield(cells, indexes){
  cells.forEach((cell, index) => {
    cell.classList.add("game-cell");
    if (index === 0) {
      cell.classList.add("snake");
      let cellSnaked = cell;
      let indexSnaked = index;
    }
    indexes.push(index);
  });
}
class Game {
  constructor(lenghtSnake, level) {
    this.amountFree = 100 - lenghtSnake;
  }
}
class Food {
  constructor(cells, lenghtSnake) {
    cells.forEach((elem) => {
      if (elem.classList.contains("snake")) {
      } else {
        let cell = Math.random() * 100;
        if (cell > 97) {
          elem.classList.add("food");
        }
      }
    });
  }
}
function InitGame() {
  let snakeAlive = 1;
  const cells = document.querySelectorAll(".cell");
  let indexes = [];
  createfield(cells, indexes)
  let cells1 = Array.prototype.slice.call(cells);
  cellSnaked = new Snake(cells1);
  newPlace = cellSnaked.renderNewInt(-1)
  console.log(newPlace)
  cells.forEach((cell, index) => {
    if (index === newPlace) {
      cell.classList.add("snake");
      var cellSnaked = cell;
    }
  });
  let food = new Food(cells, 1);
  document.addEventListener("keydown", cellSnaked.move)
  setInterval(console.log(newPlace), 1000);
}
InitGame()
