import { cinemaOptions_library,videoOptions_library, photoOptions_library, audioOptions_library } from '../customJS/library.js';
import { cinematographyFunctions,videographyFunctions,photographyFunctions,audioFunctions} from '../customJS/landingPageFunctionality.js';


export const establishNavOptions = {
  cinematography : function(
    alternatingBanner = document.getElementById('alternatingBanner'),
    cinematography_youtubestyle = helperFunctions.generateElement('section',"cinematography_youtubestyle", "bannerOption"),
    filler = helperFunctions.generateElement('div',"","filler"),
    cinematography_video = helperFunctions.generateElement('video',"cinematography_video","video"),
    startingSource = helperFunctions.generateElement('source',"videoA","video/mp4","","TestRunResources/videoA.mp4"),
    thmbNail_holder = helperFunctions.generateElement('div',"thmbNail_holder"),
    thmbNail_holder_row = helperFunctions.generateElement('div',"thmbNail_holder_row"),
    cinema_seeMore = helperFunctions.generateElement('div',"cinema_seeMore"),
    seeMore_link = helperFunctions.generateElement('a',"","","See More","#")
  ){
    for (let cinema of cinemaOptions_library) {
      console.log(cinema);
      if (cinema[0] == "videoA"){}
      else {
        let imgHolder = helperFunctions.generateElement('div',"","imgHolder");
        let overlay = helperFunctions.generateElement('div',"","overlay");
        let img = helperFunctions.generateElement('img',cinema[0],"","",cinema[1]);
        imgHolder = helperFunctions.appendChildren(imgHolder,overlay,img);
        thmbNail_holder_row.appendChild(imgHolder)
      }
    }
    cinema_seeMore.appendChild(seeMore_link);
    thmbNail_holder - helperFunctions.appendChildren(thmbNail_holder,thmbNail_holder_row,cinema_seeMore);
    cinematography_video = helperFunctions.specialElements(cinematography_video,["controls","autoplay","muted"]);
    cinematography_video.appendChild(startingSource);
    cinematography_youtubestyle = helperFunctions.appendChildren(cinematography_youtubestyle, filler,cinematography_video,thmbNail_holder)
    alternatingBanner.appendChild(cinematography_youtubestyle);
    // if (cinematography_video.paused == true) {
    //   cinematography_video.play();
    // }


    //Use when switched to cinematography mode
    cinematographyFunctions.videoOptionToggle();
    cinematographyFunctions.videoOptionSwitch();

  },
  videography : function(
    videography_2x2 = helperFunctions.generateElement('section',"videography_2x2","bannerOption"),
    filler = helperFunctions.generateElement('div',"","filler")
  ){
    // console.log(videoOptions_library[0])
    function singleVideo(
      video,
      video_holder = helperFunctions.generateElement('div',"","video_holder"),
      filter_dark = helperFunctions.generateElement('div',"","filter_dark"),
      video_title = helperFunctions.generateElement('h2',"","",video[0]),
      video_element = helperFunctions.generateElement('video',"","video"),
      video_source = helperFunctions.generateElement('source',video[0],"","",video[1])
    ) {
      video_element = helperFunctions.specialElements(video_element,["autoplay","muted","loop"]);
      video_element.muted = true; //doing the special Elements way doesn't work
      video_element.appendChild(video_source);
      filter_dark.appendChild(video_title);
      video_holder = helperFunctions.appendChildren(video_holder, filter_dark, video_element);
      return video_holder;
    }
    videography_2x2.appendChild(filler);
    for (let video of videoOptions_library) {
      console.log(video);
      // console.log(singleVideo(video))
      videography_2x2.appendChild(singleVideo(video));
    }
    document.getElementById("alternatingBanner").appendChild(videography_2x2);

    //Use when switched to videography mode
    videographyFunctions.hoverPlay();
  },
  photography : function(
    photography_carousel = helperFunctions.generateElement('section',"photography_carousel","bannerOption"),
    filler = helperFunctions.generateElement('div',"","filler"),
    carousel_holder = helperFunctions.generateElement('div',"carousel_holder"),
    prevBtn = helperFunctions.generateElement('div',"prevBtn","revolveBtn",`<i class="fa-solid fa-circle-chevron-left"></i>`),
    nextBtn = helperFunctions.generateElement('div',"nextBtn","revolveBtn",`<i class="fa-solid fa-circle-chevron-right"></i>`),
    carousel_content = helperFunctions.generateElement('div',"carousel_content"),
    slideNav = helperFunctions.generateElement('div',"slide-nav"),
    positionValue = 0
  ){
    photography_carousel.appendChild(filler);
    function singleImg (
      storedImg,
      slide = helperFunctions.generateElement('div',storedImg[0],"img_slide"),
      filter_dark = helperFunctions.generateElement('div',"","filter_dark"),
      filter_label = helperFunctions.generateElement('h2',"","",storedImg[0]),
      img = helperFunctions.generateElement('img',"","","",storedImg[1]),
    ){
      filter_dark.appendChild(filter_label);
      slide = helperFunctions.appendChildren(slide, filter_dark,img)
      return slide;
    }
    for (let photo of photoOptions_library) {
      carousel_content.appendChild(singleImg(photo));
      let slideDot = helperFunctions.generateElement('button',`${positionValue}`,"slide-dot","X");
      positionValue -= 100;
      slideNav.appendChild(slideDot);
    }
    carousel_holder = helperFunctions.appendChildren(carousel_holder, prevBtn,nextBtn,carousel_content,slideNav);
    photography_carousel.appendChild(carousel_holder);
    document.getElementById("alternatingBanner").appendChild(photography_carousel);


    //Use when switched to photography mode
    photographyFunctions.buttonNav();
    photographyFunctions.prevBtn();
    photographyFunctions.nextBtn();
  },
  audio : function(
    audio_playlist = helperFunctions.generateElement('section',"audio_playlist"),
    filler = helperFunctions.generateElement('div',"","filler"),
    bannerView = helperFunctions.generateElement('section',"bannerView"),
    audio_img = helperFunctions.generateElement('div',"audio_img"),
    img = helperFunctions.generateElement('img',"","","","TestRunResources/audioImgA.jpg"),
    features = helperFunctions.generateElement('div',"features"),
    startingSong = helperFunctions.generateElement('div',"currentSong"),
    startingSong_label = helperFunctions.generateElement('div',"currentSong_label"),
    labelElement = helperFunctions.generateElement('h3',"labelElement","","Audio1"), //Name of First Song
    startingSong_controls = helperFunctions.generateElement('div',"currentSong_controls"),
    audioElement = helperFunctions.generateElement('audio',"","audio"),
    audioSource = helperFunctions.generateElement('source',"","audio/ogg","","TestRunResources/Audio1.mp3"),
    playList = helperFunctions.generateElement('article',"playList"),
    playList_ul = helperFunctions.generateElement('ul')

  ){
    for (let index in audioOptions_library) {
      console.log(audioOptions_library[index][0])
      let song = helperFunctions.generateElement('li',"","playList_song",audioOptions_library[index][0])
      if (index == 0) {
        song.classList.add("playList_current");
      }
      playList_ul.appendChild(song);
    }
    playList.appendChild(playList_ul);

    audioElement = helperFunctions.specialElements(audioElement,["controls","controlsList"]);
    audioElement.appendChild(audioSource);
    startingSong_controls.appendChild(audioElement);
    console.log(startingSong_controls)
    startingSong_label.appendChild(labelElement);
    startingSong = helperFunctions.appendChildren(startingSong, startingSong_label,startingSong_controls);

    features = helperFunctions.appendChildren(features, startingSong,playList)

    audio_img.appendChild(img);

    bannerView = helperFunctions.appendChildren(bannerView, audio_img,features);
    audio_playlist = helperFunctions.appendChildren(audio_playlist, filler, bannerView);

    document.getElementById("alternatingBanner").appendChild(audio_playlist);

    //Use when switched to audio mode
    audioFunctions.selectFromPlaylist();
  },
  graphicDesign : function(){},
  navEventListener : function(
    options_array = document.querySelectorAll("li.navOption")
  ){
    for (let option of options_array) {
      // console.log(option);
      switch (option.innerHTML) {
        case "Cinematography":
          option.addEventListener('click', ()=>{
            this.checkAlternatingBanner();
            establishNavOptions.cinematography();
          })
          // option.addEventListener("click", establishNavOptions.cinematography());
          break;
        case "Videography":
          option.addEventListener('click',()=>{
            this.checkAlternatingBanner();
            establishNavOptions.videography();
          })
          // option.addEventListener("click", establishNavOptions.videography());
          break;
        case "Photography":
          option.addEventListener('click', ()=> {
            this.checkAlternatingBanner();
            establishNavOptions.photography();
          })
          break;
        case "Audio":
          option.addEventListener('click', ()=> {
            this.checkAlternatingBanner();
            establishNavOptions.audio();
          })
          break;
        case "Graphic Design":
          break;
        case "Contact":
          break;
      }
    }
  },
  checkAlternatingBanner : function(
    alternatingBanner = document.getElementById('alternatingBanner')
  ){
    try {
      alternatingBanner.children[0].remove();
    }
    catch(err){};
  }
}

