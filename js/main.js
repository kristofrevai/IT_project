document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
        });
    }

    const filterSelect = document.getElementById('filter-marka');
    const filterBtn = document.getElementById('filterBtn');
    const carCards = document.querySelectorAll('.car-card');

    if (filterSelect && filterBtn && carCards.length > 0) {
        filterBtn.addEventListener('click', () => {
            const selectedBrand = filterSelect.value;

            carCards.forEach(card => {
                const cardBrand = card.getAttribute('data-brand');

                if (!selectedBrand || selectedBrand === cardBrand) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});
