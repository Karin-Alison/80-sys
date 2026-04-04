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
    let changed = false;
    Print("Drawing Game");
    let Zmiq = [[3,4],[3,3],[3,2]];
    let Snake_length = 3;
    let direction = [0,-1];
    document.addEventListener("keydown", (e) => {
        if(e.key === "ArrowUp" && direction[2] != 2 && !changed) {direction = [0,-1, 1]; changed = true;}
        if(e.key === "ArrowDown" && direction[2] != 1 && !changed) {direction = [0,1, 2];changed = true;}
        if(e.key === "ArrowLeft" && direction[2] != 4 && !changed) {direction = [-1,0, 3];changed = true;}
        if(e.key === "ArrowRight" && direction[2] != 3 && !changed) {direction = [1, 0, 4];changed = true;}
    });

function update(){

    let head = Zmiq[0];

    let newHead = [
        head[0] + direction[0],
        head[1] + direction[1]
    ];

    newHead[0] = (newHead[0] + 21) % 21;
    newHead[1] = (newHead[1] + 16) % 16;

    Zmiq.unshift(newHead); 
    Zmiq.pop();            
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
        
        let field_x = field.map(row => row.split(''));

        for(let i = 1; i < Zmiq.length; i++){
            let x = Zmiq[i][0];
            let y = Zmiq[i][1];

            field_x[y][x*2] = "░";
            field_x[y][x*2+1] = "░";
        }

        let hx = Zmiq[0][0];
        let hy = Zmiq[0][1];

        if(field_x[hy] && field_x[hy][hx]){
            field_x[hy][hx*2] = "█";
            field_x[hy][hx*2+1] = "█";
        }
        Print("", output, true);
        for(let i = 0; i < field_x.length; i++){
            Print(field_x[i].join('') + "<br>");
        }
    }

    function gameTick() {
        update();  
        gameDraw();    
        changed = false;
    }
    setInterval(gameTick, 200);


    

}