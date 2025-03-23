// Set a fixed price per seat
const seatPrice = 2640000; // Example: Rp 2,640,000 per seat
        
// Function to update the number of seats and total price
function updateSeatSelection() {
    // Get all seat checkboxes
    const checkboxes = document.querySelectorAll('.seat-checkbox');
    
    // Count how many checkboxes are checked
    let selectedSeats = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedSeats++;
        }
    });
    
    // Update the displayed number of seats and price
    const personElement = document.getElementById('person');
    const priceElement = document.getElementById('price');
    
    personElement.textContent = `${selectedSeats} orang`; // Number of people
    priceElement.textContent = `Rp ${(selectedSeats * seatPrice).toLocaleString('id-ID')}`; // Total price
}

// Attach event listeners to all checkboxes
document.querySelectorAll('.seat-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateSeatSelection);
});