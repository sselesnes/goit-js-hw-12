// У файлі main.js напиши всю логіку роботи додатка. Виклики нотифікацій iziToast, усі перевірки на довжину масиву в отриманій відповіді та логіку прокручування сторінки (scroll) робимо саме в цьому файлі. Імпортуй в нього функції із файлів pixabay-api.js та render-functions.js та викликай їх у відповідний момент.

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getImagesByQuery from './js/pixabay-api';
import * as render from './js/render-functions';

const searchForm = document.querySelector('.form');
const searchQuery = searchForm.elements['search-text'];

const page = 1;

export default function searchFocus() {
  searchQuery.focus();
}

function requestHandler(request) {
  searchQuery.value = request;
  render.clearGallery();

  if (!request) {
    urlHandler(null);
    iziToast.warning({
      message: 'Sorry, the request cannot be empty. Please try again!',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }

  render.showLoader();
  getImagesByQuery(request, page)
    .then(fetchResultJSON => {
      if (fetchResultJSON.totalHits) {
        urlHandler(request);
        render.createGallery(fetchResultJSON.hits);
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
    .finally(render.hideLoader);
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

window.addEventListener('load', searchFocus);
['click', 'keydown'].forEach(event =>
  document.body.addEventListener(event, searchFocus)
);

urlHandler() && requestHandler(urlHandler());
formHandler();
