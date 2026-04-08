import {input, Print} from "./Stuff.js";
import {commands} from "./commands.js";

async function processCommand() {
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
        Print(`Unknown command: '${cmdName}'. Type 'home' for system info.`);
    }
}

input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        await processCommand();
    }
});

window.onload = () => {
    input.focus();
    Print("80-SYS ONLINE. TYPE 'home' TO START.");
};