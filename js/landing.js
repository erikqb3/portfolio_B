import { helperFunctions } from "../js/index.js";
import { sharedHTML, addAction } from "../js/index.js";

export const establishHTML = {
  disclaimer : function(
    body = document.querySelector('body'),
    popUp = helperFunctions.generateElement('div',"disclaimerPopUp"),
    warning = helperFunctions.generateElement('h1',"","","DISCLAIMER"),
    description = helperFunctions.generateElement('p',"","","This Website is still under construction but posted for sample review. Some utilities do not function, but the necessary majority does. <h2>Please explore and enjoy!</h2>Click Anywhere to Continue!!!")
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
    // YC_array = ["2045 - 2049","2040 - 2044","2035 - 2039","2030 - 2034","2025 - 2029","2020 - 2024"], //if you add more, change the margin-top of "li.dropDwn_holder:nth-of-type(x):hover"
    YC_array = ["2020 - 2024"], 

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
              ST_filter.classList.add('style');
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
              YC_filter.classList.add('year');
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
  // footer: function (footerElement = helperFunctions.generateElement('footer')) {
  //   // console.log(footerElement);
  //   document.querySelector('body').appendChild(footerElement);
  // },
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

    addAction.useFunctions();
    landingPageActions.viewALL();
    landingPageActions.DDButton();
    // landingPageActions.DDList_items();
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
    document.querySelector('main').appendChild(hero);
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
          landingPageActions.DDList_items(jsObject);
          helperFunctions.lazyLoading();
          sharedHTML.footer();
        })
        .catch(err => {
          console.log(err)
        });
    }
    catch (err) {
    }
  },
  mainContent_filtered : function(
    fPA,
    newMain = helperFunctions.generateElement('main',"mainContent","filtered"),
    mainGrid = helperFunctions.generateElement('div',"mainGrid"),
    contentWrap = document.getElementById('contentWrap')){
    // console.log(fPA);
    document.getElementById('mainContent').remove();
    document.querySelector('footer').remove();
    for (let project of fPA){
      console.log(project);
      let projectHolder = helperFunctions.generateElement('article', '', 'projectHolder');
      // let projectLink = helperFunctions.generateElement('a','','','',`${project.path}`);
      let contentHolder = helperFunctions.generateElement('div', `${project.id}`, 'contentHolder');
      let infoOverlay = helperFunctions.generateElement('div', '', 'infoOverlay');
      let label = helperFunctions.generateElement('h3', '', 'label', `${project.name}`);
      let thumbnail = helperFunctions.generateElement('img','','thumbnail');
      thumbnail = helperFunctions.customSpecialElements(thumbnail,[`${project.thumbnailPaths[0]}`,`${project.name}`])

      infoOverlay.appendChild(label);
      contentHolder = helperFunctions.appendChildren(
        contentHolder,
        infoOverlay,
        thumbnail
      );
      // projectLink.appendChild(contentHolder);
      // projectHolder.appendChild(projectLink);

      //USE THIS WHEN PREVIEWS ARE AVAILABLE
      projectHolder.appendChild(contentHolder)
      // projectHolder.addEventListener('click',(e)=>{
      //   // this.previewPopUp(results[i],contentHolder.id)
      // })

      mainGrid.appendChild(projectHolder);
    }
    mainGrid.style.backgroundImage = "url('../resources/img/Early\ Morning\ Fantasy.jpg')"
    contentWrap = helperFunctions.nestChildren(contentWrap, newMain,mainGrid)
    // contentWrap.appendChild(newMain);
    // console.log(results[i].name);
    helperFunctions.lazyLoading();
    sharedHTML.footer();
  },
  useFetchResults : function (
    results,
    contentWrap = helperFunctions.generateElement('div', 'contentWrap'),
    mainContent = helperFunctions.generateElement('main', 'mainContent'),
    mainGrid = helperFunctions.generateElement("div","mainGrid")
  ) {
    console.log(results);
    for (let i in results) {
      let projectHolder = helperFunctions.generateElement('article', '', 'projectHolder');
      let projectLink = helperFunctions.generateElement('a','','','',`${results[i].preview.previewPath}`);
      let contentHolder = helperFunctions.generateElement('div', `${results[i].id}`, 'contentHolder');
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

      // //USE THIS WHEN PREVIEWS ARE AVAILABLE
      // projectHolder.appendChild(contentHolder)
      // projectHolder.addEventListener('click',(e)=>{
      //   this.previewPopUp(results[i],contentHolder.id)
      // })

      mainGrid.appendChild(projectHolder);
      // console.log(results[i].name);
    }
    mainContent.appendChild(mainGrid)
    contentWrap.appendChild(mainContent);
    document.querySelector('main').appendChild(contentWrap);
  },
  useFunctions : function(
    //ORDER MATTERS HERE
  ){
    this.header();
    this.filterDropDowns();
    sharedHTML.main();
    this.hero();
    this.mainContent();
    this.disclaimer();
  }
};

const landingPageActions = {
  DDButton : function( 
  dropDwn_content_array = document.querySelectorAll("ul.DDList")
  ){
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
          if (DDList.classList.contains("showList") && (window.innerWidth < 1200)) {
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
        if (DDList.classList.contains("showList") && (window.innerWidth < 1200)) {
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
    fetchResults,
    dropDwn_content_array = document.querySelectorAll("ul.DDList"),
    filterSettings_void = document.getElementById("filterSettings_void"),
    filterSettings_holder = document.getElementById("filterSettings_holder"))
    {
      for (let ul_element of dropDwn_content_array){
        for (let li_element of ul_element.children){
          li_element.addEventListener("click",(e)=>{
            filterSettings_void.classList.remove('visible');
            filterSettings_holder.classList.remove('visible');
            

            let target = li_element.innerHTML;
            let filteredProjectArray = this.filterFindProjects(fetchResults,target)
            establishHTML.mainContent_filtered(filteredProjectArray);
          })
        }
      }
    },
  filterFindProjects : function(fetchResults,target){
    let foundProjects = [];
    // console.log(fetchResults, target);
    for (let project in fetchResults){
      // console.log(fetchResults[project]["filterCategory"])
      for (let fC of fetchResults[project]["filterCategory"]) {
        // console.log(fC)
        if (fC == target){
          console.log(`FOUND ${fC}`);
          foundProjects.push(fetchResults[project]);
        }
      }
    }
    // console.log(foundProjects)
    return foundProjects;
  },
 
  viewALL : function(btn = document.getElementById('nav').children[0]){
    btn.addEventListener('click',(e)=>{
      document.getElementById('mainContent').remove();
      document.querySelector('footer').remove();
      establishHTML.mainContent();
    })
  }
}



establishHTML.useFunctions()

