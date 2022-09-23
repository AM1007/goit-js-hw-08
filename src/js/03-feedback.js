'use strict';
import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const LOCALE_STORAGE_KEY = 'feedback-form-state';

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

initPage();

const onFormInput = event => {
  const { name, value } = event.target;
  try {
    let saveData = localStorage.getItem(LOCALE_STORAGE_KEY);

    if (saveData) {
      saveData = JSON.parse(saveData);
    } else {
      saveData = {};
    }

    saveData[name] = value;
    const stringifyData = JSON.stringify(saveData);
    localStorage.setItem(LOCALE_STORAGE_KEY, stringifyData);
  } catch (error) {
    console.log(error);
  }
};

const throttledOnFormInput = throttle(onFormInput, 500);
formRef.addEventListener('input', throttledOnFormInput);

function initPage() {
  const saveData = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (!saveData) {
    return;
  }

  try {
    const parseData = JSON.parse(saveData);
    Object.entries(parseData).forEach(([name, value]) => {
      formRef.elements[name].value = value;
    });
  } catch (error) {
    console.log(error);
  }
}

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;

  console.log({ email: email.value, message: message.value });
  event.currentTarget.reset();
  localStorage.removeItem(LOCALE_STORAGE_KEY);
};

formRef.addEventListener('submit', handleSubmit);
