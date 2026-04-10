
import { output, input, setChoosing, getChoosing, Print, home, sleep, input_sign, getEnabled, setEnabled} from "./Scripts/Stuff.js";
import { commands } from "./Scripts/commands.js";
let enterPressed = false;
const focusInput = () => {
    const loginPanel = document.getElementById("login-panel");
    const isLoginOpen = loginPanel && loginPanel.style.display === "block";

    if (!getChoosing() && !input.disabled && !isLoginOpen) {
        input.focus();
    }

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'instant'
    });
};

document.addEventListener('click', focusInput);
document.addEventListener('keydown', focusInput);
window.onload = focusInput;
input.addEventListener("keyup", async (ev) => {
    if (ev.key !== "Enter" || enterPressed || !getEnabled()) return;

    const cmd = input.value.trim().toLowerCase();
    enterPressed = true;
    
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
    input.focus();
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


