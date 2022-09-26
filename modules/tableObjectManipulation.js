import { buildTable, resetTable, getElementTable } from "./tableElementManipulation.js";

export function getTableObject() {
  return JSON.parse(localStorage.getItem('table'));
}

export function setTableObject(newTableObject) {
  localStorage.setItem('table', JSON.stringify(newTableObject));
  // console.log(getTableObject());

  resetTable();
  buildTable(getElementTable(), getTableObject());
}

export function addRow() {
  const tableMap = (getTableObject()) ? getTableObject() : {};
  
  if (!tableMap.rows) {
    tableMap.rows = [];
  }

  const rows = tableMap.rows;
  const rowMap = {
    id: rows.length,
    cells: []
  };
  
  const cellsCount = (tableMap.rows[0]) ? tableMap.rows[0].cells.length : 0;
  for(let i = 0; i < cellsCount; i++) {
    rowMap.cells.push({ text: '' });
  }

  tableMap.rows.push(rowMap);
  
  setTableObject(tableMap);

  return tableMap;
}

export function addColumn(columnHeader, columnType) {
  const tableMap = getTableObject();

  tableMap.rows[0].cells.push({text: columnHeader, type: columnType});

  for (let i = 1; i < tableMap.rows.length; i++) {
    tableMap.rows[i].cells.push({text: ''});
  }

  setTableObject(tableMap);

  return tableMap;

}

export function updateCell(id, newContent) {
  const tableObject = getTableObject();
  const rowNumber = id[0];
  const columnNumber = id[1] - 1;
  tableObject.rows[rowNumber].cells[columnNumber].text = newContent;
  setTableObject(tableObject);
}