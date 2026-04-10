import {output, Print, Prompt, sleep} from "./Stuff.js";

export async function startTicTacToe() {
    Print("--- INITIALIZING TIC-TAC-TOE PROTOCOL ---", output, true);
    await sleep(500);

    let board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let currentPlayer = "X";
    let gameActive = true;

    const getBoardString = () => {
        return `
      ${board[0]} | ${board[1]} | ${board[2]}
     -----------
      ${board[3]} | ${board[4]} | ${board[5]}
     -----------
      ${board[6]} | ${board[7]} | ${board[8]}
        `;
    };

    while (gameActive) {
        Print("--- TIC-TAC-TOE ---", output, true);
        Print("<pre>" + getBoardString() + "</pre>");
        Print(`CURRENT TURN: PLAYER ${currentPlayer}`);
        
        const move = await Prompt(`SELECT POSITION (1-9) OR 'QUIT':`);

        if (move.toLowerCase() === "quit" || move.toLowerCase() === "exit") {
            return "GAME TERMINATED.";
        }

        const index = parseInt(move) - 1;

        if (isNaN(index) || index < 0 || index > 8 || board[index] === "X" || board[index] === "O") {
            Print("ERROR: INVALID SECTOR. TRY AGAIN.", output);
            await sleep(1000);
            continue;
        }

        board[index] = currentPlayer;

        if (checkWin(board, currentPlayer)) {
            Print("--- FINAL STATE ---", output, true);
            Print("<pre>" + getBoardString() + "</pre>");
            Print(`*** SYSTEM ALERT: PLAYER ${currentPlayer} WINS! ***`);
            gameActive = false;
        } else if (board.every(cell => cell === "X" || cell === "O")) {
            Print("--- FINAL STATE ---", output, true);
            Print("<pre>" + getBoardString() + "</pre>");
            Print("SYSTEM ALERT: STALEMATE DETECTED.");
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    await sleep(2000);
    input.focus();
    return "Returning to system prompt...";
}

function checkWin(b, p) {
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];
    return wins.some(condition => condition.every(i => b[i] === p));
}