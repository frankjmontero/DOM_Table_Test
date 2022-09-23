import { createRow, createHeaderCell, createNormalCell, createCheckbox, createActionButton, createEdgeCell } from './elementCreators.js';
import { getElementTable } from './utilityScript.js';


export function resetTable() {
  if (getElementTable()) {
    while (getElementTable().firstChild) {
      getElementTable().removeChild(getElementTable().firstChild)
    }
  }
}

export function buildTable(table, tableMap) {
  const rowsMap = tableMap.rows;
  
  rowsMap.forEach(row => {
    table.append(buildRow(row, tableMap.rows[0].cells));
  });

  return table;
}

export function buildRow(rowMap, headerCells) {
  const newRow = createRow(rowMap.id);
  const cells = rowMap.cells;
  const newCheckbox = createCheckbox();
  const newActionBtn = createActionButton();
  let newCell = createEdgeCell(`${rowMap.id}1`);

  newCell.append(newCheckbox);
  newRow.append(newCell);

  if (rowMap.id == 1) {
    for (let i = 0; i < cells.length; i++) {
      newCell = createHeaderCell(`${rowMap.id}${i + 2}`, cells[i].text);
      newRow.append(newCell);
    }
  } else {
    for (let i = 0; i < cells.length; i++) {
      newCell = createNormalCell(`${rowMap.id}${i + 2}`, headerCells[i].type, cells[i].text);
      newRow.append(newCell);
    }
  }

  newCell = createEdgeCell(cells.length + 1);
  newCell.append(newActionBtn);
  newRow.append(newCell);

  return newRow;
}

export function toggleColumnBtn() {
  const newColumnBtn = document.getElementById('new-column');

  if (newColumnBtn.hasAttribute('disabled'))
  newColumnBtn.removeAttribute('disabled');
}