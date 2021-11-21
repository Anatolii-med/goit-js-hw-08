// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line
const galleryEl = document.querySelector('.gallery');

const createGalleryItemMarkup = function ({ preview, original, description }) {
  return `<a class="gallery__item" href=${original}>
  <img class="gallery__image" src=${preview} alt=${description} title=${description}"/>
</a>`;
};

const galleryItem = galleryItems.map(createGalleryItemMarkup).join('');
galleryEl.insertAdjacentHTML('afterbegin', galleryItem);

let gallery = new SimpleLightbox('.gallery a');

gallery.on('show.simplelightbox', function () {
  gallery.options.captionDelay = 250;
});
