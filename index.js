import { Console } from "console";
import readline from "readline";

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function displayPrompt(string) {
    return new Promise(resolve => {
        rl.question(string, resolve);
    })
}

function drawVerticalLines(xMoves, oMoves){
    let space1Char =  xMoves[0] ?  "X" : oMoves[0] ? "O" : " ";
    let space2Char =  xMoves[1] ?  "X" : oMoves[1] ? "O" : " ";
    let space3Char =  xMoves[2] ?  "X" : oMoves[2] ? "O" : " ";
    console.log(` ${space1Char} | ${space2Char} | ${space3Char} `);
}

function drawHorizontalLines(){
    console.log("---+---+---");
}

function drawGrid(xMoves, oMoves){
    console.log();
    drawVerticalLines(xMoves[0], oMoves[0]);
    drawHorizontalLines();
    drawVerticalLines(xMoves[1], oMoves[1]);
    drawHorizontalLines();
    drawVerticalLines(xMoves[2], oMoves[2]);
    console.log();
}

let game_is_over = false;
let currentPlayer = "Player X";
let playerXMoves = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

let playerOMoves = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

const RUNNING = "RUNIING";
const PLAYER_X_WINS = "PLAYER_X_WINS";
const PLAYER_O_WINS = "PLAYER_O_WINS";
const CATS_GAME = "CATS_GAME";

function getNextGameState(xMoves, oMoves){
    let playerXWins = isHorizontalWin (xMoves);
    let playerOWins = isHorizontalWin (oMoves);

    if (playerXWins){
        return PLAYER_X_WINS;
    }

    if (playerOWins) {
        return PLAYER_O_WINS;
    }

    return RUNNING;
}

function isHorizontalWin (moves){
    return moves.some(row => row.every(x => x === 1))
}

function isVerticalWin (moves){}
function isCatsGame (moves){}

async function startGame() {
    let currentGameState = RUNNING;
    drawGrid(playerXMoves, playerOMoves);
    while (!game_is_over){
        let response = await displayPrompt(`${currentPlayer}, please enter your next move: `);
        let [yMove, xMove] = response.split(",").map(x=>Number(x));
        let currentPlayerMoves = currentPlayer === "Player X" ? playerXMoves : playerOMoves;
        
        currentPlayerMoves[yMove][xMove]=1;
        currentPlayer = currentPlayer === "Player X" ? "Player O" : "Player X"
        currentGameState = getNextGameState(playerXMoves, playerOMoves);
        game_is_over = [PLAYER_X_WINS, PLAYER_O_WINS, CATS_GAME].includes(currentGameState);

        drawGrid(playerXMoves, playerOMoves);
    }

    if (currentGameState === PLAYER_X_WINS){
        console.log("Player X is the winne!");
    }

    if (currentGameState === PLAYER_O_WINS){
        console.log("Player O is the winner!");
    }

    if (currentGameState === CATS_GAME){
        console.log("It's a tie!");
    }
}

startGame();