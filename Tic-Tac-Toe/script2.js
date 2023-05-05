//Variable references!!
const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const h2 = document.getElementsByTagName('h2')[0];
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const playButton = document.getElementById('play');


//Variables!! Initial state of things
//I dont think I have a great grasp on when it's best to use an object. Is this an object angle?
let cells = [];
let players = 1;
let symbol = 'X';
let computerSymbol = 'O';
let gameOver = false;
let p1Name = '';
let p2Name = '';
let xPlayer = '';
let oPlayer = '';


//Adding an event listener to the # of players drop down
//If its 2 players, the name field will pop up
const select = document.getElementsByTagName('select')[0];
select.addEventListener('change', (event) => {
    players = parseInt(event.target.value);
    clearBoard();
    symbol = 'X';
    const options = document.getElementById('options');
    if (players === 2){
        options.style.display = 'flex';
    } else {
        options.style.display = 'none';
    }
});

//Allows players to input names
player1.addEventListener('change', (event) => {
    p1Name = event.target.value;
});
player2.addEventListener('change', (event) => {
    p2Name = event.target.value;
});

//Random number generator for first player
function randomNum(min, max) {
    return parseInt(Math.random() * (max - min) + min);
};

//Adds eventListener to the play button to randomly roll for which player goes first
playButton.addEventListener('click', (event) => {
    const firstPlayer = randomNum(1,3);
    if (firstPlayer === 1){
        h2.innerText = `${p1Name}'s move`
        xPlayer = p1Name;
        oPlayer = p2Name;
    } else {
        h2.innerText = `${p2Name}'s move`
        xPlayer = p2Name;
        oPlayer = p1Name;
    }
});


//Build the cells array
for (let i = 0; i < 9; i++){
    cells.push("");
};

//Iterate over the cells array and create a div for each element, then append it to the board parent
cells.forEach((el, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
    cell.id = index;
});

//all of the possible positions for a win
const winningPositions = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
];

//After making a move, run a function to check if any of the winning positions are all the same
//Also checks if the board is full
const checkWin = () => {
    for (let i = 0; i < winningPositions.length; i++) {
        const [a, b, c] = winningPositions[i];
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            gameOver = true;
            if (cells[a] === 'X'){
                if (players === 1){
                    h2.innerText = 'You win!'
                    gameOver = true;
                } else {
                    h2.innerText = `${xPlayer} wins!`
                    gameOver = true;
                }
            } else if (cells[a] === 'O'){
                if (players === 1){
                    h2.innerText = 'Computer wins';
                    gameOver = true;
                } else {
                    h2.innerText = `${oPlayer} wins!`
                    gameOver = true;
                }
            }
            return;
        }
    }
    if (!cells.includes('')) {
        h2.innerText = `It's a tie`;
        gameOver = true;
    }
};

//a function to clear the board when the reset button is used
const clearBoard = () => {
    const boardChildren = board.querySelectorAll('div');
    for (let i = 0; i < 9; i++){
        cells[i] = '';
        boardChildren[i].textContent = '';
    }
    gameOver = false;
    h2.innerText = '';
};

//Adds event listener to the board. In single player, it will also make a move depending on the state of the cells array
//In two player, it switches whose turn it is
board.addEventListener('click', function(e){
    if (!gameOver && players === 2){
        if (e.target.className === 'cell'){
            if (!e.target.textContent.length){
                cells[e.target.id] = symbol;
                e.target.textContent = symbol;
                checkWin();
                if (!gameOver) {
                    if (symbol === "X") {
                        symbol = "O";
                        h2.innerText = `${oPlayer}'s move`;
                    } else {
                        symbol = "X";
                        h2.innerText = `${xPlayer}'s move`;
                    }
                } 
            }     
        }
    } else {
        if (!gameOver && e.target.className === 'cell'){
            if (!e.target.textContent.length){
                cells[e.target.id] = symbol;
                e.target.textContent = symbol;
                checkWin();
                if (!gameOver) {
                    for (let i = 0; i < winningPositions.length; i++) {
                        const [a, b, c] = winningPositions[i];
                        if (cells[a] && cells[a] === cells[b] && !cells[c]) {
                            cells[c] = computerSymbol;
                            const computerSelection = document.getElementById(`${c}`)
                            computerSelection.textContent = computerSymbol;
                            checkWin();
                            return;
                        } else if (cells[a] && cells[a] === cells[c] && !cells[b]) {
                            cells[b] = computerSymbol;
                            const computerSelection = document.getElementById(`${b}`)
                            computerSelection.textContent = computerSymbol;
                            checkWin();
                            return;
                        } else if (cells[b] && cells[b] === cells[c] && !cells[a]) {
                            cells[a] = computerSymbol;
                            const computerSelection = document.getElementById(`${a}`)
                            computerSelection.textContent = computerSymbol;
                            checkWin();
                            return;
                        }                                                           
                    }
                    if (!cells[4]){
                        cells[4] = computerSymbol;
                        const computerSelection = document.getElementById(`${4}`)
                        computerSelection.textContent = computerSymbol;
                        checkWin();
                    } else {
                        const blankIndex = cells.indexOf('');
                        cells[blankIndex] = computerSymbol;
                        const computerSelection = document.getElementById(`${blankIndex}`)
                        computerSelection.textContent = computerSymbol;
                        checkWin();
                    } 
                }
            }
        }
    }
});

//Add event listener to the reset button to run the clearBoard function
resetButton.addEventListener('click', () => {
    clearBoard();
    if (players === 2){
        const firstPlayer = randomNum(1,3);
        if (firstPlayer === 1){
            h2.innerText = `${p1Name}'s move`
            xPlayer = p1Name;
            oPlayer = p2Name;
        } else {
            h2.innerText = `${p2Name}'s move`
            xPlayer = p2Name;
            oPlayer = p1Name;
        }
    }
});

