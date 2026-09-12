/* =====================================================
   JACK ROSHAN PORTFOLIO JAVASCRIPT
===================================================== */


/* =====================================================
   LOADER
   EXACTLY ABOUT 3 SECONDS
===================================================== */

const loader = document.getElementById("loader");

const website = document.getElementById("website");

const loaderNumber =
    document.getElementById("loaderNumber");

const loaderProgress =
    document.getElementById("loaderProgress");


let loaderStartTime = performance.now();

const loaderDuration = 3000;


function loaderAnimation(currentTime) {

    const elapsed =
        currentTime - loaderStartTime;


    const progress =
        Math.min(
            elapsed / loaderDuration,
            1
        );


    const percent =
        Math.floor(progress * 100);


    if (loaderNumber) {

        loaderNumber.textContent =
            percent + "%";

    }


    if (loaderProgress) {

        loaderProgress.style.width =
            percent + "%";

    }


    if (progress < 1) {

        requestAnimationFrame(
            loaderAnimation
        );

    } else {

        finishLoader();

    }

}


function finishLoader() {

    if (!loader) return;


    loader.style.transition =
        "opacity 0.8s ease, visibility 0.8s ease";


    loader.style.opacity = "0";

    loader.style.visibility = "hidden";


    if (website) {

        website.style.transition =
            "opacity 0.8s ease";

        website.style.opacity = "1";

    }

}


requestAnimationFrame(
    loaderAnimation
);


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const closeMenu =
    document.getElementById("closeMenu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener(
        "click",
        function () {

            mobileMenu.classList.toggle(
                "open"
            );

        }
    );

}


if (closeMenu && mobileMenu) {

    closeMenu.addEventListener(
        "click",
        function () {

            mobileMenu.classList.remove(
                "open"
            );

        }
    );

}


if (mobileMenu) {

    const links =
        mobileMenu.querySelectorAll("a");


    links.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    mobileMenu.classList.remove(
                        "open"
                    );

                }
            );

        }
    );

}


/* =====================================================
   PORTRAIT SCROLL ANIMATION
===================================================== */

const portrait =
    document.getElementById("portraitFrame");

const scrollSection =
    document.getElementById("home");

const frameCounter =
    document.getElementById("frameNumber");

const textBlocks =
    document.querySelectorAll(".scroll-text");


/* If we are on About / Projects / Contact page,
   there is no portrait animation.
*/

if (
    portrait &&
    scrollSection &&
    textBlocks.length > 0
) {


    /* =================================================
       SETTINGS
    ================================================= */

    const TOTAL_FRAMES = 300;

    const images = [];

    let currentFrame = 0;

    let ticking = false;


    /* =================================================
       PRELOAD ALL 300 FRAMES
    ================================================= */

    for (
        let i = 1;
        i <= TOTAL_FRAMES;
        i++
    ) {

        const image = new Image();

        const number =
            String(i).padStart(3, "0");


        /*
            IMPORTANT:

            Images are in ROOT folder.

            Correct:
            ezgif-frame-001.jpg

            Wrong:
            portrait-frames/ezgif-frame-001.jpg
        */

        image.src =
            `ezgif-frame-${number}.jpg`;


        images.push(image);

    }


    /* =================================================
       SHOW FRAME
    ================================================= */

    function showFrame(frame) {

        frame =
            Math.max(
                0,
                Math.min(
                    TOTAL_FRAMES - 1,
                    frame
                )
            );


        if (frame === currentFrame) {

            return;

        }


        const image =
            images[frame];


        if (image) {

            /*
                Browser uses cached preloaded image
                when available.
            */

            portrait.src =
                image.src;

        }


        if (frameCounter) {

            frameCounter.textContent =
                `FRAME ${String(frame + 1).padStart(3, "0")} / 300`;

        }


        currentFrame =
            frame;

    }


    /* =================================================
       CHANGE TEXT
    ================================================= */

    function changeText(progress) {

        const total =
            textBlocks.length;


        /*
            Example:

            0.00 - 0.166 = Text 01
            0.166 - 0.333 = Text 02
            0.333 - 0.500 = Text 03
            0.500 - 0.666 = Text 04
            0.666 - 0.833 = Text 05
            0.833 - 1.000 = Text 06
        */

        let index =
            Math.floor(
                progress * total
            );


        if (index >= total) {

            index =
                total - 1;

        }


        textBlocks.forEach(
            function (text, i) {

                if (i === index) {

                    text.classList.add(
                        "active"
                    );

                } else {

                    text.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    /* =================================================
       UPDATE SCROLL
    ================================================= */

    function updateScroll() {

        const rect =
            scrollSection.getBoundingClientRect();


        const sectionHeight =
            scrollSection.offsetHeight;


        const viewportHeight =
            window.innerHeight;


        const scrollDistance =
            sectionHeight -
            viewportHeight;


        let progress =
            -rect.top /
            scrollDistance;


        progress =
            Math.max(
                0,
                Math.min(
                    1,
                    progress
                )
            );


        /* =============================================
           FRAME CALCULATION

           Scroll Down:
           001 → 300

           Scroll Up:
           300 → 001
        ============================================= */

        const frame =
            Math.round(
                progress *
                (TOTAL_FRAMES - 1)
            );


        showFrame(frame);


        /* =============================================
           TEXT CALCULATION

           Text changes at same scroll position.
        ============================================= */

        changeText(progress);


        ticking = false;

    }


    /* =================================================
       SCROLL EVENT
    ================================================= */

    window.addEventListener(
        "scroll",
        function () {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateScroll
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );


    /* =================================================
       INITIAL STATE
    ================================================= */

    portrait.src =
        "ezgif-frame-001.jpg";


    if (frameCounter) {

        frameCounter.textContent =
            "FRAME 001 / 300";

    }


    textBlocks.forEach(
        function (text, index) {

            if (index === 0) {

                text.classList.add(
                    "active"
                );

            } else {

                text.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =================================================
       RUN ONCE
    ================================================= */

    updateScroll();

}


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const currentFile =
    window.location.pathname
        .split("/")
        .pop() || "index.html";


const navigationLinks =
    document.querySelectorAll(
        ".desktop-nav a"
    );


navigationLinks.forEach(
    function (link) {

        const href =
            link.getAttribute("href");


        if (
            href &&
            href === currentFile
        ) {

            link.classList.add(
                "active"
            );

        }

    }
);
