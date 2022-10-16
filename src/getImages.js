import Notiflix from 'notiflix';
import { vars } from './vars';

const axios = require('axios').default;
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImages(searchQuery) {
  const url = `?key=30478815-551fa70579656887e760cc436&q=${vars.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${vars.perPage}&page=${vars.page}`;
  try {
    const response = await axios.get(url);

    return response;
  } catch (error) {
    Notiflix.Report.failure(
      error.message,
      'Sorry, there are no images matching your search query. Please try again.',
      {
        position: 'center-center',
        cssAnimationStyle: 'from-top',
        showOnlyTheLastOne: true,
        clickToClose: true,
      }
    );
  }
}
