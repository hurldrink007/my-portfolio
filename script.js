let currentIndex = 0;
const projects = document.querySelectorAll('.project');
const total = projects.length;

function updateCarousel() {
    projects.forEach((proj, i) => {
        proj.classList.remove('active');
        if (i === currentIndex) {
            proj.classList.add('active');
        }
    });
}

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + total) % total;
    updateCarousel();
});

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % total;
    updateCarousel();
});

updateCarousel();
