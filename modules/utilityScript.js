import { enableColumnBtn } from './tableElementManipulation.js';
import { addRow, addColumn } from './tableObjectManipulation.js'

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
  const newRowModal = document.getElementById('new-column-modal');
  const modalHeaderField = document.getElementById('header');
  const modalTypeList = document.getElementById('type');

  const onNewRowBtnClick = (e) => {
    enableColumnBtn();
    addRow();
  };

  const onNewColumnBtnClick = (e) => {
    newRowModal.style.display = 'block';
  };

  const onModalSubmitClick = (e) => {
    if (modalHeaderField.value.match(/^\s*$/)) {
      alert('Enter a proper header value');
      return;
    }

    addColumn(modalHeaderField.value, modalTypeList.value);
    newRowModal.style.display = 'none';
  }

  setGlobalEventListener('click', '#new-row', onNewRowBtnClick);
  setGlobalEventListener('click', '#new-column', onNewColumnBtnClick);
  setGlobalEventListener('click', '#modal-submit-btn', onModalSubmitClick);
}

export function getElementTable() {
  return document.getElementById('dynamic-table');
}