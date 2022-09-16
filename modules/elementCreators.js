const elements = {
  table: () => document.createElement('table'),
  row: () => document.createElement('tr'),
  header: () => document.createElement('th'),
  cell: () => document.createElement('td'),
  input: () => document.createElement('input'),
  button: () => document.createElement('button'),
}


export function createTable() {
  const newTable = elements.table();

  newTable.setAttribute('id', 'dynamic-table');

  return newTable;
}

export function createRow(id) {
   const newRow = elements.row();

   newRow.setAttribute('id', id);

   return newRow;
}

export function createHeaderCell(id) {
  const newCell = elements.header();

  newCell.setAttribute('id', id);

  return newCell;
}

export function createNormalCell(id) {
  const newCell = elements.cell();

  newCell.setAttribute('id', id);

  return newCell;
}

export function createCheckbox() {
  const newCheckbox = elements.input();

  newCheckbox.setAttribute('type', 'checkbox');
  // newCheckbox.setAttribute('id', id);

  return newCheckbox;
}

export function createActionButton() {
  const newActionBtn = elements.button();

  return newActionBtn;
}



// export function createRow(table, numberOfColumns, incrementColumnCount) {
//   const childrenCount = table.children.length;
//   const cellElement = (childrenCount > 0) ? createCell() : elements.header();
//   const firsCell = (childrenCount > 0) ? createCell() : elements.header();
//   const newRow = elements.row();
//   const checkBox = elements.input();

//   checkBox.setAttribute('type', 'checkbox');
//   firsCell.append(checkBox);

//   newRow.append(firsCell);

//   incrementColumnCount();
//   numberOfColumns++;
  
//   for (let i = 1; i < numberOfColumns; i++) {
//     newRow.append(cellElement);
//   }

//   table.append(newRow);
// }

// export function createColumn(table, incrementColumnCount) {
//   const childrenCount = table.children.length;
//   const firsCell = elements.header();
//   const cellElement = createCell();
  
//   incrementColumnCount();
//   table.children[0].append(firsCell);
//   for (let i = 1; i < childrenCount; i++) {
//     table.children[i].append(cellElement);
//   }
// }

// function createCell() {
//   const cell = elements.cell();
  
//   cell.addEventListener('click', (e) => {
//     if (e.detail === 2) cell.contentEditable = 'true';
//   });
//   cell.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter') cell.contentEditable = 'false';
//   });

//   return cell;

// }