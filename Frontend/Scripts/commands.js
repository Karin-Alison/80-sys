import { home, Print } from "./Stuff.js";
import { startTicTacToe } from "./TicTacToe.js";
import { startSnakeGenocide } from "./Snake.js";
import { login, register, whoami } from "./Auth.js";
import { HangMan } from "./HangMan.js";

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
AVAILABLE COMMANDS:
-------------------
HOME     - System Information
CLEAR    - Clear Terminal
LOGIN    - Access User Account
REGISTER - Create New Account
WHOAMI   - Check Session Status
LOGOUT   - Terminate Session
TTT      - Play Tic-Tac-Toe
SNAKE    - Play Snake
TIME     - Display Clock
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
    }
};