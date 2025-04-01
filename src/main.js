import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getImagesByQuery from './js/pixabay-api';
import * as render from './js/render-functions';

let totalHits;
let page = 1;
const searchForm = document.querySelector('.form');
export const perPage = 15;
export const searchQuery = searchForm.elements['search-text'];
export const loadMoreBtn = document.querySelector('.load-more');

const queryCheck = query => {
  searchQuery.value = query;
  render.clearGallery();
  if (!query) {
    urlHandler.remove();
    iziToast.warning({
      message: 'Sorry, the request cannot be empty. Please try again!',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }
  queryProcess(query);
};

const scrollTwoRows = () => {
  const galleryCard = document.querySelector('.gallery-item');
  const cardHeight = galleryCard.getBoundingClientRect().height;
  window.scrollTo({
    top: window.scrollY + 2 * cardHeight,
    behavior: 'smooth',
  });
};

const queryProcess = query => {
  render.hideLoadMoreButton();
  render.showLoader();
  getImagesByQuery(query, page)
    .then(fetchResultJSON => {
      totalHits = fetchResultJSON.totalHits;
      galleryPagination.handle();
      if (totalHits) {
        urlHandler.set(query);
        render.createGallery(fetchResultJSON.hits);
        if (page > 1) {
          scrollTwoRows();
        }
      } else {
        urlHandler.remove();
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
};

const formHandler = () => {
  searchForm.addEventListener('submit', event => {
    if (event.target === searchForm) {
      event.preventDefault();
      urlHandler.remove();
      page = 1;
      queryCheck(searchQuery.value.trim());
    }
  });
};

const urlHandler = {
  init: function () {
    this.url = new URL(window.location.href);
    this.params = new URLSearchParams(this.url.search);
  },
  update: function () {
    this.url.search = this.params.toString();
    window.history.pushState({}, '', `${this.url}`);
  },
  get: function () {
    page = this.params.get('p') ?? page;
    return this.params.get('q');
  },
  set: function (query) {
    this.params.set('q', query);
    page !== 1 && this.params.set('p', page);
    this.update();
  },
  remove: function () {
    this.params.delete('q');
    this.params.delete('p');
    this.update();
  },
};

const galleryPagination = {
  init: () => {
    loadMoreBtn.addEventListener('click', event => {
      if (event.target === loadMoreBtn) {
        page++;
        queryProcess(searchQuery.value);
      }
    });
  },

  handle: () => {
    if (totalHits > perPage * page) {
      render.showLoadMoreButton();
    }
  },
};

['load', 'keydown'].forEach(event =>
  window.addEventListener(event, () => searchQuery.focus())
);

urlHandler.init();
galleryPagination.init();
urlHandler.get() && queryCheck(urlHandler.get());
formHandler();
