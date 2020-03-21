//HEADER
const SELECTED_CLASS = 'navigation__item-current';
const sections = document.querySelectorAll('body > section');
const headerHeight = document.querySelector('.header').offsetHeight;
document.addEventListener('scroll',() => {
    const curPos = window.scrollY;
    for(let section of sections) {
        let sectionTop = section.offsetTop - headerHeight;
        let sectionBottom = section.offsetTop + section.offsetHeight;

        if(sectionTop <= curPos && sectionBottom > curPos) {
            let id = section.querySelector('.ancher').getAttribute('id');
            let item = document.querySelector(`[href="#${id}"]`).parentElement;
            document.querySelector('.navigation__item-current').classList.remove(SELECTED_CLASS);
            item.classList.add(SELECTED_CLASS);
        }
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//SLIDER
let items = document.querySelectorAll('.slider__item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('slider__item--active', direction);
    });
}

function showItem(direction) {
    items[currentItem].classList.add('slider__item--next', direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('slider__item--next', direction);
        this.classList.add('slider__item--active');
        isEnabled = true;
    });
}

function nextItem(n) {
    hideItem('slider__item--to-left');
    changeCurrentItem(n + 1);
    showItem('slider__item--from-right');
}

function previousItem(n) {
    hideItem('slider__item--to-right');
    changeCurrentItem(n - 1);
    showItem('slider__item--from-left');
}

document.querySelector('.slider__button-prev').addEventListener('click', function() {
    if (isEnabled) {
        previousItem(currentItem);
    }
});

document.querySelector('.slider__button-next').addEventListener('click', function() {
    if (isEnabled) {
        nextItem(currentItem);
    }
});

//IMAGE
const iphones = document.querySelectorAll('.iphone-container');
iphones.forEach(iphone =>
    iphone.querySelector('.clickable').addEventListener('click', (event) => {
        !iphone.classList.contains('black-screen') ?
            iphone.classList.add('black-screen') :
            iphone.classList.remove('black-screen');

    }));
//PORTFOLIO
const filters = document.querySelectorAll('.filter');
filters.forEach(filter =>
    filter.addEventListener('click', () => {
        document.querySelector('.filter--current').classList.remove('filter--current');
        filter.classList.add('filter--current');
        randomizePortfolio()
    }));

function randomizePortfolio() {
    const projects = document.querySelectorAll('.projects__project');
    const projectsContainer = document.querySelector('.projects');
    projectsContainer.innerHTML = '';
    shuffleArray(Array.from(projects)).forEach(image => projectsContainer.appendChild(image));
}

//copy-pasted from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.querySelector('.projects')
    .addEventListener('click', (event) => {
        if (!event.target.classList.contains('projects__project')) return;
        const currentActive = document.querySelector('.projects__project--active')
        if (currentActive)
            currentActive.classList.remove('projects__project--active');
        event.target.classList.add('projects__project--active');
    });

//FORM

const form = document.getElementById('quote-form');
const inputName = document.getElementById('input-name');
const inputEmail = document.getElementById('input-email');
const inputSubject = document.getElementById('input-subject');
const inputComment = document.getElementById('input-comment');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = inputName.value;
    const email = inputEmail.value;
    const subject = inputSubject.value ? inputSubject.value : 'No Subject';
    const description = inputComment.value ? inputComment.value : 'No Description';


    showModal(name, email, subject, description);
});

function showModal(name, email, subject, description) {
    const modalHtml = `
    <div class="modal">
        <p class="modal__title">The letter was sent </p>
        <p class="modal__field">Subject: ${subject}</p>
        <p class=" modal__field modal__description">Description: ${description}</p>
        <button class="modal__close">OK</button>
    </div>
    `;
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer);
    document.querySelector('.modal__close').addEventListener('click', event => {
        console.log('closing');
        modalContainer.remove();
        document.querySelector('form').reset();
    });
}
