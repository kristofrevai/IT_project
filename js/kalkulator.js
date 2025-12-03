document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loanCalculator');
    if (!form) return;

    const priceInput = document.getElementById('carPrice');
    const downPaymentInput = document.getElementById('downPaymentPercent');
    const interestRateInput = document.getElementById('interestRate');
    const termRange = document.getElementById('termMonths');
    const termLabel = document.getElementById('termLabel');
    const insuranceInput = document.getElementById('insurance');
    const resetBtn = document.getElementById('resetCalc');

    const loanAmountSpan = document.getElementById('loanAmount');
    const monthlyPaymentSpan = document.getElementById('monthlyPayment');
    const totalPaymentSpan = document.getElementById('totalPayment');
    const totalInterestSpan = document.getElementById('totalInterest');
    const totalMonthlyWithInsuranceSpan = document.getElementById('totalMonthlyWithInsurance');

    const errorMessages = form.querySelectorAll('.error-message');

    function clearErrors() {
        errorMessages.forEach(e => e.textContent = '');
    }

    termRange.addEventListener('input', () => {
        termLabel.textContent = `${termRange.value} hónap`;
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        clearErrors();

        let isValid = true;

        function setError(input, message) {
            const row = input.closest('.form-row');
            const error = row.querySelector('.error-message');
            error.textContent = message;
            isValid = false;
        }

        const price = Number(priceInput.value);
        const downPercent = Number(downPaymentInput.value);
        const interestYearly = Number(interestRateInput.value);
        const termMonths = Number(termRange.value);
        const insurance = Number(insuranceInput.value || 0);

        if (!price || price <= 0) {
            setError(priceInput, 'Kérjük, add meg az autó vételárát.');
        }
        if (downPercent < 0 || downPercent > 80) {
            setError(downPaymentInput, 'Az önerő 0 és 80% között lehet.');
        }
        if (interestYearly < 0 || interestYearly > 25) {
            setError(interestRateInput, 'A kamatláb 0 és 25% között lehet.');
        }

        if (!isValid) return;

        const downAmount = price * (downPercent / 100);
        const loanAmount = price - downAmount;

        let monthlyPayment;
        let totalPayment;
        let totalInterest;

        if (interestYearly === 0) {
            monthlyPayment = loanAmount / termMonths;
            totalPayment = loanAmount;
            totalInterest = 0;
        } else {
            const r = interestYearly / 100 / 12; // havi kamatláb
            // Annuitás képlet: (K * r) / (1 - (1 + r)^-n)
            monthlyPayment = (loanAmount * r) / (1 - Math.pow(1 + r, -termMonths));
            totalPayment = monthlyPayment * termMonths;
            totalInterest = totalPayment - loanAmount;
        }

        const totalMonthlyWithInsurance = monthlyPayment + insurance;

        function formatHuf(num) {
            return Math.round(num).toLocaleString('hu-HU');
        }

        loanAmountSpan.textContent = formatHuf(loanAmount);
        monthlyPaymentSpan.textContent = formatHuf(monthlyPayment);
        totalPaymentSpan.textContent = formatHuf(totalPayment);
        totalInterestSpan.textContent = formatHuf(totalInterest);
        totalMonthlyWithInsuranceSpan.textContent = formatHuf(totalMonthlyWithInsurance);
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            form.reset();
            termRange.value = 60;
            termLabel.textContent = '60 hónap';
            loanAmountSpan.textContent = '–';
            monthlyPaymentSpan.textContent = '–';
            totalPaymentSpan.textContent = '–';
            totalInterestSpan.textContent = '–';
            totalMonthlyWithInsuranceSpan.textContent = '–';
            clearErrors();
        });
    }
});
