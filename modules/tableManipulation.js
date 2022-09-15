import { createTable, createRow, createHeaderCell, createNormalCell, createCheckbox, createActionButton } from './elementCreators.js';


// export function generateTable() {
  
//   const table = createTable();
//   if (!storedTable) return table;

//   return buildTable(table, storedTable);
// }

export function buildTable(table, tableMap) {
  const rowsMap = tableMap.rows;

  rowsMap.forEach(row => {
    table.append(buildRow(row));
  });

  // const row = buildRows('1'); 
  // table.append(row);

  return table;
}

function buildRow(rowMap) {
  const newRow = createRow(rowMap.id);
  const cells = rowMap.cells;
  const middleCellsCallback = (rowMap.id == 1) ? createHeaderCell : createNormalCell;
  const newCheckbox = createCheckbox();
  const newActionBtn = createActionButton();
  let newCell = createNormalCell(`${rowMap.id}1`);

  newCell.append(newCheckbox);
  newRow.append(newCell);

  for (let i = 0; i < cells.length; i++) {
    newCell = middleCellsCallback();
    newCell.textContent = cells[i].text;
    newRow.append(newCell);
  }

  newCell = createNormalCell();
  newCell.append(newActionBtn);
  newRow.append(newCell);

  return newRow;
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