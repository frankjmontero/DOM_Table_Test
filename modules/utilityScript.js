
export function getSortOrder() {
  if (localStorage.getItem('ascending')) return localStorage.getItem('ascending');

  setSortOrder('true');
  return localStorage.getItem('ascending');
}

export function setSortOrder(value) {
  localStorage.setItem('ascending', value);
}

export function toggleSortOrder() {
  localStorage.setItem('ascending', (getSortOrder() === 'true') ? 'false' : 'true');
}

export function generateRandom(max) {
  return Math.floor(Math.random() * max);
}