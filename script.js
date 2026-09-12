/* =====================================================
   JACK ROSHAN PORTFOLIO
   300 FRAME SCROLL ANIMATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       ELEMENTS
    ================================================= */

    const loader = document.getElementById("loader");

    const website = document.getElementById("website");

    const loaderNumber =
        document.getElementById("loaderNumber");

    const loaderProgress =
        document.getElementById("loaderProgress");

    const loaderStatus =
        document.getElementById("loaderStatus");


    /* =================================================
       LOADER - EXACTLY ABOUT 3 SECONDS
    ================================================= */

    function startLoader() {

        const startTime = performance.now();

        const duration = 3000;

        function loaderAnimation(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );

            const percent =
                Math.floor(progress * 100);

            loaderNumber.textContent =
                percent + "%";

            loaderProgress.style.width =
                percent + "%";


            if (progress < 1) {

                requestAnimationFrame(
                    loaderAnimation
                );

            } else {

                loaderNumber.textContent =
                    "100%";

                loaderProgress.style.width =
                    "100%";

                loaderStatus.textContent =
                    "COMPLETE";


                setTimeout(function () {

                    loader.style.transition =
                        "opacity 0.7s ease";

                    loader.style.opacity =
                        "0";

                    loader.style.visibility =
                        "hidden";


                    website.style.transition =
                        "opacity 0.7s ease";

                    website.style.opacity =
                        "1";

                    website.style.visibility =
                        "visible";


                    startPortfolio();

                }, 250);

            }

        }

        requestAnimationFrame(
            loaderAnimation
        );

    }


    /* =================================================
       START LOADER
    ================================================= */

    startLoader();


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuButton =
        document.getElementById("menuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mobileClose =
        document.getElementById("mobileClose");


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            function () {

                mobileMenu.classList.add(
                    "open"
                );

            }
        );

    }


    if (mobileClose) {

        mobileClose.addEventListener(
            "click",
            function () {

                mobileMenu.classList.remove(
                    "open"
                );

            }
        );

    }


    const mobileLinks =
        document.querySelectorAll(
            ".mobile-menu a"
        );


    mobileLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                mobileMenu.classList.remove(
                    "open"
                );

            }
        );

    });


    /* =================================================
       PORTFOLIO
    ================================================= */

    function startPortfolio() {


        const portrait =
            document.getElementById(
                "portraitFrame"
            );


        if (!portrait) {
            return;
        }


        const progressFill =
            document.getElementById(
                "progressFill"
            );


        const progressNumber =
            document.getElementById(
                "progressNumber"
            );


        const stories =
            document.querySelectorAll(
                ".story"
            );


        /* =============================================
           300 FRAMES
        ============================================= */

        const TOTAL_FRAMES = 300;


        /* =============================================
           IMAGE PRELOAD
        ============================================= */

        const frames = [];

        let loadedFrames = 0;


        function framePath(number) {

            const frameNumber =
                String(number).padStart(
                    3,
                    "0"
                );

            /*
              IMPORTANT:

              Images are in GitHub ROOT folder.

              NOT:
              portrait-frames/

              Correct:
              ezgif-frame-001.jpg
            */

            return (
                "ezgif-frame-" +
                frameNumber +
                ".jpg"
            );

        }


        /* =============================================
           PRELOAD IMAGES
        ============================================= */

        for (
            let i = 1;
            i <= TOTAL_FRAMES;
            i++
        ) {

            const img =
                new Image();

            img.src =
                framePath(i);

            frames[i - 1] =
                img;


            img.onload = function () {

                loadedFrames++;

            };


            img.onerror = function () {

                console.warn(
                    "Could not load:",
                    framePath(i)
                );

            };

        }


        /* =============================================
           SHOW FRAME
        ============================================= */

        function showFrame(frameIndex) {

            frameIndex =
                Math.max(
                    0,
                    Math.min(
                        TOTAL_FRAMES - 1,
                        frameIndex
                    )
                );


            const frame =
                frames[frameIndex];


            if (
                frame &&
                frame.complete &&
                frame.naturalWidth > 0
            ) {

                portrait.src =
                    frame.src;

            } else {

                /*
                  If image is still loading,
                  load it directly.
                */

                const img =
                    new Image();

                img.src =
                    framePath(
                        frameIndex + 1
                    );

                img.onload =
                    function () {

                        portrait.src =
                            img.src;

                    };

            }

        }


        /* =============================================
           STORY CHANGE
        ============================================= */

        function updateStory(progress) {


            let storyIndex = 0;


            if (progress < 0.20) {

                storyIndex = 0;

            } else if (progress < 0.40) {

                storyIndex = 1;

            } else if (progress < 0.60) {

                storyIndex = 2;

            } else if (progress < 0.80) {

                storyIndex = 3;

            } else {

                storyIndex = 4;

            }


            stories.forEach(function (
                story,
                index
            ) {

                if (index === storyIndex) {

                    story.classList.add(
                        "active-story"
                    );

                } else {

                    story.classList.remove(
                        "active-story"
                    );

                }

            });

        }


        /* =============================================
           SCROLL ANIMATION
        ============================================= */

        let ticking = false;


        function updateAnimation() {


            const section =
                document.querySelector(
                    ".scroll-experience"
                );


            const rect =
                section.getBoundingClientRect();


            const totalScroll =
                section.offsetHeight -
                window.innerHeight;


            let progress =
                -rect.top /
                totalScroll;


            progress =
                Math.max(
                    0,
                    Math.min(
                        1,
                        progress
                    )
                );


            /* FRAME */

            const frameIndex =
                Math.round(
                    progress *
                    (TOTAL_FRAMES - 1)
                );


            showFrame(
                frameIndex
            );


            /* PERCENTAGE */

            const percent =
                Math.round(
                    progress * 100
                );


            progressFill.style.width =
                percent + "%";


            progressNumber.textContent =
                percent + "%";


            /* STORY */

            updateStory(
                progress
            );


            ticking = false;

        }


        /* =============================================
           SCROLL EVENT
        ============================================= */

        window.addEventListener(
            "scroll",
            function () {

                if (!ticking) {

                    window.requestAnimationFrame(
                        updateAnimation
                    );

                    ticking = true;

                }

            },
            {
                passive: true
            }
        );


        /* =============================================
           INITIAL FRAME
        ============================================= */

        showFrame(0);

        updateAnimation();


        /* =============================================
           PRELOAD STATUS
        ============================================= */

        const preloadChecker =
            setInterval(
                function () {

                    if (
                        loadedFrames >=
                        TOTAL_FRAMES
                    ) {

                        clearInterval(
                            preloadChecker
                        );

                    }

                },
                200
            );


    }


});
