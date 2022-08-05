const slideCarousel = document.querySelector('section#carousel');
const slideContainer = document.querySelector('.container');
const slide = document.querySelector('.slides');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const interval = 3000;

let slides = document.querySelectorAll('.slide');
let index = 1;
let slideId;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

slides[0].classList.add('currentSlide')

firstClone.id = 'firstClone';
lastClone.id = 'lastClone';

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;
// console.log(slideWidth);

slide.style.transform = `translateX(${-slideWidth * index}px)`;

console.log(slides)

const startSlide = () => {
  slideId = setInterval(() => {
    moveToNextSlide();
  }, interval);
};

const getSlides = () => document.querySelectorAll('.slide');

slide.addEventListener('transitionend', () => {
  // console.log('transition-end');
  slides = getSlides();
  if (slides[index].id === firstClone.id) {
    slide.style.transition = 'none';
    index = 1;
    slide.style.transform = `translateX(${-slideWidth*index}px)`
  }
  if (slides[index].id === lastClone.id) {
    slide.style.transition = 'none';
    index = (slides.length - 2);
    slide.style.transform = `translateX(${-slideWidth*index}px)`
  }
});

const moveToNextSlide = () => {
  slides = getSlides();
  if (index >= (slides.length -1)) return;
  // try {
  //   if (slides[index+2].classList.contains('currentSlide')){
  //     slides[index+2].classList.remove('currentSlide')
  //   }
  // }
  // catch(err){}
  index++;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = '.75s';
  assignCurrentImg(slides[index],slides[index-1]);
}

const moveToPrevSlide = () => {
  slides = getSlides();
  if (index <= 0) return;
  index--;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = '.75s';
  assignCurrentImg(slides[index], slides[index+1]);
}

const assignCurrentImg = (centerSlide, otherSlide) => {
  console.log(centerSlide, otherSlide);
  otherSlide.classList.remove('currentSlide');
  centerSlide.classList.add('currentSlide');

}

slideCarousel.addEventListener('mouseenter',() => {
  clearInterval(slideId)
})
slideCarousel.addEventListener('mouseleave',() => {
  startSlide();
});

nextBtn.addEventListener('click',()=> {
  moveToNextSlide();
  console.log('next');
})

prevBtn.addEventListener('click',()=> {
  moveToPrevSlide();
  console.log('prev');
})



function generateElement ( //NOTE: RESTRUCTURE THIS TO ACCOMADATE AS MUCH AS YOU CAN
paramElement,
paramId = '',
paramClass = '',
paramText = '',
paramLink = '',
paramOther = []
) {
let element = document.createElement(paramElement);
element.id = paramId;
element.setAttribute('class', paramClass);
switch (paramElement) {
  case 'img':
    element.setAttribute('src', paramLink);
    element.setAttribute('alt', paramId);
    break;
  case 'a':
    element.setAttribute('href', paramLink);
    break;
  case 'input':
    element.setAttribute('type', paramClass);
    element.setAttribute('name', paramId);
  case 'source':
    element.setAttribute('src', paramLink);
    element.setAttribute('type', paramClass);
    break;
  case 'button':
    element.setAttribute('value',paramId) //temporary set up
}
if (paramText != '') {
  element.innerHTML = paramText;
}
return element;
}


startSlide();


























document.getElementById("button").addEventListener('click',(e)=>{
  let body = document.querySelector('body');
  body.classList.toggle('postBtnClick');
  document.getElementById("button").remove();
  let newBtn = generateElement('button',"button","","Color Change!!!");
  body.appendChild(newBtn)
})



