const gameGrid = document.querySelector('.gamegrid');
const gameTile = document.querySelectorAll('.tile');
const gameOverDisplay = document.getElementById('gameover')
const gameOverText = document.getElementById('text');
const winstrike = document.getElementById('strike')
const playAgain = document.querySelector('button');
const playerX = 'X'
const playerO = 'O'
let turn = playerX;

const gameBoard = Array.from(gameTile)
gameBoard.fill(null);
gameTile.forEach((tile) => tile.addEventListener('click',tileClick))  

function setHover() {
    gameTile.forEach(tile => {
        tile.classList.remove('hover-x');
        tile.classList.remove('hover-o');
    })
    const hover = `hover-${turn.toLowerCase()}`
    gameTile.forEach(tile => {
        if (tile.innerText == "") {
            tile.classList.add(hover);
        }
    })
}
setHover();

function tileClick(event) {
    if (gameOverDisplay.classList.contains('visible')) {
        return;
    }
    const tile = event.target;
    const tileId = tile.dataset.tile
    console.log("Hello " + tileId + " " + turn);
    if (tile.textContent != "") {
        return console.log("Already Taken");
        }
    if (turn === playerX) {
            tile.textContent = playerX;
            gameBoard[tileId - 1] = playerX
            turn = playerO   
        }
        else {
            tile.textContent = playerO;
            gameBoard[tileId - 1] = playerO;
            turn = playerX
        }
        setHover();
        console.log("Check Win");
        checkWin();
        }

function checkWin() {
    //if 3 in a row declare player winner
    for (const winCondition of winCons) {
    const {combo,strike} = winCondition;
    const tileValue1 = gameBoard[combo[0] - 1];
    const tileValue2 = gameBoard[combo[1] - 1];
    const tileValue3 = gameBoard[combo[2] - 1];


    if (
        tileValue1 !== null &&
        tileValue1 === tileValue2 &&
        tileValue1 === tileValue3
    ) {
        winstrike.classList.add(strike)
        gameOver(tileValue1);
        return;
    }
    

    }
    //check for a tie
    const tie = gameBoard.every((tile) => tile !== null);
    if (tie) {
        console.log("Its a tie!");
        gameOver(null)
    }
}

function gameOver(winner) {
    let display = "Draw"
    if (winner !== null) {
        display = `${winner} is the Winner!`;
    }
    gameOverDisplay.className = 'visible';
    gameOverText.textContent = display;
}

const winCons = [
    //rows
    {combo: [1,2,3], strike: "strike-row-1"},
    {combo: [4,5,6], strike: "strike-row-2"},
    {combo: [7,8,9], strike: "strike-row-3"},
    //column
    {combo: [1,4,7], strike: "strike-col-1"},
    {combo: [2,5,8], strike: "strike-col-2"},
    {combo: [3,6,9], strike: "strike-col-3"},
    //diag
    {combo: [1,5,9], strike: "strike-diag-1"},
    {combo: [3,5,7], strike: "strike-diag-2"},
]

playAgain.addEventListener('click',playNewGame)
function playNewGame() {
    gameOverDisplay.className = 'hidden';
    winstrike.className = 'strike'
    gameBoard.fill(null);
    gameTile.forEach(tile => {
        tile.textContent = "";
    })
    turn = playerX;
    setHover();


}