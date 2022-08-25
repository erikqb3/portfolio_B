import { addAction } from '../js/addAction.js';

export const establishHTML = {
  disclaimer : function(
    body = document.querySelector('body'),
    popUp = helperFunctions.generateElement('div',"disclaimerPopUp"),
    warning = helperFunctions.generateElement('h1',"","","DISCLAIMER"),
    description = helperFunctions.generateElement('p',"","","This Website is still under construction but posted for sample review. Some utilities do not function, but the necessary majority does. <h2>Please explore and enjoy!</h2>Click Anywhere to Continue...")
    ){
        console.log("HELLOW HONEST")
        popUp = helperFunctions.appendChildren(popUp, warning,description)
        body.appendChild(popUp)
        popUp.addEventListener('click',(e)=>{
            popUp.style.opacity = 0;
            let myTimeOut = setTimeout(()=>{
              console.log(popUp);
              popUp.remove();
            },750)
        })


  },
  filterDropDowns: function (
    listOption,
    ST_array = ["For Authors","For Artists","For Animators", "For Anyone Else", "For Academics"],
    YC_array = ["2020 - 2024", "2025 - 2029","2030 - 2034","2035 - 2039", "2040 - 2044", "2045 - 2049" ], //if you add more, change the margin-top of "li.dropDwn_holder:nth-of-type(x):hover"

    ST_dropDwn_Btn = helperFunctions.generateElement('div',"ST_dropDwn_Btn","dropDown"),
    ST_dropDwn_content = helperFunctions.generateElement('ul',"ST_dropDwn_content","DDList"),
  
    YC_dropDwn_Btn = helperFunctions.generateElement('div',"YC_dropDwn_Btn","dropDown"),
    YC_dropDwn_content = helperFunctions.generateElement('ul',"YC_dropDwn_content","DDList")
    ) {
      
      let ST_dropDwn_holder;
      let YC_dropDwn_holder;

      console.log(listOption)
      if (listOption) {
        try {
          if (listOption.innerHTML == "Site Type") {
            ST_dropDwn_holder = listOption;
            ST_dropDwn_holder.innerHTML="";
            for (let i in ST_array) {
              let ST_filter = helperFunctions.generateElement('li',"","filter",`${ST_array[i]}`);
              ST_dropDwn_content.appendChild(ST_filter)
            }
            ST_dropDwn_holder = helperFunctions.appendChildren(ST_dropDwn_holder, ST_dropDwn_Btn,ST_dropDwn_content);
            ST_dropDwn_Btn.innerHTML = "Site Type"
          }     
          else if (listOption.innerHTML = "Year") {
            YC_dropDwn_holder = listOption;
            YC_dropDwn_holder.innerHTML="";
            for (let i in YC_array) {
              let YC_filter = helperFunctions.generateElement('li',"","filter",`${YC_array[i]}`);
              YC_dropDwn_content.appendChild(YC_filter)
            }
            YC_dropDwn_holder = helperFunctions.appendChildren(YC_dropDwn_holder, YC_dropDwn_Btn,YC_dropDwn_content);
            YC_dropDwn_Btn.innerHTML = "Year"
          }   
        }
        catch(err) {
          console.log(err,"L103")
        }
      }
  },
  footer: function (footerElement = helperFunctions.generateElement('footer')) {
    // console.log(footerElement);
    document.querySelector('body').appendChild(footerElement);
    console.log('WORKS?');
  },
  header: function (
    header = helperFunctions.generateElement('header'),
    name = helperFunctions.generateElement('h1', '', '', 'Erik Q.<br>Birch'),
    titles = helperFunctions.generateElement('p','','','Web Designer | Developer | Creator'),
    hamBtn = helperFunctions.generateElement('div', 'hamBtn', '', '&#9776'),
    filterSettings_void = helperFunctions.generateElement('div', 'filterSettings_void'),
    filterSettings_holder = helperFunctions.generateElement('div','filterSettings_holder'),
    filterSettings_list = helperFunctions.generateElement('ul',"nav"),
    // listOptions = ['Portfolio', 'Resume', 'Contact']
    listOptions = ['View ALL', 'Site Type', 'Year', 'Resume', 'Contact']
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

      if ((i == 1) || (i == 2)) {
        // console.log(listOptions[i])
        listOptions[i] = helperFunctions.generateElement('li','','dropDwn_holder',listOptions[i]);
        this.filterDropDowns(listOptions[i]);
      } else {
        listOptions[i] = helperFunctions.generateElement('li', '', '', listOptions[i]);
      }
      // listOptions[i] = helperFunctions.generateElement('li', '', '', listOptions[i]);
      filterSettings_list.appendChild(listOptions[i]);
    }
    //STEP3
    filterSettings_holder.appendChild(filterSettings_list);
    header = helperFunctions.appendChildren(header, name,titles,hamBtn,filterSettings_void,filterSettings_holder);
    document.querySelector('body').appendChild(header);

    addAction.useFunctions()
  },
  hero: function (
    quoteInfo = this.heroQuotes(),
    hero = helperFunctions.generateElement('section', 'hero'),
    infoHolder = helperFunctions.generateElement('div', 'infoHolder'),
    title = helperFunctions.generateElement('h2', 'title', '', 'Showcase Portfolio 2.0'),
    quote = helperFunctions.generateElement('p', 'quote', '', `${quoteInfo[0]}`),
    author = helperFunctions.generateElement('p', 'author', '', `${quoteInfo[1]}`),
    video = helperFunctions.generateElement('video', '', 'video'),
    videoSource = helperFunctions.generateElement('source','','video/mp4','','resources/PortfolioVideo(Beta1).mp4')
  ) {
    /**
     * STEP1: give video video properties
     * STEP2: append elements (order/nesting matters)
     */

    helperFunctions.customSpecialElements(video); //STEP1
    //STEP2
    infoHolder = helperFunctions.appendChildren(infoHolder, title, quote, author);
    video.appendChild(videoSource);
    hero = helperFunctions.appendChildren(hero, infoHolder, video);
    document.querySelector('body').appendChild(hero);
  },
  heroQuotes: function (
    quotes = [
      {
        Quote: 'The Noblest Art is that of Making Others Happy!',
        Author: 'P.T.Barnum (Entertainer)',
      },
      {
        Quote:
          '...If there is anything virtuous, lovely, or of good report or praiseworthy, we seek after these things.',
        Author: 'Article of Faith #13',
      },
      {
        Quote:
          'You can design and create, and build the most wonderful place in the world. But it takes people to make the dream a reality!',
        Author: 'Walt Disney (Animator and Entrepeneur)',
      },
      {
        Quote:
          'Creativity is allowing yourself to make mistakes. Art is knowing which ones to keep.',
        Author: 'Scott Adams (Cartoon Artist)',
      },
      {
        Quote:
          'Education is the difference between wishing you could help other people and being able to help them.',
        Author: 'Russell. M. Nelson (Latter-day Prophet)',
      },
      {
        Quote:
          'Nobody cares now much you know, until they know how much they care.',
        Author: 'Theodore Roosevelt (U.S. President)',
      },
    ],
    randNumb = Math.floor(Math.random() * quotes.length)
  ) {
    return [quotes[randNumb].Quote, quotes[randNumb].Author];
  },
  mainContent: async function () {
    try {
      let json = 'displayCase.json';
      await fetch(json,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept':'application/json'
            }
          })
        .then((response) => {return response.json()})
        .then((jsObject) => {
          this.useFetchResults(jsObject);
          helperFunctions.lazyLoading();
          this.footer();
        })
        .catch(err => {
          console.log(err)
        });
    }
    catch (err) {
    }
  },
  mainContent_filtered : async function(){},
  preview : {
    popUp : function(){},
    carousel: function(){},
    description : function(){},
    useFuncions : function(){}
  },
  useFetchResults : function (
    results,
    contentWrap = helperFunctions.generateElement('div', 'contentWrap'),
    mainContent = helperFunctions.generateElement('section', 'mainContent')
  ) {
    console.log(results);
    for (let i in results) {
      let projectHolder = helperFunctions.generateElement('div', '', 'projectHolder');
      let projectLink = helperFunctions.generateElement('a','','','',`${results[i].path}`);
      let contentHolder = helperFunctions.generateElement('div', '', 'contentHolder');
      let infoOverlay = helperFunctions.generateElement('div', '', 'infoOverlay');
      let label = helperFunctions.generateElement('h3', '', 'label', `${results[i].name}`);
      let thumbnail = helperFunctions.generateElement('img','','thumbnail');
      thumbnail = helperFunctions.customSpecialElements(thumbnail,[`${results[i].thumbnailPaths[0]}`,`${results[i].name}`])

      infoOverlay.appendChild(label);
      contentHolder = helperFunctions.appendChildren(
        contentHolder,
        infoOverlay,
        thumbnail
      );
      projectLink.appendChild(contentHolder);
      projectHolder.appendChild(projectLink);
        // projectHolder.appendChild(contentHolder)

      mainContent.appendChild(projectHolder);
      // console.log(results[i].name);
    }
    contentWrap.appendChild(mainContent);
    document.querySelector('body').appendChild(contentWrap);
  },
  userFunctions : function(
    //ORDER MATTERS HERE
  ){
    this.header();
    this.hero();
    this.filterDropDowns()
    this.mainContent();
    this.disclaimer();
  }
};

const helperFunctions = {
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
    switch (element.classList.value) {
      case 'video':
        element.setAttribute('autoplay', 'autoplay');
        element.setAttribute('loop', true);
        element.muted = 'muted';
        break;
      case 'thumbnail':
        element.setAttribute('src',"../resources/img/Square.png");
        element.setAttribute('data-src', extraAttribute[0]);
        element.setAttribute('alt',extraAttribute[1])
    }
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
  }
}




