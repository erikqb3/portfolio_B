


function scrollAnimation () {
  //https://www.youtube.com/watch?v=wLUJ9VNzZXo&ab_channel=DevEd
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
    duration: 27000, //27 seconds
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

}

// scrollAnimation();

function photoAnimation(){
let allImages = document.getElementById('allImages');
let allImages_position = allImages.offsetTop; //BINGO
let allImages_height = allImages.offsetHeight;
let allImages_array = allImages.children;
let allImages_maxHeight = ((allImages_height*3)) //not height of all pictures, only up til the last one

let img4 = document.getElementById("img4");
let img3 = document.getElementById("img3");
let img2 = document.getElementById("img2");


console.log(window.innerHeight, allImages_height)


window.addEventListener('scroll',(e)=>{
  let scroll = this.scrollY;
  let allImages_percentage = ((scroll-allImages_position)/allImages_maxHeight).toFixed(2)
  let view;

  console.log(scroll, allImages_position, window.innerHeight, allImages_height, allImages_maxHeight, allImages_percentage)


  if ((scroll > allImages_position) && (scroll < (allImages_position + (allImages_height*3)))) { //Within allImages
    allImages.style.position = "fixed";
    allImages.style.top = "initial";
    for (let i of allImages_array) {
      i.style.position = "fixed";
    };
    // if (allImages_percentage > 0.35){
    //   try {
    //     img4.classList.add("foldUp");
    //   }
    //   catch(err) {
    //     console.log(err);
    //   }
    // }
    // else {
    //   try {
    //     img4.classList.remove('foldUp');
    //   }
    //   catch(err) {
    //     console.log(err)
    //   }
    // }
    if (allImages_percentage < 0.35) {
      img4 = document.getElementById("img4");
      let newHeight4 = 100-((allImages_percentage*100)*3)
      console.log(newHeight4);
      img4.style.height = `${newHeight4}vh`
    }

    if ((allImages_percentage > 0.35) && (allImages_percentage < 0.70)) {
      img3 = document.getElementById("img3");
      let newHeight3 = 100-(((allImages_percentage-0.35)*100)*3)
      img3.style.height = `${newHeight3}vh`
    }
    if ((allImages_percentage > 0.7) && (allImages_percentage < 1.05)) {
      img2 = document.getElementById("img2");
      let newHeight2 = 100-(((allImages_percentage-0.7)*100)*3)
      img2.style.height = `${newHeight2}vh`
    }
    
  }
  else if (scroll > (allImages_position + (allImages_height*3))) { //After allImages
    allImages.style.position = "relative";
    allImages.style.top = `${allImages_position + (allImages_height*1.95)}px`;
    for (let i of allImages_array) {
      i.style.position = "relative";
    }
    console.log('OVER')
  }
  else { //Before allImages
    allImages.style.position = "absolute";
    allImages.style.top = "initial";
    for (let i of allImages_array) {
      i.style.position = "absolute";
    }
  }
})

}

photoAnimation();



// function writeJson() {
//   console.log("HELLOW")
//   let obj = {
//     university: []
//   }
  
//   obj.university.push(
//     {
//       "name":"Brigham Young University",
//       "class":[
//           {
//               "name":"applied programming",
//               "rating":[
//                       {
//                       "overall": "5",
//                       "workload": "5",
//                       "tudorAvailability" : "5",
//                       "interesting": "5",
//                       "comment": "really engaging, loved the class"
//                       }
//               ]
              
//           }
//       ]
      
//   }
//   )

//   let json = JSON.stringify(obj);

//   const fs = require('fs');
//   fs.writeFile('myjsonfile.json',json,'utf8',callback);
// }


// writeJson();















//NOTES/PAST WORK
// function scrollAnimation () {
//   //https://www.youtube.com/watch?v=wLUJ9VNzZXo&ab_channel=DevEd
//   //STARTING VARIALBES
//   const intro = document.querySelector('.intro');
//   const video = intro.querySelector('video'); //forgot I could do this
//   const text = intro.querySelector('h1');
//   //END SECTION
//   const section = document.querySelector('section');
//   const end = section.querySelector('h1');
  
//   //SCROLLMAGIC
//   const controller = new ScrollMagic.Controller();
//   const scene = new ScrollMagic.Scene({
//     duration: 27000, //27 seconds
//     triggerElement: intro,
//     triggerHook:0
//   })
//     // .addIndicators()
//     .setPin(intro)
//     .addTo(controller);
  
//   //TEXT ANIMATION
//   const textAnim  = TweenMax.fromTo(text, 2.5, { opacity: 1 }, { opacity: 0 });
  
//   let scene2 = new ScrollMagic.Scene({
//     duration: 4000,
//     triggerElement: intro,
//     triggerHook: 0
//   })
//     .setTween(textAnim)
//     .addTo(controller);
  
//   //VIDEO ANIMATION
//   let accelamount = 0.1;
//   let scrollpos = 0;
//   let delay = 0;
  
//   scene.on('update', e=> {
//     scrollpos = e.scrollPos / 1000;
//   }); 
  
//   setInterval(() => {
//     delay += (scrollpos - delay) * accelamount;
//     // console.log(scrollpos, delay);
  
//     // video.currentTime = scrollpos;
//     video.currentTime = delay;
//   }, 33.3);

// }

// // scrollAnimation();

// function photoAnimation(){
// // let html = document.querySelector("html");
// // let body = document.querySelector("body");
// // let htmlScrollTop = html.scrollTop


// let allImages = document.getElementById('allImages');
// // let allImages_position = allImages.getBoundingClientRect().top //Compares to top of the screen, but resets even if in middle of the scroll
// let allImages_position = allImages.offsetTop; //BINGO
// let allImages_height = allImages.offsetHeight;
// let allImages_array = allImages.children;
// // for (let i of allImages_array) {
// //   console.log(i)
// // }

// console.log(window.innerHeight, allImages_height)
// // console.log()

// window.addEventListener('scroll',(e)=>{
//   let scroll = this.scrollY;
//   // console.log(scroll);
//   // let allImages_position = allImages.getBoundingClientRect().top
//   console.log(scroll, allImages_position)
//   // console.log(scroll)
//   // console.log(window.innerHeight)

//   if ((scroll > allImages_position) && (scroll < (allImages_position + (allImages_height*3)))) {
//     allImages.style.position = "fixed";
//     allImages.style.top = "initial";
//     for (let i of allImages_array) {
//       i.style.position = "fixed";
//     }
//   }
//   else if (scroll > (allImages_position + (allImages_height*3))) {
//     allImages.style.position = "relative";
//     allImages.style.top = `${allImages_position + (allImages_height*1.95)}px`;
//     // allImages.style.marginTop = (allImages_height*3);
//     for (let i of allImages_array) {
//       i.style.position = "relative";
//     }
//     console.log('OVER')
//   }
//   else {
//     allImages.style.position = "absolute";
//     allImages.style.top = "initial";
//     for (let i of allImages_array) {
//       i.style.position = "absolute";
//     }
//   }
//   // if (scroll > allImages.scrollTop) {
//   //   console.log("Past allImages")
//   // }
// })

// }

// photoAnimation();