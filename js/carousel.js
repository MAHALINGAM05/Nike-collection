document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-slides');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % dots.length;
        updateCarousel();
    }

    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Auto advance slides
    setInterval(nextSlide, 5000);
});