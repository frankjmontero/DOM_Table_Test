import { toggleColumnBtn } from './tableElementManipulation.js';
import { addRow, addColumn, updateCell } from './tableObjectManipulation.js'

function setGlobalEventListener(type, selector, func) {
  document.addEventListener(type, e => {
    if (e.target.matches(selector)) func(e);
  });
}

export function setCellsEventListeners() {
  const makeEditable = e => {
    e.target.contentEditable = 'true';

    e.target.focus({focusVisible: true});
  }
  
  const updateCellText = e => {
    if (e.key === 'Enter') {
      let elementText = e.target.textContent;
      const cellType = e.target.getAttribute('type');
      let cellColor = 'black';
      let elementId = e.target.getAttribute('id');

      e.target.contentEditable = 'false';

      const errorHandler = (errorMsg) => {
        alert(errorMsg);
        makeEditable(e);
        cellColor = 'red';
      }

      switch(cellType) {
        case 'number' :
          if(elementText.match(/[^0-9]/)) {
          errorHandler('Only numbers permitted');
          }
          break;
        case 'text' :
          if (elementText === '') {
            errorHandler('No empty value allowed');            
          }
          break;
        case 'email' :
          if (!elementText.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
            errorHandler('Not a valid Email');
          }
          elementId = e.target.parentElement.getAttribute('id');
          break;
        case 'url' :
          if (!elementText.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig)) {
            errorHandler('Enter a valid web address');
          }
          elementId = e.target.parentElement.getAttribute('id');
          break;
        default :
        updateCell(elementId, elementText);;
      } 
      
      e.target.style.borderColor = cellColor;
    }
  }

  const onAnchorClick = e => {
    if (!e.ctrlKey) e.preventDefault();
  }

  const onEnterKeyPress = e => {
    if (e.key === 'Enter') e.preventDefault();
  }

  const headerCellsSelector = 'th:not(:first-child):not(:last-child)';
  const normalCellsSelector = 'td:not(:first-child, :last-child, .link)';
  const anchorSelector = 'a';
  const allEditableElementsSelector = 'th, td, a';

  setGlobalEventListener('keydown', allEditableElementsSelector, onEnterKeyPress);
  setGlobalEventListener('dblclick', headerCellsSelector, makeEditable);
  setGlobalEventListener('keyup', headerCellsSelector, updateCellText);
  setGlobalEventListener('dblclick', normalCellsSelector, makeEditable);
  setGlobalEventListener('keyup', normalCellsSelector, updateCellText);
  setGlobalEventListener('click', anchorSelector, onAnchorClick);
  setGlobalEventListener('dblclick', anchorSelector, makeEditable);
  setGlobalEventListener('keyup', anchorSelector, updateCellText);
}



export function setBtnsEventListeners() {
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

  setGlobalEventListener('click', '#new-row', onNewRowBtnClick);
  setGlobalEventListener('click', '#new-column', onNewColumnBtnClick);
  setGlobalEventListener('click', '#modal-submit-btn', onModalSubmitClick);
}

export function getElementTable() {
  return document.getElementById('dynamic-table');
}