import { enableColumnBtn } from './tableElementManipulation.js';
import { addRow } from './tableObjectManipulation.js'

function setGlobalEventListener(type, selector, func) {
  document.addEventListener(type, e => {
    if (e.target.matches(selector)) func(e);
  });
}

export function setEditableCellsEventListener() {
  const headerCellsSelector = 'th:not(:last-child), th:not(:last-child)';
  const normalCellsSelector = 'td:not(:last-child), td:not(:last-child)';

  const makeEditable = e => {
    if (e.detail === 2) e.target.contentEditable = 'true';
  }
  const makeReadOnly = e => {
    if (e.key === 'Enter') e.target.contentEditable = 'false';
  }

  setGlobalEventListener('click', headerCellsSelector, makeEditable);
  setGlobalEventListener('keydown', headerCellsSelector, makeReadOnly);
  setGlobalEventListener('click', normalCellsSelector, makeEditable);
  setGlobalEventListener('keydown', normalCellsSelector, makeReadOnly);
}

export function setBtnsEventListeners() {
  const onNewRowBtnClick = (e) => {
    enableColumnBtn();
    addRow();
  };

  const onNewColumnBtnClick = (e) => {
    console.log('created column');
  };

  setGlobalEventListener('click', '#new-row', onNewRowBtnClick);
  setGlobalEventListener('click', '#new-column', onNewColumnBtnClick);
}

export function getElementTable() {
  return document.getElementById('dynamic-table');
}