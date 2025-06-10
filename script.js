window.onload = () => {
    const buttons = document.querySelectorAll('.arrow-button');
    const forwardButton = document.getElementById('forw');

    // Start all buttons disabled
    buttons.forEach(button => button.classList.remove('enabled'));
    if (forwardButton) forwardButton.classList.remove('enabled');

    setTimeout(() => {
        const carousel = document.getElementById('carousel');
        if (!carousel) return; // stop if no carousel on this page

        let slides = Array.from(carousel.children);

        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');
        const backBtn = document.getElementById('back');

        if (prevBtn) prevBtn.classList.toggle('enabled', currentIndex > 0);
        if (nextBtn) nextBtn.classList.toggle('enabled', currentIndex < slides.length - 1);
        if (backBtn) backBtn.classList.toggle("enabled", window.location.pathname !== "/" && !window.location.pathname.includes("index.html"));

        const selectedProject = document.querySelector('.project.selected');
        const pageURL = selectedProject ? selectedProject.getAttribute('data-url') : null;
        if (forwardButton) forwardButton.classList.toggle('enabled', !!pageURL);
    }, 50);

    const track = document.getElementById('carousel');
    if (!track) return;

    let slides = Array.from(track.children);
    let currentIndex = Math.floor(slides.length / 2);
    let isTransitioning = false;

    function updateCarousel(animate = true) {
        if (!slides.length) return;

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

            const description = slide.querySelector('.project-description');
            if (description) {
                description.style.opacity = index === currentIndex ? "1" : "0";
            }
        });

        const selectedProject = document.querySelector('.project.selected');
        const pageURL = selectedProject ? selectedProject.getAttribute('data-url') : null;

        if (forwardButton) forwardButton.classList.toggle('enabled', !!pageURL);
    }

    updateCarousel(false);

    function goToNext() {
        if (isTransitioning || currentIndex === slides.length - 1) return;
        isTransitioning = true;
        currentIndex++;
        updateCarousel();
        track.addEventListener('transitionend', () => {
            isTransitioning = false;
            const prevBtn = document.getElementById('prev');
            const nextBtn = document.getElementById('next');
            if (prevBtn) prevBtn.classList.toggle('enabled', currentIndex > 0);
            if (nextBtn) nextBtn.classList.toggle('enabled', currentIndex < slides.length - 1);
        }, { once: true });
    }

    function goToPrev() {
        if (isTransitioning || currentIndex === 0) return;
        isTransitioning = true;
        currentIndex--;
        updateCarousel();
        track.addEventListener('transitionend', () => {
            isTransitioning = false;
            const prevBtn = document.getElementById('prev');
            const nextBtn = document.getElementById('next');
            if (prevBtn) prevBtn.classList.toggle('enabled', currentIndex > 0);
            if (nextBtn) nextBtn.classList.toggle('enabled', currentIndex < slides.length - 1);
        }, { once: true });
    }

    const prevBtn = document.getElementById('prev');
    if (prevBtn) prevBtn.addEventListener('click', goToPrev);

    const nextBtn = document.getElementById('next');
    if (nextBtn) nextBtn.addEventListener('click', goToNext);

    if (forwardButton) {
        forwardButton.addEventListener('click', () => {
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
    }

    const backButton = document.getElementById('back');
    if (backButton) {
        backButton.addEventListener("click", () => {
            console.log("Back button clicked!");
            document.body.style.transition = "opacity 1s ease-out";
            document.body.style.opacity = "0";
            setTimeout(() => {
                const isHomePage = window.location.pathname === "/" || window.location.pathname.endsWith("index.html");
                if (isHomePage && document.body.classList.contains('chaos-active')) {
                    window.location.href = "chaos.html";
                } else {
                    window.location.href = "index.html";
                }
            }, 600);
        });
    }

    const mapButton = document.getElementById('mapButton');
    if (mapButton) {
        mapButton.addEventListener('click', () => {
            const siteMap = document.querySelector('.site-map');
            if (siteMap) siteMap.classList.toggle('visible');
        });
    }

    const contactButton = document.getElementById('contactButton');
    if (contactButton) {
        contactButton.addEventListener('click', () => {
            window.location.href = "contact.html";
        });
    }

    const homeButton = document.getElementById('homeButton');
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            window.location.href = "index.html";
        });
    }

    const chaosButton = document.getElementById('chaosButton');
    const body = document.body;
    if (chaosButton) {
        chaosButton.addEventListener('click', () => {
            const backButton = document.getElementById('back');
            const isHomePage = window.location.pathname === "/" || window.location.pathname.endsWith("index.html");

            if (body.classList.contains('chaos-active')) {
                body.classList.remove('chaos-active');
                body.style.backgroundImage = "none";

                if (isHomePage && backButton) {
                    backButton.classList.remove("enabled");
                    backButton.classList.add("disabled");
                    backButton.style.pointerEvents = "none";
                }
            } else {
                body.classList.add('chaos-active');
                body.style.backgroundImage = "url('images/chaosBackground.gif')";
                body.style.backgroundSize = "cover";
                body.style.backgroundRepeat = "no-repeat";

                if (backButton) {
                    backButton.classList.remove("disabled");
                    backButton.classList.add("enabled");
                    backButton.style.pointerEvents = "auto";
                }
            }
        });
    }

    const songs = [
        { title: "Point Of View (o0o)", src: "songs/pointOfView.mp3", number: 1 },
        { title: "River Symphony", src: "songs/symphony.mp3", number: 2 },
        { title: "Schizo", src: "songs/schizo.mp3", number: 3 },
        { title: "Keeper", src: "songs/keeper.mp3", number: 4 }
    ];

    let currentSongIndex = 0;
    const audioPlayer = document.getElementById("audio-player");
    const songTitle = document.getElementById("song-title");
    const progressBar = document.getElementById("progress-bar");
    const audioOverlay = document.querySelector(".audio-overlay");
    const downloadBtn = document.getElementById("download-btn");

    function updateDownloadLink() {
        const song = songs[currentSongIndex];
        if (downloadBtn) {
            downloadBtn.setAttribute("href", song.src);
            downloadBtn.setAttribute("download", song.title + ".mp3");
        }
    }

    function loadSong(index) {
        if (!audioPlayer || !songTitle || !progressBar || !audioOverlay) return;

        audioPlayer.src = songs[index].src;
        songTitle.textContent = songs[index].title;
        audioPlayer.load();
        audioPlayer.play();

        progressBar.style.width = "0%";

        const songNumber = songs[index].number;
        audioOverlay.src = {
            1: "images/audioOverlay.png",
            2: "images/audioOverlay2.png",
            3: "images/audioOverlay3.png",
            4: "images/audioOverlay4.png"
        }[songNumber] || "images/defaultOverlay.png";

        updateDownloadLink();
    }

    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            const song = songs[currentSongIndex];
            fetch(song.src)
                .then(response => response.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = song.title + ".mp3";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                })
                .catch(error => console.error("Download failed:", error));
        });
    }

    if (audioPlayer && progressBar) {
        audioPlayer.addEventListener("timeupdate", () => {
            if (audioPlayer.duration) {
                const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                progressBar.style.width = percent + "%";
            }
        });
    }

    loadSong(currentSongIndex);

    const playPauseBtn = document.getElementById("play-pause-btn");
    const nextBtnAudio = document.getElementById("next-btn");
    const prevBtnAudio = document.getElementById("prev-btn");

    if (playPauseBtn && audioPlayer) {
        playPauseBtn.addEventListener("click", () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        });
    }

    if (nextBtnAudio) {
        nextBtnAudio.addEventListener("click", () => {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            loadSong(currentSongIndex);
        });
    }

    if (prevBtnAudio) {
        prevBtnAudio.addEventListener("click", () => {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            loadSong(currentSongIndex);
        });
    }
};
