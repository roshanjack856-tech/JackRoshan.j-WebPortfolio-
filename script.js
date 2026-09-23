/* =================================================
   AFTER-SCENE BACKGROUND SLIDESHOW (VERCEL + GITHUB)
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
