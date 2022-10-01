import { getElementTable, tableSearch, toggleColumnBtn, toggleDeleteBtn } from './tableElementManipulation.js';
import { addRow, addColumn, updateCell, getTableObject, setTableObject, deleteRecord, getRowJson, getRowCsv } from './tableObjectManipulation.js'
import { getSortOrder, toggleSortOrder } from './utilityScript.js';

function setGlobalEventListener(type, selector, func) {
  document.addEventListener(type, e => {
    // if (type === 'mousedown') console.log(e.target, selector, e.target.matches(selector), func);
    if (e.target.matches(selector)) func(e);
  });
}

const makeElementEditable = element => {
  element.contentEditable = true;
}

const dataCellDoubleClickHandler = e => {
  // e.target.contentEditable = 'true';
  makeElementEditable(e.target);

  e.target.focus({focusVisible: true});
};

const dataCellKeyPressHandler = e => {
  if (e.key === 'Enter') {
    e.preventDefault()
    
    let elementText = e.target.textContent;
    const cellType = e.target.getAttribute('type');
    let cellColor = 'black';
    // let elementId = e.target.className;
    // let elementId = e.target.closest('[class]').cellIndex - 1;
    let elementId = e.target.closest('[class]').classList[0];
    // const fatherId = e.target.parentNode.id;
    const fatherId = e.target.closest('tr').id;

    // console.log(elementId, fatherId, fatherId2);
    console.log(elementId, fatherId);

    
    e.target.contentEditable = 'false';

    const errorHandler = (errorMsg) => {
      alert(errorMsg);
      dataCellDoubleClickHandler(e);
      e.target.style.borderColor = 'red';
    }

    switch(cellType) {
      case 'number' :
        if(elementText.match(/[^0-9]/)) {
        errorHandler('Only numbers permitted');
        return;
        }
        break;
      case 'text' :
        if (elementText === '') {
          errorHandler('No empty value allowed');            
        return;
        }
        break;
      case 'email' :
        if (!elementText.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
          errorHandler('Not a valid Email');
          return;
        }
        console.log('i am here');
        // elementId = e.target.parentElement.getAttribute('id');
        break;
      case 'url' :
        if (!elementText.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig)) {
          errorHandler('Enter a valid web address');
          return;
        }
        // elementId = e.target.parentElement.getAttribute('id');
        break;
    } 
    // console.log(elementText, fatherId, elementId);
    updateCell(fatherId, elementId, elementText);
    e.target.style.borderColor = cellColor;
  }
};

const anchorClickHandler = e => {
  if (!e.ctrlKey) e.preventDefault();
};

const headerClickHandler = e => {
  const tableMap = getTableObject();
  const headerObject = tableMap.rows.shift();
  const cellNumber = parseInt(e.target.getAttribute('id')[1]);
  const headerType = headerObject.cells[cellNumber].type;

  // console.log(headerObject, headerType);
  // console.log('canceled?', e.defaultPrevented);
  
  const sortNumbers = (a, b) => {
    let firstValue = parseInt(a.cells[cellNumber].text);
    let secondValue = parseInt(b.cells[cellNumber].text);
    
    if (getSortOrder() === 'true') {
      // setSortOrder('false');
      return firstValue - secondValue;
    }
    // setSortOrder('true');
    return secondValue - firstValue;
  }

  const sortStrings = (a, b) => {
    let firstValue = a.cells[cellNumber].text.toLowerCase();
    let secondValue = b.cells[cellNumber].text.toLowerCase();

    if (getSortOrder() === 'true') {
      // setSortOrder('false');
      if (firstValue < secondValue) return -1;
      if (firstValue > secondValue) return 1;
      return 0;
    } 
    // setSortOrder('true');
    if (firstValue < secondValue) return 1;
    if (firstValue > secondValue) return -1;
    return 0;
  }

  tableMap.rows.sort((headerType === 'number') ? sortNumbers : sortStrings);
  toggleSortOrder();
  console.log('sorted and toggled');

  tableMap.rows.unshift(headerObject);
  setTableObject(tableMap);
  // setDragAndDropEvents();
};

const dataCheckboxSelector = 'input[name="row-checker"]';

const queryCheckBoxes = () => {
  const allCheckboxes = document.querySelectorAll(dataCheckboxSelector);
  let areAllUnchecked = true;

  allCheckboxes.forEach(checkbox => {
    if (checkbox.checked) areAllUnchecked = false;
  });

  return areAllUnchecked;
}

