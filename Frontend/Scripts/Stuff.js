/*//just some stuff
export const output = document.getElementById("output");
export const input = document.getElementById("input");
export const input_sign = document.getElementById("input_s");
export let choosing = false;

export async function Choose(options, display) {
    //for menus with multiple options, give it an array of options - whats gonna be listed on the screen
    //and disaplay is, well, for the place where you wanna draw all that
    //uhh you control it with up and down arrows and enter to choose

    let curIndex = 0;
    choosing = true;

    input.disabled = true;
    input.blur();

    return new Promise((resolve) => {
        function render() {
            display.innerHTML = "<div>----------- SNAKE GAME -----------</div>";
            options.forEach((name, i) => {
                if (i === curIndex) {
                    display.innerHTML += `<div class="menu-blink"> >    [${name}]     < </div>`;
                } else{
                    display.innerHTML += `<div class="menu-item">        ${name}        </div>`;
                }
            });
        }

        const keyHandler = (event) => {
            if (event.key === "ArrowDown") {
                curIndex = (curIndex + 1) % options.length;
                render();
            } 
            else if (event.key === "ArrowUp") {
                curIndex = (curIndex - 1 + options.length) % options.length;
                render();
            } 
            else if (event.key === "Enter") {
                window.removeEventListener("keydown", keyHandler); 
                input.focus();
                input.disabled = false;
                choosing = false;
                resolve(curIndex);
            }
        };
        window.addEventListener("keydown", keyHandler);
        render();
    });
}

export function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function Print(message, display = output, rewrite = false){
    //function to write instead of output.innerHTMK... and all that
    // give it the message you wanna print = a string or whatever you wanna display, where to output it and rewrite, if true
    // resets the page and yeah 

    if(!rewrite){
        display.innerHTML += `<div>${message}</div>`
    }
    else{
        display.innerHTML = `<div>${message}</div>`
    }

    window.scrollTo({
        top:document.body.scrollHeight, 
        behavior:'instant'
    })
}


export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function PrintAsciiArt(art){
    // let
}
let homeInterval = null;
let homeChill = false;
function handleInput(){
    homeChill = false;
    homeInterval = null;
    clearInterval(homeInterval);
    document.removeEventListener("keydown", handleInput);
    input.disabled = false;
    input_sign.innerHTML = "user:~$";
    input.focus();
}


document.addEventListener("keydown", handleInput);

export function home(){
    input.disabled = true;
    input_sign.innerHTML = "";
    homeChill = true;
    let clock = new Date();
    output.innerHTML = `<pre>   
             úúúúúúúúú        úúúúúúúúúúú                                                                     
           ôúúúúúúúúúúôú    ôô&úúúúúúúúúúôô                                                                   
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
                                                                  úúúúúúúúúúúú                              </pre>`;
    Print("80-sys    [Version 1.87231] ");
    Print("(z) Y-K Duo-production. No rules here.");
    Print("[OK] Date-Time: " + clock.toLocaleDateString() + "    " + clock.toLocaleTimeString());
    Print("[OK] CPU [ Universal (AC) e2-077PP 5.2GHz ]");
    Print("[OK] CPU USAGE: " + (10 + 2 * Math.random() + clock.getDate() / 100 + clock.getMilliseconds() / 1000).toFixed(2) + "%");
    Print("[OK] MEMORY [ 193KB/640KB ]");
    Print("[OK] Protocol 'IDDQD'");
    Print("[OK] Protocol 'C-3P0+R2'");

    if(homeChill){
        if(!homeInterval){
            homeInterval = setInterval(home, 1000);
        }
    }
}*/
export const output = document.getElementById("output");
export const input = document.getElementById("input");
export const input_sign = document.getElementById("input_s");
export let choosing = false;

/**
 * printf function
 * @param {string} message - text to display
 * @param {HTMLElement} display - output; default is outpuy
 * @param {boolean} rewrite - if it is true, clear the display 
 */
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
    Print(message);
    const oldSign = input_sign.innerHTML;
    input.value = "";
    input_sign.innerHTML = "> "; 
    
    return new Promise((resolve) => {
        const handleEnter = (e) => {
            if (e.key === "Enter") {
                const val = input.value.trim();
                input.value = "";
                input_sign.innerHTML = oldSign;
                window.removeEventListener("keydown", handleEnter);
                resolve(val);
            }
        };
        window.addEventListener("keydown", handleEnter);
    });
}
export async function Choose(options, display) {
    let curIndex = 0;
    choosing = true;
    input.disabled = true;
    input.blur();

    return new Promise((resolve) => {
        function render() {
            display.innerHTML = "<div>----------- SYSTEM MENU -----------</div>";
            options.forEach((name, i) => {
                if (i === curIndex) {
                    display.innerHTML += `<div class="menu-blink"> > [${name}] < </div>`;
                } else {
                    display.innerHTML += `<div class="menu-item">   ${name}   </div>`;
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
    let clock = new Date();

    if(homeInterval) clearInterval(homeInterval);

    output.innerHTML = `<pre style="font-size: 12px; line-height: 10px;">
             úúúúúúúúú        úúúúúúúúúúú                                                                     
           ôúúúúúúúúúúôú    ôô&úúúúúúúúúúôô                                                                   
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
                                                                  úúúúúúúúúúúú      
    </pre>`;

    Print("80-sys     [Version 1.87231]");
    Print("[OK] Auth: " + (sessionStorage.getItem("currentUser") || "GUEST"));
    Print("[OK] Date: " + clock.toLocaleDateString() + " " + clock.toLocaleTimeString());
    Print("[OK] CPU USAGE: " + (10 + Math.random() * 5).toFixed(2) + "%");
    Print("------------------------------------------");
    Print("PRESS ANY KEY TO EXIT TO TERMINAL");

    const exitHome = () => {
        clearInterval(homeInterval);
        document.removeEventListener("keydown", exitHome);
        input.disabled = false;
        input_sign.innerHTML = "user:~$";
        input.focus();
        Print("Terminal Ready.");
    };

    document.addEventListener("keydown", exitHome);
    homeInterval = setInterval(home, 1000);
}