
export function getSortOrder() {
  if (sessionStorage.getItem('ascending')) return sessionStorage.getItem('ascending');

  // setSortOrder('true');
  return sessionStorage.getItem('ascending');
}

export function setSortOrder(value) {
  sessionStorage.setItem('ascending', value);
}

export function toggleSortOrder() {
  sessionStorage.setItem('ascending', (getSortOrder() === 'true') ? 'false' : 'true');
}

export function generateRandom(max) {
  return Math.floor(Math.random() * max);
}