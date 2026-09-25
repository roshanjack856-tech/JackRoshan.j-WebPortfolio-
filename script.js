/* =====================================================
   JACK ROSHAN J PORTFOLIO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       ELEMENTS
    ================================================= */

    const loader = document.getElementById("loader");
    const website = document.getElementById("website");
    const loaderNumber = document.getElementById("loaderNumber");
    const loaderProgress = document.getElementById("loaderProgress");
    const portrait = document.getElementById("portraitFrame");
    const frameCounter = document.getElementById("frameCounter");
    const scrollScene = document.querySelector(".scroll-scene");
    const textBlocks = document.querySelectorAll(".scene-text");
    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeMenu = document.getElementById("closeMenu");
    const mobOverlay = document.getElementById("mobOverlay");
    const mobCtaLink = document.getElementById("mobCtaLink");


    /* =================================================
       PORTRAIT SIDE CODE-RAIN (RAINBOW)
    ================================================= */

    function initCodeRain(canvas, direction, hueStart, hueEnd) {

        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const chars = "0123456789ABCDEF";
        const fontSize = 16;

        let columns = 0;
        let drops = [];

        function resize() {

            const rect = canvas.getBoundingClientRect();

            if (rect.width < 1 || rect.height < 1) return;

            canvas.width = rect.width;
            canvas.height = rect.height;

            columns = Math.max(1, Math.floor(canvas.width / fontSize));

            drops = [];

            for (let i = 0; i < columns; i++) {
                drops.push(
                    direction === 1
                        ? Math.random() * -20
                        : (canvas.height / fontSize) + Math.random() * 20
                );
            }
        }

        resize();

        window.addEventListener("resize", resize);

        if (window.ResizeObserver && canvas.parentElement) {
            new ResizeObserver(resize).observe(canvas.parentElement);
        }

        window.addEventListener("load", resize);

        function draw() {

            ctx.fillStyle = "rgba(5,8,15,0.18)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < columns; i++) {

                const char = chars[Math.floor(Math.random() * chars.length)];

                const hue = hueStart + (i / columns) * (hueEnd - hueStart);

                ctx.fillStyle = `hsl(${hue}, 90%, 58%)`;

                ctx.fillText(char, i * fontSize, drops[i] * fontSize);

                drops[i] += direction * 0.5;

                const outOfBounds =
                    direction === 1
                        ? drops[i] * fontSize > canvas.height
                        : drops[i] * fontSize < 0;

                if (outOfBounds && Math.random() > 0.975) {
                    drops[i] =
                        direction === 1
                            ? Math.random() * -10
                            : (canvas.height / fontSize) + Math.random() * 10;
                }
            }

            requestAnimationFrame(draw);
        }

        requestAnimationFrame(draw);
    }

    initCodeRain(document.getElementById("portraitSideLeft"), -1, 260, 180);
    initCodeRain(document.getElementById("portraitSideRight"), 1, 180, 0);


    /* =================================================
       HERO BACKGROUND SLIDESHOW
    ================================================= */

    const heroBg = document.getElementById("heroBg");

    if (heroBg) {

        const heroBgImages = [
            "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1600&q=80",
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1600&q=80",
            "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1600&q=80",
            "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1600&q=80",
            "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1600&q=80"
        ];

        let heroBgIndex = 0;

        heroBg.style.backgroundImage = `url(${heroBgImages[0]})`;

        setInterval(function () {

            heroBgIndex = (heroBgIndex + 1) % heroBgImages.length;

            heroBg.style.opacity = "0";

            setTimeout(function () {
                heroBg.style.backgroundImage = `url(${heroBgImages[heroBgIndex]})`;
                heroBg.style.opacity = "1";
            }, 350);

        }, 2000);
    }


    /* =================================================
       AFTER-SCENE BACKGROUND SLIDESHOW (VERCEL + GITHUB)
       Changes every 2 seconds with a fade
    ================================================= */

    const afterBg = document.getElementById("afterBg");

    if (afterBg) {

        const afterBgImages = ["vercel.jpg", "github.jpg"];

        afterBgImages.forEach(function (src, i) {
            const img = document.createElement("img");
            img.src = src;
            img.alt = "";
            if (i === 0) img.classList.add("active");
            afterBg.appendChild(img);
        });

        const slides = afterBg.querySelectorAll("img");
        let afterBgIndex = 0;

        setInterval(function () {
            slides[afterBgIndex].classList.remove("active");
            afterBgIndex = (afterBgIndex + 1) % slides.length;
            slides[afterBgIndex].classList.add("active");
        }, 2000);
    }


    /* =================================================
       MOBILE MENU
    ================================================= */

    function openMobileMenu() {
        mobileMenu.classList.add("open");
        if (mobOverlay) mobOverlay.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove("open");
        if (mobOverlay) mobOverlay.classList.remove("open");
        document.body.style.overflow = "";
    }

    if (menuButton && mobileMenu) menuButton.addEventListener("click", openMobileMenu);
    if (closeMenu && mobileMenu) closeMenu.addEventListener("click", closeMobileMenu);
    if (mobOverlay) mobOverlay.addEventListener("click", closeMobileMenu);
    if (mobCtaLink) mobCtaLink.addEventListener("click", closeMobileMenu);

    if (mobileMenu) {
        mobileMenu.querySelectorAll(".mob-nav-links a").forEach(function (link) {
            link.addEventListener("click", closeMobileMenu);
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
       300 PORTRAIT FRAMES (images are in the ROOT folder)
    ================================================= */

    const TOTAL_FRAMES = 300;
    const frames = [];
    let loadedFrames = 0;

    portrait.src = "ezgif-frame-001.jpg";

    for (let i = 1; i <= TOTAL_FRAMES; i++) {

        const image = new Image();
        const number = String(i).padStart(3, "0");

        image.src = `ezgif-frame-${number}.jpg`;

        image.onload = function () {
            loadedFrames++;
        };

        frames.push(image);
    }


    /* =================================================
       SHOW FRAME
    ================================================= */

    function showFrame(frame) {

        frame = Math.max(0, Math.min(TOTAL_FRAMES - 1, frame));

        const image = frames[frame];

        if (image && image.complete) {
            portrait.src = image.src;
        }

        if (frameCounter) {
            frameCounter.textContent =
                `FRAME ${String(frame + 1).padStart(3, "0")} / 300`;
        }
    }


    /* =================================================
       CHANGE TEXT
       0% intro, 25% location, 50% education,
       75% skills, 100% call to action
    ================================================= */

    function updateText(progress) {

        if (!textBlocks.length) return;

        let index;

        if (progress < 0.125) index = 0;
        else if (progress < 0.375) index = 1;
        else if (progress < 0.625) index = 2;
        else if (progress < 0.875) index = 3;
        else index = 4;

        textBlocks.forEach(function (text, i) {
            if (i === index) text.classList.add("active");
            else text.classList.remove("active");
        });
    }


    /* =================================================
       SCROLL ANIMATION
    ================================================= */

    let ticking = false;
    let targetFrame = 0;
    let currentFrame = 0;
    let shownFrame = -1;

    function updateScroll() {

        const rect = scrollScene.getBoundingClientRect();
        const totalDistance = scrollScene.offsetHeight - window.innerHeight;

        let progress = -rect.top / totalDistance;
        progress = Math.max(0, Math.min(1, progress));

        targetFrame = progress * (TOTAL_FRAMES - 1);
        updateText(progress);

        ticking = false;
    }

    /* glides toward the target frame so the photo moves smoothly */
    function animateFrames() {

        currentFrame += (targetFrame - currentFrame) * 0.18;

        if (Math.abs(targetFrame - currentFrame) < 0.05) {
            currentFrame = targetFrame;
        }

        const f = Math.round(currentFrame);

        if (f !== shownFrame && frames[f] && frames[f].complete) {
            showFrame(f);
            shownFrame = f;
        }

        requestAnimationFrame(animateFrames);
    }

    window.addEventListener(
        "scroll",
        function () {
            if (!ticking) {
                window.requestAnimationFrame(updateScroll);
                ticking = true;
            }
        },
        { passive: true }
    );


    /* =================================================
       INITIAL STATE
    ================================================= */

    /* Always open the page scrolled to the top, not where the browser last left it */
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    updateScroll();

    currentFrame = targetFrame;

    showFrame(Math.round(currentFrame));

    animateFrames();


    /* =================================================
       LOADER (1.5 SECONDS)
    ================================================= */

    startLoader();

    function startLoader() {

        const start = performance.now();
        const duration = 1500;

        function animateLoader(now) {

            const progress = Math.min((now - start) / duration, 1);
            const percent = Math.floor(progress * 100);

            if (loaderNumber) loaderNumber.textContent = `${percent}%`;
            if (loaderProgress) loaderProgress.style.width = `${percent}%`;

            if (progress < 1) requestAnimationFrame(animateLoader);
            else finishLoader();
        }

        requestAnimationFrame(animateLoader);
    }

    function finishLoader() {

        if (!loader || !website) return;

        loader.classList.add("hide");

        website.style.visibility = "visible";
        website.style.opacity = "1";

        setTimeout(function () {
            loader.style.display = "none";
        }, 800);
    }


    /* =================================================
       SIMPLE LOADER (ABOUT / PROJECT / CONTACT)
    ================================================= */

    function startSimpleLoader() {

        if (!loader || !website) return;

        const start = performance.now();
        const duration = 1500;

        function run(now) {

            const progress = Math.min((now - start) / duration, 1);
            const percent = Math.floor(progress * 100);

            if (loaderNumber) loaderNumber.textContent = `${percent}%`;
            if (loaderProgress) loaderProgress.style.width = `${percent}%`;

            if (progress < 1) {
                requestAnimationFrame(run);
            } else {
                loader.classList.add("hide");
                website.style.visibility = "visible";
                website.style.opacity = "1";
            }
        }

        requestAnimationFrame(run);
    }


    /* =================================================
       AI CHAT WIDGET (n8n webhook)
    ================================================= */

    const CHAT_WEBHOOK_URL =
        "https://greedjack.app.n8n.cloud/webhook/170c5083-9466-43c4-b2bd-3e0e72095c69/chat";

    const chatWidget = document.getElementById("chatWidget");
    const chatToggle = document.getElementById("chatToggle");
    const chatClose = document.getElementById("chatClose");
    const chatMessages = document.getElementById("chatMessages");
    const chatInput = document.getElementById("chatInput");
    const chatSend = document.getElementById("chatSend");

    if (chatWidget && chatToggle && chatMessages && chatInput && chatSend) {

        const chatSessionId =
            "session-" + Math.random().toString(36).slice(2) + "-" + Date.now();

        function openChat() {
            chatWidget.classList.add("open");
            chatInput.focus();
        }

        function closeChat() {
            chatWidget.classList.remove("open");
        }

        chatToggle.addEventListener("click", function () {
            chatWidget.classList.contains("open") ? closeChat() : openChat();
        });

        if (chatClose) {
            chatClose.addEventListener("click", closeChat);
        }

        function addMessage(text, who) {
            const msg = document.createElement("div");
            msg.className = "chat-msg " + (who === "user" ? "chat-msg-user" : "chat-msg-bot");
            msg.textContent = text;
            chatMessages.appendChild(msg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function showTyping() {
            const typing = document.createElement("div");
            typing.className = "chat-msg-typing";
            typing.id = "chatTyping";
            typing.innerHTML = "<span></span><span></span><span></span>";
            chatMessages.appendChild(typing);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function hideTyping() {
            const typing = document.getElementById("chatTyping");
            if (typing) typing.remove();
        }

        async function sendMessage() {

            const text = chatInput.value.trim();

            if (!text) return;

            addMessage(text, "user");
            chatInput.value = "";
            chatInput.disabled = true;
            chatSend.disabled = true;

            showTyping();

            try {

                const response = await fetch(CHAT_WEBHOOK_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chatInput: text,
                        sessionId: chatSessionId
                    })
                });

                const data = await response.json().catch(function () {
                    return null;
                });

                const reply =
                    (data && (data.output || data.text || data.reply || data.message)) ||
                    (Array.isArray(data) && data[0] && (data[0].output || data[0].text)) ||
                    "Sorry, I didn't get a reply from the server.";

                hideTyping();
                addMessage(reply, "bot");

            } catch (err) {

                hideTyping();
                addMessage("Sorry, I couldn't reach the chat service right now.", "bot");
            }

            chatInput.disabled = false;
            chatSend.disabled = false;
            chatInput.focus();
        }

        chatSend.addEventListener("click", sendMessage);

        chatInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") sendMessage();
        });
    }

});
