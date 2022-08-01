
const navElementFunctions = {
  mobileNav : {
    hamburgerBtn : function(
      hambBtn = document.getElementById("hambBtn"),
      mobileNav = document.getElementById('nav_mobile')
    ){
      hambBtn.addEventListener('click',(e)=>{
        mobileNav.classList.toggle('switch_ON');
        if (mobileNav.classList.contains('switch_ON')){
          mobileNav.children[0].innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
        }
        else {
          mobileNav.children[0].innerHTML = '<i class="fa-solid fa-bars"></i>'
        }
      });
      // mobileNav.addEventListener('click',(e)=>{
      //   mobileNav.classList.toggle('switch_ON');
      // })
    },
    listOptions : function(
      nav_mobile = document.getElementById('nav_mobile'),
      navOptions_array = document.getElementById("sideNav").firstElementChild.children
    ){

      // console.log(navOptions_array)
      for (let option of navOptions_array){
        if ((option.tagName == "LI") && (option.classList.contains('dropDown_holder'))){
          // console.log(option);
          for (let subOption of option.children[1].children) {
            // console.log(subOption)
            if (subOption.tagName == "LI"){
              // console.log(subOption)
              subOption.addEventListener('click',()=>{
                nav_mobile.classList.toggle('switch_ON')
              })
            }
          }
        }
      }
    }

  },
  mainNav : function(
    dropDownOptions_array = document.querySelectorAll('.dropDown_holder'),
    mainElement = document.querySelector('main')
  ){
    for (let option of dropDownOptions_array) {
      option.children[0].addEventListener('click',(e)=> {
        // console.log(e.target.nextSibling.nextSibling)
        for (let option_I of dropDownOptions_array) {
          // console.log(option_I, e.target.nextElementSibling);
          if (option_I.children[1] != e.target.nextElementSibling) {
            option_I.children[1].classList.remove('switch_ON');
          }
        }
        e.target.nextElementSibling.classList.toggle('switch_ON');

        // if (e.target.nextElementSibling.classList.contains('switch_ON')) {
        //   for (let element of e.target.nextElementSibling.children){
        //     // console.log(element.tagName, element)
        //     if (element.tagNam == "LI") {
        //       element.addEventListener('click',(e)=>{
                
        //       })
        //     }
        //   }
        //   console.log(e.target.nextElementSibling.children)
        // }
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
          let pastTarget_h4 = document.querySelector('h4.showList')
          let pastTarget_div = document.querySelector('div.showList');
          if (pastTarget_div == e.target.nextElementSibling) {
            e.target.classList.toggle('showList');
            e.target.nextElementSibling.classList.toggle('showList');
          }
          else {
            try {
              console.log(e.target);
              pastTarget_h4.classList.toggle('showList');
              pastTarget_div.classList.toggle('showList');
              // console.log('pastTarget', pastTarget)
              // document.querySelector('h4.showList').classList.toggle('showList');
            }
            catch(err) {}
            e.target.classList.toggle('showList');
            e.target.nextElementSibling.classList.toggle('showList');
          }
          // console.log('showList', e.target.nextElementSibling)
        })
        // console.log(button);
      }
    }
  },
  // getInTouch : function(
  //   gIT_btn = document.getElementById('subscribe').children[0],
  //   // closeBtn = document.getElementById('closeFormBtn')
  // ){ 
  //   // console.log(gIT_btn);
  //   gIT_btn.addEventListener('click',()=>{
  //     // console.log(document.getElementById('subscribe').children[1])
  //     document.getElementById('subscribe').children[1].classList.toggle('showOverlay');
  //     let closeBtn = document.getElementById('closeFormBtn');
  //     function closeEvent (){
  //       document.getElementById('subscribe').children[1].classList.remove('showOverlay');
  //       closeBtn.removeEventListener('click',closeEvent)
  //     }
  //     closeBtn.addEventListener('click', closeEvent)
  //   })
  // },
  scrollEffect_appear : function(
    animationSection = document.getElementById('animationSection_youtubestyle'),
    footer = document.querySelector('footer')
  ){
    window.addEventListener('scroll', (e)=> {
      scroll = window.scrollY;

      if (scroll >= (animationSection.offsetTop + (animationSection.offsetHeight / 5))) {
        footer.style.opacity = "1"
      }
      else {
        footer.style.opacity = "0";
      }
      if (scroll >= (animationSection.offsetTop + animationSection.offsetHeight)){
        document.getElementById('contactUs').classList.add("contactUs_altered");
      }
      else {
        document.getElementById('contactUs').classList.remove("contactUs_altered");
      }

      // console.log(scroll, animationSection.offsetTop)
      // if (window.innerWidth < 993){
      //   if (scroll >= (animationSection.offsetTop + (animationSection.offsetHeight / 2))) {
      //     footer.style.opacity = "1";
      //     // footer.style.opacity = "1";
      //   }
      //   else {
      //     footer.style.opacity = "0";
      //     // footer.style.opacity = "0";
      //     try {
      //       textOverlay = document.getElementById('videoHolder_ani');
      //       textOverlay.classList.remove('showOverlay');
      //     }
      //     catch(err){}
      //   }
      // }
      // else {
      //   if (scroll >= (animationSection.offsetTop - 200)) {
      //     animationSection.style.opacity = "1";
      //   }
      //   else {
      //     animationSection.style.opacity = "0";
      //     try {
      //       textOverlay = document.getElementById('videoHolder_ani');
      //       textOverlay.classList.remove('showOverlay');
      //     }
      //     catch(err){}
      //   }
      // }
      
    })
  }
  // scrollEffect_appear : function(
  //   footer = document.querySelector('footer'),
  //   footerTop = footer.offsetTop
  // ){
  //   console.log(footerTop);
  //   window.addEventListener('scroll', (e)=>{
  //     let scroll = window.scrollY;
  //     let screenWidth = window.innerWidth;
  //     console.log(scroll, footerTop);
  //     if (screenWidth < 768) {
  //       if (scroll <= (footerTop+750)) {
  //         footer.style.opacity = "0"
  //       }
  //       else (
  //         footer.style.opacity = "1"
  //       )
  //     }
  //     else if (screenWidth <= 993) {
  //       if (scroll <= (footerTop+375)) {
  //         footer.style.opacity = "0"
  //       }
  //       else (
  //         footer.style.opacity = "1"
  //       )
  //     }
  //   })
  // }
};


navElementFunctions.mobileNav.hamburgerBtn();
navElementFunctions.mobileNav.listOptions();
navElementFunctions.mainNav();
footerElementFunctions.dropDownLists();
// footerElementFunctions.getInTouch();
footerElementFunctions.scrollEffect_appear();

// console.log("HELLOW");