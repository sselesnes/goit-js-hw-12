import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getImagesByQuery from './js/pixabay-api';
import * as render from './js/render-functions';

const searchForm = document.querySelector('.form');
const searchInputField = searchForm.elements['search-text'];
export const loadMoreBtn = document.querySelector('.load-more');
export const perPage = 15;
export let page = 1;
let totalImages;

const queryCheck = query => {
  // Якщо виклик був з urlHandler - підставляємо значення query у поле для вводу
  // Якщо виклик був з formHandler - query дорівнює searchInputField.value тому нічого не змінюється
  searchInputField.value = query;
  if (!query) {
    urlHandler.remove();
    iziToast.warning({
      message: 'Sorry, the request cannot be empty. Please try again!',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }
  queryFetch(query);
};

const queryFetch = async query => {
  render.hideLoadMoreButton();
  render.showLoader();

  try {
    // Отримуємо відповідь з сервера
    const fetchResultJSON = await getImagesByQuery(query, page);
    totalImages = fetchResultJSON.totalHits;
    if (totalImages) {
      // Перевіряємо чи потрібна кнопка "Load more"
      galleryPagination.handle();
      urlHandler.set(query);
      // hits - масив з зображенями
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
  } catch (error) {
    iziToast.error({
      message: `Sorry, there was an "${error}" with your query. Please try again later!`,
      position: 'topRight',
      timeout: 2000,
    });
  } finally {
    render.hideLoader();
  }
};

const galleryPagination = {
  init: () => {
    loadMoreBtn.addEventListener('click', event => {
      if (event.target === loadMoreBtn) {
        // При натисканні "Load more" - збільшуємо номер сторінки та робимо запит на сервер
        page++;
        queryFetch(searchInputField.value);
      }
    });
  },

  handle: () => {
    // Чи є картинки для наступної сторінки?
    if (totalImages > perPage * page) {
      render.showLoadMoreButton();
    } else {
      render.hideLoadMoreButton();
      if (totalImages) {
        iziToast.info({
          message: `We're sorry, but you've reached the end of search results.`,
          position: 'topRight',
          timeout: 2000,
        });
      }
    }
  },
};

const formHandler = () => {
  searchForm.addEventListener('submit', event => {
    if (event.target === searchForm) {
      event.preventDefault();
      // Після відправки форми очищуємо номер сторінки, галерею та прибираємо параметри з URL
      page = 1;
      render.clearGallery();
      urlHandler.remove();
      queryCheck(searchInputField.value.trim());
    }
  });
};

const urlHandler = {
  // Отримуємо url, params - строку пошуку та номер сторінки
  init: function () {
    this.url = new URL(window.location.href);
    this.params = new URLSearchParams(this.url.search);
  },
  // Оновлюємо номер сторінки, якщо він вказаний в URL
  get: function () {
    page = this.params.get('p') ?? page;
    return this.params.get('q');
  },
  // Готуємо params для оновлення строки браузера
  set: function (query) {
    this.params.set('q', query);
    // Прибираємо номер сторінки з url, якщо він дорівнює 1
    page !== 1 && this.params.set('p', page);
    this.update();
  },
  // Оновлюємо params строки пошуку браузера
  update: function () {
    this.url.search = this.params.toString();
    window.history.pushState({}, '', `${this.url}`);
  },
  // Видаляємо params зі строки пошуку браузера
  remove: function () {
    this.params.delete('q');
    this.params.delete('p');
    this.update();
  },
};

// Фокусуємо поле введення одразу після завантаження сторінки або при натисканні клавіш
['load', 'keydown'].forEach(event =>
  window.addEventListener(event, () => searchInputField.focus())
);

urlHandler.init();
galleryPagination.init();
// Перевірка url params на наявність query та номеру сторінки
urlHandler.get() && queryCheck(urlHandler.get());
// Запуск слухача форми та всієї логіки
formHandler();
