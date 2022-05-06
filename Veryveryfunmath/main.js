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


// Divide string into numbers and operator
function separateNumbers(string) {
    let equation = []
    console.log(string.lastIndexOf(string.match(/\(([^)]+)\)/g)))
    console.log(string.match(/\(([^)]+)\)/g))
    
    equation = string.match(/[a-zA-Z]+|[()]+|[.0-9]+|[+-×÷]/g)
   
    console.log(equation)
    return equation
}


let superscript = false

document.addEventListener("click", function(event) {
    
    if (event.target.classList.contains("calc-button")) {
        if (event.target.innerHTML === "ac") {
            userCalcInput.innerHTML = ""
            superscript = false
        } else if(event.target.innerHTML === "=") {
            
            let equation = separateNumbers(userCalcInput.innerHTML)

            // calculate */
            for (i=0; i <= equation.length-1; i ++) {

                if (equation[i] === "×") {
                    newNum = +equation[i-1] * +equation[i+1]
                    equation.splice(i-1, 3, newNum)
                    i -= 2

                } else if (equation[i] ==="÷") {
                    newNum = +equation[i-1] / +equation[i+1]
                    equation.splice(i-1, 3, newNum)
                    i -= 2
                }
            }
            // calculate +-
            for (i=0; i <= equation.length-1; i ++) {

                if (equation[i] === "+") {
                    newNum = +equation[i-1] + +equation[i+1]
                    equation.splice(i-1, 3, newNum)
                    i -= 2

                } else if (equation[i] ==="-") {
                    newNum = +equation[i-1] - +equation[i+1]
                    equation.splice(i-1, 3, newNum)
                    i -= 2
                }
            }
            userCalcInput.innerHTML = equation
            superscript = false
        } else if(event.target.innerHTML.includes("x")) { 
            if (event.target.innerHTML !== "" && !superscript) {
                superscript = true
            }
        } else if(event.target.innerHTML === "del") {
            let input = userCalcInput.innerHTML.split("")
            console.log(input)
            // userCalcInput.innerHTML = userCalcInput.innerHTML.slice(0, -1)
            
        } else {
            if (superscript && checkForNumbers(event.target.innerHTML)) {          
                userCalcInput.innerHTML = userCalcInput.innerHTML + "<sup>" + event.target.innerHTML
            } else {
                superscript = false
                userCalcInput.innerHTML = userCalcInput.innerHTML + event.target.innerHTML
                if(event.target.classList[1] == "brackets") {
                    userCalcInput.innerHTML = userCalcInput.innerHTML + "("
                }
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

