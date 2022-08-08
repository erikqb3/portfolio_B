const introSection = {
  scrollEffect: function(
    scrollEffect_introTop = document.getElementById('scrollEffect_intro').offsetTop,
    scrollEffect_endTop = document.getElementById('cinema_navTarget').offsetTop,
    sectionLength = scrollEffect_endTop - scrollEffect_introTop,
    scrollEffect_content = document.getElementById('scrollEffect_content'),
    // sectionLength_5xchunk = ((scrollEffect_endTop-scrollEffect_introTop)*0.2),
    // sectionLength_andThenSome = (scrollEffect_endTop-scrollEffect_introTop),
    // scrollEffect_content_p = scrollEffect_content.children[1],
  ){
    let  scrollProgress;
    window.addEventListener('scroll',(e)=>{
      let scroll = window.scrollY;
      let tripWire1 = window.innerHeight*0.6;
      let tripWire2 = tripWire1 + parseFloat(window.innerHeight*0.50);
      let tripWire3 = tripWire2 + parseFloat(window.innerHeight*0.50);
      let tripWire4 = tripWire3 + parseFloat(window.innerHeight*0.50);
      let tripWire5 = tripWire4 + parseFloat(window.innerHeight*0.50);



      scrollProgress = (scroll - scrollEffect_introTop)/sectionLength;

      if (scroll < (tripWire1)){
        scrollEffect_content.children[1].style.position = "initial";
        scrollEffect_content.style.opacity = ((scroll/tripWire1));
      }
      else if ((scroll > tripWire1) && (scroll < tripWire2)) {
        scrollEffect_content.children[1].style.position = "fixed";
        scrollEffect_content.children[1].children[0].style.visibility = "visible";
        scrollEffect_content.children[1].children[1].style.visibility = "hidden";

        scrollEffect_content.children[0].children[0].style.opacity = 1-((scroll-tripWire1)/(tripWire2-tripWire1)*2);
        scrollEffect_content.children[0].children[1].style.opacity = ((scroll-tripWire1)/(tripWire2-tripWire1));
      }
      else if ((scroll > tripWire2) && (scroll < tripWire3)) {
        scrollEffect_content.children[1].style.position = "initial";
        scrollEffect_content.children[1].children[1].style.visibility = "visible";
        scrollEffect_content.children[1].children[0].style.visibility = "hidden";
        scrollEffect_content.children[1].style.top = "50vh"

        scrollEffect_content.children[0].children[1].style.opacity = 1-((scroll-tripWire2)/(tripWire3-tripWire2)*2);
        scrollEffect_content.children[1].children[1].style.opacity = 1-((scroll-tripWire2)/(tripWire3-tripWire2)*2);
        scrollEffect_content.children[0].children[2].style.opacity = ((scroll-tripWire2)/(tripWire3-tripWire2));
        scrollEffect_content.children[1].children[2].style.opacity = ((scroll-tripWire2)/(tripWire3-tripWire2));
      }
      else if ((scroll > tripWire3) && (scroll < tripWire4)) {
        scrollEffect_content.children[1].style.position = "fixed";
        scrollEffect_content.children[1].style.top = "-5rem"
        scrollEffect_content.children[1].children[1].style.visibility = "hidden";
        scrollEffect_content.children[1].children[2].style.visibility = "visible";
        scrollEffect_content.children[1].children[3].style.visibility = "hidden";

        scrollEffect_content.children[0].children[2].style.opacity = 1-((scroll-tripWire3)/(tripWire4-tripWire3)*2);
        scrollEffect_content.children[0].children[3].style.opacity = ((scroll-tripWire3)/(tripWire4-tripWire3));
      }
      else if ((scroll > tripWire4) && (scroll < tripWire5)) {
        scrollEffect_content.children[1].style.position = "initial";
        scrollEffect_content.children[1].children[2].style.visibility = "hidden";
        scrollEffect_content.children[1].children[3].style.visibility = "visible";
      }
      else if ((scroll > tripWire5)){
      }

      this.scrollEffect_changeTop(scrollProgress)
    })
  },
  scrollEffect_changeTop: function(
    percentage,
    currentTop = 75, //see css value
    scrollEffect_background = document.getElementById('bannerImg'),
  ){
    if ((window.innerWidth < 768) || (window.innerWidth > 1200)){
      currentTop = 5;
    }
    else {
      currentTop = 7.5;
    }
    scrollEffect_background.style.top = `${currentTop - (2*(currentTop*percentage))}rem`
  }
}

