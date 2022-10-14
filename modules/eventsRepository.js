import {
  getElementTable,
  tableSearch,
  toggleColumnBtn,
  toggleDeleteBtn,
  buildPaginatedTable,
  itemsPerPage,
} from './tableElementManipulation.js';
import {
  addRow,
  addColumn,
  updateCell,
  getTableObject,
  setTableObject,
  deleteRecord,
  getRowJson,
  getRowCsv,
} from './tableObjectManipulation.js';
import {
  getCurrentPage,
  getSortOrder,
  toggleSortOrder,
} from './utilityScript.js';

function setGlobalEventListener(type, selector, func) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) func(e);
  });
}

const makeElementEditable = (element) => {
  element.contentEditable = true;
};

const dataCellDoubleClickHandler = (e) => {
  makeElementEditable(e.target);

  e.target.focus({ focusVisible: true });
};

const dataCellsEnterKeyPressHandler = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    let elementText = e.target.textContent;
    const cellType = e.target.getAttribute('type');
    let cellColor = 'black';
    let elementId = e.target.closest('[class]').classList[0];
    const fatherId = e.target.closest('tr').id;

    console.log(elementId, fatherId);

    e.target.contentEditable = 'false';

    const errorHandler = (errorMsg) => {
      alert(errorMsg);
      dataCellDoubleClickHandler(e);
      e.target.style.borderColor = 'red';
    };

    switch (cellType) {
      case 'number':
        if (elementText.match(/[^0-9]/)) {
          errorHandler('Only numbers permitted');
          return;
        }
        break;
      case 'text':
        if (elementText.match(/^\s*$/)) {
          errorHandler('No empty value allowed');
          return;
        }
        break;
      case 'email':
        if (
          !elementText.match(
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
          )
        ) {
          errorHandler('Not a valid Email');
          return;
        }
        break;
      case 'url':
        if (
          !elementText.match(
            /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi
          )
        ) {
          errorHandler('Enter a valid web address');
          return;
        }
        break;
    }
    updateCell(fatherId, elementId, elementText);
    e.target.style.borderColor = cellColor;
  }
};

const anchorClickHandler = (e) => {
  if (!e.ctrlKey) e.preventDefault();
};

const headerClickHandler = (e) => {
  const tableMap = getTableObject();
  const headerObject = tableMap.rows.shift();
  const cellNumber = parseInt(e.target.getAttribute('id')[1]);
  const headerType = headerObject.cells[cellNumber].type;

  const sortNumbers = (a, b) => {
    let firstValue = parseInt(a.cells[cellNumber].text);
    let secondValue = parseInt(b.cells[cellNumber].text);

    if (getSortOrder() === 'true') {
      return firstValue - secondValue;
    }
    return secondValue - firstValue;
  };

  const sortStrings = (a, b) => {
    let firstValue = a.cells[cellNumber].text.toLowerCase();
    let secondValue = b.cells[cellNumber].text.toLowerCase();

    if (getSortOrder() === 'true') {
      if (firstValue < secondValue) return -1;
      if (firstValue > secondValue) return 1;
      return 0;
    }
    if (firstValue < secondValue) return 1;
    if (firstValue > secondValue) return -1;
    return 0;
  };

  tableMap.rows.sort(headerType === 'number' ? sortNumbers : sortStrings);
  toggleSortOrder();
  console.log('sorted and toggled');

  tableMap.rows.unshift(headerObject);
  setTableObject(tableMap);
  buildPaginatedTable(getElementTable(), getTableObject());
};

const dataCheckboxSelector = 'input[name="row-checker"]';

const queryCheckBoxes = () => {
  const allCheckboxes = document.querySelectorAll(dataCheckboxSelector);
  let areAllUnchecked = true;

  allCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) areAllUnchecked = false;
  });

  return areAllUnchecked;
};

const firstCheckboxClickHandler = (e) => {
  const allDataCheckboxes = document.querySelectorAll(dataCheckboxSelector);
  const isElementChecked = e.target.checked;

  allDataCheckboxes.forEach((checkbox) => {
    const elementRow = checkbox.closest('tr');

    checkbox.checked = isElementChecked;
    if (isElementChecked) {
      elementRow.classList.add('highlighted-row');
      return;
    }
    elementRow.classList.remove('highlighted-row');
  });

  toggleDeleteBtn(isElementChecked);
};

const dataRowsCheckboxClickHandler = (e) => {
  const isElementChecked = e.target.checked;
  const elementRow = e.target.closest('tr');

  if (isElementChecked) {
    elementRow.classList.add('highlighted-row');
    toggleDeleteBtn(isElementChecked);
    return;
  }

  elementRow.classList.remove('highlighted-row');
  if (queryCheckBoxes()) toggleDeleteBtn(isElementChecked);
};

const dragRowMouseDownHandler = (e) => {
  if (e.ctrlKey) e.target.closest('tr').draggable = 'true';
};

