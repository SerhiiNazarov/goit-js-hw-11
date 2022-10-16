import { refs } from './refs';
import { vars } from './vars';

export function clearPage() {
  vars.page = 1;
  refs.galleryRef.innerHTML = ' ';
  refs.loadMoreBtn.classList.add('is-hidden');
}
