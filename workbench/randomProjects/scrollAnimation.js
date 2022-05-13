//STARTING VARIALBES
const intro = document.querySelector('.intro');
const video = intro.querySelector('video'); //forgot I could do this
const text = intro.querySelector('h1');
//END SECTION
const section = document.querySelector('section');
const end = section.querySelector('h1');

//SCROLLMAGIC
const controller = new ScrollMagic.Controller();
const scene = new ScrollMagic.Scene({
  duration: 27000, //2.5 seconds
  triggerElement: intro,
  triggerHook:0
})
  // .addIndicators()
  .setPin(intro)
  .addTo(controller);

//TEXT ANIMATION
const textAnim  = TweenMax.fromTo(text, 2.5, { opacity: 1 }, { opacity: 0 });

let scene2 = new ScrollMagic.Scene({
  duration: 4000,
  triggerElement: intro,
  triggerHook: 0
})
  .setTween(textAnim)
  .addTo(controller);

//VIDEO ANIMATION
let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;

scene.on('update', e=> {
  scrollpos = e.scrollPos / 1000;
}); 

setInterval(() => {
  delay += (scrollpos - delay) * accelamount;
  // console.log(scrollpos, delay);

  // video.currentTime = scrollpos;
  video.currentTime = delay;
}, 33.3);