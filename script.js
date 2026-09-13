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

    const mobOverlay =
        document.getElementById("mobOverlay");

    const mobCtaLink =
        document.getElementById("mobCtaLink");


    /* =================================================
       AFTER-SCENE BACKGROUND SLIDESHOW
    ================================================= */

    const afterBg =
        document.getElementById("afterBg");


    if (afterBg) {

        const afterBgImages = [
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=80",
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&q=80",
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80",
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80"
        ];


        let afterBgIndex = 0;


        afterBg.style.backgroundImage =
            `url(${afterBgImages[0]})`;


        setInterval(
            function () {

                afterBgIndex =
                    (afterBgIndex + 1) %
                    afterBgImages.length;

                afterBg.style.opacity = "0";

                setTimeout(
                    function () {

                        afterBg.style.backgroundImage =
                            `url(${afterBgImages[afterBgIndex]})`;

                        afterBg.style.opacity = "1";

                    },
                    250
                );

            },
            1000
        );

    }


    /* =================================================
       MOBILE MENU
    ================================================= */

    function openMobileMenu() {

        mobileMenu.classList.add("open");

        if (mobOverlay) {
            mobOverlay.classList.add("open");
        }

        document.body.style.overflow = "hidden";

    }


    function closeMobileMenu() {

        mobileMenu.classList.remove("open");

        if (mobOverlay) {
            mobOverlay.classList.remove("open");
        }

        document.body.style.overflow = "";

    }


    if (menuButton && mobileMenu) {

        menuButton.addEventListener(
            "click",
            openMobileMenu
        );

    }


    if (closeMenu && mobileMenu) {

        closeMenu.addEventListener(
            "click",
            closeMobileMenu
        );

    }


    if (mobOverlay) {

        mobOverlay.addEventListener(
            "click",
            closeMobileMenu
        );

    }


    if (mobCtaLink) {

        mobCtaLink.addEventListener(
            "click",
            closeMobileMenu
        );

    }


    if (mobileMenu) {

        const mobileLinks =
            mobileMenu.querySelectorAll(".mob-nav-links a");

        mobileLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });

    }


    /* =================================================
       OTHER PAGES
    ================================================= */

    if (!portrait || !scrollScene) {

        startSimpleLoader();

        return;

    }


    /* =================================================
       300 PORTRAIT FRAMES
    ================================================= */

    const TOTAL_FRAMES = 300;

    const frames = [];

    let loadedFrames = 0;


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
            String(i).padStart(3, "0");


        /*
           IMPORTANT:

           Images are in ROOT folder.

           NOT:

           portrait-frames/

           Correct:
        */

        image.src =
            `ezgif-frame-${number}.jpg`;


        image.onload =
            function () {

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


        /*
            Timeline:

            0%   = Hi, I'm Jack Roshan
            25%  = Viluppuram
            50%  = B.Sc Computer Science
            75%  = Skills
            100% = Let's Work Together
        */


        let index;


        if (progress < 0.125) {

            index = 0;

        }

        else if (progress < 0.375) {

            index = 1;

        }

        else if (progress < 0.625) {

            index = 2;

        }

        else if (progress < 0.875) {

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


        /* =============================================
           001 → 300
        ============================================= */

        const frame =
            Math.round(
                progress *
                (TOTAL_FRAMES - 1)
            );


        showFrame(frame);


        /* =============================================
           TEXT CHANGES AT SAME TIME
        ============================================= */

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
       INITIAL STATE
    ================================================= */

    showFrame(0);

    updateText(0);


    /* =================================================
       LOADER
       3 SECONDS
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


        requestAnimationFrame(run);

    }

});