const firstCheckboxClickHandler = e => {
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

const dataRowsCheckboxClickHandler = e => {
  const isElementChecked = e.target.checked;
  // const fatherId = e.target.parentElement.getAttribute('id');
  const elementRow = e.target.closest('tr');

  // console.log(elementRow);
  if (isElementChecked) {
    elementRow.classList.add('highlighted-row');
    toggleDeleteBtn(isElementChecked);
    return;
  }

  elementRow.classList.remove('highlighted-row');
  if (queryCheckBoxes()) toggleDeleteBtn(isElementChecked);
};

const dragRowMouseDownHandler = e => {
  if (e.ctrlKey) e.target.closest('tr').draggable = 'true';
};

const dragColumnMouseDownHandler = e => {
  if (e.ctrlKey) e.target.draggable = 'true';
};
// const keyOnRowsHandler = e => {
//   if (e.ctrlKey) {
//     const tableElementRows = document.querySelectorAll('tr');

//     tableElementRows.forEach((row, i) => {
//       if (i > 0) row.draggable = true;
//     });
    
//   }
// };

// const keyUpOnRowsHandler = e => {
//   if (e.ctrlKey) {
//     const tableElementRows = document.querySelectorAll('tr');

//     tableElementRows.forEach((row, i) => {
//       if (i > 0) row.draggable = false;
//     });
    
//   }
// };

const startingDragHandler = e => {
  e.dataTransfer.setData('text/plain', e.target.id);
  e.dataTransfer.effectAllowed = 'move';
};

// const enterDragHandler = e => {
//   const draggingRowId = e.dataTransfer.getData('text/plain');
//   const draggingRowCopy = document.getElementsById(draggingRowId).cloneNode(true);
//   draggingRow.classList.add('temporary-dragged-row');
//   e.target.insertAdjacentHTML('beforebegin', draggingRow);
// }; 

const overDragHandler = e => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};

const rowDropHandler = e => {
  e.preventDefault();
  const draggingRowId = e.dataTransfer.getData('text/plain');
  const draggingRow = document.getElementById(draggingRowId);
  const tableElement = getElementTable();
  
  console.log(draggingRowId, draggingRow);
  
  if(draggingRow.draggable) draggingRow.removeAttribute('draggable');
  // e.target.closest('tr').insertAdjacentHTML('beforebegin', draggingRow.outerHTML);
  // console.log(e.target.closest('tr'), tableElement);
  tableElement.insertBefore(draggingRow, e.target.closest('tr'));
};




const columnDropHandler = e => {
  e.preventDefault();
  const draggingHeaderId = e.dataTransfer.getData('text/plain');
  const draggingHeader = document.getElementById(draggingHeaderId);
  // const columnNumber = parseInt(draggingHeaderId[1]) + 1;
  // const targetColumn = parseInt(e.target.id[1]);
  const columnNumber = draggingHeader.cellIndex;
  const targetColumn = e.target.cellIndex;
  // const targetRow = e.target.closest('tr');
  const tableRows = document.querySelectorAll('tr');

  // console.log(tableRows);
  console.log(draggingHeader, columnNumber, targetColumn);
  
  draggingHeader.removeAttribute('draggable');
  tableRows.forEach(row => {
    const rowCells = row.children;
    // console.log(rowCells, row);
    console.log(rowCells[columnNumber], rowCells[targetColumn]);
    row.insertBefore(rowCells[columnNumber], rowCells[targetColumn]);
  });
  
  // targetRow.insertBefore(draggingHeader, e.target);
}




// const finishDraggingHandler = e => {
//   // console.log(e.target);
//   // e.target.removeAttribute('draggable');
//   if (e.dataTransfer.dropEffect !== 'none')  {
//     // e.target.remove();
//     // setAllEventListeners();
//     // setCellsEventListeners();
//     // setDragAndDropEvents();
//   }
// };

/* TODO Make headers editable */
function setCellsEventListeners() {
  const anchorSelector = 'a';
  const headerSelector = 'th';
  const editableElementsSelector = `${headerSelector}, td:not(:first-child, :last-child, .link), ${anchorSelector}`;
  const headerCheckboxSelector = 'input[name="all-rows-checker"]';
  // const tableElementRows = document.querySelectorAll('tr');
  const dataCellSelector = 'tr:not(:nth-of-type(1)) td';
  // const tableElementsDataRowsSelector = 'tr:not(:nth-of-type(1))';  

  setGlobalEventListener('dblclick', editableElementsSelector, dataCellDoubleClickHandler);
  setGlobalEventListener('keydown', editableElementsSelector, dataCellKeyPressHandler);
  setGlobalEventListener('click', anchorSelector, anchorClickHandler);
  setGlobalEventListener('click', headerSelector, headerClickHandler);
  setGlobalEventListener('click', headerCheckboxSelector, firstCheckboxClickHandler);
  setGlobalEventListener('click', dataCheckboxSelector, dataRowsCheckboxClickHandler);
  setGlobalEventListener('mousedown', dataCellSelector, dragRowMouseDownHandler);
  setGlobalEventListener('mousedown', headerSelector, dragColumnMouseDownHandler);
  // setDragAndDropEvents();

}

