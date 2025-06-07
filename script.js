const track = document.getElementById('carousel');
const slides = Array.from(track.children);
let currentIndex = 0;

function updateCarousel() {
    const slideWidth = slides[0].offsetWidth;

    // translate track by fixed width * currentIndex (negative to move left)
    track.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

    slides.forEach((slide, index) => {
        slide.classList.remove('prev', 'next', 'selected', 'hidden');

        if (index === currentIndex) {
            slide.classList.add('selected');
        } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
            slide.classList.add('prev');
        } else if (index === (currentIndex + 1) % slides.length) {
            slide.classList.add('next');
        } else {
            slide.classList.add('hidden');
        }
    });
}

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

updateCarousel();
