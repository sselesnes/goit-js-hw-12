import axios from 'axios';

export default async function getImagesByQuery(query, page) {
  const myApiKey = '49525829-4ad651e5c3f704318c87db2e9';
  const url = 'https://pixabay.com/api/';

  try {
    const response = await axios.get(url, {
      params: {
        key: myApiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        page: page,
        per_page: 15,
        safesearch: true,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
