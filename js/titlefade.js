const title = document.querySelector('.fb-title');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const fadePoint = 40; // Adjust this value to change the point at which the title starts fading

    if (scrollPosition > fadePoint) {
        const opacity = 1 - (scrollPosition - fadePoint) / fadePoint;
        title.style.opacity = Math.max(opacity, 0);
    } else {
        title.style.opacity = 1;
    }
});