import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './getImages';
import { createMarkup } from './createMarkup';
import { vars } from './vars';
import { clearPage } from './clearPage';
import { spinnerStop } from './spinner';
import { refs } from './refs';

export async function initPageOnLoadMore() {
  try {
    const data = await getImages(vars.searchQuery);
    const {
      data: { hits },
    } = data;
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        {
          position: 'center-center',
          cssAnimationStyle: 'from-top',
          showOnlyTheLastOne: true,
          clickToClose: true,
        }
      );
      clearPage();
      spinnerStop();
      return;
    }
    refs.galleryRef.insertAdjacentHTML('beforeend', createMarkup(hits));

    let lightbox = new SimpleLightbox('.gallery__link', {
      captionDelay: 250,
      captionsData: 'alt',
    });

    const { height: cardHeight } =
      refs.galleryRef.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    Notiflix.Notify.failure(error.message, 'Oops, something is wrong.', {
      position: 'center-center',
      cssAnimationStyle: 'from-top',
      showOnlyTheLastOne: true,
      clickToClose: true,
    });
    clearPage();
  } finally {
    spinnerStop();
  }
}
