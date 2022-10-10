import { createTable } from './modules/elementCreators.js';
import { setAllEventListeners } from './modules/eventsRepository.js';
import { buildPaginatedTable, getElementTable, toggleColumnBtn } from './modules/tableElementManipulation.js';
import { getTableObject } from './modules/tableObjectManipulation.js';
import { setSortOrder } from './modules/utilityScript.js';

window.onload = () => {
  document.querySelector('body').append(createTable());
//   const array = new Uint32Array(10);
//   self.crypto.getRandomValues(array);

// console.log("Your lucky numbers:");
// for (const num of array) {
//   console.log(num);
// }
  
  // getSortOrder();
  setSortOrder(true);

  if (getTableObject()) {
    // buildTable(getElementTable(), getTableObject());
    buildPaginatedTable(getElementTable(), getTableObject());
    toggleColumnBtn();
  }

  setAllEventListeners();
  console.log('page loaded');
}

