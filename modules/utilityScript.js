import { addRow, buildTable, resetTable } from './tableManipulation.js';

let mockTableObject = {
  rows: [
    {
      id: 1, 
      cells: [
        {
          text: 'Id'
        },
        {
          text: 'Name'
        },
      ]
    },
    {
      id: 2,
      cells: [
        {
          text: '1'
        },
        {
          text: 'Jeremy'
        },
      ]
    },
  ]
}


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
    mockTableObject = addRow(mockTableObject);
    resetTable();
    buildTable(getTable(), mockTableObject);
  };

  const onNewColumnBtnClick = (e) => {
    console.log('created column');
  };

  setGlobalEventListener('click', '#new-row', onNewRowBtnClick);
  setGlobalEventListener('click', '#new-column', onNewColumnBtnClick);
}

export function enableColumnBtn() {
  const newColumnBtn = document.getElementById('new-column');

  if (newColumnBtn.hasAttribute('disabled'))
  newColumnBtn.removeAttribute('disabled');
}

export function getTable() {
  return document.getElementById('dynamic-table');
}