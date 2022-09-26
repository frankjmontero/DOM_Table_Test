import { createRow, createHeaderCell, createNormalCell, createCheckbox, createActionButton, createEdgeCell } from './elementCreators.js';


export function resetTable() {
  if (getElementTable()) {
    while (getElementTable().firstChild) {
      getElementTable().removeChild(getElementTable().firstChild)
    }
  }
}

export function buildTable(tableElement, tableMap) {
  const rowsMap = tableMap.rows;
  
  rowsMap.forEach((row, index) => {
    tableElement.append(buildRow(row, index, tableMap.rows[0].cells));
  });

  return tableElement;
}

export function tableSearch(searchString, tableMap) {
  const tableElement = getElementTable();
  resetTable();

  if (searchString.match(/^\s*$/)) {
    return buildTable(getElementTable(), tableMap);
  }

  const rowsMap = tableMap.rows;

  resetTable();
  rowsMap.forEach((row, i) =>{
    if (i === 0) {
      tableElement.append(buildRow(row, i, tableMap.rows[0].cells));
      return;
    }

    let found;
    found = row.cells.find(cell => cell.text.toLowerCase().includes(searchString.toLowerCase()));
    if (found) tableElement.append(buildRow(row, i, tableMap.rows[0].cells));
  });
}

export function buildRow(rowMap, index, headerCells) {
  const newRow = createRow(index);
  const cells = rowMap.cells;
  const newCheckbox = createCheckbox(rowMap.id);
  const newActionBtn = createActionButton();
  let newCell = createEdgeCell(`${index}0`);

  newCell.append(newCheckbox);
  newRow.append(newCell);

  if (index == 0) {
    for (let i = 0; i < cells.length; i++) {
      newCell = createHeaderCell(`${index}${i + 1}`, cells[i].text);
      newRow.append(newCell);
    }
  } else {
    for (let i = 0; i < cells.length; i++) {
      newCell = createNormalCell(`${index}${i + 1}`, headerCells[i].type, cells[i].text);
      newRow.append(newCell);
    }
  }

  newCell = createEdgeCell(`${index}${cells.length + 1}`);
  newCell.append(newActionBtn);
  newCell.style.padding = '0';
  newRow.append(newCell);

  return newRow;
}

export function toggleColumnBtn() {
  const newColumnBtn = document.getElementById('new-column');

  if (newColumnBtn.hasAttribute('disabled'))
  newColumnBtn.removeAttribute('disabled');
}

export function getElementTable() {
  return document.getElementById('dynamic-table');
}