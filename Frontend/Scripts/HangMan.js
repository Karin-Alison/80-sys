import { input, output, getRandomInt, Print} from "./Stuff"; 


export function HangMan(){
    hangManPics = 
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
        ` +---+
              |
              |
              |
              |
              |
          =========`,
        ` +---+
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
         /|\  |
              |
              |
          =========`,
         `+---+
          |   |
          0   |
         /|\  |
              |
              |
          =========`,
         `+---+
          |   |
          0   |
         /|\  |
         /    |
              |
          =========`,
         `+---+
          |   |
          0   |
         /|\  |
         / \  |
              |
          =========`]


        let words = loadCSV("..\..\Other FIles\Hangman_wordbank");

        let game = true;
        let lives_used = 0;
        let word = words[Math.floor(Math.random()*words.length)];
        let letters_guessed = [];

        for(let i = 0; i < word.length; i++){
                letters_guessed.push("_");
            }

        
        input.addEventListener("keyup", async (ev) => {
        
            const cmd = input.value.trim().toLowerCase();
            if(ev.key === "Enter" && !enterPressed){
                enterPressed = true;
                input_sign.innerHTML = "";
                input.readOnly = true;
                input.value = "";
                output.innerHTML += `<div> ${cmd}</div>`;
                await sleep(100 + Math.random()*100 +Math.random()*400);
                if(commands[cmd]){
                    const result = await commands[cmd]();
                    if(result){
                        Print(result);
                    }
                }else{
                    Print(`Command ${cmd} not found.`);
                }
                enterPressed = false;
                input.readOnly = false;
                input_sign.innerHTML = "user:~$";
            }
            
        })
        
        function drawGame(){
            Print("", output, true);
            Print("#-------Hang Man-------#")
            Print("<pre>"+hangManPics[lives_used]+"</pre><br>");
            Print(letters_guessed.join(""));
        }



}
async function loadCSV(path) {
    const res = await fetch(path);
    const text = await res.text();

    const words = text
        .split("\n")
        .split(", ")
        .map(w => w.trim())
        .filter(w => w.length > 3);

    return words;
}



