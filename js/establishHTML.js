import { addAction } from "../js/addAction.js"

export const establishHTML = {
  header: function(
    header = this.generateElement('header'),
    name = this.generateElement('h1',"","","Erik Q.<br>Birch"),
    titles = this.generateElement('p',"","","Web Designer | Developer | Creator"),
    hamBtn = this.generateElement('div',"hamBtn","","&#9776"),
    filterSettings_void = this.generateElement('div',"filterSettings_void"),
    filterSettings_holder = this.generateElement('div',"filterSettings_holder"),
    filterSettings_list = this.generateElement('ul'),
    listOptions = ["ALL","Site Type","Year Created","Resume","Bio/Contact"],
  ){
    addAction.showfilterSettings(hamBtn);
    
    for (let i in listOptions) {
      listOptions[i] = this.generateElement('li',"","",listOptions[i]);
      filterSettings_list.appendChild(listOptions[i]);
    }
    filterSettings_holder.appendChild(filterSettings_list);
    header = this.appendChildren(header, name,titles,hamBtn,filterSettings_void, filterSettings_holder)
    document.querySelector("body").appendChild(header);
  },
  hero: function(
    quoteInfo = this.heroQuotes(),
    hero = this.generateElement('div',"hero"),
    infoHolder = this.generateElement('div',"infoHolder"),
    title = this.generateElement('h2',"title","","Showcase Portfolio"),
    quote = this.generateElement('p',"quote","",`${quoteInfo[0]}`),
    author = this.generateElement('p',"author","",`${quoteInfo[1]}`),
    video = this.generateElement('video',"","video"),
    videoSource = this.generateElement('source',"","video/mp4","","/resources/PortfolioVideo(Beta1).mp4")
  ){    
    this.specialElements(video);

    infoHolder = this.appendChildren(infoHolder, title,quote,author);
    video.appendChild(videoSource);
    hero = this.appendChildren(hero, infoHolder,video);
    document.querySelector('body').appendChild(hero)

  },
  mainContent: async function(){
    let json = "../resources/dipslayCase.json";
    await fetch(json)
      .then(response => response.json())
      .then((jsObject) => {
        this.useFetchResults(jsObject);
        this.footer();
      })
  },
  useFetchResults: function(
    results,
    contentWrap = this.generateElement('div',"contentWrap"),
    mainContent = this.generateElement('div',"mainContent"),
  ){
    console.log(results)
    for (let i in results) {
      let projectHolder = this.generateElement('div', "","projectHolder")
      let projectLink = this.generateElement('a',"","","",`${results[i].path}`)
      let contentHolder = this.generateElement('div',"","contentHolder");
      let infoOverlay = this.generateElement('div',"","infoOverlay")
      let label = this.generateElement('h3',"","label",`${results[i].name}`);
      let thumbnail = this.generateElement('img',"","thumbnail","",`${results[i].thumbnailPaths[0]}`)

      infoOverlay.appendChild(label);
      contentHolder = this.appendChildren(contentHolder, infoOverlay,thumbnail);
      projectLink.appendChild(contentHolder);
      projectHolder.appendChild(projectLink);

      mainContent.appendChild(projectHolder);
      console.log(results[i].name)
    }
    contentWrap.appendChild(mainContent);
    document.querySelector("body").appendChild(contentWrap);
  },
  footer: function(
    footerElement = this.generateElement('footer')
  ){
    console.log(footerElement)
    document.querySelector("body").appendChild(footerElement);
    console.log("WORKS?")
  },
  specialElements: function(element){
    switch (element.classList.value) {
      case 'video':
        element.setAttribute('autoplay',"autoplay");
        element.setAttribute('loop',true);
        element.muted = "muted";
      break;
    }
  },
  generateElement: function(
    paramElement,paramId="",paramClass="",paramText="",paramLink=""
  ){
    let element = document.createElement(paramElement);
    element.id = paramId;
    element.setAttribute('class',paramClass);
    switch (paramElement) {
      case 'img':
        element.setAttribute('src',paramLink);
        element.setAttribute('alt',paramId);
        break;
      case 'a':
        element.setAttribute('href',paramLink);
        break;
      case 'input':
        element.setAttribute('type',paramClass);
        element.setAttribute('name',paramId);
      case 'source':
        element.setAttribute('src',paramLink);
        element.setAttribute('type',paramClass);
      default:
        break;
    }
    if (paramText != "") {
      element.innerHTML = paramText;
    }
    return element;
  },
  clearElement: function(elementStr){
    document.querySelector(elementStr).innerHTML = "";
  },
  appendChildren: function(parent, ...elementChildren){
    for (let i in elementChildren) {
      parent.appendChild(elementChildren[i]);
    }
    return parent;
  },
  heroQuotes: function(
    quotes = [
      {"Quote": "The Noblest Art is that of Making Others Happy!",
        "Author": "P.T.Barnum"},
      {"Quote": "...If there is anything virtuous, lovely, or of good report or praiseworthy, we seek after these things.",
        "Author": "Article of Faith #13"},
      {"Quote": "You can design and create, and build the most wonderful place in the world. But it takes people to make the dream a reality!",
      "Author": "Walt Disney"},
      {"Quote": "Creativity is allowing yourself to make mistakes. Art is knowing which ones to keep.",
      "Author": "Scott Adams"},
    ],
    randNumb = Math.floor(Math.random() * quotes.length)
  ) { 
    return [quotes[randNumb].Quote, quotes[randNumb].Author];
  }
}
