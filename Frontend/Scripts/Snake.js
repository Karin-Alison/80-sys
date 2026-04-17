import { output, Choose, Print, getRandomInt, input, input_sign } from "./Stuff.js";

export async function startSnakeGenocide(){
    output.innerHTML = "<div>-----------SNAKE GAME-----------</div>";
    const Options = ["Single Player", "Multiplayer"];
    const choice = await Choose(Options, output, "----------------Snake Game----------------");

    if(choice === 0){
        Print("Game Single starting...", output, true);
        await LonelySnake();
        input.focus();
    }
    else{
        Print("Multiplayer currently not working, try later.", output, true);
    }
    return "";
}



async function LonelySnake(){
    input.disabled = true;
    input_sign.innerHTML = "";

    let isRunning = true;
    let glowing = false;
    let GameOver = null; // Вынес выше для доступа
    let apple = [getRandomInt(1, 21), getRandomInt(1, 16)];
    let changed = false;
    let Zmiq = [[3,4],[3,3],[3,2]];
    let direction = [0, 1, 2];

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
    
    function handleKey(e){
        // Если игра окончена и мигает, любое нажатие (кроме Enter) выключает мигание
        if(!isRunning && GameOver){
            clearInterval(GameOver);
            GameOver = null;
            return;
        }

        if(e.key === "ArrowUp" && direction[2] != 2 && !changed) {direction = [0, -1, 1]; changed = true;}
        if(e.key === "ArrowDown" && direction[2] != 1 && !changed) {direction = [0, 1, 2];changed = true;}
        if(e.key === "ArrowLeft" && direction[2] != 4 && !changed) {direction = [-1, 0, 3];changed = true;}
        if(e.key === "ArrowRight" && direction[2] != 3 && !changed) {direction = [1, 0, 4];changed = true;}
        
        if(e.key === "Escape" || (e.key === "c" && e.ctrlKey)) {
            finishGame();
        }
    }
    
    document.addEventListener("keydown", handleKey);

    function finishGame() {
        isRunning = false;
        clearInterval(intervalId);
        if(GameOver) clearInterval(GameOver);
        GameOver = null;
        
        input.disabled = false;
        input_sign.innerHTML = "user:~$";
        document.removeEventListener("keydown", handleKey);
        setTimeout(() => input.focus(), 10);
    }

    function generateApple(){
        let newApple;
        let safe = false;
        while(!safe){
            newApple = [getRandomInt(1, 21), getRandomInt(1, 16)];
            safe = true;
            for(let i = 0; i < Zmiq.length; i++){
                if(Zmiq[i][0] === newApple[0] && Zmiq[i][1] === newApple[1]) safe = false;
            }
        }
        apple = newApple;
    }

    function update(){
        if(!isRunning) return;
        let head = Zmiq[0];
        for(let num = 1; num < Zmiq.length; num++){
            if(Zmiq[num][0] === head[0] && Zmiq[num][1] === head[1]){
                isRunning = false;
                return;
            }
        }
        let newHead = [head[0] + direction[0], head[1] + direction[1]];
        if(newHead[0] == 21) newHead[0] = 1;
        if(newHead[0] == 0) newHead[0] = 20;
        if(newHead[1] == 0) newHead[1] = 16;
        if(newHead[1] == 17) newHead[1] = 1;
        Zmiq.unshift(newHead);
        if(newHead[0] == apple[0] && newHead[1] == apple[1]){
            generateApple();
        } else{
            Zmiq.pop(); 
        }   
    }

    function gameDraw(){
        let field_x = field.map(row => row.split(''));
        for(let i = 1; i < Zmiq.length; i++){
            field_x[Zmiq[i][1]][Zmiq[i][0]*2] = "░";
            field_x[Zmiq[i][1]][Zmiq[i][0]*2+1] = "░";
        }
        let hx = Zmiq[0][0], hy = Zmiq[0][1];
        if(field_x[hy]){
            field_x[hy][hx*2] = "█";
            field_x[hy][hx*2+1] = "█";
        }
        field_x[apple[1]][apple[0]*2] = "@";
        field_x[apple[1]][apple[0]*2+1] = "@";
        Print("", output, true);
        for(let i = 0; i < field_x.length; i++) Print(field_x[i].join('') + "<br>");
    }

    function gameOverAnimation(){
        let field_x = field.map(row => row.split(''));
        Print("", output, true);
        glowing = !glowing;
        let char = glowing ? "█" : "░";
        for(let num = 0; num < Zmiq.length; num++){
            field_x[Zmiq[num][1]][Zmiq[num][0]*2] = char;
            field_x[Zmiq[num][1]][Zmiq[num][0]*2+1] = char;
        }
        for(let i = 0; i < field_x.length; i++) Print(field_x[i].join('') + "<br>");
    }
    
    function gameTick() {
        update();
        gameDraw();
        changed = false;
        if(!isRunning){
            clearInterval(intervalId);
            input.disabled = false;
            input_sign.innerHTML = "user:~$";
            setTimeout(() => input.focus(), 10);
            if(!GameOver) GameOver = setInterval(gameOverAnimation, 500);
        }
    }
    let intervalId = setInterval(gameTick, 200);
}