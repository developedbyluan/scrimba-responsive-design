const mainImage = document.querySelector('.main-image');
const mainImageSizeDisplay = document.getElementById('main-image-size-display');

window.addEventListener('resize', (e) => {
    mainImageSizeDisplay.textContent = mainImage.offsetWidth;
    console.log(e.target.innerWidth);
    console.log(e.target.offsetWidth);
});