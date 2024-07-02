function calculate() {
    // Mock data using let/const keywords
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const operation = document.getElementById('operation').value;
    let result;

    // Input data validations using conditional statements
    if (num1 === '' && operation !== 'sqrt') {
        alert('Please enter the first number');
        return;
    }

    if ((num2 === '' && operation !== 'sqrt') || (operation !== 'sqrt' && isNaN(num2))) {
        alert('Please enter a valid second number');
        return;
    }

    if (isNaN(num1) && operation !== 'sqrt') {
        alert('Please enter a valid first number');
        return;
    }

    // Convert inputs to numbers
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    // Using switch case to select the type of arithmetic operation
    switch (operation) {
        case 'add':
            result = number1 + number2;
            break;
        case 'subtract':
            result = number1 - number2;
            break;
        case 'multiply':
            result = number1 * number2;
            break;
        case 'divide':
            if (number2 === 0) {
                alert('Division by zero is not allowed');
                return;
            }
            result = number1 / number2;
            break;
        case 'power':
            result = Math.pow(number1, number2);
            break;
        case 'remainder':
            result = number1 % number2;
            break;
        case 'sqrt':
            if (number1 < 0) {
                alert('Square root of negative number is not allowed');
                return;
            }
            result = Math.pow(number2, 1 / number1);
            break;
        default:
            alert('Invalid operation');
            return;
    }

    // Display the result
    document.getElementById('result').innerText = `Result: ${result}`;
}
