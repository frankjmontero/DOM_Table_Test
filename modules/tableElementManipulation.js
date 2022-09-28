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
  const newRow = createRow(rowMap.id);
  const cells = rowMap.cells;
  // console.log(rowMap.id);
  const newCheckbox = createCheckbox(rowMap.id);
  const newActionBtn = createActionButton();
  let newCell = createEdgeCell(rowMap.id);

  newCell.append(newCheckbox);
  newRow.append(newCell);

  if (index == 0) {
    for (let i = 0; i < cells.length; i++) {
      newCell = createHeaderCell(i, cells[i].text);
      newRow.append(newCell);
    }
  } else {
    for (let i = 0; i < cells.length; i++) {
      newCell = createNormalCell(i, headerCells[i].type, cells[i].text);
      newRow.append(newCell);
    }
  }

  newCell = createEdgeCell(rowMap.id);
  newCell.append(newActionBtn);
  newCell.style.padding = '0';
  newRow.append(newCell);

  return newRow;
}

export function toggleColumnBtn() {
  const newColumnBtn = document.getElementById('new-column');

  newColumnBtn.disabled = (newColumnBtn.disabled) ? !newColumnBtn.disabled : newColumnBtn.disabled;
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