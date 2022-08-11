const introSection = {
  scrollEffect: function(
    scrollEffect_introTop = document.getElementById('scrollEffect_intro').offsetTop,
    scrollEffect_endTop = document.getElementById('cinema_navTarget').offsetTop,
    sectionLength = scrollEffect_endTop - scrollEffect_introTop,
    scrollEffect_content = document.getElementById('scrollEffect_content'),
    // STEP_1: add scroll eventListener to window
    // STEP_1a: section off intro section into 6 actionSegments 
      //Section1 = Sapien Designs fade-enters
      //Section2 = Sapien leaves, Intelligent enters
      //Section3 = Intelligent Design leaves, Sapien Media Enters
      //SEction4 = Sapien leaves, Intelligent enters
      //Section5 = Intelligent design fade-leaves
      //NOTE: Descending order of left and right side: left = (Sapien, Intelligent, Sapien, Intelligent), right = (Designs, Designs, Media, Media)
      //      The right side jumps from one to the other (using "display:initial" and "display:fixed" instead of smooth scrolling, this sudden transition requires the duplicate to be invisible while the other is shown
    // STEP_1b: update scroll progress as you scroll
    // STEP_1c: change background so it scrolls up according to scoll effect
  ){
    //STEP_1
    let  scrollProgress;
    window.addEventListener('scroll',(e)=>{
      //STEP_1a
      let scroll = window.scrollY;
      let tripWire1 = window.innerHeight*0.6;
      let tripWire2 = tripWire1 + parseFloat(window.innerHeight*0.45);
      let tripWire3 = tripWire2 + parseFloat(window.innerHeight*0.55);
      let tripWire4 = tripWire3 + parseFloat(window.innerHeight*0.50);
      let tripWire5 = tripWire4 + parseFloat(window.innerHeight*0.50);

      let leftText = scrollEffect_content.children[0];
      let rightText = scrollEffect_content.children[1];

      //STEP_1b
      scrollProgress = (scroll - scrollEffect_introTop)/sectionLength;


      if (scroll < (tripWire1)){
        //SECTION1
        rightText.style.position = "initial";
        scrollEffect_content.style.opacity = ((scroll/tripWire1));
      }
      else if ((scroll > tripWire1) && (scroll < tripWire2)) {
        //SECTION2
        rightText.style.position = "fixed";
        rightText.children[0].style.visibility = "visible";
        rightText.children[1].style.visibility = "hidden";

        leftText.children[0].style.opacity = 1-((scroll-tripWire1)/(tripWire2-tripWire1)*2);
        leftText.children[1].style.opacity = ((scroll-tripWire1)/(tripWire2-tripWire1));
      }
      else if ((scroll > tripWire2) && (scroll < tripWire3)) {
        //SECTION3
        rightText.style.position = "initial";
        rightText.children[1].style.visibility = "visible";
        rightText.children[0].style.visibility = "hidden";
        rightText.style.top = "50vh"

        leftText.children[1].style.opacity = 1-((scroll-tripWire2)/(tripWire3-tripWire2)*2);
        rightText.children[1].style.opacity = 1-((scroll-tripWire2)/(tripWire3-tripWire2)*2);
        leftText.children[2].style.opacity = ((scroll-tripWire2)/(tripWire3-tripWire2));
        rightText.children[2].style.opacity = ((scroll-tripWire2)/(tripWire3-tripWire2));
      }
      else if ((scroll > tripWire3) && (scroll < tripWire4)) {
        //SECTION4
        rightText.style.position = "fixed";
        rightText.style.top = "-5rem"
        rightText.children[1].style.visibility = "hidden";
        rightText.children[2].style.visibility = "visible";
        rightText.children[3].style.visibility = "hidden";

        leftText.children[2].style.opacity = 1-((scroll-tripWire3)/(tripWire4-tripWire3)*2);
        leftText.children[3].style.opacity = ((scroll-tripWire3)/(tripWire4-tripWire3));
      }
      else if ((scroll > tripWire4) && (scroll < tripWire5)) {
        //SECTION5
        rightText.style.position = "initial";
        rightText.children[2].style.visibility = "hidden";
        rightText.children[3].style.visibility = "visible";
      }
      else if ((scroll > tripWire5)){
      }
      //STEP_1c
      this.scrollEffect_changeTop(scrollProgress)
    })
  },
  scrollEffect_changeTop: function(
    percentage,
    startingTop = 75, //see css value
    scrollEffect_background = document.getElementById('bannerImg'),
    //STEP_1: determine what the screen width is (between 768 and 1200, the heading size is different than normal)
    //STEP_2: update background position based on scroll percentages
  ){
    //STEP_1
    if ((window.innerWidth < 768) || (window.innerWidth > 1200)){
      startingTop = 5;
    }
    else {
      startingTop = 7.5;
    }
    //STEP_2
    scrollEffect_background.style.top = `${startingTop - (2*(startingTop*percentage))}rem`
  }
}

