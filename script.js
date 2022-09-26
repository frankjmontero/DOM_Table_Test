import { buildTable, toggleColumnBtn, getElementTable } from './modules/tableElementManipulation.js'
import { setAllEventListeners } from './modules/eventsRepository.js';
import { getTableObject } from './modules/tableObjectManipulation.js';
import { createTable } from './modules/elementCreators.js'
import { getSortOrder } from './modules/utilityScript.js';

window.onload = () => {
  document.querySelector('body').append(createTable());
  
  getSortOrder();

  if (getTableObject()) {
    buildTable(getElementTable(), getTableObject());
    toggleColumnBtn();
  }

  setAllEventListeners();
}

