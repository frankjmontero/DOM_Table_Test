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

export function resetTable() {
  if (getElementTable()) {
    while (getElementTable().firstChild) {
      getElementTable().removeChild(getElementTable().firstChild);
    }
  }

  if (document.getElementById('page-btns-holder'))
    document.getElementById('page-btns-holder').remove();
}

const itemsPerPage = 5;

export function buildPaginatedTable(tableElement, tableMap, pageNumber = 0) {
  pageNumber = parseInt(pageNumber);
  const tableMapCopy = { rows: [] };
  // const firstRecord = (pageNumber > 1) ? itemsPerPage * (pageNumber - 1) + 1 : 1;
  const firstRecord = pageNumber > 1 ? itemsPerPage * (pageNumber - 1) : 0;
  const lastRecord = firstRecord + itemsPerPage;
  const recordsRowsLength = tableMap.rows.length;

  // tableMapCopy.rows.push(tableMap.rows[0]);
  // tableMapCopy.rows.push(...tableMap.rows.slice(firstRecord, lastRecord));
  // tableMapCopy.rows = tableMap.rows.slice(firstRecord, lastRecord);
  tableMapCopy.rows.push(
    tableMap.rows.shift(),
    ...tableMap.rows.slice(firstRecord, lastRecord)
  );

  resetTable();
  buildTable(tableElement, tableMapCopy);
  if (itemsPerPage < recordsRowsLength)
    document.querySelector('body').append(addPagesButtons(recordsRowsLength));
}

function addPagesButtons(recordsLength) {
  const pagesCount = Math.ceil(recordsLength / itemsPerPage);
  let newPageButton = createPageButton('Previous');
  newPageButton.classList.add('previous');
  // disablePagesNavBtn(newPageButton, true);
  const newPageButtonsHolder = createPageButtonsHolder();

  newPageButtonsHolder.append(newPageButton);

  for (let i = 0; i < pagesCount; i++) {
    newPageButton = createPageButton(i + 1);
    newPageButtonsHolder.append(newPageButton);
  }

  // newPageButtonsHolder.children[1].setAttribute('id', 'displayed-page');

  newPageButton = createPageButton('Next');
  newPageButtonsHolder.append(newPageButton);
  newPageButton.classList.add('next');

  // const pagesArea = document.getElementById('page-numbers-area');

  // pagesArea.append(newPageButtonsHolder);
  return newPageButtonsHolder;
  // console.log(pagesCount);
}

export function buildTable(tableElement, tableMap) {
  const rowsMap = tableMap.rows;

  rowsMap.forEach((row, index) => {
    tableElement.append(buildRow(row, index, tableMap.rows[0].cells));
  });

  return tableElement;
}

export function buildRow(rowMap, index, headerCells) {
  const newRow = createRow(rowMap.id);
  const cells = rowMap.cells;
  // console.log(rowMap.id);
  const newCheckbox = createCheckbox(rowMap.id, index);
  const newActionMenu = createActionMenu(rowMap.id);
  let newCell = createEdgeCell(rowMap.id);

  newCell.append(newCheckbox);
  newRow.append(newCell);

  if (index == 0) {
    // console.log(newRow);
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

export function tableSearch(searchString, tableMap) {
  const tableElement = getElementTable();
  resetTable();

  if (searchString.match(/^\s*$/)) {
    return buildTable(getElementTable(), tableMap);
  }

  const rowsMap = tableMap.rows;

  resetTable();
  rowsMap.forEach((row, i) => {
    if (i === 0) {
      tableElement.append(buildRow(row, i, tableMap.rows[0].cells));
      return;
    }

    let found;
    found = row.cells.find((cell) =>
      cell.text.toLowerCase().includes(searchString.toLowerCase())
    );
    if (found) tableElement.append(buildRow(row, i, tableMap.rows[0].cells));
  });
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

export function disablePagesNavBtn(btn, shouldEnable) {
  // if (shouldEnable) {
  //   btn.disabled = shouldEnable;
  //   btn.classList.toggle('page-btn');
  //   return;
  // }

  btn.disabled = shouldEnable;
  if (shouldEnable) {
    btn.classList.remove('page-btn');
    return;
  }
  btn.classList.add('page-btn');
}
