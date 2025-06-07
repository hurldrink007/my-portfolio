const carousel = document.getElementById("carousel");
const projects = document.querySelectorAll(".project");
const total = projects.length;

let currentIndex = 0;

function updateCarousel() {
    projects.forEach((proj, i) => {
        proj.className = "project"; // reset

        if (i === currentIndex) {
            proj.classList.add("center");
        } else if (
            i === (currentIndex + 1) % total ||
            i === (currentIndex - 1 + total) % total
        ) {
            proj.classList.add("visible");
        }
    });

    const shift = (carousel.clientWidth / 2) - projects[currentIndex].offsetLeft - (projects[currentIndex].offsetWidth / 2);
    carousel.style.transform = `translateX(${shift}px)`;
}

document.getElementById("prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + total) % total;
    updateCarousel();
});

document.getElementById("next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % total;
    updateCarousel();
});

window.addEventListener("resize", updateCarousel);

updateCarousel();
