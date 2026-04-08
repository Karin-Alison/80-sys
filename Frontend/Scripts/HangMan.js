import { input, output, getRandomInt, Print, input_sign, getEnabled, setEnabled} from "./Stuff.js"; 


export async function HangMan(){
    let hangManPics = 
    [
        `
      
      
      
      
      
 =========`,
        `
     |
     |
     |
     |
     |
 =========`,
`+---+
     |
     |
     |
     |
     |
 =========`,
`+---+
 |   |
     |
     |
     |
     |
 =========`,
`+---+
 |   |
 0   |
     |
     |
     |
 =========`,
`+---+
 |   |
 0   |
 |   |
     |
     |
 =========`,
`+---+
 |   |
 0   |
/|   |
     |
     |
 =========`,
`+---+
 |   |
 0   |
/|\\  |
     |
     |
 =========`,
`+---+
 |   |
 0   |
/|\\  |
/    |
     |
 =========`,
`+---+
 |   |
 0   |
/|\\  |
/ \\  |
     |
 =========`
    ];


let animationWinP = [
`<pre> 
   +---+
   |   |
       |
    0  |
   /|\\ |
   / \\ |
   =========</pre>`,
`<pre>
   +---+
   |   |
       |
  __0__|
    |  |
   / \\ |
   =========</pre>`

];


let animationLoseP = [`<pre id="hangman-lost">`+hangManPics[9]+ "</pre>", `<pre>`+hangManPics[9]+ "</pre>"];

        let animationFrame = 0;
        let listener;
        let animationInterval;
        let againListener;
        let words = await loadCSV("../../Other FIles/Hangman_wordbank");
        let animationCount = 0;
        let win = false;
        let lives_used = 0;
        let word = words[Math.floor(Math.random()*words.length)];
        let correct_letters = [];
        let letters_guessed = [];
        setEnabled(false);
        let enterPressed = false;

        function getDisplayWord(){
            return word
                .split("")
                .map(l => correct_letters.includes(l) ? l : "_")
                .join("");
        }

        function drawGame(){
            Print("", output, true);
            Print("#-------Hang Man-------#")
            Print("<pre>"+hangManPics[lives_used]+"</pre><br>");
            Print(getDisplayWord());
        }
        function animationWin(){
            Print("", output, true);
            Print(animationWinP[animationFrame]);

            animationFrame = (animationFrame + 1) % animationWinP.length;
            animationCount += 1;
        }

        function animationLose(){
            Print("", output, true);
            Print(animationLoseP[animationFrame]);

            animationFrame = (animationFrame + 1) % animationLoseP.length;
            animationCount += 1;
        }


        function gameOver(){
            input.removeEventListener("keyup", listener);

            animationCount = 0;
            animationFrame = 0;

            const animationFn = win ? animationWin : animationLose;

            animationInterval = setInterval(animationFn, 300);

            const maxFrames = 6;

            setTimeout(() => {
                clearInterval(animationInterval);

                Print("", output, true);
                Print("The word: " + word);
                Print(`You guessed ${correct_letters.length} letters of the word:`);
                Print(getDisplayWord());
                Print("");
                Print(`Enter 'again' to play again.`);
                Print(`Enter 'quit' to quit to terminal.`);

                againListener = async (ev) => {
                    if (ev.key !== "Enter" || enterPressed) return;

                    const cmd = input.value.trim().toLowerCase();
                    enterPressed = true;

                    const currentSign = input_sign.innerHTML;
                    input_sign.innerHTML = "";
                    input.readOnly = true;
                    input.value = "";

                    Print(cmd);

                    if (cmd == "again") {
                        Print("Game Starting again...");
                        input.removeEventListener("keyup", againListener);
                        HangMan();
                    }
                    else if(cmd == "quit"){
                        input.removeEventListener("keyup", againListener);
                        Print("Game Closed.");
                        setEnabled(true);
                    }
                    else{
                        Print(`Try again, command ${cmd} is unknown.`);
                    }

                    enterPressed = false;
                    input.readOnly = false;
                    input_sign.innerHTML = currentSign;
                    window.scrollTo(0, document.body.scrollHeight);
                };

                input.addEventListener("keyup", againListener);

            }, maxFrames * 300);
        }


        function CheckInput(input_word){
            const unique_letters = [...new Set(input_word)];
            let isWin = [...word].every(l => correct_letters.includes(l));
            for(let letter of unique_letters){
                if(!letters_guessed.includes(letter)){
                    if(word.includes(letter)){
                        correct_letters.push(letter);
                    }
                    else{
                        lives_used += 1;
                    }
                    letters_guessed.push(letter);
                }
                isWin = [...word].every(l => correct_letters.includes(l));
                if(lives_used >=  9 || isWin){
                    drawGame();
                    if(isWin) win = true;
                    gameOver();
                }
                else{   
                    drawGame();
                }
            }
        }

        drawGame();

        listener = async (ev) => {
            if (ev.key !== "Enter" || enterPressed) return;
            const cmd = input.value.trim().toLowerCase();
            enterPressed = true;
            const currentSign = input_sign.innerHTML;
            input_sign.innerHTML = "";
            input.readOnly = true;
            input.value = "";
            if (cmd !== "") {
                output.innerHTML += `<div><span class="user-prefix">${currentSign}</span> ${cmd}</div>`;
                CheckInput(cmd);
            }        
            enterPressed = false;
            input.readOnly = false;
            input_sign.innerHTML = currentSign;
            window.scrollTo(0, document.body.scrollHeight);
        };

        input.addEventListener("keyup", listener);
        

}
async function loadCSV(path) {
    const res = await fetch(path);
    const text = await res.text();

    const words = text
    .split(/\r?\n|,/)
    .map(w => w.trim())
    .filter(w => w.length > 3);

    return words;
}



