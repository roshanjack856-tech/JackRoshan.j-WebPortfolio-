document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADING SCREEN
       0% → 100% in exactly 3 seconds
    ====================================================== */

    const loader = document.getElementById("loader");
    const percentage = document.getElementById("percentage");
    const loaderProgress =
        document.getElementById("loaderProgress");

    document.body.classList.add("loading");

    const LOADER_TIME = 3000;

    const startTime = performance.now();


    function updateLoader(currentTime) {

        const elapsed = currentTime - startTime;

        let progress =
            (elapsed / LOADER_TIME) * 100;

        progress = Math.min(100, progress);

        const roundedProgress =
            Math.floor(progress);

        if (percentage) {
            percentage.textContent =
                roundedProgress;
        }

        if (loaderProgress) {
            loaderProgress.style.width =
                progress + "%";
        }

        if (progress < 100) {

            requestAnimationFrame(updateLoader);

        } else {

            if (percentage) {
                percentage.textContent = "100";
            }

            if (loaderProgress) {
                loaderProgress.style.width = "100%";
            }

            /*
                Give the user a small moment
                to see 100%.
            */

            setTimeout(() => {

                if (loader) {
                    loader.classList.add("finished");
                }

                document.body.classList.remove("loading");

            }, 150);

        }
    }


    requestAnimationFrame(updateLoader);



    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const closeBtn =
        document.getElementById("closeBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (
        menuBtn &&
        closeBtn &&
        mobileMenu
    ) {

        menuBtn.addEventListener(
            "click",
            () => {

                mobileMenu.classList.add("open");

            }
        );


        closeBtn.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove("open");

            }
        );


        const mobileLinks =
            mobileMenu.querySelectorAll("a");


        mobileLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "open"
                    );

                }
            );

        });

    }



    /* =====================================================
       300 FRAME PORTRAIT ANIMATION
    ====================================================== */

    const portrait =
        document.getElementById("portrait3D");

    const portraitFrame =
        document.getElementById("portraitFrame");


    if (
        !portrait ||
        !portraitFrame
    ) {

        console.error(
            "Portrait elements not found."
        );

        return;

    }


    /*
       IMPORTANT:

       Your GitHub structure must be:

       portfolio/
       │
       ├── index.html
       ├── style.css
       ├── script.js
       │
       └── portrait-frames/
           ├── ezgif-frame-001.jpg
           ├── ezgif-frame-002.jpg
           ├── ezgif-frame-003.jpg
           ├── ...
           └── ezgif-frame-300.jpg
    */


    const TOTAL_FRAMES = 300;

    const FRAME_FOLDER =
        "portrait-frames";


    const frames = [];

    let currentFrame = -1;


    /* =====================================================
       PRELOAD 300 IMAGES
    ====================================================== */

    for (
        let i = 1;
        i <= TOTAL_FRAMES;
        i++
    ) {

        const image =
            new Image();

        const frameNumber =
            String(i).padStart(3, "0");


        image.src =
            `${FRAME_FOLDER}/ezgif-frame-${frameNumber}.jpg`;


        frames.push(image);

    }



    /* =====================================================
       SHOW FRAME
    ====================================================== */

    function showFrame(frameIndex) {

        frameIndex = Math.max(
            0,
            Math.min(
                TOTAL_FRAMES - 1,
                frameIndex
            )
        );


        if (
            frameIndex === currentFrame
        ) {

            return;

        }


        const frame =
            frames[frameIndex];


        if (!frame) {
            return;
        }


        /*
           If image already loaded,
           show it immediately.
        */

        if (
            frame.complete &&
            frame.naturalWidth > 0
        ) {

            portraitFrame.src =
                frame.src;

            currentFrame =
                frameIndex;

        } else {

            /*
               Wait until this frame loads.
            */

            frame.onload = () => {

                /*
                   Only change the image if
                   this is still the requested frame.
                */

                if (
                    frameIndex !== currentFrame
                ) {

                    portraitFrame.src =
                        frame.src;

                    currentFrame =
                        frameIndex;

                }

            };

        }

    }



    /* =====================================================
       FIRST FRAME
    ====================================================== */

    showFrame(0);



    /* =====================================================
       HERO SCROLL → 300 FRAMES
    ====================================================== */

    const hero =
        document.getElementById("home");


    if (!hero) {
        return;
    }


    function updatePortraitFromScroll() {

        const rect =
            hero.getBoundingClientRect();


        const heroHeight =
            hero.offsetHeight;


        /*
           Hero has 230vh height.

           Sticky content stays on screen.

           We calculate how far the user has
           travelled through the hero section.
        */

        const scrollDistance =
            heroHeight - window.innerHeight;


        if (scrollDistance <= 0) {
            return;
        }


        /*
           rect.top starts at 0.

           As user scrolls down:

           rect.top becomes negative.

           Example:

           0
           -100
           -500
           -1000
        */

        let progress =
            (-rect.top) /
            scrollDistance;


        progress = Math.max(
            0,
            Math.min(1, progress)
        );


        /*
           Convert 0 → 1
           into
           0 → 299
        */

        const frameIndex =
            Math.round(
                progress *
                (TOTAL_FRAMES - 1)
            );


        showFrame(frameIndex);


        /*
           Hide scroll hint after user starts scrolling.
        */

        const scrollHint =
            document.getElementById(
                "scrollHint"
            );


        if (scrollHint) {

            if (progress > 0.04) {

                scrollHint.style.opacity =
                    "0";

            } else {

                scrollHint.style.opacity =
                    "1";

            }

        }

    }



    /* =====================================================
       SCROLL EVENT
    ====================================================== */

    let ticking = false;


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    () => {

                        updatePortraitFromScroll();

                        updateActiveNavigation();

                        ticking = false;

                    }
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );



    /* =====================================================
       MOUSE WHEEL SUPPORT
    ====================================================== */

    /*
       Normal browser scrolling controls
       the frame animation.

       DOWN:

       001
       002
       003
       ...
       150
       ...
       300


       UP:

       300
       299
       298
       ...
       150
       ...
       001
    */


    window.addEventListener(
        "wheel",
        () => {

            /*
               Let normal browser scrolling happen.
               The scroll event above updates frames.
            */

            updatePortraitFromScroll();

        },
        {
            passive: true
        }
    );



    /* =====================================================
       TOUCH / MOBILE SUPPORT
    ====================================================== */

    let touchStartY = 0;


    window.addEventListener(
        "touchstart",
        (event) => {

            if (
                event.touches &&
                event.touches.length > 0
            ) {

                touchStartY =
                    event.touches[0].clientY;

            }

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchmove",
        () => {

            updatePortraitFromScroll();

        },
        {
            passive: true
        }
    );



    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

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
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
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



    /* =====================================================
       INITIAL UPDATE
    ====================================================== */

    updateActiveNavigation();

    updatePortraitFromScroll();



    /* =====================================================
       RESIZE
    ====================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(() => {

                    updatePortraitFromScroll();

                    updateActiveNavigation();

                }, 150);

        }
    );



    /* =====================================================
       IMAGE ERROR CHECK
    ====================================================== */

    portraitFrame.addEventListener(
        "error",
        () => {

            console.error(
                "Could not load portrait image:"
            );

            console.error(
                portraitFrame.src
            );

        }
    );


    /* =====================================================
       DEBUG MESSAGE
    ====================================================== */

    console.log(
        "Jack Roshan Portfolio loaded."
    );

    console.log(
        "300 portrait frames are being preloaded."
    );

    console.log(
        "Frame path: portrait-frames/ezgif-frame-001.jpg"
    );

});
