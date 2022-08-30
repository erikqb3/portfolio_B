function cinemaSection() {
  function checkPercentage (
    scroll, singleVideo_array
  ) {
    // for (let sV of singleVideo_array) {
    //   // console.log(sV.offsetHeight, sV);
    //   // console.log(scroll, sV.offsetTop);
    //   console.log(sV.offsetTop-scroll);
    // }
    // console.log(singleVideo_array[1].offsetTop-singleVideo_array[0].offsetTop)
    // console.log(singleVideo_array[2].offsetTop-singleVideo_array[1].offsetTop)
    // console.log(window.innerHeight);
    // console.log( singleVideo_array[1].offsetTop, scroll, window.innerHeight)

    // console.log(singleVideo_array[0].offsetTop - scroll);
    // console.log(singleVideo_array[1].offsetTop - scroll);


    let buffer1 = (singleVideo_array[1].offsetTop - scroll) / window.innerHeight
    // console.log(buffer1)

    let overlayRate1;
    // console.log(singleVideo_array[0].children[0])

    if ((buffer1 <= 2) && (buffer1 >= 1)){
      // console.log("buffer start")
      overlayRate1 = Math.ceil((buffer1-1)*100)  //percentage
      // overlayRate1 = (buffer1-1)*window.innerHeight //percentage of view height
      console.log((overlayRate1).toFixed(2));
      // console.log(getStyle(document.getElementById("cinema1_overlay")).height)
      console.log(document.getElementById('cinema1_overlay').offsetHeight)
      // console.log(document.getElementById("cinema1_overlay"))
      // singleVideo_array[1].children[0].style.height = `${overlayRate1}% !important`
      // document.getElementById("cinema1_overlay").style.height = `${Math.ceil(overlayRate1)}`;
    }
    if (buffer1 <= 0) {
      console.log("reveal Video 2")
      overlayRate1 = 0;
    }

    return (overlayRate1)

  }
  let cinemaSection = document.getElementById("cinematography_scrollPlay");


  window.addEventListener('scroll', (e)=> {
    let scroll = this.scrollY;
    for (let cinema of cinemaSection.children){
      console.log(scroll, cinema.offsetTop)
      if (scroll == cinema.offsetTop) {
        console.log(cinema)
      }
    }
    // let cinemaTop = cinemaSection.offsetTop;
    let percentage = checkPercentage(scroll, cinemaSection.children);
    console.log(percentage, "percentage")
    document.getElementById("cinema1_overlay").style.height = `${100-percentage}%`
    
    // console.log(scroll, cinemaTop, cinemaSection)
  })
}

cinemaSection();

// document.getElementById("cinema1_overlay").style.height = "50px"
// console.log(document.getElementById("cinema1_overlay").clientHeight)
