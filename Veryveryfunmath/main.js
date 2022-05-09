let number1 = document.getElementById("number1");
let number2 = document.getElementById("number2")
let userCalcInput = document.getElementById("user-calc-input")
let checkButton = document.getElementById("check-button")
let userInput = document.getElementById("user-input")

let calculator = document.getElementById("calculator")
let calcInput = document.getElementById("calc-input")
let oneButton = document.getElementById("1-button")
let twoButton = document.getElementById("2-button")

number1.innerHTML = Math.floor(Math.random() * (9-1) + 1)
number2.innerHTML = Math.floor(Math.random() * (9-1) + 1)

checkButton.addEventListener("click", function() {
    if (+userInput.value === +number1.innerHTML * +number2.innerHTML) {
        alert("YOU ARE CORRECT")
        number1.innerHTML = Math.floor(Math.random() * (10-1) + 1)
        number2.innerHTML = Math.floor(Math.random() * (10-1) + 1)
    } else {
        alert("YOU ARE NOT CORRECT")
    }
})



// calculate
function calc(string) {
    string = string.replaceAll("×", "*")
    string = string.replaceAll("÷", "/")
    string = string.replaceAll("sin", "Math.sin")
    string = string.replaceAll("cos", "Math.cos")
    string = string.replaceAll("tan", "Math.tan")

    string = string.replaceAll("sin", "Math.sin")
    
    console.log(string)

    return Function('return ' + string)()
}


document.addEventListener("click", function(event) {
    if (event.target.classList.contains("calc-button")) {
        if (event.target.innerHTML === "ac") {
            userCalcInput.innerHTML = ""
        } else if(event.target.innerHTML === "=") { 
            userCalcInput.innerHTML = calc(userCalcInput.innerHTML)
        } else if(event.target.innerHTML.includes("x")) { 
            
        } else if(event.target.innerHTML === "del") {
            userCalcInput.innerHTML = userCalcInput.innerHTML.slice(0, -1)
            
        } else {
            userCalcInput.innerHTML = userCalcInput.innerHTML + event.target.innerHTML
            if(event.target.classList[1] == "brackets") {
                userCalcInput.innerHTML = userCalcInput.innerHTML + "("
            }
        }
    }
})

let prevposX, prevposY, currentposX, currentposY

function drag(event) {
    currentposX = prevposX - event.clientX;
    currentposY = prevposY - event.clientY
    prevposX = event.clientX;
    prevposY = event.clientY;
    
    calculator.style.top = (calculator.offsetTop - currentposY) + "px"
    calculator.style.left = (calculator.offsetLeft - currentposX) + "px"
}

function stopDrag() {
    document.onmouseup = null
    document.onmousemove = null
}


calculator.onmousedown = function(event) {
    prevposX = event.clientX;
    prevposY = event.clientY;

    if (event.target.tagName !== "BUTTON") {
        document.onmousemove = drag
    }
    
    document.onmouseup = stopDrag
}

