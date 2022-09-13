import { createRow, createColumn } from "./modules/elementCreators.js";

const parentTable = document.getElementById('dynamic-table');
const newRowBtn = document.getElementById('new-row');
const newColumnBtn = document.getElementById('new-column');
const tableCells = Array.from(document.querySelectorAll('td'));

let columnCount = 1;

function incrementColumnCount() {
  return () => columnCount++;
}

newRowBtn.addEventListener('click', () => {
  createRow(parentTable, columnCount, incrementColumnCount());
  newColumnBtn.removeAttribute('disabled')
});

newColumnBtn.addEventListener('click', () => createColumn(parentTable, incrementColumnCount()))