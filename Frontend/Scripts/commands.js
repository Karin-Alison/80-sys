import { home} from "./Stuff.js";
import { startTicTacToe } from "./TicTacToe.js";
import { startSnakeGenocide } from "./Snake.js";
import { login, register, whoami } from "./Auth.js";
import { HangMan } from "./HangMan.js";
import { ls, cd } from "./FileSystem.js";

export const commands = {
    "hello": () => "Heyy",
    
    "home": () => {
        home();
        return ""; 
    },

    "time": () => `SYSTEM TIME: ${new Date().toLocaleTimeString()}`,

    "clear": () => {
        document.getElementById("output").innerHTML = "";
        return "";
    },

    "help": () => {
        return `
AVAILABLE COMMANDS: <br>
------------------- <br>
HOME     - System Information <br>
CLEAR    - Clear Terminal <br>
LOGIN    - Access User Account <br>
REGISTER - Create New Account <br>
WHOAMI   - Check Session Status <br>
LOGOUT   - Terminate Session <br>
TTT      - Play Tic-Tac-Toe <br>
SNAKE    - Play Snake <br>
TIME     - Display Clock <br>
HANGMAN  - Play Hangman
        `;
    },
    "login": async () => {
        return await login();
    },

    "register": async () => {
        return await register();
    },

    "whoami": () => {
        return whoami();
    },

    "logout": () => {
        sessionStorage.removeItem("currentUser");
        return "User logged out. Session terminated.";
    },

    "snake": () => {
        startSnakeGenocide();
        return "Initializing Snake Protocol...";
    },

    "ttt": async () => {
        return await startTicTacToe();
    },

    "frog": () => "||| FROGGGG SECRET DETECTED |||",

    "hangman": () => {
        HangMan();
    },
    "ls": () => {
        ls();
    },
    "cd": (parameters) => {
        cd(parameters);
    }
};