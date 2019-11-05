'use strict';

var MOCK_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var MOCK_ROOMS = [1, 2, 3, 100];

var MOCK_CHECK_TIME = ['12:00', '13:00', '14:00'];

var MOCK_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var MOCK_PHOTOS_URL = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  var index = getRandomNumber(0, arr.length - 1);
  return arr[index];
}

function createAuthor(i) {
  var author = {};
  author.avatar = 'img/avatars/user0' + (i + 1) + '.png';
  return author;
}

function createDataArray(mockData) {
  var outputArray = [];
  var dataCount = getRandomNumber(1, mockData.length - 1);
  for (var i = 0; i < dataCount; i++) {
    outputArray.push(mockData[i]);
  }
  return outputArray;
}

function createOffer(i) {
  var offer = {};
  offer.title = 'Advert ' + i;
  offer.address = '';
  // Math.floor(Math.random() * (max - min + 1)) + min
  offer.price = Math.floor(Math.random() * (10000 + 1));
  offer.type = getRandomElement(MOCK_TYPES);
  offer.rooms = getRandomElement(MOCK_ROOMS);
  offer.guests = getRandomNumber(1, 4);
  offer.checkin = getRandomElement(MOCK_CHECK_TIME);
  offer.checkout = getRandomElement(MOCK_CHECK_TIME);
  offer.features = createDataArray(MOCK_FEATURES);
  offer.description = '';
  offer.photos = createDataArray(MOCK_PHOTOS_URL);
  return offer;
}

function createLocation() {
  var location = {};
  location.x = getRandomNumber(0, 1200);
  location.y = getRandomNumber(130, 630);
  return location;
}

function createAdvert(i) {
  var advert = {};
  advert.author = createAuthor(i);
  advert.offer = createOffer(i);
  advert.location = createLocation();
  return advert;
}

function createArrayOfAdverts(number) {
  var array = [];
  for (var i = 0; i < number; i++) {
    array.push(createAdvert(i));
  }
  return array;
}

// создание и отрисовка пинов

var map = document.querySelector('.map');

map.classList.remove('map--faded');

var adverts = createArrayOfAdverts(8);

var PinCoords = {
  X: 25,
  Y: 70,
};

var pinsContainer = document.querySelector('.map__pins');

function createAdvertPin(advert) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var pin = template.cloneNode(true);
  var pinImg = pin.querySelector('img');
  pin.style.left = advert.location.x - PinCoords.X + 'px';
  pin.style.top = advert.location.y - PinCoords.Y + 'px';
  pinImg.src = advert.author.avatar;
  pinImg.alt = advert.offer.title;
  return pin;
}

function renderPins(pins) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adverts.length; i++) {
    var pin = createAdvertPin(pins[i]);
    fragment.appendChild(pin);
  }

  pinsContainer.appendChild(fragment);
}

renderPins(adverts);

// создание и отрисовка карточки объявления

/*
На основе первого по порядку элемента из сгенерированного массива и шаблона #card создайте DOM-элемент объявления, заполните его данными из объекта:
Выведите заголовок объявления offer.title в заголовок .popup__title.
Выведите адрес offer.address в блок .popup__text--address.
Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}}₽/ночь. Например, 5200₽/ночь.
В блок .popup__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalo, Дом для house, Дворец для palace.
Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, 2 комнаты для 3 гостей.
Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, заезд после 14:00, выезд до 12:00.
В список .popup__features выведите все доступные удобства в объявлении.
В блок .popup__description выведите описание объекта недвижимости offer.description.
В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.
*/

var TypesMap = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
}

var advert = adverts[0];

var mapFilters = document.querySelector('.map__filters-container');

function createFeatures(features) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature');
    feature.classList.add('popup__feature--' + features[i]);
    fragment.appendChild(feature);
  }
  return fragment;
}

function createAdvertCard(ad) {
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var card = template.cloneNode(true);
  var features = createFeatures(ad.offer.features);

  card.querySelector('.popup__avatar').src = ad.author.avatar;
  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = TypesMap[ad.offer.type];
  card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' для ' + ad.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  card.querySelector('.popup__features').innerHTML = '';
  card.querySelector('.popup__features').appendChild(features);
  card.querySelector('.popup__description').textContent = ad.offer.description;
  return card;
}

function renderAdvertCard(ad) {
  var card = createAdvertCard(ad);
  mapFilters.insertAdjacentElement('beforebegin', card);
}

renderAdvertCard(advert);
