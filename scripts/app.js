const btnDecrease = document.querySelector('.btn-decrease');
const btnIncrease = document.querySelector('.btn-increase');
const btnReset = document.querySelector('.btn-reset');
const counter = document.querySelector('.counter');
const keyValue = 'counterValue';
let counterValue = 0;

// Function
function innerValueChanged(value, element) {
    element.innerHTML = value;

     // Change color follow the value
     changeColorBaseValue(value, element);
}

function isNegative(value) {
    return (value < 0) ? true : false;
}

function changeColorBaseValue(value, elm) {
    switch (true) {
        case (value < 0):
            addRemoveClass(elm,'negative', 'positive');
            break;
        case (value == 0):
            elm.className = 'counter';
            break;
        case (value > 0):
            addRemoveClass(elm,'positive', 'negative');
            break;
        default: 
            break;
    }
}

function addRemoveClass(element, classAdd, classRemove) {
    if (typeof classAdd === 'string' && typeof classRemove === 'string') {
        element.classList.remove(classRemove);
        element.classList.add(classAdd);
        return;
    }
    console.error('wrong');
    return;
}

// Events handler

[btnDecrease, btnReset, btnIncrease].forEach(elm => {
    elm.addEventListener('click',(e) => {
        // Determine the action is it decrease || increase || reset
        let typeAction = e.target.innerText.toLowerCase();

        // Compute value base on the type of action
        switch (typeAction) {
            case "decrease":
                counterValue--;
            break;
            case "reset":
                counterValue = 0;
            break;
            case "increase":
                counterValue++;
            break;
        }

        // Change value on UI
        innerValueChanged(counterValue, counter);

        // Update localStorage value
        window.localStorage.setItem(keyValue,counterValue);
    })
});

window.onload = function() {
    let value = window.localStorage.getItem(keyValue);
    
    if (!value) {
        value = 0;
        window.localStorage.setItem(keyValue,value);
    }

    counterValue = value;
    innerValueChanged(value, counter);
}