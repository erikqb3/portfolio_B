const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.button-right');
const prevButton = document.querySelector('.button-left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);


//"ARRANGE THE SLIDES NEXT TO ONE ANOTHER"
const slideWidth = slides[0].getBoundingClientRect().width;


const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index +'px';
};

slides.forEach(setSlidePosition);




const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
  else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  }
  else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}



prevButton.addEventListener('click', e => {
  // console.log('Me');  
  // console.log(currentSlide.previousElementSibling);
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide)
  
  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});


nextButton.addEventListener('click', e => {
  console.log('Help');
  const currentSlide = track.querySelector('.current-slide');
  // console.log(currentSlide);
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);
  
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});


dotsNav.addEventListener('click', e => {
  //what indicator was clicked on
  const targetDot = e.target.closest('button');
  if (!targetDot) return;
  
  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];
  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
})



























// // const slideSize = slides[0].getBoundingClientRect();
// // const slideWidth = slideSize.width;
// const slideWidth = slides[0].getBoundingClientRect().width;

// // slides[0].style.left = slideWidth * 0 + 'px';
// // slides[1].style.left = slideWidth * 1 + 'px';
// // slides[2].style.left = slideWidth * 2 + 'px';

// // slides.forEach((slide,index) => {
// //   slide.style.left = slideWidth * index + 'px';
// // })


// const setSlidePosition = (slide, index) => {
//   slide.style.left = slideWidth * index +'px';
// };

// slides.forEach(setSlidePosition);

// const moveToSlide = (track, currentSlide, targetSlide) => {
//   track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
//   currentSlide.classList.remove('current-slide');
//   targetSlide.classlist.add('current-slide');
// }


// prevButton.addEventListener('click', e => {
//   console.log('Me');  
//   // const currentSlide = track.querySelector('.current-slide');
//   // const prevSlide = currentSlide.previousElementSibling;
//   // moveToSlide(track,currentSlide,prevSlide)
// });


// // console.log(track.querySelector('.current-slide'));

// //"WHEN I CLICK LEFT, MOVE SLIDES TO THE LEFT"

// // console.log(slides);
// // console.log(slide);



// nextButton.addEventListener('click', e => {
//   console.log('Help');
//   const currentSlide = track.querySelector('.current-slide');
//   const nextSlide = currentSlide.nextElementSibling;
//   // const amountToMove = nextSlide.style.left;
//   // // track.style.transform = 'translateX(-' + amountToMove + ')';
//   // // currentSlide.classList.remove('current-slide');
//   // // nextSlide.classlist.add('current-slide');
//   // moveToSlide(track,currentSlide,nextSlide);
// });

// //"MOVE TO THE NEXT SLIDE"




// console.log(slideWidth);



// console.log("Hello World");


// //arrange the slides next to one another
//  //when I click left, move slides to the left
// //when I click right, move slides to the right
// //when I click left, move slides to the left