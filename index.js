const mainImage = document.querySelector('.main-image');
const mainImageSizeDisplay = document.getElementById('main-image-size-display');

window.addEventListener('resize', () => {
    mainImageSizeDisplay.textContent = mainImage.offsetWidth;
});