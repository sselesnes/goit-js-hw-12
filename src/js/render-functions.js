import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchFocus } from '../main';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export default function renderGallery(images) {
  gallery.innerHTML = createGalleryMarkup(images);
  lightbox.refresh();
  lightbox.on('closed.simplelightbox', () => {
    searchFocus();
  });
}

export function clearGallery() {
  gallery.innerHTML = '';
}

function createGalleryMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
              <img class="gallery-image" src="${webformatURL}"
              alt="${tags.split(', ').slice(0, 3).join(', ')}"/></a>
            <table class="gallery-stats"><tr><th>Likes</th><th>Views</th><th>Comments</th><th>Downloads</th></tr><tr>
              <td>${likes}</td><td>${views}</td><td>${comments}</td><td>${downloads}</td></tr></table>
           </li>`
    )
    .join('');
}
