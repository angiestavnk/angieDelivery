'use strict';
//day 1 Авторизация
//console.log(document.querySelector('.button-auth'));//document object model т.к. это объект то мы можем применять различные метода например querySelector нахожит элемент страницы по селектору
//сохраняем кнопку в переменную
/*let a = 5;
const b = 10; //let можно поменять const нельзя*/
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const buttonCloseAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');// карточка товара
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

let login =  localStorage.getItem('gloDelivery'); //переменная для авторизации
//dir - выводит что-то в виде объекта
function toggleModal() {
  modal.classList.toggle("is-open");
}
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
      event.preventDefault();  //отменить перезагрузку страницы передаем в параметры event
      if(loginInput.value == '') {
        alert('Ошибка. Необходимо ввести логин');
        //modalAuth = true;
      } else {
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
//функция для генерации карточки товара - картинка текст время доставки
function createCardRestaurant() {
  const card = `	
  <a class="card card-restaurant">
    <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">Пицца плюс</h3>
        <span class="card-tag tag">50 мин</span>
      </div>
      <div class="card-info">
        <div class="rating">
          4.5
        </div>
        <div class="price">От 900 ₽</div>
        <div class="category">Пицца</div>
      </div>
    </div>
    </a? `;
  cardsRestaurants.insertAdjacentHTML('beforeend', card)// вставляем карточку в конец
  
}

createCardRestaurant();// сколько раз вызовем функцию столько карточек и вставится
createCardRestaurant();
createCardRestaurant();

function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card';//добавляем класс для дива
  card.innerHTML = ('beforeend', `
        <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title card-title-reg">Пицца Классика</h3>
          </div>
          <div class="card-info">
            <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
              грибы.
            </div>
          </div>
          <div class="card-buttons">
            <button class="button button-primary button-add-cart">
              <span class="button-card-text">В корзину</span>
              <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price-bold">510 ₽</strong>
          </div>
        </div>
  `);
  cardsMenu.insertAdjacentElement('beforeend', card);
  console.log(card);
}

function openGoods(event) {

  const target = event.target;
  const restaurant = target.closest('.card-restaurant');
  if(restaurant) {

    if(loginInput.value == '') {
      toggleModalAuth();
    } else {
    cardsMenu.textContent = '';
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');

  
    createCardGood();
    createCardGood();
    createCardGood();
    }
  }
 
}
  
  cartButton.addEventListener("click", toggleModal);
  close.addEventListener("click", toggleModal);

  cardsRestaurants.addEventListener('click', openGoods);
  logo.addEventListener('click',function() {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
  });