document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PRELOADER
    ====================================================== */

    const preloader =
        document.getElementById("preloader");

    const loadingPercent =
        document.getElementById("loadingPercent");

    const loaderProgress =
        document.getElementById("loaderProgress");


    document.body.classList.add("loading");


    let progress = 0;


    const loadingTimer = setInterval(() => {

        progress++;


        if (loadingPercent) {

            loadingPercent.textContent =
                progress;

        }


        if (loaderProgress) {

            loaderProgress.style.width =
                progress + "%";

        }


        if (progress >= 100) {

            clearInterval(loadingTimer);


            setTimeout(() => {

                if (preloader) {

                    preloader.classList.add("loaded");

                }


                document.body.classList.remove(
                    "loading"
                );


                setTimeout(() => {

                    if (preloader) {

                        preloader.style.display =
                            "none";

                    }

                }, 1400);


            }, 500);

        }

    }, 25);



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

                mobileMenu.classList.add(
                    "open"
                );

            }
        );


        closeBtn.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "open"
                );

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
       CHECK GSAP
    ====================================================== */

    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {

        console.error(
            "GSAP or ScrollTrigger is not loaded."
        );

        return;

    }


    gsap.registerPlugin(
        ScrollTrigger
    );



    /* =====================================================
       PORTRAIT ELEMENTS
    ====================================================== */

    const portrait =
        document.getElementById(
            "portrait3D"
        );


    const portraitFrame =
        document.getElementById(
            "portraitFrame"
        );


    if (
        !portrait ||
        !portraitFrame
    ) {

        console.error(
            "Portrait elements not found."
        );

        return;

    }



    /* =====================================================
       300 IMAGE FRAMES
    ====================================================== */

    const TOTAL_FRAMES = 300;

    const FRAME_FOLDER =
        "portrait-frames";


    const frames = [];

    let currentFrame = -1;



    /* =====================================================
       PRELOAD ALL 300 JPG IMAGES
    ====================================================== */

    for (
        let i = 1;
        i <= TOTAL_FRAMES;
        i++
    ) {


        const image =
            new Image();


        const frameNumber =
            String(i).padStart(
                3,
                "0"
            );


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



    /* =====================================================
       SHOW FIRST IMAGE
    ====================================================== */

    showFrame(0);



    /* =====================================================
       DO NOT ROTATE IMAGE WITH CSS
       
       The 300 JPG frames already contain
       the character rotation.
    ====================================================== */

    gsap.set(
        portrait,
        {

            x: 0,

            y: 0,

            scale: 1,

            rotation: 0,

            rotationX: 0,

            rotationY: 0,

            transformOrigin:
                "50% 50%"

        }
    );



    /* =====================================================
       SCROLL → 300 FRAMES
    ====================================================== */

    const animation = {

        frame: 0

    };


    gsap.to(
        animation,
        {

            frame:
                TOTAL_FRAMES - 1,


            ease:
                "none",


            scrollTrigger: {

                trigger:
                    "#home",


                start:
                    "top top",


                end:
                    "+=1800",


                scrub:
                    0.5,


                pin:
                    true,


                anticipatePin:
                    1,


                invalidateOnRefresh:
                    true,


                onUpdate:
                    (self) => {


                        const frameIndex =
                            Math.round(
                                self.progress *
                                (TOTAL_FRAMES - 1)
                            );


                        showFrame(
                            frameIndex
                        );

                    }

            }

        }
    );



    /* =====================================================
       SCROLL HINT
    ====================================================== */

    const scrollHint =
        document.getElementById(
            "scrollHint"
        );


    if (scrollHint) {


        gsap.to(
            scrollHint,
            {

                opacity: 0,

                y: 20,

                ease: "none",


                scrollTrigger: {

                    trigger:
                        "#home",


                    start:
                        "top top",


                    end:
                        "+=300",


                    scrub:
                        true

                }

            }
        );

    }



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


        sections.forEach(
            section => {


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

            }
        );


        navLinks.forEach(
            link => {


                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    "#" + current
                ) {


                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();



    /* =====================================================
       REFRESH SCROLLTRIGGER
    ====================================================== */

    window.addEventListener(
        "load",
        () => {

            ScrollTrigger.refresh();

        }
    );


    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {


            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        ScrollTrigger.refresh();

                    },
                    250
                );

        }
    );

});
