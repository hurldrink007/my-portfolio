window.onload = () => {
    const track = document.getElementById('carousel');
    let slides = Array.from(track.children);

    slides = Array.from(track.children); // Re-fetch with clones
    let currentIndex = 0;
    let isTransitioning = false;

    function updateCarousel(animate = true) {
        const slideWidth = slides[0].offsetWidth;
        track.style.transition = animate ? 'transform 0.6s ease-in-out' : 'none';
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

    function goToNext() {
        if (isTransitioning || currentIndex === slides.length - 1) return;
        isTransitioning = true;
        currentIndex++;
        updateCarousel();

        track.addEventListener('transitionend', onTransitionEndNext, { once: true });
    }

    function onTransitionEndNext() {
        isTransitioning = false;
    }

    function goToPrev() {
        if (isTransitioning || currentIndex === 0) return;
        isTransitioning = true;
        currentIndex--;
        updateCarousel();

        track.addEventListener('transitionend', onTransitionEndPrev, { once: true });
    }

    function onTransitionEndPrev() {
        isTransitioning = false;
    }


    document.getElementById('prev').addEventListener('click', goToPrev);
    document.getElementById('next').addEventListener('click', goToNext);

    // Initial scroll to the real first slide (index 1)
    updateCarousel(false);

    const buttons = document.querySelectorAll('.cheat-button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('pressed'));
            button.classList.add('pressed');
        });
    });

};
