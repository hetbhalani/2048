var board;
var score = 0;
var rows = 4;
var cols = 4;

window.onload = function(){
    setGame();
}

function setGame(){
    // board= [
    //     [2,4,8,16],
    //     [16,8,4,2],
    //     [2,4,8,16],
    //     [2,8,4,2]
    // ]

    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
   

    for(i = 0; i<rows; i++){
        for(j=0; j<cols; j++){
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            let num = board[i][j];
            updateTile(tile,num);
            document.getElementById("board").append(tile);
        }
    }
    genTwo();
    genTwo();
}

function renderBoard() {
    let boardElement = document.getElementById("board");
    boardElement.innerHTML = "";

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let tile = document.createElement("div");
            tile.id = r + "-" + c;
            updateTile(tile, board[r][c]);
            boardElement.appendChild(tile);
        }
    }
}

function hasEmptyTile(){
    for(let r = 0; r<rows; r++){
        for(let c = 0; c<cols; c++){
            if(board[r][c] == 0){
                return true;
            }
        }
    }
}

function genTwo(){

    if(!hasEmptyTile()){
        return;
    }
    let found = false;
    
    while(!found){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);

        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString()+ "-" +c.toString());
            tile.innerText = "2";
            tile.classList.add("t2");
            found = true;
        }
    }
}

function updateTile(tile, num){
    tile.innerHTML = "";
    tile.classList.value = "";
    tile.classList.add("tile");

    if(num > 0){
        tile.innerHTML = num;
        if(num <= 1024){
            tile.classList.add("t"+num.toString());
        }
        else{
            tile.classList.add("t2048");
        }
    }
}


function canMove() {
    
    if (hasEmptyTile()) return true;

   
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let current = board[r][c];
            if (c < cols - 1 && current == board[r][c + 1]) return true; 
            if (r < rows - 1 && current == board[r + 1][c]) return true;
        }
    }
    return false;
}

document.addEventListener("keyup", (e) => {
    if(e.code == "ArrowLeft"){
        slideLeft();
        genTwo();
    }
    if(e.code == "ArrowRight"){
        slideRight();
        genTwo();
    }
    if(e.code == "ArrowUp"){
        slideUp();
        genTwo();
    }
    if(e.code == "ArrowDown"){
        slideDown();
        genTwo();
    }
    document.getElementById("score").innerHTML = score;
    if (!canMove()) {
        // document.getElementById("game-over-container").style.display = "flex";
        // document.getElementById("final-score").innerText = score;
        // document.getElementById("board").classList.add("blur");
        showGameOverMessage();
    }
});


//left move karva mate
function slideLeft(){
    for(let r = 0; r<rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for(let c = 0; c<cols; c++){
            let tile = document.getElementById(r.toString()+ "-" +c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function removeZeros(row){
    return row.filter(num =>  num!=0);
}

function slide(row){
    row = removeZeros(row);

    for(i = 0; i<row.length-1; i++){
        if(row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    }

    row = removeZeros(row);

    while (row.length < cols) {
        row.push(0);
    }

    return row;
}


//right move karva mate
function slideRight(){
    for(let r = 0; r<rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        

        for(let c = 0; c<cols; c++){
            let tile = document.getElementById(r.toString()+ "-" +c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}


//up move karva mate
function slideUp(){
    for(let c = 0; c< cols; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3]; 

        for(let r = 0; r<rows; r++){
            let tile = document.getElementById(r.toString()+ "-" +c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}


//down slide karva mate
function slideDown(){
    for(let c = 0; c< cols; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3]; 

        for(let r = 0; r<rows; r++){
            let tile = document.getElementById(r.toString()+ "-" +c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}


function showGameOverMessage() {
    document.body.classList.add('blur-background');
    
    Swal.fire({
        title: 'Game Over!',
        html: `<p>Your score is: <strong>${score}</strong></p>`,
        showCloseButton: false,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Play Again',
        cancelButtonText: 'Close',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        backdrop: 'rgba(0,0,0,0.4)',
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            resetGame();
        }
        document.body.classList.remove('blur-background');
    });
}



function resetGame() {
    score = 0;
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    document.body.classList.remove('blur-background');
    document.getElementById("score").innerHTML = score;
    renderBoard();
    genTwo();
    genTwo();
}