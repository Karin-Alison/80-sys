var output = document.getElementById("output");
var input = document.getElementById("input");

input.addEventListener("keyup", ev => {
    if(ev.key === "Enter"){
        output.innerHTML += "<br>" + input.value;
        if(input.value == "frog"){
            output.innerHTML +=  "<br>|||FROGGGG SECRET|||"
        }
        else if(input.value == "clear"){
            output.innerHTML = ""
        }
        else{
            output.innerHTML += '<br> Command "' + input.value + '" not found' 
        }
        input.value = ""

    }
})