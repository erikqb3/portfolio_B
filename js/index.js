export const sharedHTML = {
  header: function (
    header = helperFunctions.generateElement('header'),
    name = helperFunctions.generateElement('h1', '', '', 'Erik Q.<br>Birch'),
    titles = helperFunctions.generateElement('p','','','Web Designer | Developer | Creator'),
    hamBtn = helperFunctions.generateElement('div', 'hamBtn', '', '&#9776'),
    filterSettings_void = helperFunctions.generateElement('div', 'filterSettings_void'),
    filterSettings_holder = helperFunctions.generateElement('div','filterSettings_holder'),
    filterSettings_list = helperFunctions.generateElement('ul',"nav"),
    // listOptions = ['Portfolio', 'Resume', 'Contact']
    listOptions = ['Portfolio', 'Resume', 'Contact']
  ) {
    /**
     * STEP1: give Hamburger Menu Button an event listener
     * STEP2: create Nav/Filter Bar by looping through the "listOptions" array
     * STEP2a: add "dropDwn_holder" class to element if filter options exist
     * STEP3: append elements together
     */

    // addAction.showfilterSettings(hamBtn); //STEP1

    //STEP2
    for (let i in listOptions) {//STEP2a
      listOptions[i] = helperFunctions.generateElement('li', '', '', listOptions[i]);
      filterSettings_list.appendChild(listOptions[i]);
    }
    //STEP3
    filterSettings_holder.appendChild(filterSettings_list);
    header = helperFunctions.appendChildren(header, name,titles,hamBtn,filterSettings_void,filterSettings_holder);
    document.querySelector('body').appendChild(header);

    addAction.useFunctions()
  },
  footer: function (footerElement = helperFunctions.generateElement('footer')) {
    // console.log(footerElement);
    document.querySelector('body').appendChild(footerElement);
  },
  main :function(mainElement = helperFunctions.generateElement('main')){
    document.querySelector('body').appendChild(mainElement);
  },
  useFunctions : function (){
    this.header();
    this.main();
    this.footer();
  }
}

export const addAction = {
  //NOTE: DO NOT PUT EVENT LISTENERS IN EVENT LISTENERS, THEY WILL BE ADD REPEATED
  headerFunctions : {
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
            document.querySelector('main').style.marginTop = "5rem";
            // header.style.position = "fixed";
          }
          else if (scroll == 0) {
            header.classList.remove('scrollDownEffect');
            document.querySelector('main').style.marginTop = "0rem";
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
          case "Portfolio":
          case "Resume":
          case "Contact": 
            li.addEventListener('click',(e)=>{
              filterSettings_void.classList.remove('visible');
              filterSettings_holder.classList.remove('visible');
            })
        }
        if (li.innerHTML == "Portfolio") {
          li.addEventListener('click',(e)=>{
            window.location.href = "../index.html"
          })
        }
      }
    },
    useFunction : function(){
      this.filterSettings_void();
      this.hambBtn();
      this.navItems_array();
      this.fixedheader();
    }
  },

 

  useFunctions : function(){
    this.headerFunctions.useFunction();
  }
}

export const helperFunctions = {
  appendChildren: function (parent, ...elementChildren) {
    for (let i in elementChildren) {
      parent.appendChild(elementChildren[i]);
    }
    return parent;
  },
  cookieFunctions : {
    checkCookie: function(cName) {
      let string = getCookie(cName);
      if (string != "") {
      //  alert("Welcome again " + username);
      } else {
        // username = prompt("Please enter your name:", "");
        if (string != "" && string != null) {
          // setCookie("username", username, 365);
        }
      }
    },
    getCookie: function(cName) {
      let name = cName + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let cArray = decodedCookie.split(';');
      for(let i = 0; i <cArray.length; i++) {
        let c = cArray[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    setCookie: function (cName, cValue, exDays,cType) {
  const d = new Date();
  d.setTime(d.getTime() + (exDays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cName + "=" + cValue + ";" + expires + ";path=/";
},
  },
  customSpecialElements: function (element,extraAttribute = []) { //CLONE?
    try {
      switch (element.classList.value) {
        case 'video':
          element.setAttribute('autoplay', 'autoplay');
          element.setAttribute('loop', true);
          element.muted = 'muted';
          break;
        case 'thumbnail':
          element.setAttribute('src',"../../resources/img/Square.png");
          element.setAttribute('data-src', extraAttribute[0]);
          element.setAttribute('alt',extraAttribute[1])
      }
    }
    catch(err){console.log(err)}
    return element;
  },
  generateElement: function (
    paramElement,
    paramId = '',
    paramClass = '',
    paramText = '',
    paramLink = ''
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
      default:
        break;
    }
    if (paramText != '') {
      element.innerHTML = paramText;
    }
    return element;
  },
  lazyLoading: function(
    imagesToLoad = document.querySelectorAll('img[data-src]'), //images elements with the attribute "data-src"; similar to css #data-src or .data-src
    loadImages = (img) => {
      console.log("Img Loaded")
      img.setAttribute('src', img.getAttribute('data-src'));
      img.onload = () => {
        img.removeAttribute('data-src');
      }
    },
    imgOptions = {
      threshold: 0,
      rootMargin: "0px 0px -200px 0px" //make bottom positive so images load before entering screen;
    },
  ){
    //imagesToLoad - 
    //loadImages - 
    //imgOptions - 
    //Step1 - 
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
          if(item.isIntersecting) {
            loadImages(item.target);
            observer.unobserve(item.target);
          }
        });
      }, imgOptions);
      imagesToLoad.forEach((img) => {
        observer.observe(img);
      });
    } else {
      imagesToLoad.forEach((img)=> {
        loadImages(img);
      });
    }
  },
  nestChildren: function(parent, ...elementChildren){
    console.log(elementChildren)
    parent.appendChild(elementChildren[0]);
    for (let i=1; i<elementChildren.length; i++){
        elementChildren[i-1].appendChild(elementChildren[i]);
    }
    return parent;
  },
  urlKeyCheck : function(key="", valueLength=0, url = window.location.href){
    let key_URLpos = parseFloat(url.search(`${key}`));
    let startingPoint = key_URLpos+(valueLength+1)
    let key_URLval = url.substring(startingPoint,(startingPoint+(valueLength+1)))
    return key_URLval;
  },
}


