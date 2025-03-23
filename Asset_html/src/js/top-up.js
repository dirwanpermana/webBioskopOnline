const amountChoosed = document.getElementById('Amount-Choosed');
const radioButtons = document.querySelectorAll('input[name="amount"]');

radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
        // Format the value with dots for thousand separators
        const formattedValue = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        amountChoosed.textContent = 'Rp ' + formattedValue;
    });
});