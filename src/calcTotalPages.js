import { vars } from './vars';

export function calcTotalPages(totalHits) {
  vars.totalPages = Math.ceil(totalHits / vars.perPage);
}