const dragColumnMouseDownHandler = (e) => {
  if (e.ctrlKey) e.target.draggable = 'true';
};

/* TODO Make headers editable */
function setCellsEventListeners() {
  const anchorSelector = 'a';
  const headerSelector = 'th';
  const editableElementsSelector = `${headerSelector}, td:not(:first-child, :last-child, .link), ${anchorSelector}`;
  const headerCheckboxSelector = 'input[name="all-rows-checker"]';
  const dataCellSelector = 'tr:not(:nth-of-type(1)) td';

  setGlobalEventListener(
    'dblclick',
    editableElementsSelector,
    dataCellDoubleClickHandler
  );
  setGlobalEventListener(
    'keydown',
    editableElementsSelector,
    dataCellsEnterKeyPressHandler
  );
  setGlobalEventListener('click', anchorSelector, anchorClickHandler);
  setGlobalEventListener('click', headerSelector, headerClickHandler);
  setGlobalEventListener(
    'click',
    headerCheckboxSelector,
    firstCheckboxClickHandler
  );
  setGlobalEventListener(
    'click',
    dataCheckboxSelector,
    dataRowsCheckboxClickHandler
  );
  setGlobalEventListener(
    'mousedown',
    dataCellSelector,
    dragRowMouseDownHandler
  );
  setGlobalEventListener(
    'mousedown',
    headerSelector,
    dragColumnMouseDownHandler
  );
}

const startingDragHandler = (e) => {
  e.dataTransfer.setData('text/plain', e.target.id);
  e.dataTransfer.effectAllowed = 'move';
};

const overDragHandler = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};

const rowDropHandler = (e) => {
  console.log('drag row');
  e.preventDefault();
  const draggingRowId = e.dataTransfer.getData('text/plain');
  const draggingRow = document.getElementById(draggingRowId);
  const tableElement = getElementTable();

  console.log(draggingRowId, draggingRow);

  if (draggingRow.draggable) draggingRow.removeAttribute('draggable');
  tableElement.insertBefore(draggingRow, e.target.closest('tr'));
};

const columnDropHandler = (e) => {
  console.log('drag column');
  e.preventDefault();
  const draggingHeaderId = e.dataTransfer.getData('text/plain');
  const draggingHeader = document.getElementById(draggingHeaderId);
  const originColumn = draggingHeader.cellIndex;
  const targetColumn = e.target.cellIndex;
  const tableRows = document.querySelectorAll('tr');

  console.log(draggingHeader, originColumn, targetColumn);

  draggingHeader.removeAttribute('draggable');
  tableRows.forEach((row) => {
    const rowCells = row.children;
    // console.log(rowCells[originColumn], rowCells[targetColumn]);
    row.insertBefore(rowCells[originColumn], rowCells[targetColumn]);
  });
};

export function setDragAndDropEvents(element) {
  element.addEventListener('dragstart', startingDragHandler);
  element.addEventListener('dragover', overDragHandler);
  // if (element.nodeName.toLowerCase() === 'tr') {
  if (element.id[0] === 'h') {
    element.addEventListener('drop', columnDropHandler);
    return;
  }
  if (!element.classList.contains('headerRow'))
    element.addEventListener('drop', rowDropHandler);
}

const newRowModal = document.getElementById('new-column-modal');
const modalHeaderField = document.getElementById('header');
const modalTypeList = document.getElementById('type');

const newRowBtnClickHandler = () => {
  // let page = document.getElementsByClassName('page-number-btn').length;

  toggleColumnBtn();
  addRow();

  const tableObject = getTableObject();
  // console.log(page);

  // page = tableObject.rows.length % 5 === 2 ? ++page : page;
  const page =
    tableObject.rows.length % itemsPerPage > 1
      ? Math.ceil(tableObject.rows.length / itemsPerPage)
      : Math.floor(tableObject.rows.length / itemsPerPage);
  buildPaginatedTable(getElementTable(), tableObject, page);
};

const newColumnBtnClickHandler = () => {
  newRowModal.style.display = 'block';
  modalHeaderField.focus();
};

const modalSubmitClickHandler = () => {
  if (modalHeaderField.value.match(/^\s*$/)) {
    alert('Enter a proper header value');
    return;
  }

  addColumn(modalHeaderField.value, modalTypeList.value);
  newRowModal.style.display = 'none';
  buildPaginatedTable(getElementTable(), getTableObject(), getCurrentPage());
};

const modalCloseClickHandler = () => {
  newRowModal.style.display = 'none';
};

const deleteBtnClickHandler = () => {
  const allCheckboxes = document.querySelectorAll(dataCheckboxSelector);

  if (
    confirm(
      '\nThis action will delete the selected row\\s.\n\nDo you wish to continue?'
    )
  ) {
    allCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const rowId = checkbox.closest('tr').id;
        deleteRecord(rowId);
      }
    });
    buildPaginatedTable(getElementTable(), getTableObject());

    toggleDeleteBtn(false);
  }
};

