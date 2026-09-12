document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && closeBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.add("open");
        });

        closeBtn.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
        });

        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
            });

        });
    }


    /* =====================================================
       LOADING SCREEN
       0% → 100% IN 3 SECONDS
    ====================================================== */

    const loader = document.getElementById("loader");
    const website = document.getElementById("website");

    const loaderNumber =
        document.getElementById("loaderNumber");

    const loaderProgress =
        document.getElementById("loaderProgress");

    const loaderStatus =
        document.getElementById("loaderStatus");


    let loadingPercent = 0;

    const loadingInterval = setInterval(() => {

        loadingPercent++;

        if (loaderNumber) {
            loaderNumber.textContent =
                loadingPercent + "%";
        }

        if (loaderProgress) {
            loaderProgress.style.width =
                loadingPercent + "%";
        }

        if (loadingPercent >= 100) {

            clearInterval(loadingInterval);

            if (loaderStatus) {
                loaderStatus.textContent =
                    "COMPLETE";
            }

            setTimeout(() => {

                if (loader) {

                    loader.style.transition =
                        "opacity 0.8s ease";

                    loader.style.opacity = "0";

                    loader.style.visibility =
                        "hidden";
                }

                if (website) {

                    website.style.transition =
                        "opacity 0.8s ease";

                    website.style.opacity = "1";

                    website.style.visibility =
                        "visible";
                }

                startPortfolio();

            }, 250);
        }

    }, 30);
    /*
       100 × 30ms = approximately 3 seconds
    */


    /* =====================================================
       START PORTFOLIO
    ====================================================== */

    function startPortfolio() {

        if (
            typeof gsap === "undefined" ||
            typeof ScrollTrigger === "undefined"
        ) {

            console.error(
                "GSAP or ScrollTrigger is not loaded."
            );

            startPortraitFallback();

            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        initPortraitAnimation();
        initScrollHint();
        initNavigation();

        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    }


    /* =====================================================
       PORTRAIT FRAME ANIMATION
    ====================================================== */

    function initPortraitAnimation() {

        const portrait =
            document.getElementById("portrait3D");

        const portraitFrame =
            document.getElementById("portraitFrame");


        if (!portrait || !portraitFrame) {

            console.error(
                "Portrait elements not found."
            );

            return;
        }


        /* =================================================
           IMPORTANT

           Your GitHub screenshot shows:

           ezgif-frame-001.jpg
           ezgif-frame-002.jpg
           ezgif-frame-003.jpg
           ...
           ezgif-frame-300.jpg

           They are in the ROOT.

           Therefore DO NOT use:

           portrait-frames/

           We use:

           ezgif-frame-001.jpg
        ================================================== */

        const TOTAL_FRAMES = 300;

        const frames = [];

        let currentFrame = -1;


        /* =================================================
           CREATE IMAGE OBJECTS
        ================================================== */

        for (
            let i = 1;
            i <= TOTAL_FRAMES;
            i++
        ) {

            const image = new Image();

            const frameNumber =
                String(i).padStart(3, "0");

            image.src =
                `ezgif-frame-${frameNumber}.jpg`;

            image.loading = "eager";

            frames.push(image);
        }


        /* =================================================
           SHOW FRAME
        ================================================== */

        function showFrame(frameIndex) {

            frameIndex = Math.max(
                0,
                Math.min(
                    TOTAL_FRAMES - 1,
                    frameIndex
                )
            );


            if (frameIndex === currentFrame) {
                return;
            }


            const frame =
                frames[frameIndex];


            if (!frame) {
                return;
            }


            if (
                frame.complete &&
                frame.naturalWidth > 0
            ) {

                portraitFrame.src =
                    frame.src;

                currentFrame =
                    frameIndex;

            } else {

                frame.onload = () => {

                    portraitFrame.src =
                        frame.src;

                    currentFrame =
                        frameIndex;
                };
            }
        }


        /* =================================================
           FIRST IMAGE
        ================================================== */

        showFrame(0);


        /* =================================================
           DO NOT ROTATE WITH CSS

           The JPG itself contains the rotation.
        ================================================== */

        gsap.set(portrait, {

            x: 0,
            y: 0,
            scale: 1,

            rotation: 0,
            rotationX: 0,
            rotationY: 0,

            transformOrigin: "50% 50%"
        });


        /* =================================================
           SCROLL → 300 FRAMES
        ================================================== */

        const animation = {
            frame: 0
        };


        gsap.to(animation, {

            frame: TOTAL_FRAMES - 1,

            ease: "none",

            scrollTrigger: {

                trigger: "#home",

                start: "top top",

                /*
                   Increase this value for slower rotation.
                   Decrease it for faster rotation.
                */

                end: "+=2200",

                scrub: 0.25,

                pin: true,

                anticipatePin: 1,

                invalidateOnRefresh: true,

                onUpdate: self => {

                    const frameIndex =
                        Math.round(
                            self.progress *
                            (TOTAL_FRAMES - 1)
                        );

                    showFrame(frameIndex);
                }
            }
        });
    }


    /* =====================================================
       FALLBACK
    ====================================================== */

    function startPortraitFallback() {

        const portraitFrame =
            document.getElementById("portraitFrame");

        if (portraitFrame) {

            portraitFrame.src =
                "ezgif-frame-001.jpg";
        }
    }


    /* =====================================================
       SCROLL HINT
    ====================================================== */

    function initScrollHint() {

        const scrollHint =
            document.getElementById("scrollHint");

        if (!scrollHint) {
            return;
        }


        gsap.to(scrollHint, {

            opacity: 0,

            y: 20,

            ease: "none",

            scrollTrigger: {

                trigger: "#home",

                start: "top top",

                end: "+=300",

                scrub: true
            }
        });
    }


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    function initNavigation() {

        const sections =
            document.querySelectorAll(
                "section[id]"
            );

        const navLinks =
            document.querySelectorAll(
                ".desktop-nav a"
            );


        function updateActiveNavigation() {

            let current = "";

            const scrollPosition =
                window.scrollY + 180;


            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop;

                const sectionHeight =
                    section.offsetHeight;


                if (
                    scrollPosition >=
                    sectionTop &&

                    scrollPosition <
                    sectionTop +
                    sectionHeight
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );
                }
            });


            navLinks.forEach(link => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute("href") ===
                    "#" + current
                ) {

                    link.classList.add(
                        "active"
                    );
                }
            });
        }


        window.addEventListener(
            "scroll",
            updateActiveNavigation
        );


        updateActiveNavigation();
    }


    /* =====================================================
       WINDOW LOAD
    ====================================================== */

    window.addEventListener("load", () => {

        if (
            typeof ScrollTrigger !== "undefined"
        ) {

            ScrollTrigger.refresh();
        }

    });


    /* =====================================================
       WINDOW RESIZE
    ====================================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {

                if (
                    typeof ScrollTrigger !==
                    "undefined"
                ) {

                    ScrollTrigger.refresh();
                }

            }, 250);

        }
    );

});
