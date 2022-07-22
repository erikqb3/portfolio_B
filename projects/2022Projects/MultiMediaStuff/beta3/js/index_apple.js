// function navElements(
//   hambBtn = document.getElementById("hambBtn"),
//   sideNav = document.getElementById('sideNav'),
//   mobileNav = sideNav.parentElement,
//   mainNav = document.getElementById('mainNav'),
//   mainNav_dropDown_btn = mainNav.children[0].children[0].children[0],
//   mainNav_dropDown_list = mainNav.children[0].children[0].children[1]
// ) {
//   hambBtn.addEventListener('click',(e)=>{
//     mobileNav.classList.toggle('switch_ON');
//   })
//   mainNav_dropDown_btn.addEventListener('click',(e)=> {
//     console.log(mainNav_dropDown_list)
//     mainNav_dropDown_list.classList.toggle('switch_ON');
//   })
// }

// navElements();


const navElementFunctions = {
  mobileNav : function(
    hambBtn = document.getElementById("hambBtn"),
    mobileNav = document.getElementById('nav_mobile')
  ){
    hambBtn.addEventListener('click',(e)=>{
      mobileNav.classList.toggle('switch_ON');
    });
    // mobileNav.addEventListener('click',(e)=>{
    //   mobileNav.classList.toggle('switch_ON');
    // })
  },
  mainNav : function(
    dropDownOptions_array = document.querySelectorAll('.dropDown_holder'),
    mainElement = document.querySelector('main')
  ){
    for (let option of dropDownOptions_array) {
      option.children[0].addEventListener('click',(e)=> {
        // console.log(e.target.nextSibling.nextSibling)
        for (let option_I of dropDownOptions_array) {
          // console.log(option_I)
          if (option_I.children[1] != e.target.nextSibling.nextSibling) {
            option_I.children[1].classList.remove('switch_ON');
          }
        }
        e.target.nextSibling.nextSibling.classList.toggle('switch_ON');
      })
    }
    // mainElement.addEventListener('click',(e)=>{
    //   for (let option_II of dropDownOptions_array) {
    //     option_II.children[1].classList.remove('switch_ON');
    //   }
    // })
    window.addEventListener('click',(e)=> {
      // console.log(e.target.tagName)
      for (let option_II of dropDownOptions_array) {
        if (e.target != option_II.children[0]) {
          option_II.children[1].classList.remove('switch_ON');
        }
      }
    })
  }
}

const footerElementFunctions = {
  dropDownLists : function(
    dropDown_array = document.querySelectorAll('h4.footerDropDown')
  ){
    if (window.innerWidth < 1900) {
      for (let element of dropDown_array) {
        // let list = element.children[1];
        element.addEventListener('click',(e)=>{
          let pastTarget = document.querySelector('ul.showList');
          if (pastTarget == e.target.nextElementSibling) {
            e.target.nextElementSibling.classList.toggle('showList');
          }
          else {
            try {
              pastTarget.classList.toggle('showList')
              console.log('pastTarget', pastTarget)
              // document.querySelector('h4.showList').classList.toggle('showList');
            }
            catch(err) {}
            e.target.nextElementSibling.classList.toggle('showList');
          }
          // console.log('showList', e.target.nextElementSibling)
        })
        // console.log(button);
      }
    }
  },
  getInTouch : function(
    gIT_btn = document.getElementById('subscribe').children[0],
    // closeBtn = document.getElementById('closeFormBtn')
  ){ 
    console.log(gIT_btn);
    gIT_btn.addEventListener('click',()=>{
      console.log(document.getElementById('subscribe').children[1])
      document.getElementById('subscribe').children[1].classList.toggle('showOverlay');
      let closeBtn = document.getElementById('closeFormBtn');
      function closeEvent (){
        document.getElementById('subscribe').children[1].classList.remove('showOverlay');
        closeBtn.removeEventListener('click',closeEvent)
      }
      closeBtn.addEventListener('click', closeEvent)
    })
  }
};


navElementFunctions.mobileNav();
navElementFunctions.mainNav();
footerElementFunctions.dropDownLists();
footerElementFunctions.getInTouch();

// console.log("HELLOW");