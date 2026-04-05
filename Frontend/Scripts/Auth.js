import { Print, Prompt, sleep } from "./Stuff.js";

export async function register() {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    
    const username = await Prompt("ENTER NEW USERNAME:");
    if (!username) return "Registration cancelled.";
    
    if (users[username]) {
        return `ERROR: User '${username}' already exists.`;
    }

    const password = await Prompt("ENTER NEW PASSWORD:");
    if (password.length < 3) {
        return "ERROR: Password must be at least 3 characters.";
    }
    users[username] = { 
        password: password, 
        highScore: 0,
        created: new Date().toLocaleDateString()
    };
    
    localStorage.setItem("users", JSON.stringify(users));
    
    await sleep(500);
    return `SUCCESS: User '${username}' registered. Type 'login' to enter.`;
}
export async function login() {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    
    const username = await Prompt("USERNAME:");
    if (!username) return "Login aborted.";
    
    if (!users[username]) {
        return "ERROR: User not found. Type 'register' to create an account.";
    }
    const password = await Prompt("PASSWORD:");

    if (users[username].password === password){
        sessionStorage.setItem("currentUser", username);
        return `ACCESS GRANTED. Welcome back, ${username}.`;
    } else {
        return "ACCESS DENIED: Invalid password.";
    }
}

export function whoami() {
    const user = sessionStorage.getItem("currentUser");
    if (user) {
        return `Current active session: ${user}`;
    } else {
        return "Currently operating as GUEST. Progress will not be saved.";
    }
}