export const helperFunctions = {
  generateElement: function ( //NOTE: RESTRUCTURE THIS TO ACCOMADATE AS MUCH AS YOU CAN
    paramElement,
    paramId = '',
    paramClass = '',
    paramText = '',
    paramLink = '',
    paramOther = []
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
        break;
      case 'button':
        element.setAttribute('value',paramId) //temporary set up
    }
    if (paramText != '') {
      element.innerHTML = paramText;
    }
    return element;
  },
  specialElements: function (element,extraAttribute = []) { //NOTE: RESTRUCTURE THIS TO ACCOMADATE AS MUCH AS YOU CAN
    switch (element.classList.value) {
      case 'video': //SpecialCase
        for (let atr of extraAttribute) {
          // console.log(atr)
          element.setAttribute(atr,true)
        }
        break;
      case 'audio': //SpecialCase
        for (let atr of extraAttribute) {
          if (atr == "controlsList"){
            element.setAttribute(atr, "nodownload")
          }
          else {
            element.setAttribute(atr,atr)
          }
        }
        break;
      case 'thumbnail':
        element.setAttribute('src',"../resources/img/Square.png");
        element.setAttribute('data-src', extraAttribute[0]);
        element.setAttribute('alt',extraAttribute[1]);
        break;
      case "audio/ogg":
        element.setAttribute(extraAttribute[0],true);
        element.setAttribute(extraAttribute[1],"nodownload");
    }
    return element;
  },
  appendChildren: function (parent, ...elementChildren) {
    for (let i in elementChildren) {
      parent.appendChild(elementChildren[i]);
    }
    return parent;
  },
}

// function cheapToggle (navBtns_array = document.getElementById("mainNav").children[0]) {
//   for (let option of navBtns_array) {
//     option.addEventListener('click', (e)=> {
//       console.log(e.target.innerHTML)
//       // switch (e.target.innerHTML)
//     })
//   }
// }

// cheapToggle();

// establishNavOptions.cinematography();
// establishNavOptions.audio();

establishNavOptions.navEventListener();