document.addEventListener('DOMContentLoaded', () => {
    // Add intersection observer for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections
    document.querySelectorAll('main section').forEach(section => {
        observer.observe(section);
    });

    // Add animation delays to cards
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.setProperty('--index', index);
    });

    document.querySelectorAll('.discount-card').forEach((card, index) => {
        card.style.setProperty('--index', index);
    });

    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.setProperty('--index', index);
    });
});