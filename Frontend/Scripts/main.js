import { input, Print } from "./Stuff.js";
import { commands } from "./commands.js";

async function processCommand() {
    if (window.choosing) {
        return;
    }

    const line = input.value.trim();
    if (!line) return;

    const [cmdName, ...args] = line.split(" ");
    const command = commands[cmdName.toLowerCase()];

    input.value = "";

    if (command) {
        try {
            const result = await command(args);
            if (result) {
                Print(result);
            }
        } catch (err) {
            Print(`[SYSTEM ERROR]: ${err.message}`);
        }
    } else {
        Print(`Unknown command: '${cmdName}'. Type 'help' for commands.`);
    }
}

input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter"){
        if (window.choosing === true){
            return; 
        }
        
        await processCommand();
    }
}); 

window.onload = () => {
    window.choosing = false;
    input.focus();
    Print("80-SYS ONLINE. TYPE 'home' TO BEGIN.");
};

window.executeLogin = async () => { 
    if (commands.login) {
        const result = await commands.login();
        if (result) Print(result);
    }
};

window.executeRegister = async () => { 
    if (commands.register) {
        const result = await commands.register();
        if (result) Print(result);
    }
};