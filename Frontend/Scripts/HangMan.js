import { input, output, Print, input_sign } from "./Stuff.js";

export async function HangMan() {
    let hangManPics = [
        `\n\n\n\n\n =========`,
        `\n     |\n     |\n     |\n     |\n     |\n =========`,
        `+---+\n     |\n     |\n     |\n     |\n     |\n =========`,
        `+---+\n |   |\n     |\n     |\n     |\n     |\n =========`,
        `+---+\n |   |\n 0   |\n     |\n     |\n     |\n =========`,
        `+---+\n |   |\n 0   |\n |   |\n     |\n     |\n =========`,
        `+---+\n |   |\n 0   |\n/|   |\n     |\n     |\n =========`,
        `+---+\n |   |\n 0   |\n/|\\  |\n     |\n     |\n =========`,
        `+---+\n |   |\n 0   |\n/|\\  |\n/    |\n     |\n =========`,
        `+---+\n |   |\n 0   |\n/|\\  |\n/ \\  |\n     |\n =========`
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

    let animationLoseP = [
        `<pre id="hangman-lost">${hangManPics[9]}</pre>`,
        `<pre>${hangManPics[9]}</pre>`
    ];

    let animationFrame = 0;
    let listener;
    let animationInterval;
    let againListener;
    let words = await loadCSV("../../Other FIles/Hangman_wordbank");
    let win = false;
    let lives_used = 0;
    let word = words[Math.floor(Math.random() * words.length)];
    let correct_letters = [];
    let letters_guessed = [];
    let enterPressed = false;

    window.choosing = true;

    function getDisplayWord() {
        return word.split("").map(l => correct_letters.includes(l) ? l : "_").join("");
    }

    function drawGame() {
        Print("", output, true);
        Print("#-------Hang Man-------#");
        Print("<pre>" + hangManPics[lives_used] + "</pre><br>");
        Print(getDisplayWord());
    }

    function cleanup() {
        clearInterval(animationInterval);
        input.removeEventListener("keyup", listener);
        input.removeEventListener("keyup", againListener);
    }

    const animationFn = () => {
        Print("", output, true);
        const frames = win ? animationWinP : animationLoseP;
        Print(frames[animationFrame]);
        animationFrame = (animationFrame + 1) % frames.length;
    };

    function gameOver() {
        cleanup();
        animationFrame = 0;
        animationInterval = setInterval(animationFn, 300);

        setTimeout(() => {
            clearInterval(animationInterval);
            Print("", output, true);
            Print("The word: " + word);
            Print(`You guessed ${correct_letters.length} letters: ${getDisplayWord()}`);
            Print("");
            Print(`Enter 'again' to play again, or 'quit' to exit.`);

            againListener = (ev) => {
                if (ev.key !== "Enter" || enterPressed) return;
                const cmd = input.value.trim().toLowerCase();
                enterPressed = true;
                
                input.value = "";
                if (cmd === "again") {
                    cleanup();
                    HangMan();
                } else if (cmd === "quit") {
                    cleanup();
                    window.choosing = false;
                    Print("Game Closed.");
                    input.focus();
                } else {
                    Print(`Unknown command: ${cmd}. Type 'again' or 'quit'.`);
                }
                enterPressed = false;
            };
            input.addEventListener("keyup", againListener);
        }, 2400);
    }

    function CheckInput(input_word) {
        const unique_letters = [...new Set(input_word)];
        for (let letter of unique_letters) {
            if (!letters_guessed.includes(letter)) {
                if (word.includes(letter)) {
                    correct_letters.push(letter);
                } else {
                    lives_used += 1;
                }
                letters_guessed.push(letter);
            }
        }
        
        const isWin = [...word].every(l => correct_letters.includes(l));
        if (lives_used >= 9 || isWin) {
            win = isWin;
            drawGame();
            gameOver();
        } else {
            drawGame();
        }
    }

    listener = (ev) => {
        if (ev.key !== "Enter" || enterPressed) return;
        const cmd = input.value.trim().toLowerCase();
        if (!cmd) return;

        enterPressed = true;
        const currentSign = input_sign.innerHTML;
        input.value = "";
        
        output.innerHTML += `<div><span class="user-prefix">${currentSign}</span> ${cmd}</div>`;
        CheckInput(cmd);
        
        enterPressed = false;
        window.scrollTo(0, document.body.scrollHeight);
    };

    drawGame();
    // Перед добавлением нового слушателя на всякий случай чистим старые
    input.removeEventListener("keyup", listener); 
    input.addEventListener("keyup", listener);
}

async function loadCSV(path) {
    try {
        const res = await fetch(path);
        const text = await res.text();
        return text.split(/\r?\n|,/).map(w => w.trim()).filter(w => w.length > 3);
    } catch (e) {
        return ["ошибка", "загрузки", "словаря"];
    }
}