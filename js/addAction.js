//NOTE: DO NOT PUT EVENT LISTENERS IN EVENT LISTENERS, THEY WILL BE ADD REPEATED
import { establishHTML } from '../js/establishHTML.js';

export const addAction = {
  hambBtn : function(hamBtn = document.getElementById('hamBtn')){
    hamBtn.addEventListener('click', (
      e, 
      filterSettings_void = document.getElementById('filterSettings_void'),
      filterSettings_holder = document.getElementById('filterSettings_holder'),
      //STEP_1: show void and nav
      //STEP_2: remove showList from dropDownBtns
      //STEP_3: create escapes (click void or non DropDown Btns)
      //STEP_4: give dropDownBtn click eventListeners
      //STEP_4a: 
      )=> { 
        console.log(filterSettings_void);
        //STEP_1
        filterSettings_void.classList.add('visible');
        filterSettings_holder.classList.add('visible');

        //STEP_2
        try {
          document.querySelector('.showList').previousElementSibling.style.backgroundColor = "inherit";
          document.querySelector(".showList").classList.remove('showList');
        }
        catch(err){}
      })
  },
  filterSettings_void : function(
    filterSettings_void = document.getElementById("filterSettings_void"),
    filterSettings_holder = document.getElementById("filterSettings_holder")
  ){
    filterSettings_void.addEventListener('click', (e) => {
      filterSettings_void.classList.remove('visible');
      filterSettings_holder.classList.remove('visible');
    })
  },
  fixedheader : function(
    header = document.querySelector('header')
    ){
      window.addEventListener('scroll',(e)=>{
        scroll = window.scrollY;
        if ((scroll >= 500)&&(!document.getElementById('filterSettings_void').classList.contains("visible"))) {
          header.classList.add('scrollDownEffect');
          document.getElementById('hero').style.marginTop = "5rem";
          // header.style.position = "fixed";
        }
        else if (scroll == 0) {
          header.classList.remove('scrollDownEffect');
          document.getElementById('hero').style.marginTop = "0rem";
          // header.style.position = "initial";
          // header.style.top = 0;
        }
      })
  },
  navItems_array : function(
    navItems_array = document.getElementById('nav').children
  ){
    for (let li of navItems_array){
      // console.log(li)
      switch (li.innerHTML){
        case "View ALL":
        case "Resume":
        case "Contact": 
          li.addEventListener('click',(e)=>{
            filterSettings_void.classList.remove('visible');
            filterSettings_holder.classList.remove('visible');
          })
      }
      if (li.innerHTML == "View ALL"){
        li.addEventListener('click',(e)=>{
          document.getElementById('mainContent').remove();
          document.querySelector('footer').remove();
          establishHTML.mainContent();
        })
      }
    }
  },
  DDButton : function(dropDwn_content_array = document.querySelectorAll("ul.DDList")){
    for (let ulElement of dropDwn_content_array) {
      let DDButton = ulElement.previousElementSibling;
      let DDList = ulElement;
      DDButton.addEventListener('click', (e)=>{
        console.log("repeat?")
        try {
          let oldOption = document.querySelector('.showList').previousElementSibling;
          console.log(oldOption)
          if (oldOption == DDButton){
            DDList.classList.remove("showList");
            DDButton.style.backgroundColor = "inherit";
            // return;
          }
          else {
            oldOption.nextElementSibling.classList.remove('showList');
            oldOption.style.backgroundColor = "inherit";
            DDList.classList.toggle("showList");
            if (DDList.classList.contains("showList")) {
              DDButton.style.backgroundColor = "rgba(100,100,100,1)";
              // for (let li of DDList.children){
              //   li.addEventListener('click',(e)=>{
              //     filterSettings_void.classList.remove('visible');
              //     filterSettings_holder.classList.remove('visible');
              //   })
              // }
            } else {
              DDButton.style.backgroundColor = "inherit";
              DDList.classList.remove("showList")
            }
          }
        }
        catch(err){
          DDList.classList.toggle("showList");
          if (DDList.classList.contains("showList")) {
            DDButton.style.backgroundColor = "rgba(100,100,100,1)";
            for (let li of DDList.children){
              // li.addEventListener('click',(e)=>{
              //   filterSettings_void.classList.remove('visible');
              //   filterSettings_holder.classList.remove('visible');
              // })
            }
          } else {
            DDButton.style.backgroundColor = "inherit";
            DDList.classList.remove("showList")
          }
        }
    
        
      })
      
      
      // this.showDropDown(e.target, e.target.nextElementSibling))
    }
  },
  DDList_items : function(
    dropDwn_content_array = document.querySelectorAll("ul.DDList"),
    filterSettings_void = document.getElementById("filterSettings_void"),
    filterSettings_holder = document.getElementById("filterSettings_holder")){
    for (let ul_element of dropDwn_content_array){
      for (let li_element of ul_element.children){
        li_element.addEventListener("click",(e)=>{
          filterSettings_void.classList.remove('visible');
          filterSettings_holder.classList.remove('visible');
          console.log(li_element.innerHTML);
          switch (li_element.innerHTML){
            case "For Authors":
              break;
            case "For Artists":
              break;
            case "For Animators":
              break;
            case "For Anyone Else":
              break;
            case "For Academics":
              break;
            case "2020 - 2024":
              break;
            case "2025 - 2029":
              break;
            case "2030 - 2034":
              break;
            case "2035 - 2039":
              break;
            case "2040 - 2044":
              break;
            case "2045 - 2049":
              break;
          }
        })
      }
    }
  },

  useFunctions : function(){
    this.DDButton();
    this.DDList_items();
    this.filterSettings_void();
    this.hambBtn();
    this.navItems_array();
    this.fixedheader();
  }
}