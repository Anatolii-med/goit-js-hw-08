const _ = require('lodash');
const form = document.querySelector('.feedback-form');
// объект для хранения введенных данных
let feedbackContent = {};

//функция проверки localStorage и заполнения полей при положительном результате
const onPageLoad = () => {
  if (localStorage.getItem('feedback-form-state')) {
    const loadlocalStorageData = JSON.parse(localStorage.getItem('feedback-form-state'));
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

  console.log(feedbackContent);
  localStorage.removeItem('feedback-form-state');
  form.reset();
};
form.addEventListener('submit', handleSubmit);

/*функция сохранения полей в localStorage
без throttle работает отлично, 
с throttle выдает ошибку в консоль и не сохраняет данные
 */
const saveInput = function (e) {
  feedbackContent.email = e.currentTarget.email.value;
  feedbackContent.message = e.currentTarget.message.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackContent));
};
form.addEventListener('input', saveInput);
// form.addEventListener('input', _.throttle(saveInput, 500));
