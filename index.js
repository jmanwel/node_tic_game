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

let game_is_over = false;
let currentPlayer = "Player 1";

async function startGame() {
    while (!game_is_over){
        let response = await displayPrompt(`${currentPlayer}, please enter your next move: `);
        
        console.log(`${currentPlayer} entered the value ${response}`);
        // MAIN LOGIC GAME
        currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1"
    }
}

startGame();