
const establishHTML = {
  fetchFromJSON : async function(
    json = "js/images.json"
  ){
    try {
      await fetch (json)
        .then((response)=>{return response.json()})
        .then((jsObject)=>{
          this.gallery(jsObject);
        })
    }
    catch(err){console.log(err)} 
  },
  gallery : function(
    jsObject,
    main = document.querySelector("main"),
    gallery = helperFunctions.generateElement('section',"gallery"),
    grid = helperFunctions.generateElement('div',"grid")
  ){
    for (let img of Object.keys(jsObject)){
      let imgArticle = this.imgArticle(jsObject[img])
      grid.appendChild(imgArticle)
    }
    gallery.appendChild(grid);
    main.appendChild(gallery);

  },
  imgArticle : function (
    img,
    imgHolder = helperFunctions.generateElement('article',img.title,"imgHolder"),
    imgOverlay = helperFunctions.generateElement('div',"","imgOverlay"),
    imgLabel = helperFunctions.generateElement('h3',"","",img.title),
    // imgElement = helperFunctions.generateElement('img',img.title,"","",img.path)
  ){
    // console.log(img)
    if (img.type == "tall"){
      imgElement = helperFunctions.generateElement('img',`${img.title}_pic`,"tall","",img.path)
    }
    else if (img.type == "wide"){
      imgElement = helperFunctions.generateElement('img',`${img.title}_pic`,"wide","",img.path)
    }

    imgOverlay.appendChild(imgLabel);
    imgHolder = helperFunctions.appendChildren(imgHolder, imgOverlay,imgElement);
    imgHolder.addEventListener('click',(e)=>{
      this.popUpPreview(img, imgHolder);
    })
    return imgHolder;
  },
  popUpPreview : function(
    imgData, 
    imgHolder,
    popUp = helperFunctions.generateElement('section',"popUp"),
    side1 = helperFunctions.generateElement('div',"side1"),
    img = helperFunctions.generateElement('img',`${imgData.title}_popImg`,"","",imgData.path),
    side2 = helperFunctions.generateElement('div',"side2"),
    infoSection = helperFunctions.generateElement('div',"infoSection"),
    title = helperFunctions.generateElement('h1',"title","",imgData.title),
    descript = helperFunctions.generateElement('p',"descript","",imgData.description))
    {
      if (imgData.type == "tall"){
        img.classList.add("tall");
      }
      else {
        img.classList.add('wide')
      }
      console.log(imgData,imgHolder);
      side1.appendChild(img);
      infoSection = helperFunctions.appendChildren(infoSection, title,descript)
      side2.appendChild(infoSection);
      popUp = helperFunctions.appendChildren(popUp, side1,side2);
      popUp.addEventListener('click',(e)=>{
        popUp.remove();
      })
      document.querySelector('body').appendChild(popUp);

  },
  useFunctions : function(){
    this.fetchFromJSON();
    
  }
}

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

establishHTML.useFunctions()


