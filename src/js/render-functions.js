import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { loadMoreBtn, page } from '../main';

const gallery = document.querySelector('.gallery');
const cssLoader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  gallery.insertAdjacentHTML('beforeend', createMarkup(images));
  // Якщо це не перша сторінка - після додавання картинок робимо скрол
  page > 1 && galleryPaginationScroll();
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  cssLoader.classList.add('is-active');
}

export function hideLoader() {
  cssLoader.classList.remove('is-active');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.add('is-active');
}
export function hideLoadMoreButton() {
  loadMoreBtn.classList.remove('is-active');
}

function createMarkup(images) {
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

function galleryPaginationScroll() {
  const galleryCard = gallery.querySelector('.gallery-item');
  const cardHeight = galleryCard.getBoundingClientRect().height;
  window.scrollTo({
    top: window.scrollY + 2 * cardHeight,
    behavior: 'smooth',
  });
}
