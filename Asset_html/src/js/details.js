const swiper2 = new Swiper('.swiper-tabs', {
    slidesOffsetAfter: 20,
    slidesOffsetBefore: 20,
    spaceBetween: 12,
    slidesPerView: "auto",
});
const swiper3 = new Swiper('.swiper-bonus', {
    slidesOffsetAfter: 20,
    slidesOffsetBefore: 20,
    spaceBetween: 16,
    slidesPerView: "auto",
});

// Get all tab buttons
const tabLinks = document.querySelectorAll('.tab-link');

// Add click event listener to each button
tabLinks.forEach(button => {
    button.addEventListener('click', () => {
        // Get the target tab id from the data attribute
        const targetTab = button.getAttribute('data-target-tab');

        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });

        // Remove active state from all buttons
        tabLinks.forEach(btn => {
            btn.querySelector('div').classList.remove('!bg-white', '!text-premiere-black');
        });

        // Show the target tab content
        document.querySelector(targetTab).classList.remove('hidden');

        // Add active state to the clicked button
        button.querySelector('div').classList.add('!bg-white', '!text-premiere-black');
    });
});