const cinemaSection = {
  overlayEffect_scroll : function(
    cinemaSection_array = document.getElementById("cinematography_scrollPlay").children,
  ){

    window.addEventListener('scroll', (e)=> {
      let scroll = window.scrollY;
      let updatedPercentage;
      let massOutput = [];
      
     for(let i=0; i <(cinemaSection_array.length-1); i++){
      massOutput.push(cinemaSection_array[i].offsetTop);
      if (scroll < massOutput[i]) {}
      else {
        cinemaSection_array[i].children[1].style.opacity = "1"
      }
      if (scroll < (massOutput[0]-750)) {
        document.getElementById('cinematography_scrollPlay').style.opacity = "0";
      }
      else {
        document.getElementById('cinematography_scrollPlay').style.opacity = "1";
      }

      endPosition = cinemaSection_array[i+1].offsetTop
      updatedPercentage = this.checkPercentage(scroll,endPosition)
      cinemaSection_array[i].children[0].style.height = `${100-updatedPercentage}%`
      if (cinemaSection_array[i] == cinemaSection_array[1]) {
        cinemaSection_array[i].children[0].style.backgroundColor = `rgba(255,255,255,${100-updatedPercentage-50}%)`  
      }
      else {
        cinemaSection_array[i].children[0].style.backgroundColor = `rgba(0,0,0,${100-updatedPercentage-50}%)`
      }
      } 
    })
  },
  checkPercentage : function(
    scroll, 
    endPosition,
    buffer = ((endPosition - scroll) / window.innerHeight),
    percentage = Math.ceil((buffer-1)*100)
    ){    
    return percentage;
  }
}



