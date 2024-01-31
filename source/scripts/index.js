const navMain = document.querySelector('.page-navigation');
const navToggle = document.querySelector('.page-header__button');

const slider = document.querySelector('.slider__slider');
const sliderWrapper = document.querySelector('.slider');
const sliderButton = document.querySelector('.slider__button');
const sliderBefore = document.querySelector('.slider__image--before');
const sliderAfter = document.querySelector('.slider__image--after');

let start = false;
let position;
let translateX = 0;

navMain.classList.remove('page-navigation--nojs');

navToggle.addEventListener('click', () => {
  if (navMain.classList.contains('page-navigation--closed')) {
    navMain.classList.remove('page-navigation--closed');
    navMain.classList.add('page-navigation--opened');
  } else {
    navMain.classList.add('page-navigation--closed');
    navMain.classList.remove('page-navigation--opened');
  }
});

const slideIt = (x) => {
  const sliderBeforeWidth = Math.round(
    sliderBefore.getBoundingClientRect().width - x
  );
  const sliderAfterWidth =
    sliderWrapper.getBoundingClientRect().width - sliderBeforeWidth;

  sliderBefore.style.width = `${sliderBeforeWidth}px`;
  sliderAfter.style.width = `${sliderAfterWidth}px`;

  let sliderTranslate = translateX - x;

  if (sliderTranslate > sliderWrapper.getBoundingClientRect().width / 2) {
    sliderTranslate = sliderWrapper.getBoundingClientRect().width / 2;
  }

  if (
    sliderTranslate <
    (sliderWrapper.getBoundingClientRect().width / 2) * -1
  ) {
    sliderTranslate = (sliderWrapper.getBoundingClientRect().width / 2) * -1;
  }
  slider.style.transform = `translateX(${sliderTranslate}px)`;
  translateX -= x;
};

if (sliderButton && slider) {
  sliderButton.addEventListener('pointerdown', () => {
    start = true;
  });

  sliderWrapper.addEventListener('pointermove', (e) => {
    e.preventDefault();
    if (start) {
      if (position) {
        const delta = position - e.clientX;
        slideIt(delta);
      }

      position = e.clientX;
    }
  });

  document.addEventListener('pointerup', () => {
    start = false;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const ymaps = window.ymaps;

  const init = () => {
    if (!ymaps) {
      return;
    }

    const myMap = new ymaps.Map(
        'map',
        {
          center: [59.93863106417265, 30.323036499999905],
          zoom: 15,
          controls: ['zoomControl'],
          behaviors: ['drag'],
        },
        {
          searchControlProvider: 'yandex#search',
        }
      ),
      myPlacemark = new ymaps.Placemark(
        [59.93863106417265, 30.323036499999905],
        {
          hintContent: 'ул. Большая Конюшенная, д. 19/8',
        },
        {
          iconLayout: 'default#image',
          iconImageHref: '/images/map-pin@1x.png',
          iconImageSize: [57, 53],
          iconImageOffset: [-28, -53],
        }
      );

    myMap.geoObjects.add(myPlacemark);
  };

  ymaps.ready(init);
});
