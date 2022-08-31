import { sharedHTML,helperFunctions } from "../js/index.js";


const establishHTML = {
  carouselHTML: function(
    item,
    imgArray = item.preview.carouselImgs ,
    counter = 0,
    carousel = helperFunctions.generateElement('div',"carousel"),
    slidesHolder = helperFunctions.generateElement('div',"slidesHolder"),
    prevBtn = helperFunctions.generateElement('button',"prevBtn","shiftBtn",'<i class="fa-solid fa-caret-left"></i>'),
    nextBtn = helperFunctions.generateElement('button',"nextBtn","shiftBtn",'<i class="fa-solid fa-caret-right"></i>'),
    slideControls = helperFunctions.generateElement('div',"slideControls"),
    buttonNav = helperFunctions.generateElement('div',"buttonNav")
    ){
      for (let path of imgArray) {
        let slide = helperFunctions.generateElement('article',`slide${counter}`,"slide");
        let img = helperFunctions.generateElement('img',`${item.name}`,"","",path);
        let slideBtn = helperFunctions.generateElement('div',`${counter}`,"slideBtn",'<i class="fa-solid fa-circle"></i>');       
        counter++
        // slideBtn.addEventListener('click',()=>{landingPageActions.jummpToSlide()})
        slide.appendChild(img);
        buttonNav.appendChild(slideBtn);
        slidesHolder.appendChild(slide);
      }
      
      slideControls = helperFunctions.appendChildren(slideControls, prevBtn, nextBtn);
      carousel = helperFunctions.appendChildren(carousel, slidesHolder,slideControls);

      let carouselElements = [carousel, buttonNav]
      // document.getElementById("side1").appendChild(buttonNav)
      return carouselElements;
  },
  fetchFromJson : async function(){
    try {
      let json = '../displayCase.json';
      await fetch(json,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept':'application/json'
            }
          })
        .then((response) => {return response.json()})
        .then((jsObject) => {
          let targetID = helperFunctions.urlKeyCheck("id",2)
          let target = this.findTarget(targetID,jsObject);
          this.previewHTML(target);
          // helperFunctions.lazyLoading();
          // this.footer();
        })
        .catch(err => {
          console.log(err)
        });
    }
    catch (err) {
    }
  },
  findTarget : function(targetID, results){
    console.log(results)
    let target;
    for (let project in results){
      if (results[project].id == targetID){
        console.log(results[project])
        target = results[project]
      }
    }
    return target;
  },
  previewHTML : function(
    target,
    main = document.querySelector('main'),
    popUp = helperFunctions.generateElement('section',"previewScreen"),
    side1 = helperFunctions.generateElement('section',"side1"),
    side2 = helperFunctions.generateElement('section',"side2"),
    infoSection = helperFunctions.generateElement('div',"infoSection"),
    title = helperFunctions.generateElement('h1',"","",`${target.name}`),
    year = helperFunctions.generateElement('span',"year","",`${target.yearCreated}`),
    descript = helperFunctions.generateElement('p',"","",`${target.preview.description}`),
    tagList = helperFunctions.generateElement('div',"tagList"),
    btnHolder = helperFunctions.generateElement('div',"previewBtnHolder"),
    viewBtn = helperFunctions.generateElement('a',"viewBtn","","View Site",`${target.preview.sitePath}`),
    returnBtn = helperFunctions.generateElement('a',"returnBtn","","Return","../index.html"),
  ){
    let carouselElements = this.carouselHTML(target);

    // returnBtn.addEventListener('click',(e)=>{
    // })

    side1 = helperFunctions.appendChildren(side1, carouselElements[0], carouselElements[1])
    
    // console.log(target)
    btnHolder = helperFunctions.appendChildren(btnHolder,viewBtn,returnBtn);
    infoSection = helperFunctions.appendChildren(infoSection, title, year, descript, tagList, btnHolder)
    side2.appendChild(infoSection);
    popUp = helperFunctions.appendChildren(popUp, side1,side2)

    main.appendChild(popUp);
    // landingPageActions.carouselActions.index = 1;

    previewPageActions.carouselActions.mainFunction();
    // this.carouselHTML.startSlide();

  },
}

