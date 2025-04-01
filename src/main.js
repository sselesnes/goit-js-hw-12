import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getImagesByQuery from './js/pixabay-api';
import * as render from './js/render-functions';

const searchForm = document.querySelector('.form');
const searchQuery = searchForm.elements['search-text'];
export const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
const perPage = 15;

let totalHits;
export function searchFocus() {
  searchQuery.focus();
}

const queryCheck = query => {
  searchQuery.value = query;
  page = 1;
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
    return this.params.get('q');
  },
  set: function (query) {
    this.params.set('q', query);
    this.update();
  },
  remove: function () {
    this.params.delete('q');
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
    console.log(`total`, totalHits);
    if (totalHits > perPage * page) {
      render.showLoadMoreButton();
    }
  },
};

window.addEventListener('load', searchFocus);
['click', 'keydown'].forEach(event =>
  document.body.addEventListener(event, searchFocus)
);

urlHandler.init();
galleryPagination.init();
urlHandler.get() && queryCheck(urlHandler.get());
formHandler();
