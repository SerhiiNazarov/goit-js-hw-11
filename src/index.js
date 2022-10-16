import Notiflix from 'notiflix';
import { refs } from './refs';
import { clearPage } from './clearPage';
import { vars } from './vars';
import { isShowLoadMore } from './isShowLoadMore';
import { incrementPage } from './incrementPage';
import { spinnerPlay, spinnerStop } from './spinner';
import { initPageOnLoadMore } from './initPageOnLoadMore';
import { initPageOnSubmit } from './initPageOnSubmit';

refs.formRef.addEventListener('submit', onSubmitClick);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmitClick(event) {
  event.preventDefault();
  vars.searchQuery = event.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
  spinnerPlay();
  clearPage();
  if (!vars.searchQuery) {
    Notiflix.Notify.failure('Enter data to search !', {
      position: 'center-center',
      cssAnimationStyle: 'from-top',
      showOnlyTheLastOne: true,
      clickToClose: true,
    });
    spinnerStop();
    return;
  }
  initPageOnSubmit();
}

function onLoadMore() {
  spinnerPlay();
  incrementPage();
  if (!isShowLoadMore()) {
    refs.loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results.",
      {
        position: 'center-center',
        cssAnimationStyle: 'from-top',
        showOnlyTheLastOne: true,
        clickToClose: true,
      }
    );
    spinnerStop();
  }

  initPageOnLoadMore();
}
