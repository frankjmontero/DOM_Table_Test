import { buildTable, resetTable } from "./tableElementManipulation.js";
import { getElementTable } from "./utilityScript.js";

let mockTableObject = {
  rows: [
    {
      id: 1, 
      cells: [
        {
          text: 'Id',
          type: 'number'
        },
        {
          text: 'Name',
          type: 'text'
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

export function addColumn(columnHeader, columnType) {
  const tableMap = getTableObject();

  tableMap.rows[0].cells.push({text: columnHeader, type: columnType});

  for (let i = 1; i < tableMap.rows.length; i++) {
    tableMap.rows[i].cells.push({text: ''});
  }

  setTableObject(tableMap);
  console.log(mockTableObject);

  return tableMap;

}