const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

//day 1 Авторизация
//console.log(document.querySelector('.button-auth'));//document object model т.к. это объект то мы можем применять различные метода например querySelector нахожит элемент страницы по селектору
//сохраняем кнопку в переменную
/*let a = 5;
const b = 10; //let можно поменять const нельзя*/

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const buttonCloseAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
let login =  localStorage.getItem('gloDelivery'); //переменная для авторизации
//dir - выводит что-то в виде объекта

function toggleModalAuth() { //toggle - если есть удаляет если нет - добавляет
  modalAuth.classList.toggle('is-open');
}



//Две функции - одна функция которая запускается, когда пользователь авторизован
//другая - когда пользователь не авторизован

function authorized() {
  console.log('Авторизован');

  userName.textContent = login; //показываем логин
  buttonAuth.style.display = 'none'; //скрываем кнопку входа
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut);

  function logOut() {
    login = '';
    localStorage.removeItem('gloDelivery');
    buttonAuth.style.display = ''; //скрываем кнопку входа
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  }
}

function notAuthorized() {
  console.log('Не авторизован');
    function logIn(event) {
      event.preventDefault();
      if(loginInput.value == '') {
        alert('Ошибка. Необходимо ввести логин');
        //modalAuth = true;
      } else {
     //отменить перезагрузку страницы передаем в параметры event
      login = loginInput.value;
      localStorage.setItem('gloDelivery', login); //сохраняем логин в локал сторадж
      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      buttonCloseAuth.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit', logIn);
      logInForm.reset(); //очищаем форму логина
      checkAuth();
      }
    }

  buttonAuth.addEventListener('click', toggleModalAuth);
  buttonCloseAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
}

function checkAuth() {
  if(login) {
    authorized();
  } else {
    notAuthorized();
  }
}
checkAuth(); //чтобы первый раз при загрузке происходила проверка на авторизацию
//сообщить пользователю об ошибке если логин не введен и не закрывать модальное окно
