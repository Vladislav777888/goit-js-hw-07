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

  instance = basicLightbox.create(
    `<img src="${originalSrc}" width="800" height="600">`,
    {
      onShow: () => {
        console.log("Добавили ESC");
        document.addEventListener("keydown", onPressEscape);
      },
      onClose: () => {
        console.log("Убрали ESC");
        document.removeEventListener("keydown", onPressEscape);
      },
    }
  );
  instance.show();
}

function onPressEscape(event) {
  if (event.key === "Escape") {
    instance.close(() => {
      console.log("Закрыли, когда нажали ESC");
    });
  }
}
