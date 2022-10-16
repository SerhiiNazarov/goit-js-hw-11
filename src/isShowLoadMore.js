import { vars } from './vars';

export function isShowLoadMore() {
  return vars.page < vars.totalPages;
}
