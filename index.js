const mainImage = document.querySelector(".main-image");
const mainImageSizeDisplay = document.getElementById("main-image-size-display");

const viewPortMeta = document.querySelector('meta[name="viewport"]');
const toggleViewportMetaBtn = document.createElement("button")
toggleViewportMetaBtn.classList.add("btn", "btn-dark", "btn-mid")
toggleViewportMetaBtn.textContent = "Toggle Viewport Meta Tag"

document.body.prepend(toggleViewportMetaBtn)

window.addEventListener("resize", (e) => {
  mainImageSizeDisplay.textContent = mainImage.offsetWidth;
  console.log(e.target.innerWidth);
  console.log(e.target.offsetWidth);
});


toggleViewportMetaBtn.addEventListener("click", () => {
  try {
    if (!viewPortMeta) throw new Error("Viewport meta tag not set");
    const viewPortMetaContent = viewPortMeta.content;
    toggleViewportMeta(viewPortMetaContent);
  } catch (error) {
    window.alert(error);
  } finally {
    if (viewPortMeta.content === "") {
        console.log('viewport is set to desktop');
    } else {
        console.log('viewport is set to mobile'); 
    }
  }
});

function toggleViewportMeta(viewPortMetaContent) {
  console.log(viewPortMetaContent);
  if (viewPortMetaContent === "") {
    viewPortMeta.setAttribute("content", "width=device-width, initial-scale=1");
    return;
  }

  viewPortMeta.setAttribute("content", "");
}
