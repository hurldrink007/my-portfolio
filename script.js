const projects = document.querySelectorAll('.project');
let currentIndex = 0;

function updateCarousel() {
    projects.forEach((proj, i) => {
        proj.className = 'project';

        if (i === currentIndex) {
            proj.classList.add('active');
        } else if (i === (currentIndex - 1 + projects.length) % projects.length) {
            proj.classList.add('left');
        } else if (i === (currentIndex + 1) % projects.length) {
            proj.classList.add('right');
        } else {
            proj.classList.add('far');
        }
    });
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