const photoSection = {
  //STEP_1 construct initial Carousel (initialPhotoFetch)
  //Step_1a search library and get photos from initial group
  //STEP_1b loop through results and construct initial carousel
  //STEP_1c loop through results and construct gallery
  //STEP_2 loop through gallery and make clickable by providing group when clicked (fetch2)
  //STEP_3 construct newGroup carousel (fetch3)
  //STEP_3a destroy initial carousel,
  //STEP_3b recreate Gallery by following step 1
  //STEP_3c don't reconstruct gallery
  index : 1,
  assignCurrentImg : function(centerSlide, otherSlide, fullArray){
    if (centerSlide.id == "firstClone") {
      fullArray[1].classList.add('currentSlide');
    }
    else if (centerSlide.id == "lastClone") {
      fullArray[fullArray.length-2].classList.add('currentSlide');
    }
    else {
      otherSlide.classList.remove('currentSlide');
      centerSlide.classList.add('currentSlide'); 
    }
    otherSlide.classList.remove('currentSlide');
  },
  constructCarousel : function (
    groupName,
    photoLibrary_data,
    carousel_element = document.getElementById('carousel_element'),
    slideHolder = helperFunctions.generateElement('div',"slideHolder")
    //STEP_1: loop through data revieved from fetch based on keyword/groupname
    //STEP_1a: generate Elements to hold data
    //STEP_1b: put elements together accordingly (preplaned from html)
    //STEP_2: add generated elements to from Javascrip to HTML and reset index
    //STEP_3: construct controls (needs to be done everytime, carousel content is switched)
    //STEP_4: turn carousel on
  ){
    //STEP_1
    for (let item in photoLibrary_data[groupName]){
      //STEP_1a
      let slide = helperFunctions.generateElement('div',"","slide");
      let imgHolder = helperFunctions.generateElement('div',"","imgHolder_carouselItem");
      let overlayText = helperFunctions.generateElement('div',"","overlayText");
      let overlay_h4 = helperFunctions.generateElement('h4',"","",item);
      let img_element = helperFunctions.generateElement('img',"","","",`${photoLibrary_data[groupName][item]['content']}`);
      //STEP_1b
      overlayText.appendChild(overlay_h4);
      imgHolder = helperFunctions.appendChildren(imgHolder, overlayText,img_element)
      slide.appendChild(imgHolder);
      slideHolder.appendChild(slide);
    }
    //STEP_2
    carousel_element.appendChild(slideHolder);
    this.index = 1;
    //STEP_3
    this.constructCarouselControls();
    //STEP_4
    this.runCarousel();
  },
  constructCarouselControls : function(
    photo_partA = document.getElementById('photo_partA'),
    slideControls = helperFunctions.generateElement("div","","slideControls"),
    prevBtn = helperFunctions.generateElement('button',"prevBtn","",`<i class="fa-solid fa-angle-left"></i>`),
    nextBtn = helperFunctions.generateElement('button',"nextBtn","",`<i class="fa-solid fa-angle-right"></i>`)
    //STEP1: put generated elements together and add them to photoSection
  ){
    slideControls = helperFunctions.appendChildren(slideControls, prevBtn,nextBtn);
    photo_partA.appendChild(slideControls)

  },
  constructGallery : function(
    photoLibrary_data,
    photo_partC = document.getElementById('photo_partC'),
    half1 = helperFunctions.generateElement('article',"","half"),
    half2 = helperFunctions.generateElement('article',"","half"),
    loopResults = []
  ){
    for (let item in photoLibrary_data["Initial"]){
      let galleryItem = helperFunctions.generateElement('div',"","imgHolder_galleryItem");
      let imgOverlay = helperFunctions.generateElement('div',"","imgOverlay",item);
      let img_element = helperFunctions.generateElement('img',"","","",`${photoLibrary_data["Initial"][item]['content']}`);

      galleryItem = helperFunctions.appendChildren(galleryItem, imgOverlay,img_element);
      galleryItem.addEventListener('click',(e)=>{
        for (let libraryItem of Object.keys(photoLibrary_data)) {
          if (e.target.innerHTML == libraryItem) {
            let groupName = libraryItem;
            console.log(groupName);
            document.getElementById("slideHolder").remove();
            document.querySelector('div.slideControls').remove();
            this.constructCarousel(groupName, photoLibrary_data)

          }
        } 
      })
      loopResults.push(galleryItem);
    }
    // console.log(loopResults)
    for (let i = 0; i < 4; i++) {
      // console.log(loopResults[i])
      loopResults[i].classList.add(`area${i+1}`);
      if (((i+1) == 2) || ((i+1) == 3)) {
        loopResults[i].classList.add("verti");
      }
      half1.appendChild(loopResults[i]);
    }
    for (let i = 4; i < 8; i++) {
      // console.log(loopResults[i])
      loopResults[i].classList.add(`area${i-3}`);
      if (((i-3) == 2) || ((i-3) == 3)) {
        loopResults[i].classList.add("verti");
      }
      half2.appendChild(loopResults[i]);
    }
    photo_partC = helperFunctions.appendChildren(photo_partC, half1,half2)
  },
  getSlides : function(){return (document.querySelectorAll('.slide'))},
  getWidth : function(slide_array){return (slide_array[this.index].clientWidth)},
  initialPhotoFetch : async function(
    groupName,
    fetchPath = "js/photoLibrary.json"
    //STEP_1:fetch photo library
    //STEP_2: use data to construct Carousel using starting photos
    //STEP_3: use data to contruct gallery
  ){
    //STEP_1
    await fetch(fetchPath)
      .then(response=> response.json())
      .then(data => {
        //STEP_2
        this.constructCarousel(groupName, data);
        //STEP_3
        this.constructGallery(data);
      });
  },
  moveToNextSlide : function(slideHolder){
    slide_array = this.getSlides();
    // console.log(slide_array)
    if (this.index >= (slide_array.length - 1)) {return this.index};
    this.index++;
    this.translateSlideHolder(slideHolder);
    slideHolder.style.transition = '0.75s ease'; //'0.75s linear';
    this.assignCurrentImg(slide_array[this.index],slide_array[this.index-1], slide_array);
    return this.index;
  },
  moveToPrevSlide : function(slideHolder){
    slide_array = this.getSlides();
    if (this.index <= 0) {return this.index};
    this.index--;
    this.translateSlideHolder(slideHolder);
    slideHolder.style.transition = '0.75s ease'; //'0.75s linear';
    this.assignCurrentImg(slide_array[this.index],slide_array[this.index+1], slide_array);
    return this.index;
  },
  runCarousel : function(
    photo_partA = document.getElementById('photo_partA'),
    slideHolder = document.getElementById('slideHolder'),
    prevBtn = document.getElementById('prevBtn'),
    nextBtn = document.getElementById('nextBtn'),
    interval = 5000,
    slide_array = document.querySelectorAll('.slide'),
    firstClone = slide_array[0].cloneNode(true),
    lastClone = slide_array[slide_array.length - 1].cloneNode(true)
    //STEP_1: assign starting currentSlide and 
    //STEP_2: give created clones their IDs and add them to slide Holder (first clone comes at the front and end clone at the back.)
    //STEP_3: apply css that will create transition effect
  ){
    let slideEvent;

    slide_array[0].classList.add('currentSlide');
    firstClone.id = 'firstClone';
    lastClone.id = 'lastClone';

    slideHolder.append(firstClone);
    slideHolder.prepend(lastClone);


    this.translateSlideHolder(slideHolder);
    slideHolder.addEventListener('transitionend', ()=>{
      slide_array = this.getSlides();
      if (slide_array[this.index].id === firstClone.id){
        slideHolder.style.transition = "none";
        this.index = 1;
        this.translateSlideHolder(slideHolder);
      }
      if (slide_array[this.index].id === lastClone.id) {
        slideHolder.style.transition = "none";
        this.index = (slide_array.length - 2);
        this.translateSlideHolder(slideHolder);
      }
    })


    this.scrollEffect_currentImg(slideEvent,slideHolder);

    
    slideEvent = this.startSlides(interval,slideHolder);

    photo_partA.addEventListener('mouseenter',()=>{
      clearInterval(slideEvent);
    });
    photo_partA.addEventListener('mouseleave',()=>{
      slideEvent = this.startSlides(interval,slideHolder)
    });



    prevBtn.addEventListener('click',()=>{
      this.index = this.moveToPrevSlide(slideHolder);
    });
    nextBtn.addEventListener('click',()=>{
      this.index = this.moveToNextSlide(slideHolder);
    });



  },
  scrollEffect_currentImg(
    slideEvent,
    slideHolder,
    photo_section = document.getElementById('photography_smallSliders'),
    sectionA = document.getElementById('photo_partA'),
    sectionC = document.getElementById('photo_partC'), 
    videoSection = document.getElementById('videography_stagger')
    // photo_contentHolder = document.getElementById('photo_contentHolder'),
    //for changeImg
    // currentImg = document.querySelector('div.currentImg'),
    // carousel_content = currentImg.parentElement,
    // currentImg_overlay = currentImg.children[0]
  ){
    photoGap = photo_section.offsetHeight - photo_contentHolder.offsetHeight; //all the space between the bottom of the content holder and the bottom of the entire section
    photoGap_trigger = photo_section.offsetTop + (photoGap/6);


    let scrollEvent = window.addEventListener('scroll', (e)=> {
      let scroll = Math.floor(window.scrollY);

      if (scroll >= photoGap_trigger){
        sectionA.classList.add("pseudoScrollEffect");
        sectionC.style.opacity = "1";
      }
      else {
        sectionA.classList.remove("pseudoScrollEffect");
        sectionC.style.opacity = "0"
      }

      //this centers the images //make it so it only works between video2photo_buffer and audio section
      this.index = this.moveToNextSlide(slideHolder);
      this.index = this.moveToPrevSlide(slideHolder);
    })
  },
  startSlides : function(interval,slideHolder){
    slideEvent = setInterval(() => {
      this.index =this.moveToNextSlide(slideHolder);
    }, interval);
    return slideEvent;
  },
  translateSlideHolder : function(slideHolder){ 
    let slide_array = this.getSlides();
    let slideWidth = this.getWidth(slide_array);
    slideHolder.style.transform = `translateX(${-slideWidth * this.index}px)`;
  }
}

