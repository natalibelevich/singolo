//HEADER
const navigationItems = document.querySelectorAll('.navigation__item');
const SELECTED_CLASS = 'navigation__item-current';

navigationItems.forEach(item =>
    item.addEventListener('click', () => {
        document.querySelector('.navigation__item-current').classList.remove(SELECTED_CLASS);
        item.classList.add(SELECTED_CLASS);
    })
);
//SLIDER
const sliderButtons = document.querySelectorAll('.slider__button');

sliderButtons.forEach(button =>
    button.addEventListener('click', () => {
        const hiddenItem = document.querySelector('.slider__content--hidden');
        document.querySelector('.slider__item:not(.slider__content--hidden)')
            .classList.add('slider__content--hidden');
        hiddenItem.classList.remove('slider__content--hidden')
    })
);
//IMAGE
const iphones = document.querySelectorAll('.iphone-container');
iphones.forEach(iphone =>
    iphone.querySelector('.clickable').addEventListener('click', (event) => {
        !iphone.classList.contains('black-screen') ?
            iphone.classList.add('black-screen') :
            iphone.classList.remove('black-screen');

    }));
//PORTFOLIO
