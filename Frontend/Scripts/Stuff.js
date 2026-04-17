export const output = document.getElementById("output");
export const input = document.getElementById("input");
export const input_sign = document.getElementById("input_s");
export let choosing = false;
let enabled = true;

export function setEnabled(value){
    enabled = value;
}

export function getEnabled(){
    return enabled;
}



export function setChoosing(value){
    choosing = value;
}

export function getChoosing(){
    return choosing;
}


export function Print(message, display = output, rewrite = false) {
    if (rewrite) {
        display.innerHTML = `<div>${message}</div>`;
    } else {
        display.innerHTML += `<div>${message}</div>`;
    }

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'instant'
    });
}

export async function Prompt(message) {
    window.choosing = true;
    Print(message);
    input.disabled = false;
    input.readOnly = false;
    input.focus();
    const oldSign = input_sign.innerHTML;
    input.value = "";
    input_sign.innerHTML = "> ";

    await new Promise(r => setTimeout(r, 100)); 

    return new Promise((resolve) => {
        const handleEnter = (e) => {
            if (e.key !== "Enter") return;

            e.preventDefault();
            e.stopImmediatePropagation(); 

            window.removeEventListener("keydown", handleEnter);

            const val = input.value.trim();
            input.value = "";
            input_sign.innerHTML = oldSign;
            window.choosing = false;

            resolve(val);
        };

        window.addEventListener("keydown", handleEnter);
    });
}

export async function Choose(options, display, menu_name) {
    let curIndex = 0;
    choosing = true;
    input.disabled = true;
    input.blur();

    return new Promise((resolve) => {
        function render() {
            display.innerHTML = `<div>${menu_name}</div>`;
            options.forEach((name, i) => {
                if (i === curIndex) {
                    display.innerHTML += `<span class="menu-blink"> > [${name}] < </span> <br>`;
                } else {
                    display.innerHTML += `<span>   ${name}   </span> <br>`;
                }
            });
        }

        const keyHandler = (event) => {
            if (event.key === "ArrowDown") {
                curIndex = (curIndex + 1) % options.length;
                render();
            } else if (event.key === "ArrowUp") {
                curIndex = (curIndex - 1 + options.length) % options.length;
                render();
            } else if (event.key === "Enter") {
                window.removeEventListener("keydown", keyHandler);
                input.disabled = false;
                input.focus();
                choosing = false;
                resolve(curIndex);
            }
        };
        window.addEventListener("keydown", keyHandler);
        render();
    });
}

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let homeInterval = null;
export function home() {
    input.disabled = true;
    input_sign.innerHTML = "";

    function drawUI(){
        let clock = new Date();
        output.innerHTML = `<pre style="font-size: 20px; line-height: 20px;">
                úúúúúúúúú        úúúúúúúúúúú                                                 
             ôúúúúúúúúúúôú     ôô&úúúúúúúúúúôô                                               
             úúúúúú   úúúúú    úúúúú     üúúúú                                               
             úúúúúú   úúúúú    úúúúú   úúúúúúú                                               
             úúúúúú   úúúúú    úúúúú   úúúúúúú                                               
                úúúúúúúúú      úúúúú úúúúúúúúú                                               
             úúúúúú   úúúúú    úúúúúúúúú üúúúú        úúúúúúúúúúúú   úúúúú    úúúú&     üúúúúúúúúúúú            
             úúúúúú   úúúúú    úúúúúúúúú üúúúú        úúúúúúúúúúúú   úúúúú    úúúú&     üúúúúúúúúúúú            
             úúúúúú   úúúúú    úúúúúúú   üúúúúúúúúúúúúúúú            úúúúú    úúúú&   &úúúúü                    
             üúúúúúúúúúúúú&    úúúúúúúúúúúúúú&&&&&&&úúúúúúúúúúú      úúúúú    úúúú&   ú&úúúúúúúúú&              
                úúúúúúúúú        úúúúúúúúúúú          úúúúúúúúú      úúúúú    úúúú&     üúúúúúúúúú              
                                                              úúúúúú     úúúúúúúúúúú&            &úúúú            
                                                     úúúúúúúúúúúúúõ     úúúúúúúúúúú&   úúúúúúúúúúúúúú            
                                                     úúúúúúúúúúú               úúúú&   &úúúúúúúúúúú              
                                                                     úúúúúúúúúúúú                                
                                                                     úúúúúúúúúúúúúú                             
</pre>`;
Print("80-sys     [Version 1.87231]");
        Print("(z) Y-K Duo-production. No rules here.");
        Print("[OK] Auth: " + (sessionStorage.getItem("currentUser") || "GUEST"));
        Print("[OK] Date: " + clock.toLocaleDateString() + " " + clock.toLocaleTimeString());
        Print("[OK] CPU [ Universal (AC) e2-077PP 5.2GHz ]");
        Print("[OK] CPU USAGE: " + (10 + Math.random() * 5).toFixed(2) + "%");
        Print("[OK] MEMORY [ 193KB/640KB ]");
        Print("[OK] Protocol 'IDDQD'");
        Print("[OK] Protocol 'C-3P0+R2'");
        Print("------------------------------------------");
        Print("PRESS ANY KEY TO EXIT TO TERMINAL");
    }

    function exitHome(event){
            if (event.key == "Enter") return;
            clearInterval(homeInterval);
            document.removeEventListener("keydown", exitHome);
            input.disabled = false;
            input_sign.innerHTML = "user:~$";
            input.focus();
            Print("Terminal Ready.");
        };

    drawUI();
    homeInterval = setInterval(drawUI, 1000);
    document.addEventListener("keydown", exitHome);
    
}