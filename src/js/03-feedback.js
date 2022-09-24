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
}

function checkLocalStorage() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData !== null) {
    inputEl.value = savedData.email || '';
    textareaEl.value = savedData.message || '';
  }
}

function onSubmitForm(event) {
  event.preventDefault();
  inputData[inputEl.name] = inputEl.value;
  inputData[textareaEl.name] = textareaEl.value;
  console.log(inputData);
  localStorage.removeItem(STORAGE_KEY);
  inputEl.value = '';
  textareaEl.value = '';
}
