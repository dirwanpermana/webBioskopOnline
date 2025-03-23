document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.querySelector('input[type="file"]');
    const textLabel = document.getElementById('Text-Label');
    const avatarPreview = document.getElementById('Avatar-Preview');
    const deleteButton = document.querySelector('button[type="button"]');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                avatarPreview.src = e.target.result;
                avatarPreview.classList.remove('hidden');
                textLabel.classList.add('hidden');
            };
            reader.readAsDataURL(file);
        } else {
            resetPreview();
        }
    });

    deleteButton.addEventListener('click', () => {
        fileInput.value = '';
        resetPreview();
    });

    function resetPreview() {
        avatarPreview.src = '';
        avatarPreview.classList.add('hidden');
        textLabel.classList.remove('hidden');
    }
});
