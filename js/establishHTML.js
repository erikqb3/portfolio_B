import { addAction } from '../js/addAction.js';

export const establishHTML = {
  header: function (
    header = this.generateElement('header'),
    name = this.generateElement('h1', '', '', 'Erik Q.<br>Birch'),
    titles = this.generateElement('p','','','Web Designer | Developer | Creator'),
    hamBtn = this.generateElement('div', 'hamBtn', '', '&#9776'),
    filterSettings_void = this.generateElement('div', 'filterSettings_void'),
    filterSettings_holder = this.generateElement('div','filterSettings_holder'),
    filterSettings_list = this.generateElement('ul'),
    listOptions = ['ALL', 'Site Type', 'Year Created', 'Resume', 'Bio/Contact']
  ) {
    /**
     * STEP1: give Hamburger Menu Button an event listener
     * STEP2: create Nav/Filter Bar by looping through the "listOptions" array
     * STEP2a: add "actualFilter" class to element if filter options exist
     * STEP3: append elements together
     */

    addAction.showfilterSettings(hamBtn); //STEP1

    //STEP2
    for (let i in listOptions) {//STEP2a
      if (i == 1 || i == 2) {
        listOptions[i] = this.generateElement('li','','actualFilter',listOptions[i]);
      } else {
        listOptions[i] = this.generateElement('li', '', '', listOptions[i]);
      }
      filterSettings_list.appendChild(listOptions[i]);
    }
    //STEP3
    filterSettings_holder.appendChild(filterSettings_list);
    header = this.appendChildren(header, name,titles,hamBtn,filterSettings_void,filterSettings_holder
    );
    document.querySelector('body').appendChild(header);
  },
  hero: function (
    quoteInfo = this.heroQuotes(),
    hero = this.generateElement('div', 'hero'),
    infoHolder = this.generateElement('div', 'infoHolder'),
    title = this.generateElement('h2', 'title', '', 'Showcase Portfolio'),
    quote = this.generateElement('p', 'quote', '', `${quoteInfo[0]}`),
    author = this.generateElement('p', 'author', '', `${quoteInfo[1]}`),
    video = this.generateElement('video', '', 'video'),
    videoSource = this.generateElement('source','','video/mp4','','/resources/PortfolioVideo(Beta1).mp4')
  ) {
    /**
     * STEP1: give video video properties
     * STEP2: append elements (order/nesting matters)
     */

    this.specialElements(video); //STEP1
    //STEP2
    infoHolder = this.appendChildren(infoHolder, title, quote, author);
    video.appendChild(videoSource);
    hero = this.appendChildren(hero, infoHolder, video);
    document.querySelector('body').appendChild(hero);
  },
  filterDropDowns: function (
    siteType = document.querySelectorAll("li.actualFilter")[0],
    yearCreated = document.querySelectorAll("li.actualFilter")[1],
    ST_array = ["School Project","Fan Art","Game","Personal Project","App","E-commerce","Client Work"],
    YC_array = ["2020 - 2024", "2025 - 2029","2030 - 2034","2035 - 2039"]) {

      let ST_dropDown = this.generateElement('div',"ST_dropDown","dropDown");
      let ST_list = this.generateElement('ul',"ST_list","DDList");
      for (let i in ST_array) {
        let ST_filter = this.generateElement('li',"","filter",`${ST_array[i]}`);
        ST_list.appendChild(ST_filter)
      }
      ST_dropDown.appendChild(ST_list);
      siteType.appendChild(ST_dropDown);
      ST_dropDown.style.display = "none";

      
      let YC_dropDown = this.generateElement('div',"ST_dropDown","dropDown");
      let YC_list = this.generateElement('ul',"YC_list","DDList");
      for (let ii in ST_array) {
        let YC_filter = this.generateElement('li',"","filter",`${YC_array[ii]}`);
        YC_list.appendChild(YC_filter)
      }
      YC_dropDown.appendChild(YC_list)


    siteType.addEventListener('mouseover',(e)=>{
      console.log("HI");
      ST_dropDown.style.display = "block";
      ST_dropDown.addEventListener('mouseout',(e)=> {
        ST_dropDown.style.display = "hidden";
        console.log("OFF")
      })
    });
    yearCreated.addEventListener('mouseover',(e)=>{
      console.log("BYE")
      
    })
  },
  mainContent: async function () {
    let json = '../resources/dipslayCase.json';
    await fetch(json)
      .then((response) => response.json())
      .then((jsObject) => {
        this.useFetchResults(jsObject);
        this.footer();
      });
  },
  useFetchResults: function (
    results,
    contentWrap = this.generateElement('div', 'contentWrap'),
    mainContent = this.generateElement('div', 'mainContent')
  ) {
    console.log(results);
    for (let i in results) {
      let projectHolder = this.generateElement('div', '', 'projectHolder');
      let projectLink = this.generateElement('a','','','',`${results[i].path}`);
      let contentHolder = this.generateElement('div', '', 'contentHolder');
      let infoOverlay = this.generateElement('div', '', 'infoOverlay');
      let label = this.generateElement('h3', '', 'label', `${results[i].name}`);
      let thumbnail = this.generateElement('img','','thumbnail','',`${results[i].thumbnailPaths[0]}`);

      infoOverlay.appendChild(label);
      contentHolder = this.appendChildren(
        contentHolder,
        infoOverlay,
        thumbnail
      );
      projectLink.appendChild(contentHolder);
      projectHolder.appendChild(projectLink);

      mainContent.appendChild(projectHolder);
      // console.log(results[i].name);
    }
    contentWrap.appendChild(mainContent);
    document.querySelector('body').appendChild(contentWrap);
  },
  footer: function (footerElement = this.generateElement('footer')) {
    // console.log(footerElement);
    document.querySelector('body').appendChild(footerElement);
    console.log('WORKS?');
  },
  specialElements: function (element) {
    switch (element.classList.value) {
      case 'video':
        element.setAttribute('autoplay', 'autoplay');
        element.setAttribute('loop', true);
        element.muted = 'muted';
        break;
    }
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
  clearElement: function (elementStr) {
    document.querySelector(elementStr).innerHTML = '';
  },
  appendChildren: function (parent, ...elementChildren) {
    for (let i in elementChildren) {
      parent.appendChild(elementChildren[i]);
    }
    return parent;
  },
  heroQuotes: function (
    quotes = [
      {
        Quote: 'The Noblest Art is that of Making Others Happy!',
        Author: 'P.T.Barnum',
      },
      {
        Quote:
          '...If there is anything virtuous, lovely, or of good report or praiseworthy, we seek after these things.',
        Author: 'Article of Faith #13',
      },
      {
        Quote:
          'You can design and create, and build the most wonderful place in the world. But it takes people to make the dream a reality!',
        Author: 'Walt Disney',
      },
      {
        Quote:
          'Creativity is allowing yourself to make mistakes. Art is knowing which ones to keep.',
        Author: 'Scott Adams',
      },
    ],
    randNumb = Math.floor(Math.random() * quotes.length)
  ) {
    return [quotes[randNumb].Quote, quotes[randNumb].Author];
  },
};
