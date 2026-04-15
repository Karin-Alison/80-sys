// import { input, Print } from "./Stuff.js";
// import { commands } from "./commands.js";

// async function processCommand() {
//     if (window.choosing) {
//         return;
//     }

//     const line = input.value.trim();
//     if (!line) return;

//     const [cmdName, ...args] = line.split(" ");
//     const command = commands[cmdName.toLowerCase()];

//     input.value = "";

//     if (command) {
//         try {
//             const result = await command(args);
//             if (result) {
//                 Print(result);
//             }
//         } catch (err) {
//             Print(`[SYSTEM ERROR]: ${err.message}`);
//         }
//     } else {
//         Print(`Unknown command: '${cmdName}'. Type 'help' for commands.`);
//     }
// }

// input.addEventListener("keydown", async (e) => {
//     if (e.key === "Enter"){
//         if (window.choosing === true){
//             return; 
//         }
        
//         await processCommand();
//     }
// }); 

// window.onload = () => {
//     window.choosing = false;
//     input.focus();
//     Print("80-SYS ONLINE. TYPE 'home' TO BEGIN.");
// };

// window.executeLogin = async () => { 
//     if (commands.login) {
//         const result = await commands.login();
//         if (result) Print(result);
//     }
// };

// window.executeRegister = async () => { 
//     if (commands.register) {
//         const result = await commands.register();
//         if (result) Print(result);
//     }
// };



// Nqkwo mahnah takowa nz mahnah checkcommand shtom imame main i da, ama tam mn neshta imashe koito tuk nqma taka che da
import { output, input, setChoosing, getChoosing, Print, home, sleep, input_sign, getEnabled, setEnabled } from "./Stuff.js";
import { commands } from "./Scripts/commands.js";

let enterPressed = false;

let commandHistory = ["home", "frog"]; 
let cHistoryIndex = 0;
let commandDraft = "";

const focusInput = () => {
    setTimeout(() => {
        input.focus();
    }, 0);
};

document.addEventListener('mousedown', (e) => {
    if (e.target.tagName !== "INPUT") focusInput();
});

document.addEventListener('keydown', (e) => {
    if (e.target.tagName !== "INPUT") {
        focusInput();
    }
});
window.onload = focusInput;

input.addEventListener("keydown", (ev) => {
    if (ev.key === "ArrowUp" || ev.key === "ArrowDown") {
        ev.preventDefault();
    }
});

input.addEventListener("keyup", async (ev) => {
    if (enterPressed || !getEnabled()) return;

    if (ev.key === "Enter") {
        const cmd = input.value.trim().toLowerCase();
        
        if (cmd !== "" && cmd !== commandHistory[commandHistory.length - 1]) {
            commandHistory.push(cmd);
        }

        enterPressed = true;
        cHistoryIndex = 0;
        commandDraft = "";
        
        const currentSign = input_sign.innerHTML;
        input_sign.innerHTML = "";
        input.readOnly = true;
        input.value = "";

        if (cmd !== "") {
            output.innerHTML += `<div><span class="user-prefix">${currentSign}</span> ${cmd}</div>`;
        }

        if (commands[cmd]) {
            await sleep(100 + Math.random() * 300);
            
            try {
                const result = await commands[cmd]();
                if (result) {
                    Print(result);
                }
            } catch (error) {
                Print(`SYSTEM ERROR: ${error.message}`);
            }
        } else if (cmd !== "") {
            Print(`Command '${cmd}' not found. Type 'help' for options.`);
        }

        enterPressed = false;
        input.readOnly = false;
        input_sign.innerHTML = currentSign;
        window.scrollTo(0, document.body.scrollHeight);
        focusInput();
    }
    else if (ev.key === "ArrowUp" || ev.key === "ArrowDown") {
        if (cHistoryIndex === 0) {
            commandDraft = input.value;
        }
        if (ev.key === "ArrowUp") {
            if (cHistoryIndex < commandHistory.length) {
                cHistoryIndex++;
            }
        } else if (ev.key === "ArrowDown") {
            if (cHistoryIndex > 0) {
                cHistoryIndex--;
            }
        }

        if (cHistoryIndex === 0) {
            input.value = commandDraft;
        } else {
            input.value = commandHistory[commandHistory.length - cHistoryIndex];
        }
    }
});

window.showLoginPanel = function() {
    const panel = document.getElementById("login-panel");
    const dim = document.getElementById("overlay-dim");
    const passInput = document.getElementById("auth-password");

    panel.style.display = "block";
    dim.style.display = "block";
    
    setTimeout(() => {
        document.getElementById("auth-username").focus();
    }, 50);

    passInput.onkeydown = function(e) {
        if (e.key === "Enter") {
            window.executeLogin();
        }
    };
};

window.closePanel = function() {
    document.getElementById("login-panel").style.display = "none";
    document.getElementById("overlay-dim").style.display = "none";
    
    input.readOnly = false;
    focusInput();
};

window.executeLogin = function() {
    const user = document.getElementById("auth-username").value;
    const pass = document.getElementById("auth-password").value;
    const outputElem = document.getElementById("output"); 

    if (user && pass) {
        outputElem.innerHTML += `<div>[SYSTEM] Login successful. Welcome, ${user}.</div>`;
        sessionStorage.setItem("currentUser", user);

        window.closePanel(); 

        document.getElementById("auth-username").value = "";
        document.getElementById("auth-password").value = "";
    } else {
        alert("Enter both username and password.");
    }
};