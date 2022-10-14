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

  instance = basicLightbox.create(`<img src="${originalSrc}">`, {
    closable: true,
  });
  getModalImageOpen(instance);
}

function getModalImageOpen(event) {
  window.addEventListener("keydown", onPressEscape);
  event.show();
}

function getModalImageClose(event) {
  window.removeEventListener("keydown", onPressEscape);
  event.close();
}

function onPressEscape(event) {
  if (event.code === "Escape") {
    getModalImageClose(instance);
  }
}
