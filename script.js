window.onload = () => {
    const buttons = document.querySelectorAll('.arrow-button');

    // ✅ Add a small delay before enabling buttons to trigger transition
    setTimeout(() => {
        document.getElementById('prev').classList.toggle('enabled', currentIndex !== 0);
        document.getElementById('next').classList.toggle('enabled', currentIndex !== slides.length - 1);
        document.getElementById('forw').classList.add("enabled"); // Always enabled
        document.getElementById('back').classList.toggle("enabled", window.location.pathname !== "/" && !window.location.pathname.includes("index.html"));
    }, 50); // ✅ Delay allows transition to apply smoothly

    const track = document.getElementById('carousel');
    let slides = Array.from(track.children);
    let currentIndex = Math.floor(slides.length / 2); // ✅ Start in the middle
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

        // ✅ Enable the correct buttons with fade-in effect
        setTimeout(() => {
            document.getElementById('prev').classList.toggle('enabled', currentIndex !== 0);
            document.getElementById('next').classList.toggle('enabled', currentIndex !== slides.length - 1);
            document.getElementById('forw').classList.toggle('enabled', true); // Always enabled for navigation
            document.getElementById('back').classList.toggle('enabled', window.location.pathname !== "/" && !window.location.pathname.includes("index.html"));
        }, 200); // ✅ Delay to allow smooth fade-in
    }

    updateCarousel(false);

    function goToNext() {
        if (isTransitioning || currentIndex === slides.length - 1) return;
        isTransitioning = true;
        currentIndex++;
        updateCarousel();
        track.addEventListener('transitionend', () => { isTransitioning = false; }, { once: true });
    }

    function goToPrev() {
        if (isTransitioning || currentIndex === 0) return;
        isTransitioning = true;
        currentIndex--;
        updateCarousel();
        track.addEventListener('transitionend', () => { isTransitioning = false; }, { once: true });
    }

    document.getElementById('prev').addEventListener('click', goToPrev);
    document.getElementById('next').addEventListener('click', goToNext);

    document.getElementById('forw').addEventListener('click', () => {
        const selectedProject = document.querySelector('.project.selected');
        if (selectedProject) {
            const pageURL = selectedProject.getAttribute('data-url');
            if (pageURL) {
                document.body.style.transition = "opacity 0.6s ease-out";
                document.body.style.opacity = "0";
                setTimeout(() => {
                    window.location.href = pageURL;
                }, 600);
            }
        }
    });

    // ✅ Fix Back Button Disable Logic
    const backButton = document.getElementById('back');

    if (backButton) {
        const isHomePage = window.location.pathname === "/" || window.location.pathname.includes("index.html");

        if (isHomePage) {
            backButton.classList.add("disabled");
            backButton.style.pointerEvents = "none"; // ✅ Prevents clicking
        } else {
            backButton.addEventListener("click", () => {
                document.body.style.transition = "opacity 0.6s ease-out";
                document.body.style.opacity = "0";
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 600);
            });
        }
    }
};
