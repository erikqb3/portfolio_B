const images_obj = {
  img1 : {
    "title":"Title1",
    "type":"tall",
    "description":"",
    "path":"images/CK_img01.png"
  },
  img2 : {
    "title":"Title2",
    "type":"wide",
    "description":"",
    "path":"images/CK_img02.png"
  },
  img3 : {
    "title":"Title3",
    "type":"tall",
    "description":"",
    "path":"images/CK_img03.png"
  },
  img4 : {
    "title":"Title4",
    "type":"tall",
    "description":"",
    "path":"images/CK_img04.png"
  },
  img5 : {
    "title":"Title5",
    "type":"wide",
    "description":"",
    "path":"images/CK_img05.png"
  },
  img6 : {
    "title":"Title6",
    "type":"tall",
    "description":"",
    "path":"images/CK_img06.png"
  },
  img7 : {
    "title":"Title7",
    "type":"tall",
    "description":"",
    "path":"images/CK_img07.png"
  },
  img8 : {
    "title":"Title8",
    "type":"tall",
    "description":"",
    "path":"images/CK_img08.png"
  },
  img9 : {
    "title":"Title9",
    "type":"tall",
    "description":"",
    "path":"images/CK_img09.png"
  },
  img10 : {
    "title":"Title10",
    "type":"tall",
    "description":"",
    "path":"images/CK_img10.png"
  },
  img11 : {
    "title":"Title11",
    "type":"wide",
    "description":"",
    "path":"images/CK_img11.png"
  },
  img12 : {
    "title":"Title12",
    "type":"tall",
    "description":"",
    "path":"images/CK_img12.png"
  },
  img13 : {
    "title":"Title13",
    "type":"tall",
    "description":"",
    "path":"images/CK_img13.png"
  },
  img14 : {
    "title":"Title14",
    "type":"tall",
    "description":"",
    "path":"images/CK_img14.png"
  },
  img15 : {
    "title":"Title15",
    "type":"tall",
    "description":"",
    "path":"images/CK_img15.png"
  },
  img16 : {
    "title":"Title16",
    "type":"tall",
    "description":"",
    "path":"images/CK_img16.png"
  },
  img17 : {
    "title":"Title17",
    "type":"tall",
    "description":"",
    "path":"images/CK_img17.png"
  },
  img18 : {
    "title":"Title18",
    "type":"tall",
    "description":"",
    "path":"images/CK_img18.png"
  },
  img19 : {
    "title":"Title19",
    "type":"tall",
    "description":"",
    "path":"images/CK_img19.png"
  },
  img20 : {
    "title":"Title20",
    "type":"tall",
    "description":"",
    "path":"images/CK_img20.png"
  },
  img21 : {
    "title":"Title21",
    "type":"tall",
    "description":"",
    "path":"images/CK_img21.png"
  },
  img22 : {
    "title":"Title22",
    "type":"tall",
    "description":"",
    "path":"images/CK_img22.png"
  },
}

const establishHTML = {
  gallery : function(
    main = document.querySelector("main"),
    gallery = helperFunctions.generateElement('section',"gallery"),
    grid = helperFunctions.generateElement('div',"grid")
  ){
    console.log(images_obj)
    for (let img in images_obj){
      console.log(images_obj[img]);
      let imgArticle = this.imgArticle(img)
      grid.appendChild(imgArticle)
    }
    gallery.appendChild(grid);
    main.appendChild(gallery);

  },
  imgArticle : function (
    img,
    imgHolder = helperFunctions.generateElement('article',"","imgHolder"),
    imgOverlay = helperFunctions.generateElement('div',"","imgOverlay"),
    imgLabel = helperFunctions.generateElement('h3',"","",images_obj[img].title),
    // imgElement = helperFunctions.generateElement('img',images_obj[img].title,"","",images_obj[img].path)
  ){
    if (images_obj[img].type == "tall"){
      imgElement = helperFunctions.generateElement('img',images_obj[img].title,"tall","",images_obj[img].path)
    }
    else if (images_obj[img].type == "wide"){
      imgElement = helperFunctions.generateElement('img',images_obj[img].title,"wide","",images_obj[img].path)
    }

    imgOverlay.appendChild(imgLabel);
    imgHolder = helperFunctions.appendChildren(imgHolder, imgOverlay,imgElement)
    return imgHolder;
  },

  useFunctions : function(){
    this.gallery();
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


