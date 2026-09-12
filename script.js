const TOTAL_FRAMES = 300;

const images = [];

let currentFrame = 0;

for (let i = 1; i <= TOTAL_FRAMES; i++) {

    const image = new Image();

    const number =
        String(i).padStart(3, "0");

    image.src =
        `ezgif-frame-${number}.jpg`;

    images.push(image);
}


function showFrame(frame) {

    frame = Math.max(
        0,
        Math.min(
            TOTAL_FRAMES - 1,
            frame
        )
    );

    const image = images[frame];

    if (image) {

        portrait.src = image.src;

    }

    if (frameCounter) {

        frameCounter.textContent =
            `FRAME ${String(frame + 1).padStart(3, "0")} / 300`;

    }

    currentFrame = frame;
}
