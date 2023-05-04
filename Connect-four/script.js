const board = document.getElementById('board');
let rows = 6;
let cols = 7;
let boardArray = [];
let symbol = 'yellow';

//CREATE DOM ELEMENTS
//a nested for loop that creates the dom elements as well as their corresponding array
//gives each cell a unique id of cell-i-j, almost like an x,y coordinate.
for (let i = 0; i < cols; i++){
    const column = [];
    const col = document.createElement('div');
    col.id = `col-${i}`;
    col.classList.add('column')
    for (let j = 0; j < rows; j++){
        column.push('');
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `cell-${i}-${j}`;
        col.appendChild(cell);
    }
    board.appendChild(col);
    boardArray.push(column);
};

//ACCESS ELEMENTS AS AN ARRAY OF ARRAYS
const columns = Array.from(document.querySelectorAll('.column'));

board.addEventListener('click', (e)=>{
    const x = '';
    for (let i = 0; i < cols; i++){
        console.log(e.target.id)
        if (e.target.classList.contains(`col-${i}`)){
            x = i;
        }
    }
    const column = boardArray[x];
    for (let i = 0; i < column.length; i++){
        if (column[i] === ''){
            const y = i;
        }
    }
    column[y] = symbol;
    const cell = document.getElementById(`cell-${x}-${y}`);
    cell.classList.add('symbol')
});



