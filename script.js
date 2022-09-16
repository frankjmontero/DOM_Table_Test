import { buildTable, enableColumnBtn } from './modules/tableElementManipulation.js'
import { createTable } from './modules/elementCreators.js';
import { setEditableCellsEventListener, setBtnsEventListeners, getElementTable } from './modules/utilityScript.js';
import { getTableObject } from './modules/tableObjectManipulation.js';

// const mockTableObject = {
//   rows: [
//     {
//       id: 1, 
//       cells: [
//         {
//           text: 'Id'
//         },
//         {
//           text: 'Name'
//         },
//       ]
//     },
//     {
//       id: 2,
//       cells: [
//         {
//           text: '1'
//         },
//         {
//           text: 'Jeremy'
//         },
//       ]
//     },
//   ]
// }
// const mockTableObject = null;


const pageBody = document.querySelector('body');
const newRowBtn = document.getElementById('new-row');
const newColumnBtn = document.getElementById('new-column')
// const storedTable = JSON.parse(localStorage.getItem('table'));
// const storedTable = (() => mockTableObject)();

// console.log(storedTable);

window.onload = () => {
  // const mainTbl = createTable();
  // pageBody.append(mainTbl);

  if (getTableObject()) {
    buildTable(getElementTable(), getTableObject());
    enableColumnBtn();
  }

  setAllEventListeners();
}

function setAllEventListeners() {
  setEditableCellsEventListener();
  setBtnsEventListeners();
}