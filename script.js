import { createTable } from './modules/elementCreators.js';
import { setAllEventListeners } from './modules/eventsRepository.js';
import {
  buildPaginatedTable,
  getElementTable,
  toggleColumnBtn,
} from './modules/tableElementManipulation.js';
import { getTableObject } from './modules/tableObjectManipulation.js';
import { selectFirstPage, setSortOrder } from './modules/utilityScript.js';

window.onload = () => {
  document.querySelector('body').append(createTable());

  setSortOrder(true);

  if (getTableObject()) {
    buildPaginatedTable(getElementTable(), getTableObject());
    toggleColumnBtn();
    selectFirstPage();
  }

  setAllEventListeners();
  console.log('page loaded');
};
