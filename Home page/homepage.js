
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const images = document.querySelectorAll(".carousel img");
    const bullets = document.querySelector(".bullets");

    let currentIndex = 3;



    images.forEach((_, index) => {
        const bullet = document.createElement("div");
        bullet.classList.add("bullet");
        if (index === currentIndex) bullet.classList.add("active");
        bullet.addEventListener("click", () => {
            currentIndex = index;
            updateCarousel();
        });
        bullets.appendChild(bullet);
    });

    function updateCarousel() {

        if (currentIndex === images.length) {
            carousel.style.transform = `translateX(-${currentIndex}px)`;
        }
        else {
            carousel.style.transform = `translateX(-${currentIndex * 510}px)`;
        }

        images.forEach((img) => {
            img.classList.remove("middle");
        });

        // Set the middle image
        const middleIndex = 1;
        const activeIndex = (currentIndex + middleIndex) % images.length;
        images[activeIndex].classList.add("middle");

        // Update bullets
        const bulletElements = bullets.querySelectorAll(".bullet");
        bulletElements.forEach((bullet, index) => {
            bullet.classList.remove("active");
            if (index === currentIndex) bullet.classList.add("active");
        });
    }

    document.getElementById("prev").addEventListener("click", () => {

        if (currentIndex == 0) {
            currentIndex = images.length;
        }
        currentIndex = currentIndex - 1;
        updateCarousel();
    });

    document.getElementById("next").addEventListener("click", () => {

        if (currentIndex == images.length) {
            currentIndex = -1;
        }
        currentIndex = currentIndex + 1;
        updateCarousel();
    });

    setInterval(() => {

        currentIndex++;

        if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        updateCarousel();

    }, 18000);

    updateCarousel(); // Initial call to set up the carousel


});

