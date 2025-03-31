import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import fetchImages from './js/pixabay-api';
import renderGallery, { clearGallery } from './js/render-functions';

const searchForm = document.querySelector('.form');
const searchQuery = searchForm.elements['search-text'];
const cssLoader = document.querySelector('.loader');

export function searchFocus() {
  searchQuery.focus();
}

function requestHandler(request) {
  searchQuery.value = request;
  clearGallery();

  if (!request) {
    urlHandler(null);
    iziToast.warning({
      message: 'Sorry, the request cannot be empty. Please try again!',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }

  cssLoader.classList.add('is-active');
  fetchImages(request)
    .then(fetchResultJSON => {
      if (fetchResultJSON.totalHits) {
        urlHandler(request);
        renderGallery(fetchResultJSON.hits);
      } else {
        urlHandler(null);
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          timeout: 2000,
        });
      }
    })
    .catch(error => {
      iziToast.error({
        message: `Sorry, there was an "${error}" with your request. Please try again later!`,
        position: 'topRight',
        timeout: 2000,
      });
    })
    .finally(() => {
      cssLoader.classList.remove('is-active');
    });
}

function formHandler() {
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    requestHandler(searchQuery.value.trim());
  });
}

function urlHandler(query) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  if (typeof query == 'undefined') return params.get('q');
  query ? params.set('q', query) : params.delete('q');
  url.search = params.toString();
  window.history.pushState({}, '', url);
  return;
}

window.addEventListener('load', () => searchFocus());
document.body.addEventListener('click', () => searchFocus());
document.body.addEventListener('keydown', () => searchFocus());

urlHandler() && requestHandler(urlHandler());
formHandler();
