import {
  createRow,
  createHeaderCell,
  createNormalCell,
  createCheckbox,
  createEdgeCell,
  createActionMenu,
  createPageButton,
  createPageButtonsHolder,
} from './elementCreators.js';
import { getTableObject } from './tableObjectManipulation.js';

export const itemsPerPage = 10;

export function resetTable() {
  if (getElementTable()) {
    while (getElementTable().firstChild) {
      getElementTable().removeChild(getElementTable().firstChild);
    }
  }

  if (document.getElementById('page-btns-holder'))
    document.getElementById('page-btns-holder').remove();
}

export function buildPaginatedTable(tableElement, tableMap, pageNumber = 1) {
  pageNumber = parseInt(pageNumber);
  const tableMapCopy = { rows: [] };
  const firstRecord = pageNumber > 1 ? itemsPerPage * (pageNumber - 1) : 0;
  const lastRecord = firstRecord + itemsPerPage;
  const recordsRowsLength = tableMap.rows.length - 1;

  tableMapCopy.rows.push(
    tableMap.rows.shift(),
    ...tableMap.rows.slice(firstRecord, lastRecord)
  );

  resetTable();
  buildTable(tableElement, tableMapCopy);

  if (itemsPerPage < recordsRowsLength) {
    const pageNumberRow = createPagesButtons(recordsRowsLength, pageNumber);
    document.querySelector('body').append(pageNumberRow);
  }
}

function createPagesButtons(recordsLength, page) {
  const pagesCount = Math.ceil(recordsLength / itemsPerPage);
  // console.log(recordsLength, itemsPerPage, pagesCount);
  let newPageButton = createPageButton('Previous');
  newPageButton.classList.add('previous');
  const newPageButtonsHolder = createPageButtonsHolder();

  if (page === 1) {
    newPageButton.disabled = true;
    newPageButton.classList.remove('page-btn');
  }
  newPageButtonsHolder.append(newPageButton);

  for (let i = 0; i < pagesCount; i++) {
    newPageButton = createPageButton(i + 1);
    newPageButtonsHolder.append(newPageButton);
  }

  newPageButton = createPageButton('Next');
  if (page === newPageButtonsHolder.childNodes.length - 1) {
    newPageButton.disabled = true;
    newPageButton.classList.remove('page-btn');
  }
  newPageButtonsHolder.append(newPageButton);
  newPageButton.classList.add('next');

  newPageButtonsHolder.childNodes[page].setAttribute('id', 'displayed-page');

  return newPageButtonsHolder;
}

function buildTable(tableElement, tableMap) {
  const rowsMap = tableMap.rows;

  rowsMap.forEach((row, index) => {
    tableElement.append(buildRow(row, index, tableMap.rows[0].cells));
  });

  return tableElement;
}

export function buildRow(rowMap, index, headerCells) {
  const newRow =
    index == 0 ? createRow(rowMap.id, 'headerRow') : createRow(rowMap.id);
  const cells = rowMap.cells;
  const newCheckbox = createCheckbox(rowMap.id, index);
  const newActionMenu = createActionMenu(rowMap.id);
  let newCell = createEdgeCell(rowMap.id);

  newCell.append(newCheckbox);
  newRow.append(newCell);

  if (index == 0) {
    for (let i = 0; i < cells.length; i++) {
      newCell = createHeaderCell(i, cells[i].text);
      newRow.append(newCell);
    }
  } else if (index > 0) {
    for (let i = 0; i < cells.length; i++) {
      newCell = createNormalCell(i, headerCells[i].type, cells[i].text);
      newRow.append(newCell);
    }
  }

  newCell = createEdgeCell(rowMap.id);
  newCell.append(newActionMenu);
  newCell.style.padding = '0';
  newRow.append(newCell);

  return newRow;
}

export function tableSearch(searchString) {
  const tableMap = getTableObject();
  // const tableElement = getElementTable();
  // resetTable();

  if (searchString.match(/^\s*$/)) {
    return buildPaginatedTable(getElementTable(), tableMap);
  }

  let rowsMap = tableMap.rows;
  const headerRow = rowsMap.shift();

  rowsMap = rowsMap.filter((row) => {
    const found = row.cells.find((cell) =>
      cell.text.toLowerCase().includes(searchString.toLowerCase())
    );
    return !!found;
  });

  tableMap.rows = [headerRow, ...rowsMap];
  buildPaginatedTable(getElementTable(), tableMap);
}

export function toggleColumnBtn() {
  const newColumnBtn = document.getElementById('new-column');

  newColumnBtn.disabled = newColumnBtn.disabled
    ? !newColumnBtn.disabled
    : newColumnBtn.disabled;
}

export function getElementTable() {
  return document.getElementById('dynamic-table');
}

export function toggleDeleteBtn(isBoxChecked) {
  const deleteBtn = document.getElementById('delete-btn');

  if (isBoxChecked) {
    deleteBtn.disabled = !isBoxChecked;
    return;
  }

  deleteBtn.disabled = !isBoxChecked;
}
