var output = document.getElementById("output");
var input = document.getElementById("input");

const commands = {
    "hello": () => "Heyy",
    "time": () => "Current Time: " + new Date().toLocaleTimeString(),
    "clear": () => {
        output.innerHTML = ""
        return ""
    },
    "frog": () => "|||FROGGGG SECRET|||"
}

document.addEventListener('click', () => input.focus());
document.addEventListener('keydown', () => input.focus());
window.onload = () => input.focus();


input.addEventListener("keyup", ev => {
    const cmd = input.value.trim().toLowerCase();
    if(ev.key === "Enter"){
        output.innerHTML += `<div> ${cmd}</div>`;

        if(commands[cmd]){
            var result = commands[cmd]();
            if(result){
                output.innerHTML += `<div>${result}</div>`;
            }
        }else{
                output.innerHTML += `<div>Command "${cmd}" not found</div>`
        }
        input.value = "";
    }

})