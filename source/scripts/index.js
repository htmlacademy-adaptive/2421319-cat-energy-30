let navPage = document.querySelector('.page-navigation');
let navButton = document.querySelector('.page-header__button');

navPage.classList.remove('page-navigation--nojs');

navButton.addEventListener('click', function () {
  if (navPage.classList.contains('page-navigation--closed')) {
    navPage.classList.remove('page-navigation--closed');
    navPage.classList.add('page-navigation--opened');
  } else {
    navPage.classList.add('page-navigation--closed');
    navPage.classList.remove('page-navigation--opened');
  }
});