export function setDragAndDropEvents(element) {
  // const tableElementRows = document.querySelectorAll('tr');

  // tableElementRows.forEach((row, i) => {
  //   if (i > 0) {
  //     // row.addEventListener('mousedown', rowsMouseDownHandler);
  //     row.addEventListener('dragstart', startingDragHandler);
  //     // row.addEventListener('dragenter', enterDragHandler);
  //     row.addEventListener('dragover', overDragHandler);
  //     // row.addEventListener('dragleave', dragLeaveHandler);
  //     row.addEventListener('drop', dropHandler);
  //     row.addEventListener('dragend', finishDraggingHandler);
  //   }
  // });

  element.addEventListener('dragstart', startingDragHandler);
  // element.addEventListener('dragenter', enterDragHandler);
  element.addEventListener('dragover', overDragHandler);
  // element.addEventListener('dragleave', dragLeaveHandler);
  // element.addEventListener('dragend', finishDraggingHandler);
  if(element.nodeName.toLowerCase() === 'div') {
    element.addEventListener('drop', rowDropHandler);
    return;
  }
  element.addEventListener('drop', columnDropHandler);
}

const newRowModal = document.getElementById('new-column-modal');
const modalHeaderField = document.getElementById('header');
const modalTypeList = document.getElementById('type');

const onNewRowBtnClick = (e) => {
  toggleColumnBtn();
  addRow();
};

const onNewColumnBtnClick = (e) => {
  newRowModal.style.display = 'block';
  modalHeaderField.focus();
};

const onModalSubmitClick = (e) => {
  if (modalHeaderField.value.match(/^\s*$/)) {
    alert('Enter a proper header value');
    return;
  }

  addColumn(modalHeaderField.value, modalTypeList.value);
  newRowModal.style.display = 'none';
};

const onModalCloseClick = (e) => {
  newRowModal.style.display = 'none';
};

const onDeleteBtnClick = e => {
  const allCheckboxes = document.querySelectorAll(dataCheckboxSelector);
  
  if(confirm('\nThis action will delete the selected row\\s.\n\nDo you wish to continue?')){
    allCheckboxes.forEach (checkbox => {
      if (checkbox.checked) {
        const rowId = checkbox.closest('tr').id;
        deleteRecord(rowId);
      }
    });
    toggleDeleteBtn(false);
  }
};

const onActionBtnClick = e => {
  // const rowMenu = document.getElementsByClassName('menu-options');
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

function setBtnsEventListeners() {
  setGlobalEventListener('click', '#new-row', onNewRowBtnClick);
  setGlobalEventListener('click', '#new-column', onNewColumnBtnClick);
  setGlobalEventListener('click', '#modal-submit-btn', onModalSubmitClick);
  setGlobalEventListener('click', '#modal-close-btn', onModalCloseClick);
  setGlobalEventListener('click', '#delete-btn', onDeleteBtnClick);
  setGlobalEventListener('click', '.action-btn', onActionBtnClick);
}

const onInput = (e) => {
  tableSearch(e.target.value, getTableObject());
};

const onWindowClick = e => {
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

const onEditMenuClick = e => {
  // console.log('im in')
  const elementRowChildren = e.target.closest('tr').children;
  // console.log(elementRowChildren);
  
  let i = 1
  for (i = 1; i < elementRowChildren.length - 2; i++) {
    makeElementEditable(elementRowChildren[i]);
  }
  makeElementEditable(elementRowChildren[i].children[0]);
};

const onDeleteMenuClick = e => {
  if(confirm('\nThis action will delete the selected row.\n\nDo you wish to continue?')) {
    const elementRowId = e.target.closest('tr').id;
    deleteRecord(elementRowId);
  }
};

const onCopyMenuClick = e => {
  /* TODO implement document.execCommand for better compatibility*/
  const elementRowId = e.target.closest('tr').id;
  console.log('i am');
  const rowJson = (e.target.className === 'copy-csv') ? getRowCsv(elementRowId) : getRowJson(elementRowId);
  if (navigator.clipboard) {
    console.log('copying');
    navigator.clipboard.writeText(rowJson).then(
      () => console.log('Row Copied'),
      () => console.log('Row could not be copied')
    );
  }
}

function setRowMenuEventListeners() {
  const editOptionSelector = 'a.edit';
  const copyJsonOptionSelector = 'a.copy-json';
  const copyCsvOptionSelector = 'a.copy-csv';
  const deleteOptionSelector = 'a.delete';

  // console.log('inRowmenu')
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