const actionBtnClickHandler = (e) => {
  const optionsMenus = document.getElementsByClassName('menu-options');
  for (let i = 0; i < optionsMenus.length; i++) {
    const openMenu = optionsMenus[i];
    if (openMenu.classList.contains('open-menu')) {
      openMenu.classList.remove('open-menu');
    }
  }

  const rowId = e.target.closest('tr').id;
  document.getElementById(`m${rowId}`).classList.toggle('open-menu');
};

const pageNumberBtnClickHandler = (e) => {
  buildPaginatedTable(
    getElementTable(),
    getTableObject(),
    e.target.textContent
  );
};

const nextBtnClickHandler = () => {
  const currentPageBtn = document.querySelector('button[id= "displayed-page"]')
    ? document.querySelector('button[id= "displayed-page"]')
    : document.getElementById('page-btns-holder').firstElementChild
        .nextElementSibling;
  const nextPageBtn = currentPageBtn.nextElementSibling;

  buildPaginatedTable(
    getElementTable(),
    getTableObject(),
    nextPageBtn.textContent
  );
};

const prevBtnClickHandler = () => {
  const currentPageBtn = document.querySelector('button[id= "displayed-page"]')
    ? document.querySelector('button[id= "displayed-page"]')
    : document.getElementById('page-btns-holder').lastElementChild;
  const prevPageBtnCaption = currentPageBtn.previousElementSibling.textContent;

  buildPaginatedTable(getElementTable(), getTableObject(), prevPageBtnCaption);
};

function setBtnsEventListeners() {
  setGlobalEventListener('click', '#new-row', newRowBtnClickHandler);
  setGlobalEventListener('click', '#new-column', newColumnBtnClickHandler);
  setGlobalEventListener('click', '#modal-submit-btn', modalSubmitClickHandler);
  setGlobalEventListener('click', '#modal-close-btn', modalCloseClickHandler);
  setGlobalEventListener('click', '#delete-btn', deleteBtnClickHandler);
  setGlobalEventListener('click', '.action-btn', actionBtnClickHandler);
  setGlobalEventListener(
    'click',
    '.page-number-btn',
    pageNumberBtnClickHandler
  );
  setGlobalEventListener('click', '.next', nextBtnClickHandler);
  setGlobalEventListener('click', '.previous', prevBtnClickHandler);
}

const onInput = (e) => {
  tableSearch(e.target.value);
};

const onWindowClick = (e) => {
  if (!e.target.matches('.action-btn')) {
    const optionsMenus = document.getElementsByClassName('menu-options');

    for (let i = 0; i < optionsMenus.length; i++) {
      var openMenu = optionsMenus[i];
      if (openMenu.classList.contains('open-menu')) {
        openMenu.classList.remove('open-menu');
      }
    }
  }
};

function setOtherEventListeners() {
  setGlobalEventListener('input', '#search', onInput);
  window.addEventListener('click', onWindowClick);
}

const onEditMenuClick = (e) => {
  const elementRowChildren = e.target.closest('tr').children;

  let i = 1;
  for (i = 1; i < elementRowChildren.length - 2; i++) {
    makeElementEditable(elementRowChildren[i]);
  }
  makeElementEditable(elementRowChildren[i].children[0]);
};

const onDeleteMenuClick = (e) => {
  if (
    confirm(
      '\nThis action will delete the selected row.\n\nDo you wish to continue?'
    )
  ) {
    const elementRowId = e.target.closest('tr').id;
    deleteRecord(elementRowId);
    buildPaginatedTable(getElementTable(), getTableObject());
  }
};

const onCopyMenuClick = (e) => {
  /* TODO implement document.execCommand for better compatibility*/
  const elementRowId = e.target.closest('tr').id;
  console.log('i am');
  const rowJson =
    e.target.className === 'copy-csv'
      ? getRowCsv(elementRowId)
      : getRowJson(elementRowId);
  if (navigator.clipboard) {
    console.log('copying');
    navigator.clipboard.writeText(rowJson).then(
      () => console.log('Row Copied'),
      () => console.log('Row could not be copied')
    );
  }
};

function setRowMenuEventListeners() {
  const editOptionSelector = 'a.edit';
  const copyJsonOptionSelector = 'a.copy-json';
  const copyCsvOptionSelector = 'a.copy-csv';
  const deleteOptionSelector = 'a.delete';

  setGlobalEventListener('click', editOptionSelector, onEditMenuClick);
  setGlobalEventListener('click', deleteOptionSelector, onDeleteMenuClick);
  setGlobalEventListener('click', copyJsonOptionSelector, onCopyMenuClick);
  setGlobalEventListener('click', copyCsvOptionSelector, onCopyMenuClick);
}

export function setAllEventListeners() {
  setCellsEventListeners();
  setBtnsEventListeners();
  setOtherEventListeners();
  setRowMenuEventListeners();
}
