const elements = {
  row: () => document.createElement('tr'),
  header: () => document.createElement('th'),
  cell: () => document.createElement('td'),
  input: () => document.createElement("input")
}

export function createRow(table, numberOfColumns, incrementColumnCount) {
  const childrenCount = table.children.length;
  const cellElement = (childrenCount > 0) ? elements.cell() : elements.header();
  const firsCell = (childrenCount > 0) ? elements.cell() : elements.header();
  const newRow = elements.row();
  const checkBox = elements.input();

  checkBox.setAttribute('type', 'checkbox');
  firsCell.append(checkBox);

  newRow.append(firsCell);

  incrementColumnCount();
  numberOfColumns++;
  
  for (let i = 1; i < numberOfColumns; i++) {
    newRow.append(cellElement);
  }

  table.append(newRow);
}

export function createColumn(table, incrementColumnCount) {
  const childrenCount = table.children.length;
  const firsCell = elements.header();
  const cellElement = elements.cell();
  
  incrementColumnCount();
  table.children[0].append(firsCell);
  for (let i = 1; i < childrenCount; i++) {
    table.children[i].append(cellElement);
  }
}