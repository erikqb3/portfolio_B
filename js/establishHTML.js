import { addAction } from '../js/addAction.js';

export const establishHTML = {
  header: function (
    header = this.generateElement('header'),
    name = this.generateElement('h1', '', '', 'Erik Q.<br>Birch'),
    titles = this.generateElement('p','','','Web Designer | Developer | Creator'),
    hamBtn = this.generateElement('div', 'hamBtn', '', '&#9776'),
    filterSettings_void = this.generateElement('div', 'filterSettings_void'),
    filterSettings_holder = this.generateElement('div','filterSettings_holder'),
    filterSettings_list = this.generateElement('ul',"nav"),
    listOptions = ['ALL', 'Site Type', 'Year Created', 'Resume', 'Bio/Contact']
  ) {
    /**
     * STEP1: give Hamburger Menu Button an event listener
     * STEP2: create Nav/Filter Bar by looping through the "listOptions" array
     * STEP2a: add "dropDwn_holder" class to element if filter options exist
     * STEP3: append elements together
     */

    addAction.showfilterSettings(hamBtn); //STEP1

    //STEP2
    for (let i in listOptions) {//STEP2a
      // console.log(i)
      if ((i == 1) || (i == 2)) {
        // console.log(listOptions[i])
        listOptions[i] = this.generateElement('li','','dropDwn_holder',listOptions[i]);
        this.filterDropDowns(listOptions[i]);
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
    videoSource = this.generateElement('source','','video/mp4','','resources/PortfolioVideo(Beta1).mp4')
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
    listOption,
    ST_array = ["For Authors","For Artists","For Animators", "For Anyone Else"],
    YC_array = ["2020 - 2024", "2025 - 2029","2030 - 2034","2035 - 2039", "2040 - 2044", "2045 - 2049" ], //if you add more, change the margin-top of "li.dropDwn_holder:nth-of-type(x):hover"

    ST_dropDwn_Btn = this.generateElement('div',"ST_dropDwn_Btn","dropDown"),
    ST_dropDwn_content = this.generateElement('ul',"ST_dropDwn_content","DDList"),
  
    YC_dropDwn_Btn = this.generateElement('div',"YC_dropDwn_Btn","dropDown"),
    YC_dropDwn_content = this.generateElement('ul',"YC_dropDwn_content","DDList")
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
              let ST_filter = this.generateElement('li',"","filter",`${ST_array[i]}`);
              ST_dropDwn_content.appendChild(ST_filter)
            }
            ST_dropDwn_holder = this.appendChildren(ST_dropDwn_holder, ST_dropDwn_Btn,ST_dropDwn_content);
            ST_dropDwn_Btn.innerHTML = "Site Type"
          }     
          else if (listOption.innerHTML = "Year Created") {
            YC_dropDwn_holder = listOption;
            YC_dropDwn_holder.innerHTML="";
            for (let i in YC_array) {
              let YC_filter = this.generateElement('li',"","filter",`${YC_array[i]}`);
              YC_dropDwn_content.appendChild(YC_filter)
            }
            YC_dropDwn_holder = this.appendChildren(YC_dropDwn_holder, YC_dropDwn_Btn,YC_dropDwn_content);
            YC_dropDwn_Btn.innerHTML = "Year Created"
          }   
        }
        catch(err) {
          console.log(err,"L103")
        }
      }
  },
  mainContent: async function () {
    try {
      let json = 'displayCase.json';
      await fetch(json)
        .then((response) => {return response.json()})
        .then((jsObject) => {
          this.useFetchResults(jsObject);
          this.footer();
        })
        .catch(err => {
          console.log(err)
        });
    }
    catch (err) {
    }
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
