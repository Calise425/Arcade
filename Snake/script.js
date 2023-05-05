const displayScore = document.getElementById('score');
const board = document.getElementById('board');
const boardArray = [];
const options = document.getElementById('options-container');
const startButton = document.getElementById('start');
const speedSelect = document.getElementById('speed');

let gameOver = false;
let score = 0;
let allowCollision = false;
let speedSelected = false;
let speed = 10;

//Determining the starting dimensions of the board, maybe allow for changing later?
let sizeX = 50;
let sizeY = 50;

//Create a random function to make the starting location of the apple random
function randomNum(min, max) {
    return parseInt(Math.random() * (max - min) + min);
};

//Places the apple in a random position that is not the top row (where the snake starts)
let appleLoc = [randomNum(0, sizeX), randomNum(1, sizeY)];

//initial snake position and direction
let snake = [[0, 0],[1, 0],[2, 0],[3,0]];
let nextDirection = [1,0];

//Build the divs of the board and the logical array of the board
const buildBoard = () =>{
    for (let i = 0; i < sizeX; i++){
        const column = [];
        const col = document.createElement('div');
        col.id = `col-${i}`;
        col.classList.add('column')
        for (let j = 0; j < sizeY; j++){
            column.push('');
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell-${i}-${j}`;
            col.appendChild(cell);
        }
        board.appendChild(col);
        boardArray.push(column);
    };
}
buildBoard();

//Function to move the snake, end the game if it hits a wall or itself, and to eat an apple
//This function is run every 'tick'
function renderState() {
    const head = snake[snake.length-1];
    const nextHead = [head[0]+nextDirection[0], head[1]+nextDirection[1]];
    const apple = document.querySelector(`#cell-${appleLoc[0]}-${appleLoc[1]}`);
    apple.classList.add('apple')
    if (!gameOver){
        //Add length to snake and generate new apple if snake head touches the apple
        if (head[0] === appleLoc[0] && head[1] === appleLoc[1]){
            score++;
            displayScore.innerText = score;
            snake.push(nextHead)
            snake.forEach((el) => {
                const cell = document.querySelector(`#cell-${el[0]}-${el[1]}`);
                cell.classList.add('snake');
            });
            apple.classList.remove('apple');
            appleLoc = [randomNum(0, sizeX), randomNum(1, sizeY)];
            const newApple = document.querySelector(`#cell-${appleLoc[0]}-${appleLoc[1]}`);
            newApple.classList.add('apple');
        //Gameover if snake touches itself
        } else if ((!allowCollision) && (document.querySelector(`#cell-${nextHead[0]}-${nextHead[1]}`).classList.contains('snake'))) {
            gameOver = true;
            displayScore.innerText = `Game Over! Final Score: ${score}`;
        //GameOver if snake goes out of bounds
        } else if (head[0] < 0 || head[0] >= sizeX || head[1] < 0 || head[1] >= sizeY){
            gameOver = true;
            displayScore.innerText = `Game Over! Final Score: ${score}`;
        } else {
            const removed = snake.shift();
            const removedSnake = document.querySelector(`#cell-${removed[0]}-${removed[1]}`)
            removedSnake.classList.remove('snake')
        
            //Add a new 'head' in the direction the snake is moving
            snake.push(nextHead)
            snake.forEach((el) => {
                const cell = document.querySelector(`#cell-${el[0]}-${el[1]}`);
                cell.classList.add('snake');
            });
        }
    }
};

document.onkeydown = (e) => {
    e = e || window.event;
    if (e.keyCode === 38) {
      nextDirection = [0,-1];
    } else if (e.keyCode === 40) {
      nextDirection = [0,1];
    } else if (e.keyCode === 37) {
      nextDirection = [-1,0];
    } else if (e.keyCode === 39) {
      nextDirection = [1,0];
    }
};

function tick() {
    if (speedSelected){
        renderState();
    }
};

speedSelect.addEventListener('change', (event) => {
    speed = event.target.value;
});

startButton.addEventListener('click', () => {
    options.style.display = 'none';
    speedSelected = true;
    setInterval(tick, 1000/speed);
});


