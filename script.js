/* =====================================================
   JACK ROSHAN J PORTFOLIO
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


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

                    mobileMenu.classList.add(
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

            const mobileLinks =
                mobileMenu.querySelectorAll("a");


            mobileLinks.forEach(
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

        let currentFrame = -1;


        /* =================================================
           FIRST FRAME
        ================================================= */

        portrait.src =
            "ezgif-frame-001.jpg";


        /* =================================================
           PRELOAD ALL 300 IMAGES
        ================================================= */

        for (
            let i = 1;
            i <= TOTAL_FRAMES;
            i++
        ) {

            const image =
                new Image();


            const number =
                String(i).padStart(
                    3,
                    "0"
                );


            image.src =
                `ezgif-frame-${number}.jpg`;


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


            /* Don't update the same frame again */

            if (frame === currentFrame) {

                return;

            }


            currentFrame = frame;


            const image =
                frames[frame];


            if (
                image &&
                image.complete &&
                image.naturalWidth > 0
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


            let index = 0;


            /*
                0% - 25%
                Hi, I'm Jack Roshan


                25% - 50%
                Viluppuram, Tamil Nadu


                50% - 75%
                B.Sc. Computer Science


                75% - 100%
                Skills


                100%
                Let's Work Together
            */


            if (progress < 0.25) {

                index = 0;

            }

            else if (progress < 0.50) {

                index = 1;

            }

            else if (progress < 0.75) {

                index = 2;

            }

            else if (progress < 1) {

                index = 3;

            }

            else {

                index = 4;

            }


            textBlocks.forEach(
                function (text, i) {

                    if (i === index) {

                        text.classList.add(
                            "active"
                        );

                    }

                    else {

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


            if (totalDistance <= 0) {

                return;

            }


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


            /* =================================================
               FRAME
               001 → 300
            ================================================= */

            const frame =
                Math.round(
                    progress *
                    (TOTAL_FRAMES - 1)
                );


            showFrame(frame);


            /* =================================================
               TEXT
            ================================================= */

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
           RESIZE
        ================================================= */

        window.addEventListener(
            "resize",
            function () {

                updateScroll();

            }
        );


        /* =================================================
           INITIAL
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

                }

                else {

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
           SIMPLE LOADER
           FOR ABOUT / PROJECT / CONTACT
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
                        (now - start) /
                        duration,
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
                        run
                    );

                }

                else {

                    loader.classList.add(
                        "hide"
                    );


                    website.style.visibility =
                        "visible";


                    website.style.opacity =
                        "1";

                }

            }


            requestAnimationFrame(
                run
            );

        }


    }
);
