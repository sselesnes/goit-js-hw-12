// У файлі main.js напиши всю логіку роботи додатка. Виклики нотифікацій iziToast, усі перевірки на довжину масиву в отриманій відповіді та логіку прокручування сторінки (scroll) робимо саме в цьому файлі. Імпортуй в нього функції із файлів pixabay-api.js та render-functions.js та викликай їх у відповідний момент.

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getImagesByQuery from './js/pixabay-api';
import * as render from './js/render-functions';

const searchForm = document.querySelector('.form');
const searchQuery = searchForm.elements['search-text'];
export const loadMoreBtn = document.querySelector('.load-more');

const page = 1; // default 1
const perPage = 15;

let totalHits;
export function searchFocus() {
  searchQuery.focus();
}

function queryHandler(query) {
  searchQuery.value = query;
  render.clearGallery();

  if (!query) {
    urlHandler(null);
    iziToast.warning({
      message: 'Sorry, the request cannot be empty. Please try again!',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }

  render.hideLoadMoreButton();
  render.showLoader();
  getImagesByQuery(query, page)
    .then(fetchResultJSON => {
      totalHits = fetchResultJSON.totalHits;
      galleryPaginationHandler();
      if (totalHits) {
        urlHandler(query);
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
        message: `Sorry, there was an "${error}" with your query. Please try again later!`,
        position: 'topRight',
        timeout: 2000,
      });
    })
    .finally(render.hideLoader);
}

function formHandler() {
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    queryHandler(searchQuery.value.trim());
  });
}

function galleryPaginationHandler() {
  console.log(`total`, totalHits);
  if (totalHits > perPage) {
    render.showLoadMoreButton();
  }
  loadMoreBtn.addEventListener('click', event => {
    console.log(`load more click`);
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

urlHandler() && queryHandler(urlHandler());
formHandler();
