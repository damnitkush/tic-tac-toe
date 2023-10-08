const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newgamebtn = document.querySelector(".btn");
let currentPlayer;
let gameGrid;
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//initialise to default condition of the application
function initGame(){
    currentPlayer = "X";
    //initialising null values to all grids
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList =`box box${index+1}`;
    });
    //removing the new game button
    newgamebtn.classList.remove("active");
    //shows the current players text
    gameinfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();
//swtiches the current players
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameinfo.innerText = `Current Player - ${currentPlayer}`;

}

function checkGameOver(){
    let ans = "";
    winningPositions.forEach((position) => {
        //check the condition for all winning positions
        if(gameGrid[position[0]] != "" && 
            gameGrid[position[1]] != "" && 
            gameGrid[position[2]] != "" && 
            gameGrid[position[0]] === gameGrid[position[1]] &&
            gameGrid[position[1]] === gameGrid[position[2]]
        ){
            //if all conditions are true prevents the futhur clicking
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            //initialises the winner 
            if(gameGrid[position[0]] === 'X' ){
                ans = "X";
            }
            else {
                ans = "O";
            }
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })
            //marks all the boxes green for the winner line
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(ans != ""){
        gameinfo.innerText = `Winner Player- ${ans}`;
        newgamebtn.classList.add("active");
        return;
    }
    //checking for draw condition
    let allBoxesFilled = true;
    gameGrid.forEach((box) => {
        if(box === ""){
            allBoxesFilled = false;
        }
    });
    //its a draw
    if(allBoxesFilled){
        gameinfo.innerText = `It's a Draw`;
        newgamebtn.classList.add("active");
    }
}
//marks the selected box with that player
function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        //swap turn
        swapTurn();
        //check if the game is over
        checkGameOver();
    }
}
boxes.forEach((box,index) => {
    box.addEventListener("click",()=>{
        //perform the clicking operations
        handleClick(index);
    })
});
//calls the init function upon clicking
newgamebtn.addEventListener("click",initGame);