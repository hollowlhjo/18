const cells = document.querySelectorAll(".cell");
let btn = document.getElementById("btn");
let moveInt;
let snake = {
  snakeAlive:1,
  points:1,
  length:1,
  masCoordinates:[],
  coordinates:0,
  moving:"right",
  speed: 250
}
function death(){
  snake.snakeAlive = 0;
  alert("Game over");
  clearInterval(moveInt);
  btn.disabled = false
  snake = {
    snakeAlive:1,
    points:1,
    length:1,
    masCoordinates:[],
    coordinates:0,
    moving:"right",
    speed: prompt("Enter speed(standart:250) when 1000 is slower")
  }
  clearInterval(timer)
  document.getElementById("points").innerHTML = "Points: " + snake.points;
  cells.forEach(cell => {
    cell.classList.remove("snake");
    cell.classList.remove("food");
    cell.classList.remove("snakeTail");
  });
}
function init() {
  let sec = 0;
  let timer = setInterval(tick, 1000);
}

function tick() {
  sec++;
  document.getElementById('timer').innerHTML = "Timer:  " + sec;
}

function direction(event) {
  if (event.keyCode === 39 && snake.moving !== "left") {
    snake.moving = "right";
  } else if (event.keyCode === 37 && snake.moving !== "right") {
    snake.moving = "left";
  } else if (event.keyCode === 40 && snake.moving !== "up") {
    snake.moving = "down";
  } else if (event.keyCode === 38 && snake.moving !== "down") {
    snake.moving = "up";
  }
}

function move() {
  if (snake.moving == "left") {
    if (snake.coordinates % 10 === 0) {
      death()
    } else {
      snake.coordinates -= 1;
    }
  }
  if (snake.moving == "down") {
    snake.coordinates += 10;
    if (snake.coordinates > 100) {
      death()
    }
  }
  if (snake.moving == "up") {
    snake.coordinates -= 10;
    if (snake.coordinates < 0) {
      death()
    }
  }
  if (snake.moving == "right") {
    if ((snake.coordinates + 1) % 10 === 0) {
      death()
    } else {
      snake.coordinates += 1;
    }
  }
  createField(cells);
}

function createField() {
  cells.forEach((cell, index) => {
    cell.classList.add("game-cell");
    if (index === snake.coordinates) {
      cell.classList.add("snake");
      snake.masCoordinates.unshift(cell);
      if (snake.points > 0 && snake.length < snake.points) {
        snake.length += 1;
        if (snake.moving === "right") {
          cells[index - 1].classList.add("snake");
        } else if (snake.moving === "left") {
          cells[index + 1].classList.add("snake");
        } else if (snake.moving === "up") {
          cells[index + 10].classList.add("snake");
        } else if (snake.moving === "down") {
          cells[index - 10].classList.add("snake");
        }
      }
      if (cell.classList.contains("food")) {
        snake.points += 1;
        cell.classList.remove("food");
        document.getElementById("points").innerHTML = "Points: " + snake.points;
        let food = new Food(cells);
      }
    }
  });

  if (snake.masCoordinates.length > snake.length) {
    snake.masCoordinates.pop().classList.remove("snake");
  }

  if (snake.masCoordinates.some((c, i) => i !== 0 && c === snake.masCoordinates[0])) {
    death()
  }
}

class Food {
  constructor(cells) {
    let cell = Math.floor(Math.random() * 100);
    if (cells[cell].classList.contains("snake") || cells[cell].classList.contains("snakeTail")) {
      cell = Math.floor(Math.random() * 100);
    }
    cells.forEach((elem, index) => {
      if (!elem.classList.contains("snake") && index === cell) {
        elem.classList.add("food");
      }
    });
  }
}

function InitGame() {
  btn.disabled = true;
  init();
  document.addEventListener("keydown", direction);
  let food = new Food(cells);
  moveInt = setInterval(move, snake.speed);
}