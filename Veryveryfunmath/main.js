// Math thing 

// Global Variables
let number1 = document.getElementById("number1");
let number2 = document.getElementById("number2")
let userCalcInput = document.getElementById("user-calc-input")
let checkButton = document.getElementById("check-button")
let userInput = document.getElementById("user-input")
let pastUserInput = document.getElementById("past-user-calc-input")

let calculator = document.getElementById("calculator")
let calcInput = document.getElementById("calc-input")
let oneButton = document.getElementById("1-button")
let twoButton = document.getElementById("2-button")

let ans

// create random question
number1.innerHTML = Math.floor(Math.random() * (9-1) + 1)
number2.innerHTML = Math.floor(Math.random() * (9-1) + 1)

// check anwser
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
    string = string.replaceAll("×", "*").replaceAll("÷", "/")
    string = string.replaceAll("√", "Math.sqrt").replaceAll("^", "**")
    string = string.replaceAll("sin(", "Math.sin(") // Radian mode can't figure out how to do degree mode
    string = string.replaceAll("cos(", "Math.cos(")
    string = string.replaceAll("tan(", "Math.tan(")
    string = string.replaceAll("sin<sup>-1</sup>(", "Math.asin(")
    string = string.replaceAll("cos<sup>-1</sup>(", "Math.acos(")
    string = string.replaceAll("tan<sup>-1</sup>(", "Math.atan(")
    string = string.replaceAll("ans", ans)

    try {Function('return ' + string)
        return Function('return ' + string)()
    } catch(error) {
        return false
    }   
}

let clear

//calculator button pressed
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("calc-button")) {
        // clear calc
        if (event.target.innerHTML === "ac") {
            userCalcInput.innerHTML = ""
            
            while (pastUserInput.firstChild) {
                pastUserInput.removeChild(pastUserInput.firstChild)
            }
            
        // calc input
        } else if(event.target.innerHTML === "=") { 
            if (userCalcInput.innerHTML.split("(").length - 1 !== userCalcInput.innerHTML.split(")").length - 1) {
                for (i = 0; i <= (userCalcInput.innerHTML.split("(").length - 1) - (userCalcInput.innerHTML.split(")").length - 1); i++) {
                    userCalcInput.innerHTML = userCalcInput.innerHTML + ")"
                }
            }
        
            let answer = calc(userCalcInput.innerHTML)

            if (answer) {
                let prevEquation = document.createElement("p")
                prevEquation.classList.add("history")
                prevEquation.innerHTML = userCalcInput.innerHTML + " = " + answer

                pastUserInput.prepend(prevEquation)
                userCalcInput.innerHTML = answer

                ans = answer
            } else {
                userCalcInput.innerHTML = "error"
            }
        
        // exponent, originally wanted to used subscript but gave up ;(
        } else if(event.target.innerHTML.includes("x")) { 
            userCalcInput.innerHTML = userCalcInput.innerHTML + "^("

        // delete (sort of works)
        } else if(event.target.innerHTML === "del") {
            userCalcInput.innerHTML = userCalcInput.innerHTML.slice(0, -1)
        
        // any other button
        } else {
           userCalcInput.innerHTML = userCalcInput.innerHTML + event.target.innerHTML
            
            if(event.target.classList[1] == "brackets") {
                userCalcInput.innerHTML = userCalcInput.innerHTML + "("
            }
        }
    }
})


// Make calculator draggable 
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

