import { buildTable, resetTable } from "./tableElementManipulation.js";
import { getElementTable } from "./utilityScript.js";

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
// let mockTableObject = undefined;

// export const modifyTable = {
//   addRow,
//   addColumn,
//   updateStorage,
// };


export function getTableObject() {
  // JSON.parse
  return mockTableObject;
}

function setTableObject(newTableObject) {
  // Stringify
  mockTableObject = newTableObject;
  resetTable();
  buildTable(getElementTable(), mockTableObject);
}

export function addRow() {
  const tableMap = (getTableObject()) ? getTableObject() : {};
  
  if (!tableMap.rows) {
    tableMap.rows = [];
  }

  const rows = tableMap.rows;
  const rowMap = {
    id: rows.length + 1,
    cells: []
  };
  
  const cellsCount = (tableMap.rows[0]) ? tableMap.rows[0].cells.length : 0;
  for(let i = 0; i < cellsCount; i++) {
    rowMap.cells.push({ text: '' });
  }

  tableMap.rows.push(rowMap);
  
  setTableObject(tableMap);
  console.log(tableMap);
  
  return tableMap;
}