const audioFunctions_neo = {
  scrollEffect : function(){
    let DOMelements_audio = {
      section : document.getElementById('audioSection_playList_neo'),
      backgroundImg : document.getElementById('audio_backgroundImg'),
      backgroundImg_filter : document.getElementById('audio_backgroundImg_filter'),
      info : document.getElementById('audio_info'),
      info_holder : document.getElementById('audio_info_holder'),
      playList : document.getElementById('audio_playList'),
      playList_coverPhoto : document.getElementById('audio_playList_coverPhoto')
    }
    let buffer = 500;
    
    window.addEventListener('scroll',()=>{
      let scroll = window.scrollY;

      info_top = DOMelements_audio.section.offsetTop+DOMelements_audio.info.offsetHeight
      // console.log(scroll,DOMelements_audio.section.offsetTop,DOMelements_audio.section.offsetTop+(DOMelements_audio.info.offsetHeight)*2);


      let scrollPercentage1 = 1-(DOMelements_audio.section.offsetTop+DOMelements_audio.info.offsetHeight - scroll)/DOMelements_audio.info.offsetHeight
      if (scroll < DOMelements_audio.section.offsetTop) {
        DOMelements_audio.info.style.opacity = "0"
      }
      else if ((scroll>=DOMelements_audio.section.offsetTop)){ // && (scroll <=DOMelements_audio.section.offsetTop+DOMelements_audio.info.offsetHeight){
        DOMelements_audio.info.style.opacity = `${scrollPercentage1}`;
        DOMelements_audio.backgroundImg_filter.style.opacity = `${scrollPercentage1}`;
      }
      if (scroll >= (DOMelements_audio.section.offsetTop+(DOMelements_audio.info.offsetHeight)*2)){
        // console.log("show picture");
        DOMelements_audio.playList.style.opacity = "1";
      }
      else {
        DOMelements_audio.playList.style.opacity = "0";
      }
      // console.log(scrollPercentage1);
      
      
    })
  },
  audioOptions_library: [ //Name, FilePath, img
      ["Audio1","resources/audioFiles/Audio1.mp3","resources/imgs/audioImg1.jpg"],
      ["Audio2","resources/audioFiles/Audio2.mp3","resources/imgs/audioImg2.jpg"],
      ["Audio3","resources/audioFiles/Audio3.mp3","resources/imgs/audioImg3.jpg"],
      ["Audio4","resources/audioFiles/Audio4.mp3","resources/imgs/audioImg4.jpg"],
      ["Audio5","resources/audioFiles/Audio5.mp3","resources/imgs/audioImg5.jpg"],
      ["Audio6","resources/audioFiles/Audio6.mp3","resources/imgs/audioImg6.jpg"],
      ["Audio7","resources/audioFiles/Audio7.mp3","resources/imgs/audioImg7.jpg"],
      ["Audio8","resources/audioFiles/Audio8.mp3","resources/imgs/audioImg8.jpg"]
    ],
    selectFromPlaylist: function(
      song_array = document.querySelectorAll(".playList_song"),
      currentSong_controls = document.getElementById('currentSong_controls')
    ){
      for (let song of song_array) {
        song.addEventListener('click',(e)=>{
          this.removeIcon();
          let audioInfo = this.searchAudioLibrary(e.target.innerHTML);
          this.changeAudioElement(audioInfo);
          this.updateCurrentSong(song_array,audioInfo[0],e.target)
        })
      }
    },
    searchAudioLibrary:function(songName){
      let targetSong_info;
      for (let stored_song of this.audioOptions_library) {
        if (stored_song[0] == songName){
          // console.log("works");
          targetSong_info = stored_song;
        }
      }
      return targetSong_info;
    },
    changeAudioElement:function(
      audioInfo_array,
      currentSong_controls = document.getElementById('currentSong_controls'),
      newAudio = helperFunctions.generateElement('audio',"","audio"),
      newSource = helperFunctions.generateElement('source',"","audio/ogg","",audioInfo_array[1])
      ){
        newAudio = helperFunctions.specialElements(newAudio,["controls","controlsList","autoplay"]);
        newAudio.appendChild(newSource);
        currentSong_controls.children[0].remove();
        currentSong_controls.appendChild(newAudio);
      },
    updateCurrentSong:function(
      playList_array,
      songName,
      targetSongElement,
      currentSong_audioElement = document.getElementById('currentSong_controls').children[0],
      ){
        let prevSong = document.querySelector('.playList_current');
        for (let songElement of playList_array) {
          try {
            songElement.classList.remove("playList_current");
  
          }
          catch(err){
            // console.log("clear")
          }
        }
  
        console.log(targetSongElement);
        // console.log(prevSong, targetSongElement, currentSong_audioElement);
        if (targetSongElement == prevSong) {
          // document.getElementById('currentSong_icon').remove();
          targetSongElement.classList.remove("playList_current");
          currentSong_audioElement.pause();
        }
        else {
          targetSongElement.classList.add("playList_current");
          this.addIcon(targetSongElement,songName);
          this.changSongImg(songName);
        }
        // console.log(targetSongElement)
    },
    storePrevSong:function(){
  
    },
    addIcon:function(targetSongElement,songName){
      targetSongElement.innerHTML = `<i id="currentSong_icon" class="fa-solid fa-volume-high"></i>` + songName;
      // console.log(targetSongElement.innerHTML,songName);
    },
    removeIcon:function(){
      try{
        document.getElementById('currentSong_icon').remove();
      }
      catch(err){}
    },
    changSongImg:function(
      songName,
      backgroundImg = document.getElementById('audio_backgroundImg').children[1],
      coverPhoto = document.getElementById('audio_playList_coverPhoto').children[0]
      // audio_features = document.getElementById('audio_features')
      ){
        for (let songInfo of this.audioOptions_library) {
          // console.log(songInfo);
          if (songName == songInfo[0]){
            console.log(songInfo[0],songInfo[2]);
            backgroundImg.setAttribute('src',songInfo[2]);
            coverPhoto.setAttribute('src',songInfo[2]);
            // audio_features.classList.remove('showImg');
            // audio_features.classList.add('showImg');
          }
        }
      // console.log(songName);
    },
    useFunctions:function(){
      this.scrollEffect();
      this.selectFromPlaylist();
    }
}

