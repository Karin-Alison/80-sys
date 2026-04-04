import { output, Choose, Print } from "./Stuff.js";

export async function startSnakeGenocide(){
    output.innerHTML = "<div>-----------SNAKE GAME-----------</div>";
    const Options = ["Single Player", "Multiplayer"];
    const choice = await Choose(Options, output);

    if(choice === 0){
        Print("Game Single starting...", output, true);
        LonelySnake();
    }
    else{
        Print("Multiplayer currently not working, try later.", output, true);
    }

    return "";
}

function LonelySnake(){
    //singleplayer game function
    Print("Drawing Game");
    let Zmiq = [[3,4],[3,3],[3,2]];
    let Snake_length = 3;
    let direction = [0,-1];
    document.addEventListener("keydown", (e) => {
        if(e.key === "ArrowUp") direction = [0,-1];
        if(e.key === "ArrowDown") direction = [0,1];
        if(e.key === "ArrowLeft") direction = [-1,0];
        if(e.key === "ArrowRight") direction = [1, 0];
    });

    function update(){
        for(let i = 1; i < Snake_length; i++){
            Zmiq[i] = Zmiq[i-1];
        }
        Zmiq[0][0] += direction[0];
        Zmiq[0][1] += direction[1];

        Zmiq[0][0] = (Zmiq[0][0] + 20) % 21;
        Zmiq[0][1] = (Zmiq[0][1] + 16) % 16;

    }
    function gameDraw(){
        let field =['|# # # # # # ∙ ∙ ∙ ∙SNAKEGAME∙ ∙ ∙ ∙ # # # # # #|',
                    '#∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ #',
                    '#∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ #',
                    '#∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ #',
                    '#∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ #',
                    '#∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ #',
                    '#∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ #',
                    '#∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ #',
                    '#∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ #',
                    '#∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ #',
                    '#∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ #',
                    '#∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ #',
                    '#∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ #',
                    '#∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ #',
                    '#∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ #',
                    '#∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ #',
                    '#∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ ∙ #',
                    '# # # # # # # # # # # # # # # # # # # # # # # # # #']

        let field_x = field.map(row => row.split(''));;
        for(let i = 0; i < Zmiq.length; i++){
            let x = Zmiq[i][0];
            let y = Zmiq[i][1];

            if(i === 0){
                field_x[y][x] = "░";
            } else {
                field_x[y][x] = "█";
            }
        }
        Print("", output, true);
        for(let i = 0; i<field_x.length; i++){
            Print(field_x[i].join('') + "<br>");
        }
    }

    function gameTick() {
        update();  
        gameDraw();    
    }
    setInterval(gameTick, 200);


    

}