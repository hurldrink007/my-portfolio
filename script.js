window.onload = () => {
    const buttons = document.querySelectorAll('.arrow-button');
    const forwardButton = document.getElementById('forw');

    // ✅ Start all buttons disabled
    buttons.forEach(button => button.classList.remove('enabled'));
    forwardButton.classList.remove('enabled');

    setTimeout(() => {
        // ✅ Ensure slides array is defined correctly before checking index
        let slides = Array.from(document.getElementById('carousel').children);

        document.getElementById('prev').classList.toggle('enabled', currentIndex > 0);
        document.getElementById('next').classList.toggle('enabled', currentIndex < slides.length - 1);
        document.getElementById('back').classList.toggle("enabled", window.location.pathname !== "/" && !window.location.pathname.includes("index.html"));

        // ✅ Ensure forward button is enabled only if the selected project has a valid link
        const selectedProject = document.querySelector('.project.selected');
        const pageURL = selectedProject ? selectedProject.getAttribute('data-url') : null;
        forwardButton.classList.toggle('enabled', !!pageURL);
    }, 50);

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

            // ✅ Fade in description only for the selected project
            const description = slide.querySelector('.project-description');
            if (description) {
                description.style.opacity = index === currentIndex ? "1" : "0";
            }
        });

        // ✅ Enable/disable navigation buttons
        const selectedProject = document.querySelector('.project.selected');
        const pageURL = selectedProject ? selectedProject.getAttribute('data-url') : null;
        forwardButton.classList.toggle('enabled', !!pageURL);
    }

    updateCarousel(false);

    function goToNext() {
        if (isTransitioning || currentIndex === slides.length - 1) return;
        isTransitioning = true;
        currentIndex++;
        updateCarousel();
        track.addEventListener('transitionend', () => {
            isTransitioning = false;
            document.getElementById('prev').classList.toggle('enabled', currentIndex > 0);
            document.getElementById('next').classList.toggle('enabled', currentIndex < slides.length - 1);
        }, { once: true });
    }

    function goToPrev() {
        if (isTransitioning || currentIndex === 0) return;
        isTransitioning = true;
        currentIndex--;
        updateCarousel();
        track.addEventListener('transitionend', () => {
            isTransitioning = false;
            document.getElementById('prev').classList.toggle('enabled', currentIndex > 0);
            document.getElementById('next').classList.toggle('enabled', currentIndex < slides.length - 1);
        }, { once: true });
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

    const backButton = document.getElementById('back');

    if (backButton) {
        backButton.addEventListener("click", () => {
            console.log("Back button clicked!"); // ✅ Debugging output

            document.body.style.transition = "opacity 1s ease-out";
            document.body.style.opacity = "0";

            setTimeout(() => {
                const isHomePage = window.location.pathname === "/" || window.location.pathname.endsWith("index.html");

                // ✅ Redirect based on chaos mode state
                if (isHomePage && document.body.classList.contains('chaos-active')) {
                    window.location.href = "chaos.html";
                } else {
                    window.location.href = "index.html";
                }
            }, 600);
        });
    }


    document.getElementById('mapButton').addEventListener('click', () => {
        const siteMap = document.querySelector('.site-map');
        siteMap.classList.toggle('visible');
    });

    document.getElementById('contactButton').addEventListener('click', () => {
        window.location.href = "contact.html";
    });

    document.getElementById('homeButton').addEventListener('click', () => {
        window.location.href = "index.html";
    });

    document.getElementById('chaosButton').addEventListener('click', () => {
        const body = document.body;
        const backButton = document.getElementById('back');
        const isHomePage = window.location.pathname === "/" || window.location.pathname.endsWith("index.html");

        // Toggle Chaos Mode
        if (body.classList.contains('chaos-active')) {
            body.classList.remove('chaos-active');
            body.style.backgroundImage = "none";

            // ❌ Disable back button if on homepage and chaos is now off
            if (isHomePage) {
                backButton.classList.remove("enabled");
                backButton.classList.add("disabled");
                backButton.style.pointerEvents = "none";
            }

        } else {
            body.classList.add('chaos-active');
            body.style.backgroundImage = "url('images/chaosBackground.gif')";
            body.style.backgroundSize = "cover";
            body.style.backgroundRepeat = "no-repeat";

            // ✅ Enable back button while in chaos mode
            backButton.classList.remove("disabled");
            backButton.classList.add("enabled");
            backButton.style.pointerEvents = "auto";
        }
    });

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

    const overlayImages = {
        1: "images/audioOverlay.png",
        2: "images/audioOverlay2.png",
        3: "images/audioOverlay3.png",
        4: "images/audioOverlay4.png"
    };

    const downloadBtn = document.getElementById("download-btn");

    function updateDownloadLink() {
        const song = songs[currentSongIndex];
        downloadBtn.setAttribute("href", song.src);
        downloadBtn.setAttribute("download", song.title + ".mp3"); // Sets correct file name
    }

    // Ensure the download link updates when switching songs
    function loadSong(index) {
        audioPlayer.src = songs[index].src;
        songTitle.textContent = songs[index].title;
        audioPlayer.load();
        audioPlayer.play();

        progressBar.style.width = "0%";

        // ✅ Update the audio overlay image based on song number
        const songNumber = songs[index].number;
        audioOverlay.src = overlayImages[songNumber] || "images/defaultOverlay.png"; // Fallback image

        // ✅ Update download link for the currently playing song
        updateDownloadLink();
    }

    downloadBtn.addEventListener("click", () => {
        const song = songs[currentSongIndex];

        fetch(song.src)
            .then(response => response.blob()) // Convert to Blob
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = song.title + ".mp3"; // Ensure correct filename
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url); // Clean up
            })
            .catch(error => console.error("Download failed:", error));
    });

    // Update progress bar as song plays
    audioPlayer.addEventListener("timeupdate", () => {
        if (audioPlayer.duration) {
            const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = percent + "%";
        }
    });

    // Load First Song Initially
    loadSong(currentSongIndex);

    const playPauseBtn = document.getElementById("play-pause-btn");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");

    // Toggle Play/Pause
    playPauseBtn.addEventListener("click", () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    });

    // Play Next Song
    nextBtn.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
    });

    // Play Previous Song
    prevBtn.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
    });
};
