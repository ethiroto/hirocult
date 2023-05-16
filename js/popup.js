const clickableImage = document.getElementById("clickableImage");
const popupBox = document.getElementById("popupBox");
const closeBtn = document.getElementById("closeBtn");

console.log("Elements:", { clickableImage, popupBox, closeBtn });

clickableImage.addEventListener("click", () => {
    console.log("Image clicked");
    popupBox.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    console.log("Close button clicked");
    popupBox.style.display = "none";
});

window.addEventListener("click", (event) => {
    console.log("Window clicked, event target:", event.target);
    if (event.target === popupBox) {
        console.log("Popup box clicked outside");
        popupBox.style.display = "none";
    }
});