const animationSection = {
  cinemaOptions_library : [
    ["videoA","resources/imgs/thmbNailA.jpg","resources/videoFiles/Animation1.mp4"],
    ["videoB","resources/imgs/thmbNailB.jpg","resources/videoFiles/Animation2.mp4"],
    ["videoC","resources/imgs/thmbNailC.jpg","resources/videoFiles/Animation3.mp4"],
    ["videoD","resources/imgs/thmbNailD.jpg","resources/videoFiles/Animation4.mp4"],
    ["videoE","resources/imgs/thmbNailE.jpg","resources/videoFiles/Animation5.mp4"]
  ],
  scrollIntro(
    animationSection = document.getElementById('animationSection_youtubestyle'),
    footer = document.querySelector('footer')
  ){
    window.addEventListener('scroll', (e)=> {
      scroll = window.scrollY;
      if (window.innerWidth < 993){
        if (scroll >= (animationSection.offsetTop - 100)) {
          animationSection.style.opacity = "1";
        }
        else {
          animationSection.style.opacity = "0";
          try {
            textOverlay = document.getElementById('videoHolder_ani');
            textOverlay.classList.remove('showOverlay');
          }
          catch(err){}
        }
      }
      else {
        if (scroll >= (animationSection.offsetTop - 200)) {
          animationSection.style.opacity = "1";
        }
        else {
          animationSection.style.opacity = "0";
          try {
            textOverlay = document.getElementById('videoHolder_ani');
            textOverlay.classList.remove('showOverlay');
          }
          catch(err){}
        }
      }
      
    })
  },
  videoOptionToggle: function(
    video = document.getElementById("cinematography_video"),
    thmbNail_holder = document.getElementById('thmbNail_holder')
  ){

  },
  videoOptionSwitch: function(
    thmbNailOptions_array = document.querySelectorAll('.imgHolder_ani'),
    thmbNail_holder = document.getElementById('thmbNail_holder_ani'),
    videoHolder_ani = document.getElementById('videoHolder_ani')
  ){
    //PURPOSE: switch viewable video with thmbNail options
    //STEP1: select all thmbNail options and give them click-eventListeners 
    //STEP2: save info of former viewable video (important)
    //STEP3: search library for targeted thmbNail's info
    //STEP4: create a new viewable banner video when found and replace former banner video
    //STEP4a: start video
    //STEP5: give new viewable banner video click-eventListener from vdieooptionToggle function
    //STEP6: switch targeted thmbNail info with info of former banner video
    //STEP7: hide thmbNail bar when video starts

    //STEP1
    for (let video of thmbNailOptions_array) {
      video.addEventListener('click', (e)=> {
        //STEP2
        let formerSource = document.getElementById("videoElement_ani").children[0];
        //STEP3
        let targetImg = e.target.parentElement.children[1];
        for (let storedVideo of this.cinemaOptions_library){
          if (targetImg.alt == storedVideo[0]) {
            //STEP4
            let newVideo = helperFunctions.generateElement('video',"videoElement_ani","video");
            newVideo = helperFunctions.specialElements(newVideo,["controls","muted"])
            let newSource = helperFunctions.generateElement('source',storedVideo[0],"video/mp4","",storedVideo[2]);
            newVideo.appendChild(newSource)
            document.getElementById("videoElement_ani").remove();
            document.getElementById('videoHolder_ani').appendChild(newVideo)
            //STEP4a
            newVideo.muted = true;
            newVideo.controls = false;
            newVideo.loop = true;
            newVideo.play();

            //STEP5
            this.videoOptionToggle();
          }
        }
        //STEP6
        for (let storedVideoII of this.cinemaOptions_library) {
          if (storedVideoII[0] == formerSource.id) {
            e.target.parentElement.children[1].setAttribute("src", storedVideoII[1]);
            e.target.parentElement.children[1].setAttribute('alt',storedVideoII[0]);
          }
          else {
            console.log("HELP")
          }
        }
        //STEP 7 
        if (window.innerWidth >= 993) {
        }
      })
    }
  },
  showOverlay: function(
    videoHolder_ani = document.getElementById('videoHolder_ani'),
    overlayBtn = document.getElementById('overlayBtn')){
    overlayBtn.addEventListener('click',(e)=>{
      videoHolder_ani.classList.toggle('showOverlay');
    })
  },
  useFunctions : function(){
    this.scrollIntro();
    this.videoOptionToggle();
    this.videoOptionSwitch();
    this.showOverlay();
  }
}


const helperFunctions = {
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

introSection.scrollEffect();
cinemaSection.overlayEffect_scroll();
photoSection.initialPhotoFetch('Initial');
audioFunctions_neo.useFunctions();
animationSection.useFunctions();