const previewPageActions = {
    carouselActions : {
    index : 1,
    intervalFunction : 0,
    interval : 5000,
    mainFunction : function(
      carousel = document.getElementById('carousel'),
      slidesHolder = document.getElementById('slidesHolder'),
      prevBtn = document.getElementById('prevBtn'),
      nextBtn = document.getElementById('nextBtn'),
    ){
      let slidesArray = document.querySelectorAll('.slide');
      const firstClone = slidesArray[0].cloneNode(true);
      const lastClone = slidesArray[slidesArray.length-1].cloneNode(true);
      const slideWidth = slidesArray[this.index].clientWidth;
      const buttonNav = document.querySelectorAll(".slideBtn")
      firstClone.id = "firstClone";
      lastClone.id = "lastClone";

      console.log(slidesHolder);
      slidesHolder.append(firstClone);
      slidesHolder.prepend(lastClone);
      slidesArray[0].classList.add('currentSlide');
      buttonNav[0].classList.add('currentBtn');

      slidesHolder.style.transform = `translateX(${-slideWidth * this.index}px`;

      console.log(this)
      this.startSlides(slidesHolder,slideWidth);
      this.theEvents(carousel,slidesHolder,nextBtn,prevBtn, slideWidth, buttonNav);
    },
    startSlides : function(slidesHolder,slideWidth){
        this.intervalFunction = setInterval(() => {
        this.moveToNextSlide(slidesHolder,slideWidth);
       }, this.interval);
       return;
    },
    getSlides : function(){return document.querySelectorAll('.slide')},
    moveToNextSlide : function(slidesHolder,slideWidth){
      let slidesArray = this.getSlides();
      if (this.index >= (slidesArray.length-1)){return}
      // document.querySelector('.currentSlide').classList.remove("currentSlide");
      this.index++;
      // console.log(this.index)
      this.assignCurrentSlide(slidesArray[this.index], document.querySelector('.currentSlide'),slidesArray)
      slidesHolder.style.transform = `translateX(${-slideWidth * this.index}px`;
      slidesHolder.style.transition = '0.75s';
    },
    moveToPrevSlide :function (slidesHolder,slideWidth){
      let slidesArray = this.getSlides();
      if (this.index <= 0){return}
      // document.querySelector('.currentSlide').classList.remove("currentSlide");
      this.index--;
      console.log(this.index)
      this.assignCurrentSlide(slidesArray[this.index], document.querySelector('.currentSlide'),slidesArray)
      slidesHolder.style.transform = `translateX(${-slideWidth * this.index}px`;
      slidesHolder.style.transition = '0.75s';
    },
    assignCurrentSlide : function(
      centerSlide,
      formerSlide,
      slidesArray
    ){
      let target;
      document.querySelector(".currentBtn").classList.remove('currentBtn')
      formerSlide.classList.remove('currentSlide');
      if (centerSlide.id == "firstClone"){
        slidesArray[1].classList.add('currentSlide');
      }
      else if (centerSlide.id == "lastClone"){
        slidesArray[slidesArray.length-2].classList.add('currentSlide');
      }
      else {
        centerSlide.classList.add('currentSlide');
      }
      
      target = document.querySelector('.currentSlide').id
      console.log(target);
      console.log(document.getElementById(target.substring(5,6)));
      document.getElementById(target.substring(5,6)).classList.add('currentBtn')
    },
    theEvents : function(carousel, slidesHolder,nextBtn,prevBtn, slideWidth, buttonNav){
      slidesHolder.addEventListener('transitionend',()=>{
        let slidesArray = this.getSlides();
        if (slidesArray[this.index].id == firstClone.id){
          slidesHolder.style.transition = "none";
          this.index = 1;
          slidesHolder.style.transform = `translateX(${-slideWidth * this.index}px`;
        }
        if (slidesArray[this.index].id == lastClone.id){
          slidesHolder.style.transition = "none";
          this.index = slidesArray.length - 2;
          slidesHolder.style.transform = `translateX(${-slideWidth * this.index}px`;
        }
      })
      carousel.addEventListener('mouseenter',()=>{
        console.log(this.intervalFunction)
        clearInterval(this.intervalFunction);
      })
      carousel.addEventListener('mouseleave', ()=>{
        this.startSlides(slidesHolder,slideWidth)
      });
      nextBtn.addEventListener('click',()=>{this.moveToNextSlide(slidesHolder, slideWidth)});
      prevBtn.addEventListener('click',()=>{this.moveToPrevSlide(slidesHolder, slideWidth)});
      for (let slideBtn of buttonNav){
        slideBtn.addEventListener('click',()=>{
          let slidesArray = this.getSlides();
          this.index = parseFloat(slideBtn.id) + 1;
          this.assignCurrentSlide(slidesArray[this.index], document.querySelector('.currentSlide'),slidesArray)
          slidesHolder.style.transform = `translateX(${-slideWidth * this.index}px`;
          slidesHolder.style.transition = '0.75s';
        })
      }
    },
  },
}




function startUp (){
  sharedHTML.header();
  sharedHTML.main();
  establishHTML.fetchFromJson();
  sharedHTML.footer();
}

startUp();