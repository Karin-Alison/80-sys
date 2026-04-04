//here you write "command": () => "either just a string or num, or call another function, for example "jaba" "
import { startSnakeGenocide } from "./Snake.js";
import { home } from "./Stuff.js";
export const commands = {
    "hello": () => "Heyy",
    "home": () => home(),
    "time": () => "Current Time: " + new Date().toLocaleTimeString(),
    "clear": () => {
        output.innerHTML = ""
        return ""
    },
    "frog": () => "|||FROGGGG SECRET|||",
    "snake": () => startSnakeGenocide()
}