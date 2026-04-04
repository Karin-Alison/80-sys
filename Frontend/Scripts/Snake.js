import { output, Choose, Print } from "./Stuff.js";

export async function startSnakeGenocide(){
    output.innerHTML = "<div>-----------SNAKE GAME-----------</div>";
    const Options = ["Single Player", "Multiplayer"];
    const choice = await Choose(Options, output);

    if(choice === 0){
        Print("Game Single starting...", output, true);
    }
    else{
        Print("Game multi starting...", output, true);
    }

    return "";
}