import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('input');
const textareaEl = document.querySelector('textarea');
const STORAGE_KEY = 'feedback-form-state';
const inputData = {};

checkLocalStorage();

formEl.addEventListener('input', throttle(onInputData, 500));
formEl.addEventListener('submit', onSubmitForm);

function onInputData(event) {
  inputData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inputData));
  console.log('saveData', localStorage.getItem(STORAGE_KEY));
}

function checkLocalStorage() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (localStorage.getItem(STORAGE_KEY) !== null) {
    inputEl.value = savedData.email;
    textareaEl.value = savedData.message;
  } else {
    inputEl.value = '';
    textareaEl.value = '';
  }
}

function onSubmitForm(event) {
  event.preventDefault();
  inputData[inputEl.name] = inputEl.value;
  inputData[textareaEl.name] = textareaEl.value;
  console.log(inputData);
  localStorage.removeItem(STORAGE_KEY);
  checkLocalStorage();
}
