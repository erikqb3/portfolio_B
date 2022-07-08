import { helperFunctions } from '../customJS/establishHTML.js';
import { cinemaOptions_library, videoOptions_library, audioOptions_library } from '../customJS/library.js';

export const cinematographyFunctions = {
  videoOptionToggle: function(
    video = document.getElementById("cinematography_video"),
    thmbNail_holder = document.getElementById('thmbNail_holder')
  ){
    //PURPOSE: thmbNail bar disappears so user can watch video without it blocking 
    //STEP1: target viewable video
    //STPE2: toggle existance of thmbNail_holder based on window width and if video is paused or not
             
    video.addEventListener('click', (e)=> { //STEP1
      //STEP2
      if (window.innerWidth >= 993) {
        if (e.target.paused == false)  {
          thmbNail_holder.style.display = "block"; 
        }
        else {
          thmbNail_holder.style.display = "none";
        }
      }
    })
  },
  videoOptionSwitch: function(
    thmbNailOptions_array = document.querySelectorAll('.imgHolder'),
    thmbNail_holder = document.getElementById('thmbNail_holder')
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
        let formerSource = document.getElementById("cinematography_video").children[0];
        //STEP3
        let targetImg = e.target.parentElement.children[1];
        for (let storedVideo of cinemaOptions_library){
          if (targetImg.alt == storedVideo[0]) {
            //STEP4
            let newVideo = helperFunctions.generateElement('video',"cinematography_video","video");
            newVideo = helperFunctions.specialElements(newVideo,["controls"])
            let newSource = helperFunctions.generateElement('source',storedVideo[0],"video/mp4","",storedVideo[2]);
            newVideo.appendChild(newSource)
            document.getElementById("cinematography_video").remove();
            document.getElementById("cinematography_youtubestyle").insertBefore(newVideo,document.getElementById("thmbNail_holder"));
            //STEP4a
            newVideo.play();
            //STEP5
            this.videoOptionToggle();
          }
        }
        //STEP6
        // console.log(formerSource.id)
        for (let storedVideoII of cinemaOptions_library) {
          // console.log(storedVideoII[0]);
          if (storedVideoII[0] == formerSource.id) {
            console.log(storedVideoII[0]);
            console.log(storedVideoII[1]);
            e.target.parentElement.children[1].setAttribute("src", storedVideoII[1]);
            e.target.parentElement.children[1].setAttribute('alt',storedVideoII[0]);
          }
          else {
            console.log("HELP")
          }
        }
        //STEP 7 
        if (window.innerWidth >= 993) {
          thmbNail_holder.style.display = "none";
        }
      })
    }
  }
}
export const videographyFunctions = {
  hoverPlay: function(
    smallVid_array = document.querySelectorAll(".video_holder")
  ){
    //PURPOSE: watch video when hover over it
    //STEP1: if wide screen, turn off autoplay on all videos
    //STEP2: give all videos hover-eventlisteners (mouseout to turn off mouseover changes)
    //STEP2a: play videos when mouse over
    //STEP2b: pause videos when mouse out
    //NOTE: other hover effects are purely css

    //STEP1:
    if (window.innerWidth >= 993) {
      for (let smallVid of smallVid_array) {
        smallVid.children[1].autoplay = false;
        //STEP2:
        smallVid.children[0].addEventListener('mouseover',(e)=> {
          //STEP2a
          e.target.parentElement.children[1].play();
          e.target.parentElement.children[1].muted = true;
        })
        smallVid.children[0].addEventListener('mouseout',(e)=> {
          //STEP2b
          e.target.parentElement.children[1].pause();
        })
      }
    }
  }
}
export const photographyFunctions = {
  buttonNav: function(
    buttonNav_array = document.querySelectorAll(".slide-dot"),
    carouselContent = document.getElementById('carousel_content')
  ){
    //PURPPOSE: Switch between slides according to which slideDot you click
    //STEP1: loop through slideDots and click-eventListeners
    //STEP2: pull value from clicked btn element that will shift slide to appropriate slide
    //STEP3: set left-margin of carouselContent to change it then check current margin-left for position
    
    //STEP1
    for (let slideDot of buttonNav_array) {
      slideDot.addEventListener('click', (e)=>{
    //STEP2
        let shiftValue = (e.target.value)+"vw";
    //STEP3
        carouselContent.style.marginLeft = `${shiftValue}`;
        this.settingsCheck();
      })
    }
  },
  prevBtn: function(
    prevBtn = document.getElementById('prevBtn'),
    carouselContent = document.getElementById('carousel_content')
  ){
    //PURPOSE: move carousel to the left by 1
    //STEP1: when clicked, get currrent value of carousel; new value is +100
    //STEP2: set carousel position to newValue and check position

    prevBtn.addEventListener('click',(e)=>{
    //STEP1
      let currentValue = parseInt(carouselContent.style.marginLeft.slice(0,4));
      let newValue = currentValue+100;
    //STEP2
      carouselContent.style.marginLeft = String(newValue)+"vw";
      this.settingsCheck();
      
    })
  },
  nextBtn: function(
    nextBtn = document.getElementById('nextBtn'),
    carouselContent = document.getElementById('carousel_content')
  ){
    //PURPOSE: move carousel to the right by 1
    //STEP1: when clicked, get currrent value of carousel; new value is -100
    //STEP1a: if starting off, change NaN to 0;
    //STEP2: set carousel position to newValue and check position

    nextBtn.addEventListener('click',(e)=>{
    //STEP1
      let currentValue = parseInt(carouselContent.style.marginLeft.slice(0,4));
    //STEP1a  
      if (isNaN(currentValue)) {
        currentValue = 0;
      }
      let newValue = currentValue-100;
    //STEP2
      carouselContent.style.marginLeft = String(newValue)+"vw";
      this.settingsCheck();
    })
  },
  settingsCheck: function(
    carouselContent = document.getElementById('carousel_content'),
    prevBtn = document.getElementById('prevBtn'),
    nextBtn = document.getElementById('nextBtn'),
    currentValue = parseInt(carouselContent.style.marginLeft.slice(0,4))
  ){
    //PUPOSE: hides prev/next btns if slides are all the way left or right
    //NOTE: settings need to be checked every time the carousel is moved

    if ((currentValue == 0) || (isNaN(currentValue))){
      prevBtn.style.display = "none";
    }
    else {
      prevBtn.style.display = "block";
    }
    if ((currentValue <= -400)) {
      nextBtn.style.display = "none";
    }
    else {
      nextBtn.style.display = "block";
    }
  }
}
export const audioFunctions = {
  selectFromPlaylist: function(
    song_array = document.querySelectorAll(".playList_song"),
    currentSong_controls = document.getElementById('currentSong_controls')
  ){
    for (let song of song_array) {
      song.addEventListener('click',(e)=>{
        let audioInfo = this.searchAudioLibrary(e.target.innerHTML);
        this.changeAudioElement(audioInfo);
        this.updateCurrentSong(song_array,audioInfo[0],e.target)
      })
    }
  },
  searchAudioLibrary:function(songName){
    let targetSong_info;
    for (let stored_song of audioOptions_library) {
      if (stored_song[0] == songName){
        console.log("works")
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
      console.log(currentSong_controls.children[0]);
      currentSong_controls.children[0].remove();
      currentSong_controls.appendChild(newAudio);
    },
  updateCurrentSong:function(
    playList_array,
    songName,
    targetSongElement,
    currentSong_label = document.getElementById('currentSong_label').children[0]){
      for (let songElement of playList_array) {
        try {
          songElement.classList.remove("playList_current");
        }
        catch(err){
          console.log("clear")
        }
      }
      targetSongElement.classList.add("playList_current");
      currentSong_label.innerHTML = songName;
  }
}





// //Use when switched to cinematography mode
// cinematographyFunctions.videoOptionToggle();
// cinematographyFunctions.videoOptionSwitch();


// //Use when switched to videography mode
// videographyFunctions.hoverPlay();

// //Use when switched to photography mode
// photographyFunctions.buttonNav();
// photographyFunctions.prevBtn();
// photographyFunctions.nextBtn();

// //Use when switched to audio mode
// audioFunctions.selectFromPlaylist();