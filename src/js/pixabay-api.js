import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

export default async function fetchImages(searchQuery) {
  const myApiKey = '49525829-4ad651e5c3f704318c87db2e9';
  const url = 'https://pixabay.com/api/';

  try {
    const response = await axios.get(url, {
      params: {
        key: myApiKey,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 40,
        safesearch: true,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
