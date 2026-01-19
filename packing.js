// Base Box Packing Algorithm arranged by height

// dynamically load in 18 images next
let boxes = [
    { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1920 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1080 / 8 }, { width: 1080 / 8, height: 1920 / 8 }

];

// totalArea and totalWidth the boxes take up collectively
let totalAreaBox = 0;
let totalWidthBoxes = 0;

// loop through all the boxes to calculate the totalArea and totalWidth of each box
for (let i = 0; i < boxes.length; i++) {
    let box = boxes[i]
    totalAreaBox += box.width * box.height;
    totalWidthBoxes = Math.max(totalWidthBoxes, box.width)
}

// sort boxes by height in descending order 
// if b.height is greater than a.height, move in front 
// e.g. 50, 100 - 100, 50
boxes.sort((a, b) => b.height - a.height);

// we have the totalArea for each box in boxes
// we have the totalWidth for each box in boxes
// we have sorted the boxes by height descending order

/* -- LOADED -- */

document.addEventListener("DOMContentLoaded", () => {

    // Packing Area
    const appDiv = document.getElementById("app");

    if (appDiv) {

        let setWidth = "100vw";

        const containerConfig = {
            position: "relative",
            x: "0px",
            y: "0px",
            width: setWidth,
            height: "100vh",
            backgroundColor: "#Ff0000",
            display: "block",
            overflow: "hidden"
        }

        const containerEl = document.createElement("div");
        Object.assign(containerEl.style, containerConfig);
        appDiv.appendChild(containerEl);
        console.log("Container should be visible");

        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            const boxEl = document.createElement("div");
            boxEl.style.width = box.width + "px";
            boxEl.style.height = box.height + "px";
            boxEl.innerHTML = "Image Slot " + (i + 1);
            boxEl.style.border = "1px solid black";
            boxEl.style.backgroundColor = "blue";
            boxEl.style.display = "inline-block";
            containerEl.appendChild(boxEl)
        }

        let startWidth = containerEl.clientWidth;

        const spaces = [
            {
                x: 0,
                y: 0,
                w: startWidth,
                h: Infinity
            }
        ];

        const packed = [];

        for (const box of boxes) {
            // iterate backwards
            for (let i = spaces.length - 1; i >= 0; i--) {
                const space = spaces[i]

                // look for empty spaces where the current box will fit 
                if (box.width > space.width || box.height > space.height)
                    continue;
            } //

            packed.push(Object.assign({}, box, { x: space.x, y: space.y }));
            boxPacked = true;

            if (box.width === space.width && box.height === space.height) {
                // delete the last space in the array
                const last = spaces.pop();

                if (i < spaces.length) spaces[i] = last;
            } else if (box.height === space.height) {
                space.x += box.width;
                space.width -= box.width;
            } else if (box.width === space.w) {
                space.y += box.height;
                space.height -= box.height;
            } else {
                spaces.push({
                    x: space.x + box.w,
                    y: space.y,
                    w: space.width = box.width,
                    h: box.height
                });
                space.y = + box.height;
                space.h -= box.height;
            }
            break;
        }
    }
});



















