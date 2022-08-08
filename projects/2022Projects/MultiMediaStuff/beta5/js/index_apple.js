
const navElementFunctions = {
  mobileNav : {
    hamburgerBtn : function(
      //STEP_1: add event listener to hambBtn
      //STEP_1a: add css attributes by toggling the class whenenever you click it
      //STEP_1b: change the icon whenever you click it.
      hambBtn = document.getElementById("hambBtn"),
      mobileNav = document.getElementById('nav_mobile')
    ){
      //STEP_1
      hambBtn.addEventListener('click',(e)=>{
        //STEP_1a
        mobileNav.classList.toggle('switch_ON');
        //STEP_1b
        if (mobileNav.classList.contains('switch_ON')){
          mobileNav.children[0].innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
        }
        else {
          mobileNav.children[0].innerHTML = '<i class="fa-solid fa-bars"></i>'
        }
      });
    },
    listOptions : function(
      //STEP_1: loop through all elements with "sideNav" class in "nav_mobile" element
      //STEP_2: check if looped element is a "li" element and has the class "dropDown_holder"
      //STEP_3: loop through the elements within the dropDown_holder's ul element (the ul.dropDownList comes after div.dropDown_btn, thus children[1])
      //STEP_4: avoiding the hr elements, add event listeners to each of the small "li" suboptions 
      //STEP_4a: flip the menu back up after they are clicked (that way it's not down when you try to navigate to various parts of the page)
      nav_mobile = document.getElementById('nav_mobile'),
      navOptions_array = document.getElementById("sideNav").firstElementChild.children
    ){
      //STEP_1
      for (let option of navOptions_array){
        //STEP_2
        if ((option.tagName == "LI") && (option.classList.contains('dropDown_holder'))){
          //STEP_3
          for (let subOption of option.children[1].children) {
            //STEP_4
            if (subOption.tagName == "LI"){
              subOption.addEventListener('click',()=>{
                //STEP_4a
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
    // mainElement = document.querySelector('main')
    // STEP_1: loop through elements in navbar and add event listeners to each option
    // STEP_2: 
  ){
    for (let option of dropDownOptions_array) {
      option.children[0].addEventListener('click',(e)=> {
        for (let option_I of dropDownOptions_array) {
          console.log(option_I.children[1], e.target.nextElementSibling)
          if (option_I.children[1] != e.target.nextElementSibling) {
            option_I.children[1].classList.remove('switch_ON');
          }
        }
        e.target.nextElementSibling.classList.toggle('switch_ON');
      })
    }
    window.addEventListener('click',(e)=> {
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
            }
            catch(err) {}
            e.target.classList.toggle('showList');
            e.target.nextElementSibling.classList.toggle('showList');
          }
        })
      }
    }
  },

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
    })
  }
};


navElementFunctions.mobileNav.hamburgerBtn();
navElementFunctions.mobileNav.listOptions();
navElementFunctions.mainNav();
footerElementFunctions.dropDownLists();
footerElementFunctions.scrollEffect_appear();