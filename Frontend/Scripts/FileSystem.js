import { Print } from "./Stuff.js";

export const vfs = {
    "root": {
        "type": "idk",
        "children": {
            "bin": {
                "type": "folder",
                "children": {}
            },
            "home": {
                "type": "folder",
                "children": {
                    "guest": {
                        "type": "folder",
                        "children": {
                           "readme.txt": {
                                "type": "file",
                                "content": "Hey! Welcome to 80-sys"
                           },
                           "todo.txt": {
                                "type": "file",
                                "content": "1. Finish the vfs for the project \n 2. Make 'cd' and 'ls' commands work on a basic level \n 3. try to fall asleep"
                           },
                           "Legend.txt": {
                                "type": "file",
                                "content": "Смерть стоит того, чтобы жить, а любовь стоит того, чтобы ждать. \n За синие глаза не буду я себе вредить, за синие глаза не буду умирать."
                           }
                        }
                    }
                }
            },
            "sys": {
                "os-info.txt": {
                    "type": "file",
                    "content": "Kernel: 1.87 Version, Stable [ OK ] \n System: 80-sys [ OK ]"
                }
            }
        }
    }
}

export let currentPath = ["root"];

function getFolderByPath(pathArray) {
    let cursor = vfs.root;
    for (const part of pathArray) {
        if (part === "root") continue;
        if (cursor.children && cursor.children[part]) {
            cursor = cursor.children[part];
        } else {
            return null;
        }
    }
    return cursor;
}

export function ls() {
    let cursor = getFolderByPath(currentPath);
    
    if (!cursor || !cursor.children) {
        Print("Error: Cannot list content.");
        return;
    }

    const files = Object.keys(cursor.children);
    if (files.length === 0) {
        Print("(empty directory)");
        return;
    }

    for (const fileName of files) {
        const isDir = cursor.children[fileName].children ? "[DIR] " : "      ";
        Print(isDir + "— " + fileName);
    }
}

export function cd(path) {
    if (!path) return;

    let newPath;
    
    if (path.startsWith("/") || path.startsWith("root")) {
        newPath = ["root"];
        path = path.replace(/^root\/?|^\//, ""); 
    } else {
        newPath = [...currentPath];
    }

    const segments = path.split("/").filter(p => p.length > 0);

    for (const segment of segments) {
        if (segment === "..") {
            if (newPath.length > 1) {
                newPath.pop();
            }
        } else if (segment === ".") {
            continue;
        } else {
            let testFolder = getFolderByPath(newPath);
            if (testFolder && testFolder.children && testFolder.children[segment]) {
                if (testFolder.children[segment].children) {
                    newPath.push(segment);
                } else {
                    Print(`cd: ${segment}: Not a directory`);
                    return;
                }
            } else {
                Print(`cd: ${segment}: No such directory`);
                return;
            }
        }
    }

    currentPath = newPath;
}