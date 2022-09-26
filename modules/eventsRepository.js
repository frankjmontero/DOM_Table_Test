import { tableSearch, toggleColumnBtn } from './tableElementManipulation.js';
import { addRow, addColumn, updateCell, getTableObject,setTableObject } from './tableObjectManipulation.js'
import { getSortOrder, toggleSortOrder } from './utilityScript.js';

function setGlobalEventListener(type, selector, func) {
  document.addEventListener(type, e => {
    if (e.target.matches(selector)) func(e);
  });
}

function setCellsEventListeners() {
  const makeEditable = e => {
    e.target.contentEditable = 'true';

    e.target.focus({focusVisible: true});
  }
  
  const updateCellText = e => {
    
    if (e.key === 'Enter') {
      e.preventDefault()
      
      let elementText = e.target.textContent;
      const cellType = e.target.getAttribute('type');
      let cellColor = 'black';
      let elementId = e.target.getAttribute('id');

      e.target.contentEditable = 'false';

      const errorHandler = (errorMsg) => {
        alert(errorMsg);
        makeEditable(e);
        e.target.style.borderColor = 'red';
      }

      switch(cellType) {
        case 'number' :
          console.log(2);
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
      updateCell(elementId, elementText);
      e.target.style.borderColor = cellColor;
    }
  }

  const onAnchorClick = e => {
    if (!e.ctrlKey) e.preventDefault();
  }

  const onHeaderClick = e => {
    const tableMap = getTableObject();
    const headerObject = tableMap.rows.shift();
    const cellNumber = parseInt(e.target.getAttribute('id')[1]) - 1;
    const headerType = headerObject.cells[cellNumber].type;

    // console.log(headerObject, headerType);
    
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

    tableMap.rows.unshift(headerObject);
    setTableObject(tableMap);
  }

  const anchorSelector = 'a';
  const headerSelector = 'th';
  const editableElementsSelector = `${headerSelector}, td:not(:first-child, :last-child, .link), ${anchorSelector}`;
  const headerCheckboxSelector = 'input[type="checkbox"][id="0"]';

  setGlobalEventListener('dblclick', editableElementsSelector, makeEditable);
  setGlobalEventListener('keydown', editableElementsSelector, updateCellText);
  setGlobalEventListener('click', anchorSelector, onAnchorClick);
  setGlobalEventListener('click', headerSelector, onHeaderClick);
}

function setBtnsEventListeners() {
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
  }

  const onModalCloseClick = (e) => {
    newRowModal.style.display = 'none';
  }

  setGlobalEventListener('click', '#new-row', onNewRowBtnClick);
  setGlobalEventListener('click', '#new-column', onNewColumnBtnClick);
  setGlobalEventListener('click', '#modal-submit-btn', onModalSubmitClick);
  setGlobalEventListener('click', '#modal-close-btn', onModalCloseClick);
}

function setOtherEventListeners() {

  const onInput = (e) => {
    tableSearch(e.target.value, getTableObject());
  }

  setGlobalEventListener('input', '#search', onInput);
}

export function setAllEventListeners() {
  setCellsEventListeners();
  setBtnsEventListeners();
  setOtherEventListeners();
}