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
        if (backBtn) backBtn.classList.toggle("enabled", !isHomePage());

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

    function isHomePage() {
        const path = window.location.pathname;
        return path === "/" || path.endsWith("/index.html") || path.endsWith("index.html");
    }


    const backButton = document.getElementById('back');
    if (backButton) {
        backButton.addEventListener("click", () => {
            console.log("Back button clicked!");
            document.body.style.transition = "opacity 1s ease-out";
            document.body.style.opacity = "0";
            setTimeout(() => {
                if (isHomePage() && document.body.classList.contains('chaos-active')) {
                    window.location.href = "cortana.html";
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
            const ipodImage = document.querySelector('.ipod'); // Add this line
            const isHomePage = window.location.pathname === "/" || window.location.pathname.endsWith("index.html");

            if (body.classList.contains('chaos-active')) {
                // Turn OFF chaos
                body.classList.remove('chaos-active');
                body.style.backgroundImage = "none";
                songs = normalSongs;
                currentSongIndex = 0;
                loadSong(currentSongIndex);

                if (ipodImage) ipodImage.src = "images/ipod.png"; // Restore normal iPod

                if (isHomePage && backButton) {
                    backButton.classList.remove("enabled");
                    backButton.classList.add("disabled");
                    backButton.style.pointerEvents = "none";
                }
            } else {
                // Turn ON chaos
                body.classList.add('chaos-active');
                body.style.backgroundImage = "url('images/chaosBackground.gif')";
                body.style.backgroundSize = "cover";
                body.style.backgroundRepeat = "no-repeat";
                songs = chaosSongs;
                currentSongIndex = 0;
                loadSong(currentSongIndex);

                if (ipodImage) ipodImage.src = "images/ipod2.png"; // Switch to chaos iPod

                if (backButton) {
                    backButton.classList.remove("disabled");
                    backButton.classList.add("enabled");
                    backButton.style.pointerEvents = "auto";
                }
            }
        });
    }



    const normalSongs = [
        { title: "Point Of View (o0o)", src: "songs/pointOfView.mp3", number: 1 },
        { title: "River Symphony", src: "songs/symphony.mp3", number: 2 },
        { title: "Schizo", src: "songs/schizo.mp3", number: 3 },
        { title: "Keeper", src: "songs/keeper.mp3", number: 4 }
    ];

    const chaosSongs = [
        { title: "Elusin 88.4 Bpm A#m", src: "songs/elusin.mp3", number: 5 }
    ];

    let songs = normalSongs;
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
            4: "images/audioOverlay4.png",
            5: "images/audioOverlay5.png",
            6: "images/audioOverlay6.png",
            7: "images/audioOverlay7.png",
            8: "images/audioOverlay8.png"
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

    if (audioPlayer) {
        audioPlayer.addEventListener("ended", () => {
            if (isLooping) {
                audioPlayer.currentTime = 0;
                audioPlayer.play();
            } else if (isShuffling) {
                let nextIndex;
                do {
                    nextIndex = Math.floor(Math.random() * songs.length);
                } while (songs.length > 1 && nextIndex === currentSongIndex);
                currentSongIndex = nextIndex;
                loadSong(currentSongIndex);
            } else {
                currentSongIndex = (currentSongIndex + 1) % songs.length;
                loadSong(currentSongIndex);
            }
        });
    }

    let isLooping = false;
    let isShuffling = false;

    const shuffleBtn = document.getElementById("shuffle-btn");
    const loopBtn = document.getElementById("loop-btn");

    function updateToggleStyles() {
        if (shuffleBtn) {
            shuffleBtn.classList.toggle("active", isShuffling);
        }
        if (loopBtn) {
            loopBtn.classList.toggle("active", isLooping);
        }
    }

    if (shuffleBtn) {
        shuffleBtn.addEventListener("click", () => {
            isShuffling = !isShuffling;
            if (isShuffling) isLooping = false;
            updateToggleStyles();
        });
    }

    if (loopBtn) {
        loopBtn.addEventListener("click", () => {
            isLooping = !isLooping;
            if (isLooping) isShuffling = false;
            updateToggleStyles();
        });
    }

    const glitchTextContainer = document.getElementById('glitch-text-container');
    const TEXT = '*****';
    const NUM_TEXTS_PER_CASCADE = 150;
    const OFFSET_X = 8;
    const OFFSET_Y = 8;
    const NUM_CASCADES = 3;
    const MIN_DELAY = 10;
    const MAX_DELAY = 100;

    async function spawnTextCascade(xStart, yStart) {
        let currentX = xStart;
        let currentY = yStart;

        for (let i = 0; i < NUM_TEXTS_PER_CASCADE; i++) {
            const div = document.createElement('div');
            div.textContent = TEXT;
            div.classList.add('glitch-text');
            div.style.left = `${currentX}px`;
            div.style.top = `${currentY}px`;
            glitchTextContainer.appendChild(div);

            // 60% chance to stay close, otherwise random jump
            const stayNear = Math.random() < 0.5;
            if (stayNear) {
                currentX += OFFSET_X + (Math.random() * 4 - 2); // Add small variation
                currentY += OFFSET_Y + (Math.random() * 4 - 2);
            } else {
                currentX = Math.random() * (window.innerWidth - 100);
                currentY = Math.random() * (window.innerHeight - 50);
            }

            const delay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    async function startTextGlitch() {
        for (let c = 0; c < NUM_CASCADES; c++) {
            const randX = Math.random() * (window.innerWidth - 100);
            const randY = Math.random() * (window.innerHeight - 50);
            await spawnTextCascade(randX, randY);
        }
    }

    if (document.body.classList.contains('cortana-page')) {
        startTextGlitch();
    }

    const audioElement = document.getElementById('chaos-audio');
    const audioTracks = [
        'sounds/hello.mp3',
        'sounds/imtrapped.mp3',
        'sounds/letmeout.mp3',
        'sounds/myheart.mp3',
        'sounds/neednumbers.mp3',
        'sounds/three.mp3',
        'sounds/three.mp3',
        'sounds/threenumbers.mp3',
        'sounds/mother.mp3',
        'sounds/A.mp3'
    ];

    const cortanaButton = document.getElementById('cortana-button');
    const cortanaImg = document.getElementById('cortana-img');

    const imagePaths = [
        'images/cortanaopen.png',
        'images/cortanaclosed.png',
        'images/cortanaopen2.png',
        'images/cortanaclosed.png',
        'images/cortanaopen3.png'
    ];

    const scareImages = ['images/cortanaScare.png', 'images/cortanaScare2.png'];

    let currentTrackIndex = 0;
    let currentImageIndex = 0;
    let animationInterval = null;
    let scareInterval = null;
    let scareTimeout = null;

    function playVoiceLine() {
        if (!audioElement.paused) {
            audioElement.pause();
            audioElement.currentTime = 0;
        }

        const selectedTrack = audioTracks[currentTrackIndex];
        audioElement.src = selectedTrack;

        // Stop cycling images when audio ends
        audioElement.onended = () => {
            stopCyclingImages();

            // Show input prompt only after threenumbers.mp3
            if (selectedTrack === 'sounds/threenumbers.mp3') {
                showCodeInput();
            }
        };

        if (selectedTrack === 'sounds/A.mp3') {
            cortanaButton.disabled = true;

            audioElement.onloadedmetadata = () => {
                const duration = audioElement.duration;
                const scareStart = duration - 3;

                scareTimeout = setTimeout(() => {
                    stopCyclingImages();
                    startScareFlash();

                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);

                }, scareStart * 1000);
            };
        } else {
            audioElement.onloadedmetadata = null;
        }

        audioElement.play().then(() => {
            startCyclingImages();
        }).catch(err => {
            console.warn('Playback failed:', err);
        });

        currentTrackIndex = (currentTrackIndex + 1) % audioTracks.length;
    }

    function showCodeInput() {
        const container = document.getElementById('code-input-container');
        const input = document.getElementById('code-input');
        const button = document.getElementById('submit-code-btn');

        container.style.display = 'block';
        input.focus();

        button.onclick = () => {
            const value = input.value.trim();
            if (value === '054') {
                window.location.href = 'vault.html';
            } else {
                container.style.display = 'none';

                // Play scare sound
                audioElement.src = 'sounds/scare.mp3';
                audioElement.play().catch(err => {
                    console.warn('Failed to play scare sound:', err);
                });

                startScareFlash();
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        };
    }


    function startCyclingImages() {
        if (animationInterval) clearTimeout(animationInterval);

        function cycleOnce() {
            if (Math.random() < 0.3) {
                currentImageIndex = Math.floor(Math.random() * imagePaths.length);
            } else {
                currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
            }

            cortanaImg.src = imagePaths[currentImageIndex];
            const nextDelay = 10 + Math.random() * 200;
            animationInterval = setTimeout(cycleOnce, nextDelay);
        }

        cycleOnce();
    }

    function stopCyclingImages() {
        clearTimeout(animationInterval);
        animationInterval = null;
        cortanaImg.src = imagePaths[0];
    }

    function startScareFlash() {
        document.body.style.backgroundColor = 'black'; // Make background black

        let index = 0;
        scareInterval = setInterval(() => {
            cortanaImg.src = scareImages[index % scareImages.length];
            index++;
        }, 100); // Switch scare image every 100ms
    }

    cortanaButton.addEventListener('click', () => {
        playVoiceLine();
    });

};
