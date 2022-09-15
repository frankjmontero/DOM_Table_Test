import { buildTable} from './modules/tableManipulation.js'
import { setEditableCellsEventListener, createTable } from './modules/elementCreators.js';

const mockTableObject = {
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

const pageBody = document.querySelector('body');
const newRowBtn = document.getElementById('new-row');
const newColumnBtn = document.getElementById('new-column')
// const storedTable = JSON.parse(localStorage.getItem('table'));
const storedTable = (() => mockTableObject)();

console.log(storedTable);

window.onload = () => {
  const mainTbl = createTable();
  pageBody.append(mainTbl);

  if (storedTable) {
    buildTable(mainTbl, storedTable);
    newColumnBtn.removeAttribute('disabled');
  }

  setEditableCellsEventListener();
  newRowBtn.addEventListener('click', () => {
    newColumnBtn.removeAttribute('disabled');
  });
  newColumnBtn.addEventListener('click', () => {
    console.log('created column');
  });
}