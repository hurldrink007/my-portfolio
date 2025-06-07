const projects = document.querySelectorAll('.project');
let currentIndex = 0;

function updateCarousel() {
    projects.forEach((proj, i) => {
        proj.classList.remove('active');
    });

    projects[currentIndex].classList.add('active');
}

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    updateCarousel();
});

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % projects.length;
    updateCarousel();
});

updateCarousel();