const cinemaSection = {
  overlayEffect_scroll : function(){
    let cinemaSection_array = document.getElementById("cinematography_scrollPlay").children;
    const initialOffSetTops_array =[];

    window.addEventListener('scroll', (e)=> {
      let scroll = window.scrollY;
      let updatedPercentage;
      let massOutput = [];
      
     for(let i=0; i <(cinemaSection_array.length-1); i++){
      massOutput.push(cinemaSection_array[i].offsetTop);
      if (scroll < massOutput[i]) {
      }
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
  checkPercentage : function(scroll, endPosition){
    let buffer = (endPosition - scroll) / window.innerHeight
    let percentage;
    percentage = Math.ceil((buffer-1)*100)
    return percentage;
  }
}



const photoSection = {
  //STEP_1 construct initial Carousel (fetch1)
  //Step_1a search library and get photos from initial group
  //STEP_1b loop through results and construct initial carousel
  //STEP_1c loop through results and construct gallery
  //STEP_2 loop through gallery and make clickable by providing group when clicked (fetch2)
  //STEP_3 construct newGroup carousel (fetch3)
  //STEP_3a destroy initial carousel,
  //STEP_3b recreate Gallery by following step 1
  //STEP_3c don't reconstruct gallery
  index : 1,
  accessPhotoLibrary : async function(
    groupName,
    fetchPath = "js/photoLibrary.json"
  ){
    console.log(fetchPath, groupName)
    let myPromise = 
      await fetch(fetchPath)
        .then(response=> response.json())
        .then(data => {
          this.constructCarousel(groupName, data); //fetch1
          this.constructGallery(data);
          // this.gallerySwapEffect(data) //fetch 2 and 3
        });
    // console.log(myPromise)
  },
  assignCurrentImg : function(centerSlide, otherSlide, fullArray){
    if (centerSlide.id == "firstClone") {
      fullArray[1].classList.add('currentSlide');
      // console.log(otherSlide)
    }
    else if (centerSlide.id == "lastClone") {
      // console.log(otherSlide)
      fullArray[fullArray.length-2].classList.add('currentSlide');
    }
    else {
      otherSlide.classList.remove('currentSlide');
      centerSlide.classList.add('currentSlide'); 
    }
    // console.log(centerSlide);
    otherSlide.classList.remove('currentSlide');
    // centerSlide.classList.add('currentSlide'); 
  },
  // centerCurrentSlide : function(slideHolder) {
  //   slide_array = this.getSlides();
  //   this.translateSlideHolder(slideHolder);
  //   slideHolder.style.transition = '0.75s ease'; 
  // },
  constructCarousel : function (
    groupName,
    photoLibrary_data,
    carousel_element = document.getElementById('carousel_element'),
    slideHolder = helperFunctions.generateElement('div',"slideHolder")
  ){
    for (let item in photoLibrary_data[groupName]){
      let slide = helperFunctions.generateElement('div',"","slide");
      let imgHolder = helperFunctions.generateElement('div',"","imgHolder_carouselItem");
      let overlayText = helperFunctions.generateElement('div',"","overlayText");
      let overlay_h4 = helperFunctions.generateElement('h4',"","",item);
      let img_element = helperFunctions.generateElement('img',"","","",`${photoLibrary_data[groupName][item]['content']}`);

      overlayText.appendChild(overlay_h4);
      imgHolder = helperFunctions.appendChildren(imgHolder, overlayText,img_element)
      slide.appendChild(imgHolder);
      slideHolder.appendChild(slide);
    }
    carousel_element.appendChild(slideHolder);
    this.index = 1;
    this.constructCarouselControls();
    this.runCarousel();
  },
  constructCarouselControls : function(
    photo_partA = document.getElementById('photo_partA'),
    slideControls = helperFunctions.generateElement("div","","slideControls"),
    prevBtn = helperFunctions.generateElement('button',"prevBtn"),
    nextBtn = helperFunctions.generateElement('button',"nextBtn")
  ){
    prevBtn.innerHTML = `<i class="fa-solid fa-angle-left"></i>`;
    nextBtn.innerHTML = `<i class="fa-solid fa-angle-right"></i>`;
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
  ){
    let slide_array = document.querySelectorAll('.slide');
    let slideEvent;
    const firstClone = slide_array[0].cloneNode(true);
    const lastClone = slide_array[slide_array.length - 1].cloneNode(true);
    

    slide_array[0].classList.add('currentSlide');

    firstClone.id = 'firstClone';
    lastClone.id = 'lastClone';

    slideHolder.append(firstClone);
    slideHolder.prepend(lastClone);


    this.translateSlideHolder(slideHolder);
    slideHolder.addEventListener('transitionend', ()=>{
      slide_array = this.getSlides();
      // console.log(slide_array[this.index].id, this.index)
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
      // console.log('prevBtn');
      console.log(this.index);
    });
    nextBtn.addEventListener('click',()=>{
      this.index = this.moveToNextSlide(slideHolder);
      console.log(this.index);
      // console.log('nextBtn');
    });
    // this.scrollEffect_currentImg(slideEvent,slideHolder);



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

    // let primaryScrollListener = window.addEventListener('scroll',(e)=> {
    //   let scroll = Math.floor(window.scrollY);
    //   console.log(scroll)
    //   let secondaryScrollListener = window.addEventListener('scroll',(e)=> {
    //     console.log("SCROLL")
    //   })
    //   return scroll;
    // })

    // console.log( )

    let scrollEvent = window.addEventListener('scroll', (e)=> {
      let scroll = Math.floor(window.scrollY);
      // console.log(scroll, photo_section.offsetTop);

      if (scroll >= photoGap_trigger){
        sectionA.classList.add("pseudoScrollEffect");
        sectionC.style.opacity = "1";
        // console.log("pseudoEffect ON!")
        // videoSection.style.display = "none";
 
      }
      else {
        sectionA.classList.remove("pseudoScrollEffect");
        sectionC.style.opacity = "0"
        // videoSection.style.display = "block";

        // this.index = this.moveToNextSlide(slideHolder);
      }

      //this centers the images //make it so it only works between video2photo_buffer and audio section
      this.index = this.moveToNextSlide(slideHolder);
      this.index = this.moveToPrevSlide(slideHolder);
      


      // if (scroll >= (photo_section.offsetTop+photoGap)) {
      //   videoSection.style.display = "none";
      // }
      // else {
      //   videoSection.style.display = "block";
      // }
      // console.log(scroll, photo_section.offsetTop)
      // if ((scroll >= photoGap_top) && (scroll <= photo_cH_top)) {
      //   // let percentage = ((scroll - photo_section.offsetTop)/photo_gap).toFixed(3);
      //   document.querySelector('div#carousel_holder').classList.add("pseudoScrollEffect");
      // }
      // else if (scroll > photo_cH_top) {
      //   // console.log("set to set measurement");
      //   document.querySelector('div#carousel_holder').classList.add("pseudoScrollEffect");
      //   // document.querySelector('div#carousel_holder').classList.remove("pseudoScrollEffect");
      // }
      // else if (scroll < photo_cH_top) {
      //   // console.log('set measurement to 100%')
      //   document.querySelector('div#carousel_holder').classList.remove("pseudoScrollEffect");
      //   // document.getElementById('carousel_content').style.marginLeft = this.scrollCheck(scroll)
      // }
      // document.getElementById('carousel_content').style.marginLeft = this.scrollCheck(scroll, photo_cH_top)
    // console.log(document.querySelector('div#carousel_holder'))
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
photoSection.accessPhotoLibrary('Initial');
audioFunctions_neo.useFunctions();
animationSection.useFunctions();