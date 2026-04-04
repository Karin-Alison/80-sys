import { output, input, choosing, Print } from "./Scripts/Stuff.js";
import { commands } from "./Scripts/commands.js";

//thingy for autofocus on input so that you dont have to click on it to type
document.addEventListener('click', () => {
    if(!choosing){ input.focus();}
});
document.addEventListener('keydown', () => {
    if(!choosing){ input.focus();}
});
window.onload = () => {
    if(!choosing){ input.focus();}
};


//command handler thingy
input.addEventListener("keyup", async (ev) => {
    const cmd = input.value.trim().toLowerCase();
    if(ev.key === "Enter"){
        output.innerHTML += `<div> ${cmd}</div>`;

        if(commands[cmd]){
            const result = await commands[cmd]();
            if(result){
                Print(result);
            }
        }else{
            Print(`Command ${cmd} not found.`);
        }
        input.value = "";
    }
})






