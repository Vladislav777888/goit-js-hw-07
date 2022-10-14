import { galleryItems } from "./gallery-items.js";
// Change code below this line

const listGalleryRef = document.querySelector(".gallery");
const galleryItemsRef = createGalleryItems(galleryItems);
listGalleryRef.innerHTML = galleryItemsRef;
let instance;

listGalleryRef.addEventListener("click", onListGalleryClick);

function createGalleryItems(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </div>`;
    })
    .join("");
}

function onListGalleryClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const originalSrc = event.target.dataset.source;

  instance = basicLightbox.create(`<img src="${originalSrc}">`);
  getModalImageOpen(instance);
}

function getModalImageOpen(instance) {
  window.addEventListener("keydown", onPressEscape);
  instance.show();
}

function getModalImageClose(instance) {
  window.removeEventListener("keydown", onPressEscape);
  instance.close();
}

function onPressEscape(event) {
  if (event.code === "Escape") {
    getModalImageClose();
  }
}