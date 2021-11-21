// const _ = require('lodash');
import { now } from 'lodash';
import Throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const KEY = 'feedback-form-state';

//функция проверки localStorage и заполнения полей при положительном результате
const onPageLoad = () => {
  if (localStorage.getItem(KEY)) {
    const loadlocalStorageData = JSON.parse(localStorage.getItem(KEY));
    form.email.value = loadlocalStorageData.email;
    form.message.value = loadlocalStorageData.message;
  }
};
onPageLoad();

/* 
функция отпраки формы с проверкой заполнения всех полей, 
выведение в консоль объекта с введенными данными 
удаление данных из localStorage
*/
const handleSubmit = function (event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }

  console.log(JSON.parse(localStorage.getItem(KEY)));
  localStorage.removeItem(KEY);
  form.reset();
};
form.addEventListener('submit', handleSubmit);

/*
функция сохранения полей в localStorage
 */

const onInputChange = function ({ target: { name, value } }) {
  const savedInputContent = JSON.parse(localStorage.getItem(KEY)) || {};
  const changedInputValue = { [name]: value };
  const updateContent = JSON.stringify({
    ...savedInputContent,
    ...changedInputValue,
  });
  localStorage.setItem(KEY, updateContent);
};

form.addEventListener('input', Throttle(onInputChange, 500));
