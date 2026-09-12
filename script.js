/* =====================================================
   JACK ROSHAN J PORTFOLIO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       ELEMENTS
    ================================================= */

    const loader =
        document.getElementById("loader");

    const website =
        document.getElementById("website");

    const loaderNumber =
        document.getElementById("loaderNumber");

    const loaderProgress =
        document.getElementById("loaderProgress");

    const portrait =
        document.getElementById("portraitFrame");

    const frameCounter =
        document.getElementById("frameCounter");

    const scrollScene =
        document.querySelector(".scroll-scene");

    const textBlocks =
        document.querySelectorAll(".scene-text");

    const menuButton =
        document.getElementById("menuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const closeMenu =
        document.getElementById("closeMenu");


    /* =================================================
       MOBILE MENU
    ================================================= */

    if (menuButton && mobileMenu) {

        menuButton.addEventListener(
            "click",
            function () {

                mobileMenu.classList.add("open");

            }
        );

    }


    if (closeMenu && mobileMenu) {

        closeMenu.addEventListener(
            "click",
            function () {

                mobileMenu.classList.remove("open");

            }
        );

    }


    if (mobileMenu) {

        const mobileLinks =
            mobileMenu.querySelectorAll("a");

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

    }


    /* =================================================
       HOME PAGE CHECK
    ================================================= */

    if (!portrait || !scrollScene) {

        startSimpleLoader();

        return;

    }


    /* =================================================
       300 FRAMES
    ================================================= */

    const TOTAL_FRAMES = 300;

    const frames = [];

    let loadedFrames = 0;


    /* First image */

    portrait.src =
        "ezgif-frame-001.jpg";


    /* Preload all 300 images */

    for (
        let i = 1;
        i <= TOTAL_FRAMES;
        i++
    ) {

        const image =
            new Image();


        const number =
            String(i).padStart(3, "0");


        image.src =
            `ezgif-frame-${number}.jpg`;


        image.onload = function () {

            loadedFrames++;

        };


        frames.push(image);

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


        const image =
            frames[frame];


        if (
            image &&
            image.complete
        ) {

            portrait.src =
                image.src;

        }


        if (frameCounter) {

            frameCounter.textContent =
                `FRAME ${String(frame + 1).padStart(3, "0")} / 300`;

        }

    }


    /* =================================================
       CHANGE TEXT
    ================================================= */

    function updateText(progress) {

        if (!textBlocks.length) {

            return;

        }


        const total =
            textBlocks.length;


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
       SCROLL ANIMATION
    ================================================= */

    let ticking = false;


    function updateScroll() {

        const rect =
            scrollScene.getBoundingClientRect();


        const totalDistance =
            scrollScene.offsetHeight -
            window.innerHeight;


        let progress =
            -rect.top /
            totalDistance;


        progress =
            Math.max(
                0,
                Math.min(
                    1,
                    progress
                )
            );


        /* 001 → 300 */

        const frame =
            Math.round(
                progress *
                (TOTAL_FRAMES - 1)
            );


        showFrame(frame);


        /* Text changes with frame */

        updateText(progress);


        ticking = false;

    }


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
       INITIAL FRAME
    ================================================= */

    showFrame(0);

    updateText(0);


    /* =================================================
       LOADER
       EXACTLY ABOUT 3 SECONDS
    ================================================= */

    startLoader();


    function startLoader() {

        const start =
            performance.now();

        const duration =
            3000;


        function animateLoader(now) {

            const elapsed =
                now - start;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const percent =
                Math.floor(
                    progress * 100
                );


            if (loaderNumber) {

                loaderNumber.textContent =
                    `${percent}%`;

            }


            if (loaderProgress) {

                loaderProgress.style.width =
                    `${percent}%`;

            }


            if (progress < 1) {

                requestAnimationFrame(
                    animateLoader
                );

            } else {

                finishLoader();

            }

        }


        requestAnimationFrame(
            animateLoader
        );

    }


    /* =================================================
       FINISH LOADER
    ================================================= */

    function finishLoader() {

        if (!loader || !website) {

            return;

        }


        loader.classList.add(
            "hide"
        );


        website.style.visibility =
            "visible";

        website.style.opacity =
            "1";


        setTimeout(
            function () {

                loader.style.display =
                    "none";

            },
            800
        );

    }


    /* =================================================
       SIMPLE LOADER FOR OTHER PAGES
    ================================================= */

    function startSimpleLoader() {

        if (!loader || !website) {

            return;

        }


        const start =
            performance.now();

        const duration =
            1800;


        function run(now) {

            const progress =
                Math.min(
                    (now - start) / duration,
                    1
                );


            const percent =
                Math.floor(
                    progress * 100
                );


            if (loaderNumber) {

                loaderNumber.textContent =
                    `${percent}%`;

            }


            if (loaderProgress) {

                loaderProgress.style.width =
                    `${percent}%`;

            }


            if (progress < 1) {

                requestAnimationFrame(run);

            } else {

                loader.classList.add(
                    "hide"
                );

                website.style.visibility =
                    "visible";

                website.style.opacity =
                    "1";

            }

        }


        requestAnimationFrame(run);

    }


});
