/*import { output, input, choosing, Print, home, sleep, input_sign } from "./Scripts/Stuff.js";
>>>>>>> a40485a731eeb5928c29c7c6d397b6a827c36189
import { commands } from "./Scripts/commands.js";

let enterPressed = false;

//thingy for autofocus on input so that you dont have to click on it to type
document.addEventListener('click', () => {
    if(!choosing){ input.focus();}
    window.scrollTo({
    top:document.body.scrollHeight, 
    behavior:'instant'
})
});
document.addEventListener('keydown', () => {
    if(!choosing){ input.focus();}
    window.scrollTo({
    top:document.body.scrollHeight, 
    behavior:'instant'
})
});
window.onload = () => {
    if(!choosing){ input.focus();}
    window.scrollTo({
    top:document.body.scrollHeight, 
    behavior:'instant'
})
};

//command handler thingy
input.addEventListener("keyup", async (ev) => {
    const cmd = input.value.trim().toLowerCase();
    if(ev.key === "Enter" && !enterPressed){
        enterPressed = true;
        input_sign.innerHTML = "";
        input.readOnly = true;
        input.value = "";
        output.innerHTML += `<div> ${cmd}</div>`;
        await sleep(100 + Math.random()*100 +Math.random()*400);
        if(commands[cmd]){
            const result = await commands[cmd]();
            if(result){
                Print(result);
            }
        }else{
            Print(`Command ${cmd} not found.`);
        }
        enterPressed = false;
        input.readOnly = false;
        input_sign.innerHTML = "user:~$";
    }
    
})*/
import { output, input, choosing, Print, home, sleep, input_sign, getEnabled, setEnabled} from "./Scripts/Stuff.js";
import { commands } from "./Scripts/commands.js";
let enterPressed = false;
const focusInput = () => {
    const loginPanel = document.getElementById("login-panel");
    const isLoginOpen = loginPanel && loginPanel.style.display === "block";

    if (!choosing && !input.disabled && !isLoginOpen) {
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


