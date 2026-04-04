import { output, input, choosing, Print, home, sleep } from "./Scripts/Stuff.js";
import { commands } from "./Scripts/commands.js";


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
    if(ev.key === "Enter"){
        input.value = "";
        output.innerHTML += `<div> ${cmd}</div>`;
        await sleep(100 + Math.random()*100*Math.random() +Math.random()*400);
        if(commands[cmd]){
            const result = await commands[cmd]();
            if(result){
                Print(result);
            }
        }else{
            Print(`Command ${cmd} not found.`);
        }
    }
})





