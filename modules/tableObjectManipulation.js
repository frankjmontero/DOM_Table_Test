import { generateRandom } from './utilityScript.js';

export function getTableObject() {
  return JSON.parse(localStorage.getItem('table'));
}

export function setTableObject(newTableObject) {
  localStorage.setItem('table', JSON.stringify(newTableObject));
}

export function addRow() {
  const tableMap = getTableObject() ? getTableObject() : { rows: [] };

  setTableObject(tableMap);

  const rows = tableMap.rows;
  const rowMap = {
    id: `r${getRandomNumber()}`,
    cells: [],
  };

  const cellsCount = rows[0] ? rows[0].cells.length : 0;
  for (let i = 0; i < cellsCount; i++) {
    rowMap.cells.push({ text: '' });
  }

  rows.push(rowMap);

  setTableObject(tableMap);

  return tableMap;
}

export function addColumn(columnHeader, columnType) {
  const tableMap = getTableObject();

  tableMap.rows[0].cells.push({ text: columnHeader, type: columnType });

  for (let i = 1; i < tableMap.rows.length; i++) {
    tableMap.rows[i].cells.push({ text: '' });
  }

  setTableObject(tableMap);

  return tableMap;
}

export function updateCell(rowId, id, newContent) {
  const tableMap = getTableObject();
  const rowNumber = tableMap.rows.findIndex((row) => row.id == rowId);
  const cellNumber = id[1];

  tableMap.rows[rowNumber].cells[cellNumber].text = newContent;

  localStorage.setItem('table', JSON.stringify(tableMap));
}

export function deleteRecord(recordNumber) {
  if (!recordNumber) return;

  const tableMap = getTableObject();
  const rowNumber = tableMap.rows.findIndex((row) => row.id == recordNumber);

  tableMap.rows.splice(parseInt(rowNumber), 1);

  setTableObject(tableMap);
}

const getRandomNumber = () => {
  let randomNumber = 0,
    count = 0;
  let found = true;
  const tableMap = getTableObject();
  let idMaxLength = 10;

  while (found) {
    count++;
    if (count > idMaxLength) idMaxLength++;
    randomNumber = generateRandom(idMaxLength);
    if (tableMap) {
      found = !!tableMap.rows.find((row) => {
        return row.id == `r${randomNumber}`;
      });
    }
  }
  return randomNumber;
};

export function getRowJson(rowId) {
  const tableMap = getTableObject();
  const jsonReadyRow = [];
  const dataCells = tableMap.rows.find((row) => row.id == rowId).cells;
  const headerCells = tableMap.rows[0].cells;

  dataCells.forEach((cell, i) => {
    jsonReadyRow.push({ [headerCells[i].text]: cell.text });
  });

  return JSON.stringify(jsonReadyRow);
}

export function getRowCsv(rowId) {
  const tableMap = getTableObject();
  let csvReadyRow = '';
  const dataCells = tableMap.rows.find((row) => row.id == rowId).cells;
  const headerCells = tableMap.rows[0].cells;

  headerCells.forEach((cell, i, arr) => {
    csvReadyRow += `${cell.text}`;
    if (i < arr.length - 1) csvReadyRow += ', ';
  });
  csvReadyRow += '\n';
  dataCells.forEach((cell, i, arr) => {
    csvReadyRow += `${cell.text}`;
    if (i < arr.length - 1) csvReadyRow += ', ';
  });

  return csvReadyRow;
}
