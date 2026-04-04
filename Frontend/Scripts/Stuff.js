//just some stuff
export const output = document.getElementById("output");
export const input = document.getElementById("input");
export var choosing = false;

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
}
