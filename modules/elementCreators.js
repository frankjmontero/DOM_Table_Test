const elements = {
  table: () => document.createElement('table'),
  row: () => document.createElement('tr'),
  header: () => document.createElement('th'),
  cell: () => document.createElement('td'),
  input: () => document.createElement('input'),
  button: () => document.createElement('button'),
  link: () => document.createElement('a'),
  div: () => document.createElement('div'),
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

  newCell.setAttribute('id', `h${id}`);
  newCell.textContent = text;

  return newCell;
}

export function createNormalCell(id, dataType, text) {
  const newCell = elements.cell();
  const type = (dataType) ? dataType : '';

  newCell.setAttribute('class', `c${id}`);
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
      newCell.classList.add('link');
      break;
  }

  return newCell;
}

export function createEdgeCell(id) {
  const newCell = elements.cell();
  
  newCell.setAttribute('class', `e${id}`);

  return newCell;
}

export function createCheckbox(id, index) {
  const newCheckbox = elements.input();

  newCheckbox.setAttribute('id', `b${id}`);
  newCheckbox.setAttribute('type', 'checkbox');
  newCheckbox.setAttribute('name', (index === 0) 
    ? 
      'all-rows-checker' 
    :
      'row-checker' 
    );

  return newCheckbox;
}

export function createActionButton(rowId) {
  const newActionBtn = elements.input();

  newActionBtn.setAttribute('class', 'action-btn');
  newActionBtn.setAttribute('id', `btn${rowId}`);
  
  // newActionBtn.textContent = '\u2699';

  newActionBtn.setAttribute('type', 'image');
  newActionBtn.setAttribute('src', './sources/settings.png');
  // newActionBtn.style.height = '130%';

  return newActionBtn;
}

export function createActionMenu(rowId) {
  const newDiv = elements.div();
  const innerDiv = elements.div();
  const newBtn = createActionButton(rowId);

  innerDiv.setAttribute('id', `m${rowId}`);
  innerDiv.setAttribute('class', 'menu-options');
  innerDiv.append(createLink('Edit', 'url', '#'));
  innerDiv.append(createLink('Copy (JSON)', 'url', '#'));
  innerDiv.append(createLink('Copy (CSV)', 'url', '#'));
  innerDiv.append(createLink('Delete', 'url', '#'));

  newDiv.append(newBtn);
  newDiv.setAttribute('class', 'row-menu');
  newDiv.append(innerDiv);

  return newDiv;
}

export function createLink(text, type, url) {
  const newLink = elements.link();

  newLink.innerText = text;
  
  if(url) {
    let classAttribute = '';
    switch (text) {
      case 'Edit':
        classAttribute = 'edit';
        break;
      case 'Copy (JSON)':
        classAttribute = 'copy-json';
        break;
      case 'Copy (CSV)':
        classAttribute = 'copy-csv';
        break;
      case 'Delete':
        classAttribute = 'delete';
        break;
    }
    newLink.setAttribute('class', classAttribute);
    newLink.setAttribute('href', url);

  } else {
    newLink.setAttribute('target', '_blank');
    newLink.setAttribute('href', text);  
    newLink.setAttribute('type', type);
  }
  // newLink.setAttribute('target', '_blank');
  // newLink.setAttribute('href', (url) ? url: text);
  // newLink.setAttribute('type', type);
  
  if (type === 'email') {
    newLink.setAttribute('href', `mailto:${text}`);
  }

  return newLink;
}