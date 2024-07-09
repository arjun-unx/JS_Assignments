document.addEventListener('DOMContentLoaded', () => {
    // Form validation
    const form = document.getElementById('myForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!this.checkValidity()) {
            showAlert('Please fill out all fields correctly.');
        } else {
            showAlert('Form submitted successfully!');
            this.reset();
        }
    });

    // Counter button logic
    let counter = 0;
    const colors = ['#28a745', '#007BFF', '#FFC107', '#DC3545', '#17A2B8'];
    const counterButton = document.getElementById('counterButton');
    const counterDisplay = document.getElementById('counter');

    counterButton.addEventListener('click', () => {
        counter++;
        counterDisplay.innerText = counter;
        counterButton.style.backgroundColor = colors[counter % colors.length];
    });
});

function showAlert(message) {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.innerText = message;
    alertBox.style.display = 'block';
}

function closeAlert() {
    const alertBox = document.getElementById('customAlert');
    alertBox.style.display = 'none';
}
