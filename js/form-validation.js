document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const successMessage = document.getElementById('formSuccess');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;
        successMessage.textContent = '';

        function setError(input, message) {
            const row = input.closest('.form-row');
            const error = row.querySelector('.error-message');
            error.textContent = message;
            input.classList.add('invalid');
            isValid = false;
        }

        function clearError(input) {
            const row = input.closest('.form-row');
            const error = row.querySelector('.error-message');
            error.textContent = '';
            input.classList.remove('invalid');
        }

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const ageInput = document.getElementById('age');
        const carSelect = document.getElementById('car');
        const dateInput = document.getElementById('date');
        const messageInput = document.getElementById('message');
        const gdprCheckbox = document.getElementById('gdpr');
        const contactMethodRadios = document.querySelectorAll('input[name="contactMethod"]');

        clearError(nameInput);
        if (nameInput.value.trim().length < 3) {
            setError(nameInput, 'Kérjük, add meg a teljes neved (legalább 3 karakter).');
        }

        clearError(emailInput);
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            setError(emailInput, 'Kérjük, érvényes e-mail címet adj meg.');
        }

        clearError(phoneInput);
        const phoneValue = phoneInput.value.trim();
        if (phoneValue.length < 9) {
            setError(phoneInput, 'Kérjük, érvényes telefonszámot adj meg.');
        }

        clearError(carSelect);
        if (!carSelect.value) {
            setError(carSelect, 'Kérjük, válassz egy autót vagy jelöld, hogy még nem tudod.');
        }

        const contactRow = contactMethodRadios[0].closest('.form-row');
        const contactError = contactRow.querySelector('.error-message');
        contactError.textContent = '';
        let hasContactMethod = false;
        contactMethodRadios.forEach(radio => {
            if (radio.checked) hasContactMethod = true;
        });
        if (!hasContactMethod) {
            contactError.textContent = 'Kérjük, válassz legalább egy kapcsolattartási módot.';
            isValid = false;
        }

        const gdprRow = gdprCheckbox.closest('.form-row');
        const gdprError = gdprRow.querySelector('.error-message');
        gdprError.textContent = '';
        if (!gdprCheckbox.checked) {
            gdprError.textContent = 'Az adatkezelési tájékoztató elfogadása kötelező.';
            isValid = false;
        }

        if (messageInput.value.length > 500) {
            const row = messageInput.closest('.form-row');
            const error = row.querySelector('.error-message');
            error.textContent = 'Az üzenet legfeljebb 500 karakter lehet.';
            isValid = false;
        }

        if (isValid) {
            successMessage.textContent = 'Köszönjük megkeresésed! Hamarosan jelentkezünk.';
            form.reset();
        }
    });
});
