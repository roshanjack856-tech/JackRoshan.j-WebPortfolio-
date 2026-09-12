/* =========================================
   JACK ROSHAN PORTFOLIO
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   LOADER
========================================= */

const loader = document.getElementById("loader");
const website = document.getElementById("website");
const loaderNumber = document.getElementById("loaderNumber");
const loaderProgress = document.getElementById("loaderProgress");

let loaderStart = performance.now();

const loaderDuration = 3000;


function runLoader(currentTime) {

    const elapsed = currentTime - loaderStart;

    const progress = Math.min(
        elapsed / loaderDuration,
        1
    );

    const percent = Math.floor(progress * 100);

    if (loaderNumber) {
        loaderNumber.textContent = percent + "%";
    }

    if (loaderProgress) {
        loaderProgress.style.width = percent + "%";
    }

    if (progress < 1) {

        requestAnimationFrame(runLoader);

    } else {

        finishLoader();

    }

}


function finishLoader() {

    if (!loader) return;

    loader.style.transition =
        "opacity 0.7s ease, visibility 0.7s ease";

    loader.style.opacity = "0";

    loader.style.visibility = "hidden";

    if (website) {

        website.style.transition =
            "opacity 0.7s ease";

        website.style.opacity = "1";

    }

    startPortfolio();

}


requestAnimationFrame(runLoader);


/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle("open");

        }
    );


    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove("open");

            }
        );

    });

}


/* =========================================
   PORTFOLIO
========================================= */

function startPortfolio() {

    const portrait =
        document.getElementById("portraitFrame");

    const scene =
        document.getElementById("home");

    const frameNumber =
        document.getElementById("frameNumber");

    const textBlocks =
        document.querySelectorAll(".scene-text");


    /*
        If this is About / Project / Contact page,
        there is no portrait scene.
    */

    if (!portrait || !scene) {

        return;

    }


    /* =====================================
       FRAME SETTINGS
    ===================================== */

    const TOTAL_FRAMES = 300;

    const frameImages = [];

    let currentFrame = 0;


    /* =====================================
       CREATE IMAGE OBJECTS
    ===================================== */

    for (let i = 1; i <= TOTAL_FRAMES; i++) {

        const img = new Image();

        const number =
            String(i).padStart(3, "0");

        img.src =
            `ezgif-frame-${number}.jpg`;

        frameImages.push(img);

    }


    /* =====================================
       SHOW FRAME
    ===================================== */

    function showFrame(frame) {

        frame =
            Math.max(
                0,
                Math.min(
                    TOTAL_FRAMES - 1,
                    frame
                )
            );


        const img =
            frameImages[frame];


        if (img && img.complete) {

            portrait.src = img.src;

        }


        if (frameNumber) {

            frameNumber.textContent =
                `${String(frame + 1).padStart(3, "0")} / 300`;

        }

        currentFrame = frame;

    }


    /* =====================================
       TEXT STEP
    ===================================== */

    function updateText(progress) {

        const totalSteps =
            textBlocks.length;


        if (!totalSteps) return;


        let step =
            Math.floor(
                progress * totalSteps
            );


        if (step >= totalSteps) {

            step = totalSteps - 1;

        }


        textBlocks.forEach(
            (block, index) => {

                if (index === step) {

                    block.classList.add("active");

                } else {

                    block.classList.remove("active");

                }

            }
        );

    }


    /* =====================================
       SCROLL CONTROL
    ===================================== */

    let ticking = false;


    function updateScroll() {

        const rect =
            scene.getBoundingClientRect();


        const sceneHeight =
            scene.offsetHeight;


        const viewportHeight =
            window.innerHeight;


        const scrollDistance =
            sceneHeight - viewportHeight;


        let progress =
            -rect.top / scrollDistance;


        progress =
            Math.max(
                0,
                Math.min(
                    1,
                    progress
                )
            );


        /*

        SCROLL DOWN:

        Frame 1
           ↓
        Frame 300


        SCROLL UP:

        Frame 300
           ↓
        Frame 1

        */

        const frame =
            Math.round(
                progress *
                (TOTAL_FRAMES - 1)
            );


        if (frame !== currentFrame) {

            showFrame(frame);

        }


        /* Text changes at same time */

        updateText(progress);


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

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


    /* =====================================
       INITIAL FRAME
    ===================================== */

    showFrame(0);

    updateText(0);


    /* =====================================
       PRELOAD PROGRESS
    ===================================== */

    let loaded = 0;


    frameImages.forEach(img => {

        if (img.complete) {

            loaded++;

        } else {

            img.addEventListener(
                "load",
                () => {

                    loaded++;

                },
                {
                    once: true
                }
            );

        }

    });

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const currentPage =
    window.location.pathname
        .split("/")
        .pop() || "index.html";


const navLinks =
    document.querySelectorAll(
        ".desktop-nav a"
    );


navLinks.forEach(link => {

    const href =
        link.getAttribute("href");


    if (
        href &&
        href.endsWith(currentPage)
    ) {

        link.classList.add("active");

    }

});
