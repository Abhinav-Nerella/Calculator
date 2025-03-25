let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerHTML;

        if (value === '=') {
            if (string === "") {
                input.value = "0";  
            } else {
                try {
                    string = Function(`return ${string}`)();
                    input.value = string;
                } catch (error) {
                    input.value = "Error";
                    string = "";
                }
            }
        } 
        else if (value === 'AC') {
            string = "";
            input.value = string;
        } 
        else if (value === 'DEL') {
            string = string.slice(0, -1);
            input.value = string;
            if (string === "") input.value = "0"; 
        } 
        else {
            let lastChar = string.slice(-1);

            if (['+', '-', '*', '/', '%'].includes(value) && ['+', '-', '*', '/', '%'].includes(lastChar)) {
                return;
            }

            if (value === '.' && lastChar === '.') {
                return;
            }
            if (input.value === "0" && !isNaN(value)) {
                string = value;
            } else {
                string += value;
            }

            input.value = string;
        }
    });
});
