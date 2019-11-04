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
