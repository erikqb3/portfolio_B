export const addAction = {
  showDropDown2 : function (dropDwn_content_array = document.querySelectorAll("ul.DDList")){
    console.log("testing")
    for (let ulElement of dropDwn_content_array) {
      let DDButton = ulElement.previousElementSibling;
      let DDList = ulElement
      DDButton.addEventListener('click', (e)=>{
        try {
          let oldOption = document.querySelector('.showList').previousElementSibling;
          if (oldOption == DDButton){
            DDList.classList.remove("showList");
            DDButton.style.backgroundColor = "inherit";
            // return;
          }
          else {
            oldOption.nextElementSibling.classList.remove('showList');
            oldOption.style.backgroundColor = "inherit";
          }
        }
        catch(err){
          DDList.classList.toggle("showList");
          if (DDList.classList.contains("showList")) {
            DDButton.style.backgroundColor = "rgba(100,100,100,1)";
            for (let li of DDList.children){
              li.addEventListener('click',(e)=>{
                filterSettings_void.classList.remove('visible');
                filterSettings_holder.classList.remove('visible');
              })
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
  showfilterSettings: function (hamBtn){
    hamBtn.addEventListener('click', (
      e, 
      filterSettings_void = document.getElementById('filterSettings_void'),
      filterSettings_holder = document.getElementById('filterSettings_holder'),
      navItems_array = document.getElementById('nav').children,
      dropDwn_content_array = document.querySelectorAll("ul.DDList")
      //STEP_1: show void and nav
      //STEP_2: remove showList from dropDownBtns
      //STEP_3: create escapes (click void or non DropDown Btns)
      //STEP_4: give dropDownBtn click eventListeners
      //STEP_4a: 
      )=> { 
        //STEP_1
        filterSettings_void.classList.add('visible');
        filterSettings_holder.classList.add('visible');

        //STEP_2
        try {
          document.querySelector('.showList').previousElementSibling.style.backgroundColor = "inherit";
          document.querySelector(".showList").classList.remove('showList');
        }
        catch(err){}
        try{
          console.log(e.target)
          e.target.removeEventListener('click',this.showDropDown2);
        }
        catch(err){}
        e.target.addEventListener('click',this.showDropDown2())
        //STEP_3
        filterSettings_void.addEventListener('click', (e) => {
          filterSettings_void.classList.remove('visible');
          filterSettings_holder.classList.remove('visible');
        })
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
        }

        
    })
  },
  fixedheader : function(
    header = document.querySelector('header')
    ){
      window.addEventListener('scroll',(e)=>{
        scroll = window.scrollY
        // if (window.innerWidth >= 1200){}
        // console.log(scroll)
        if (scroll >= 500) {
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
    }

}