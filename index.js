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

function isValidInput(input) {
    let [letter, number] = input.split("");
    return ["A","B","C"].includes(letter) && ["1","2","3"].includes(number);
}

function parseInput(input){
    let [letter, number] = input.split("");
    return[
        ["A","B","C"].indexOf(letter),
        ["1","2","3"].indexOf(number)
    ];
}

function drawVerticalLines(xMoves, oMoves, label){
    let space1Char =  xMoves[0] ?  "X" : oMoves[0] ? "O" : " ";
    let space2Char =  xMoves[1] ?  "X" : oMoves[1] ? "O" : " ";
    let space3Char =  xMoves[2] ?  "X" : oMoves[2] ? "O" : " ";
    console.log(`${label}  ${space1Char} | ${space2Char} | ${space3Char} `);
}

function drawHorizontalLines(){
    console.log("  ---+---+---");
}

function drawLabels(){
    console.log("   1   2   3  ");
}

function drawGrid(xMoves, oMoves){
    console.log();
    drawLabels();
    drawVerticalLines(xMoves[0], oMoves[0], "A");
    drawHorizontalLines();
    drawVerticalLines(xMoves[1], oMoves[1], "B");
    drawHorizontalLines();
    drawVerticalLines(xMoves[2], oMoves[2], "C");
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
    let playerXWins = isHorizontalWin (xMoves) || isVerticalWin (xMoves) || isDiagonalWin(xMoves) || isCornerWin(xMoves);
    let playerOWins = isHorizontalWin (oMoves) || isVerticalWin (oMoves) || isDiagonalWin(oMoves) || isCornerWin(oMoves);

    if (playerXWins){
        return PLAYER_X_WINS;
    }

    if (playerOWins) {
        return PLAYER_O_WINS;
    }

    return RUNNING;
    
}

function isHorizontalWin (moves){
    return moves.some(row => row.every(x => x));
}

function isVerticalWin (moves){
    return [0, 1, 2].some(colNumber => moves.every(row =>row[colNumber]));
}

function isDiagonalWin (moves){
    return (moves[0][0] && moves[1][1] && moves[2][2])
        || (moves[0][2] && moves[1][1] && moves[2][0]);
}

function isCornerWin (moves){
    return moves[0][0] && moves[0][2] && moves[2][0] && moves[2][2];
}

async function startGame() {
    let currentGameState = RUNNING;
    drawGrid(playerXMoves, playerOMoves);
    while (!game_is_over){
        let response = await displayPrompt(`${currentPlayer}, please enter your next move: `);
        if (isValidInput(response)){
            let [yMove, xMove] = parseInput(response);
            let currentPlayerMoves = currentPlayer === "Player X" ? playerXMoves : playerOMoves;
            
            currentPlayerMoves[yMove][xMove]=1;
            currentPlayer = currentPlayer === "Player X" ? "Player O" : "Player X"
            currentGameState = getNextGameState(playerXMoves, playerOMoves);
            game_is_over = [PLAYER_X_WINS, PLAYER_O_WINS, CATS_GAME].includes(currentGameState);
    
            drawGrid(playerXMoves, playerOMoves);            
        } else {
            console.log("Not a valid input string, please enter a Capital letter followed by a number")
        }

    }

    if (currentGameState === PLAYER_X_WINS){
        console.log("And the winner is...player X");
    }

    if (currentGameState === PLAYER_O_WINS){
        console.log("Player O is the winner!!");
    }

    if (currentGameState === CATS_GAME){
        console.log("It's a tie!");
    }

    rl.close();
}

startGame();