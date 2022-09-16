import { createRow, createHeaderCell, createNormalCell, createCheckbox, createActionButton } from './elementCreators.js';
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
    table.append(buildRow(row));
  });

  return table;
}

export function buildRow(rowMap) {
  const newRow = createRow(rowMap.id);
  const cells = rowMap.cells;
  const middleCellsCallback = (rowMap.id == 1) ? createHeaderCell : createNormalCell;
  const newCheckbox = createCheckbox();
  const newActionBtn = createActionButton();
  let newCell = createNormalCell(`${rowMap.id}1`);

  newCell.append(newCheckbox);
  newRow.append(newCell);

  for (let i = 0; i < cells.length; i++) {
    newCell = middleCellsCallback(`${rowMap.id}${i + 2}`);
    newCell.textContent = cells[i].text;
    newRow.append(newCell);
  }

  newCell = createNormalCell(cells.length + 1);
  newCell.append(newActionBtn);
  newRow.append(newCell);

  return newRow;
}

export function addRow(tableObject) {
  const tableMap = {...tableObject};

  if (!tableMap) {
    tableMap.rows = [];
    return tableMap;
  }

  const rows = tableMap.rows;
  const rowMap = {
    id: rows.length + 1,
    cells: []
  };
  
  for(let i = 0; i < tableMap.rows[0].cells.length; i++) {
    rowMap.cells.push({ text: '' });
  }

  tableMap.rows.push(rowMap);
  console.log(tableMap);
  return tableMap;
}

export function enableColumnBtn() {
  const newColumnBtn = document.getElementById('new-column');

  if (newColumnBtn.hasAttribute('disabled'))
  newColumnBtn.removeAttribute('disabled');
}

// function buildRows(id) {
//   const newRow = createRow(id);
//   const tableObject = JSON.parse(storedTable);

//   if (id == 1) {
//     const firstHeaderCell = createHeaderCell(id + '1');
//     const checkBox = createCheckbox();
//     firstHeaderCell.append(checkBox);
//     newRow.append(firstHeaderCell);

//     for ( let i = 0; i < tableObject.rows[0].length; i++) {
//       const centerHeaderCell = createHeaderCell(id + '' + (i + 2));
//       newRow.append(centerHeaderCell);
//     }
//     const actionCell = createHeaderCell(id + '1');
//     newRow.append(actionCell);

//     return newRow;
//   }

//   const firstNormalCell = createNormalCell(id + '1');
//   const checkBox = createCheckbox();
//   firstNormalCell.append(checkBox);
//   newRow.append(firstNormalCell);

//   for ( let i = 0; i < tableObject.rows[0].length; i++) {
//     const centerNormalCell = createNormalCell(id + '' + (i + 2));
//     newRow.append(centerNormalCell);
//   }
//   const actionCell = createNormalCell(id + '1');
//   const newActionBtn = createActionButton();
//   actionCell.append(newActionBtn);
//   newRow.append(actionCell);

//   return newRow;
// }