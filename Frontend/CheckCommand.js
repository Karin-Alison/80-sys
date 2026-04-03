const output = document.getElementById("output");
const input = document.getElementById("input");
var choosing = false;
const commands = {
    "hello": () => "Heyy",
    "time": () => "Current Time: " + new Date().toLocaleTimeString(),
    "clear": () => {
        output.innerHTML = ""
        return ""
    },
    "frog": () => "|||FROGGGG SECRET|||",
    "snake": () => {
        choosing = true;
        output.innerHTML += "<div>-----------SNAKE GAME-----------</div>"
        output.innerHTML += "<div>----------Single Player-----------</div>"
        output.innerHTML += "<div>-----------Multiplayer-----------</div>"
    }
}

document.addEventListener('click', () => input.focus());
document.addEventListener('keydown', () => input.focus());
window.onload = () => input.focus();


input.addEventListener("keyup", ev => {
    if(choosing){
        var choice = 0;
        if(ev.key === "DownArrow"){
            
        }
    }
})


function OutputWords(ev){
    const cmd = input.value.trim().toLowerCase();
    if(ev.key === "Enter"){
        output.innerHTML += `<div> ${cmd}</div>`;

        if(commands[cmd]){
            const result = commands[cmd]();
            if(result){
                output.innerHTML += `<div>${result}</div>`;
            }
        }else{
                output.innerHTML += `<div>Command "${cmd}" not found</div>`
        }
        input.value = "";
    }
}
