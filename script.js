let currentIndex = 0;
const projects = document.querySelectorAll('.project');
const total = projects.length;

function updateCarousel() {
    projects.forEach((proj, i) => {
        proj.className = 'project'; // Reset all classes

        const diff = Math.abs(i - currentIndex);

        if (i === currentIndex) {
            proj.classList.add('center');
        } else if (diff === 1 || diff === total - 1) {
            proj.classList.add('near');
        } else if (diff === 2 || diff === total - 2) {
            proj.classList.add('far');
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
