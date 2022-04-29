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

function checkForNumbers(string) {
    return /\d/.test(string)
}


document.addEventListener("click", function(event) {
    if (event.target.classList.contains("calc-button")) {
        if (event.target.innerHTML === "ac") {
            userCalcInput.innerHTML = ""
        } else if(event.target.innerHTML === "=") {
            let equation = []
            let currentString = ""
            let input = userCalcInput.innerHTML.split("")
            
            // Divide string into numbers and operators
            for (i=input.length-1; i >= 0; i--) {
                
                if(checkForNumbers(input[i])) {
                    currentString = currentString + input[i]
                } else {
                    if (currentString !== "") {
                        equation.push(currentString, input[i])
                    } else {
                        equation.push(input[i])
                    }
                    currentString = ""
                }
            }
            if (currentString !== "") {
                equation.push(currentString)
                currentString = ""
            }

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
            console.log(String(equation[0]).split("").reverse())
            userCalcInput.innerHTML = String(equation[0]).split("").reverse().join("")
            

        } else {
            userCalcInput.innerHTML = event.target.innerHTML + userCalcInput.innerHTML
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

