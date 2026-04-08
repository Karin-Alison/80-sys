import { startSnakeGenocide } from "./Snake.js";
import { home } from "./Stuff.js";

export const commands = {
    "hello": () => "Heyy",
    
    "home": () => {
        home();
        return "";
    },

    "time": () => "Current Time: " + new Date().toLocaleTimeString(),

    "clear": () => {
        document.getElementById("output").innerHTML = "";
        return "";
    },
    
    "frog": () => "|||FROGGGG SECRET|||",
    
    "snake": () => {
        startSnakeGenocide();
        return "Initializing Snake Protocol...";
    },

    "ttt": async () => {
        return await startTicTacToe();
    },

    "login": () => {
        if (window.showLoginPanel) {
            window.showLoginPanel(); 
            return "Opening secure login interface...";
        } else {
            return "SYSTEM ERROR: Login utility not found.";
        }
    },

    "register": () => {
        if (window.showLoginPanel) {
            window.showLoginPanel();
            return "Opening registration interface...";
        } else {
            return "SYSTEM ERROR: Registration utility not found.";
        }
    },

    "whoami": () => {
        const user = sessionStorage.getItem("currentUser");
        return user ? `Logged in as: ${user}` : "Status: GUEST SESSION";
    },

    "logout": () => {
        sessionStorage.removeItem("currentUser");
        return "User logged out. Session terminated.";
    }
};