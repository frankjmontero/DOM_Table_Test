const elements = {
  table: () => document.createElement('table'),
  row: () => document.createElement('tr'),
  header: () => document.createElement('th'),
  cell: () => document.createElement('td'),
  input: () => document.createElement('input'),
  button: () => document.createElement('button'),
  link: () => document.createElement('a'),
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

export function createHeaderCell(id, text) {
  const newCell = elements.header();

  newCell.setAttribute('id', id);
  newCell.textContent = text;

  return newCell;
}

export function createNormalCell(id, dataType, text) {
  const newCell = elements.cell();
  const type = (dataType) ? dataType : '';

  newCell.setAttribute('id', id);
  newCell.setAttribute('type', type);
  newCell.style.textAlign = 'left';


  switch (type) {
    case 'number' :
      newCell.style.textAlign = 'right';
      newCell.textContent = text;
      break;
    case 'text' :
      newCell.textContent = text;
      break;
    case 'email' :
    case 'url':
      newCell.append(createLink(text, type));
      newCell.setAttribute('class', 'link');
      break;
  }

  return newCell;
}

export function createEdgeCell(id) {
  const newCell = elements.cell();
  
  newCell.setAttribute('id', id);

  return newCell;
}

export function createCheckbox() {
  const newCheckbox = elements.input();

  newCheckbox.setAttribute('type', 'checkbox');

  return newCheckbox;
}

export function createActionButton() {
  const newActionBtn = elements.button();

  newActionBtn.setAttribute('class', 'action-btn');
  
  newActionBtn.textContent = '\u2699';

  return newActionBtn;
}

export function createLink(text, type) {
  const newLink = elements.link();

  newLink.innerText = text;
  
  newLink.setAttribute('target', '_blank');
  newLink.setAttribute('href', text);
  newLink.setAttribute('type', type)

  if (type === 'email') {
    newLink.setAttribute('href', `mailto:${text}`);
  }

  return newLink;
}