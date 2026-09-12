document.addEventListener("DOMContentLoaded", () => {


    /* =========================================
       MOBILE MENU
    ========================================== */

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


    /* =========================================
       WAIT FOR GSAP
    ========================================== */

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


    /* =========================================
       PORTRAIT ELEMENTS
    ========================================== */

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


    /* =========================================
       FRAME SETTINGS
    ========================================== */

    const TOTAL_FRAMES = 300;


    /*
        IMPORTANT:

        Your GitHub files are in the
        SAME folder as index.html.

        Example:

        index.html
        ezgif-frame-001.jpg
        ezgif-frame-002.jpg
        ...
        ezgif-frame-300.jpg
    */

    const FRAME_PREFIX =
        "ezgif-frame-";

    const FRAME_EXTENSION =
        ".jpg";


    /* =========================================
       IMAGE ARRAY
    ========================================== */

    const frames = [];

    let currentFrame = -1;


    /* =========================================
       PRELOAD 300 IMAGES
    ========================================== */

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
            `${FRAME_PREFIX}${frameNumber}${FRAME_EXTENSION}`;


        frames.push(image);

    }


    /* =========================================
       SHOW FRAME
    ========================================== */

    function showFrame(
        frameIndex
    ) {


        /*
            Keep frame number between
            0 and 299
        */

        frameIndex =
            Math.max(
                0,
                Math.min(
                    TOTAL_FRAMES - 1,
                    frameIndex
                )
            );


        /*
            Don't reload same frame
        */

        if (
            frameIndex ===
            currentFrame
        ) {

            return;

        }


        const frame =
            frames[frameIndex];


        if (!frame) {

            return;

        }


        /*
            If already loaded
        */

        if (
            frame.complete &&
            frame.naturalWidth > 0
        ) {

            portraitFrame.src =
                frame.src;

            currentFrame =
                frameIndex;

            return;

        }


        /*
            If still loading
        */

        frame.onload = () => {

            portraitFrame.src =
                frame.src;

            currentFrame =
                frameIndex;

        };

    }


    /* =========================================
       SHOW FIRST FRAME
    ========================================== */

    showFrame(0);


    /* =========================================
       RESET PORTRAIT TRANSFORM
       
       VERY IMPORTANT:
       
       We DO NOT use rotateY().
       
       We DO NOT use rotateX().
       
       The JPG images themselves contain
       the character's 3D movement.
    ========================================== */

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


    /* =========================================
       SCROLL FRAME ANIMATION
    ========================================== */

    const animation = {

        frame: 0

    };


    gsap.to(
        animation,
        {

            frame:
                TOTAL_FRAMES - 1,

            ease: "none",


            scrollTrigger: {

                trigger: "#home",


                /*
                    Animation starts when
                    Home reaches top
                */

                start:
                    "top top",


                /*
                    Scroll distance.

                    Bigger value =
                    slower character movement.

                    Smaller value =
                    faster movement.
                */

                end:
                    "+=2200",


                /*
                    Smooth scroll
                */

                scrub:
                    0.4,


                /*
                    Keep hero fixed while
                    frames change.
                */

                pin:
                    true,


                anticipatePin:
                    1,


                invalidateOnRefresh:
                    true,


                onUpdate:
                    (self) => {


                        /*
                            Convert scroll progress
                            0 → 1

                            into frame:

                            0 → 299
                        */

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


    /* =========================================
       SCROLL HINT
    ========================================== */

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

                    trigger: "#home",

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


    /* =========================================
       ACTIVE NAVIGATION
    ========================================== */

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


    /* =========================================
       REFRESH SCROLLTRIGGER
    ========================================== */

    window.addEventListener(
        "load",
        () => {

            ScrollTrigger.refresh();

        }
    );


    /* =========================================
       RESIZE
    ========================================== */

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


    /* =========================================
       CHECK ALL 300 FRAMES
    ========================================== */

    console.log(
        "300-frame portrait animation initialized."
    );

});
