//Allow players to put in names
//NICE TODO: add line through winning position
const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const h2 = document.getElementsByTagName('h2')[0];

let cells = [];
let players = 1;
let symbol = 'X';
let computerSymbol = 'O';
let gameOver = false;

const select = document.getElementsByTagName('select')[0];
select.addEventListener('change', (event) => {
    players = event.target.value;
    clearBoard();
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
            h2.innerText = `${cells[a]} is the winner!`;
            gameOver = true;
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

//Click event listener on the board that checks if the target is a cell, and if the cell textContent is empty
//If so, it changes the textContent to the current symbol
//After which if the game isn't over, it will change the player symbol.
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
                    } else {
                        symbol = "X";
                    }
                } 
            }     
        }
    } else if (!gameOver && players === 1){
        if (e.target.className === 'cell'){
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
                    const blankIndex = cells.indexOf('');
                    cells[blankIndex] = computerSymbol;
                    const computerSelection = document.getElementById(`${blankIndex}`)
                    computerSelection.textContent = computerSymbol;
                    checkWin();
                }
            }
        }
    }
});

//Add event listener to the reset button to run the clearBoard function
resetButton.addEventListener('click', () => {
    clearBoard();
});

