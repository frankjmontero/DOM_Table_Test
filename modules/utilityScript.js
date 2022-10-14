export function getSortOrder() {
  if (sessionStorage.getItem('ascending'))
    return sessionStorage.getItem('ascending');

  return sessionStorage.getItem('ascending');
}

export function setSortOrder(value) {
  sessionStorage.setItem('ascending', value);
}

export function toggleSortOrder() {
  sessionStorage.setItem(
    'ascending',
    getSortOrder() === 'true' ? 'false' : 'true'
  );
}

export function generateRandom(max) {
  return Math.floor(Math.random() * max);
}

export function selectFirstPage() {
  const firstPage = document.getElementsByClassName('page-number-btn')[0];
  firstPage.setAttribute('id', 'displayed-page');
}

export function getCurrentPage() {
  const currentPage = document.getElementById('displayed-page');

  return currentPage ? parseInt(currentPage.textContent) : 1;
}
