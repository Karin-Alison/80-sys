import { Print } from "./Stuff";

export const vfs = {
    root: {
        type: idk,
        children: {
            bin: {
                type: folder,
                children: {}
            },
            home: {
                type: folder,
                children: {
                    guest: {
                        type: folder,
                        children: {
                           "readme.txt": {
                                type: file,
                                content: "Hey! Welcome to 80-sys"
                           },
                           "todo.txt": {
                                type: file,
                                content: "1. Finish the vfs for the project \n 2. Make 'cd' and 'ls' commands work on a basic level \n 3. try to fall asleep"
                           },
                           "Legend.txt": {
                                type: file,
                                content: "Смерть стоит того, чтобы жить, а любовь стоит того, чтобы ждать. \n За синие глаза не буду я себе вредить, за синие глаза не буду умирать."
                           }
                        }
                    }
                }
            },
            sys: {
                "os-info.txt": {
                    type: file,
                    content: "Kernel: 1.87 Version, Stable [ OK ] \n System: 80-sys [ OK ]"
                }
            }
        }
    }
}

export let currentPath = ["root", "home"];


export function ls(){
    for(const child of vfs.root.home){
        Print(child + "<br>");
    }
}

export function cd(){
    
}