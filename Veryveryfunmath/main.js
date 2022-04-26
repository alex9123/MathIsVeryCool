let number1 = document.getElementById("number1");
let number2 = document.getElementById("number2")
let userCalcInput = document.getElementById("user-calc-input")
let checkButton = document.getElementById("check-button")

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

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("calc-button")) {
        userCalcInput.innerHTML = event.target.innerHTML + userCalcInput.innerHTML
    }
})


