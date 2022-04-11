console.log("Hellow?")
function startingVariables(){
  let variables = []; 
  let namesArray = []; //0
  let descriptionArray = ["This is Me"]; //1
  let inputBox = document.getElementById("userInput"); //2
  let APIarray = []; //3

  variables.push(namesArray);
  variables.push(descriptionArray);
  variables.push(inputBox);
  variables.push(APIarray);

  return variables;
};

function getTimerTime(){
  return Math.floor((new Date() - startTime) / 1000); 
};
function setUpScreen() {
  let SWW = window.innerWidth; //SWW = starting Window Width
  let screen_textStream = document.getElementById("screen_textStream");
  let streamCount = 2;

  // if (SWW <= 760) {
  //   streamCount = 2;
  // }
  // else if (SWW <= 1200) {
  //   streamCount = 3;
  // }
  // else {
  //   streamCount = 4;
  // }

  if (SWW >= 1200) {
    let correctScreen = document.getElementById("correct");
    let descriptionScreen = document.getElementById("description");
    correctScreen.style.width = "25%";
    descriptionScreen.style.width = "25%";
  }

  for (i=0; i < streamCount; i++) {
    let stream = document.createElement('div');
    stream.classList.add("stream")
    screen_textStream.appendChild(stream);
  }
  
  // let backgroundPic = document.createElement('div');
  // backgroundPic.setAttribute("id","screen_background");
  // document.getElementById("mainScreen").appendChild(backgroundPic);
}


function levelUp() {
  let names = startingVariables()[0];
  let APIs = startingVariables()[3];
  let descriptions = startingVariables()[1];
  let counter = 0;
  setUpScreen();

  let yourscore = parseInt(document.getElementById("yourPoints").innerHTML);



  // let randNumb = Math.floor(Math.random() * 21)
  
  let ticker = setInterval(() => { //the heartbeat of the game
    renderName(names,APIs,counter);
    counter += 1;
    endGame(ticker);
    // if (counter==10) { //switch to another level
    //   clearInterval(ticker)
    // }
  },2000); //time

  wordChecker(names,APIs);

}

function runGame(){
  let names = startingVariables()[0];
  let APIs = startingVariables()[3];
  let descriptions = startingVariables()[1];
  let counter = 0;
  // console.log(26%25);
  setUpScreen();

  // let randNumb = Math.floor(Math.random() * 21)
  
  let ticker = setInterval(() => { //the heartbeat of the game
    renderName(names,APIs,counter);
    counter += 1;
    endGame(ticker);
    // if (counter==10) { //switch to another level
    //   clearInterval(ticker)
    // }
  },2000); //time

  wordChecker(names,APIs);

}



async function renderName(names,APIs,counter){
  // console.log("Hellow?")
  let apiURL = "https://ghibliapi.herokuapp.com/films";
  let MYjsonFile = "characterNames.json";
  let randNumb = Math.floor(Math.random() * 21)
  // let film;
  await fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    let film = jsObject[randNumb];
    // film = jsObject[0]; //test
    let filmLength = film.people.length;
    let APInameJson = jsObject[randNumb].people[(Math.floor(Math.random() * filmLength))] //from API
    // APInameJson = jsObject[0].people[0]; //test GAURANTEE USE MAIN API

    if (film.people.length != 1) { //IF Api has multiple names listed
      fetch(APInameJson)
      .then((response) => response.json())
      .then((jsObject) => {
        APIs.push(1);
        // console.log(jsObject.name);
        if (jsObject.name == "Kanta Ōgaki") {
          jsObject.name = "Kanta Ogaki"
        }

        names.push(jsObject.name)
        createNameElement(names,APIs,counter)
      })
    }
    else { //if API only has one name listed
      fetch(MYjsonFile)
      .then((response) => response.json())
      .then((jsObject) => {
        let randIndexNumb = Math.floor(Math.random() * 15);
        let characterList = jsObject[randIndexNumb];
        let charListLength = characterList.characters.length;
        let randCharName = jsObject[randIndexNumb].characters[Math.floor(Math.random() * charListLength)];
        // console.log(randCharName)
        APIs.push(2);
        names.push(randCharName);
        createNameElement(names,APIs,counter);
      })
    }

  })
  // createNameElement(names,counter)
}
// function uniqueName(names, randCharName,counter){ //scrap
//   for (i=0; i < names.length; i++) {
//     if (randCharName != names[i]) {
//       names.push(randCharName);
//       createNameElement(names,counter)
//     }
//     else {};
//   }

// }

function createNameElement(names,APIs,counter){
  streamArray = document.getElementById("screen_textStream").children;
  // console.log(streamArray);
  randStream = streamArray[Math.floor(Math.random() * document.getElementById("screen_textStream").childElementCount)];
  // console.log(randStream)
  let nameSlot = document.createElement('p')
  // console.log(names, counter)
  // console.log(APIs);
  nameSlot.innerHTML = names[counter]; //counter - the index number of the latest name pushed into the array
  if (randStream.childElementCount == 0 ) {
    // console.log(randStream.childElementCount);
  randStream.appendChild(nameSlot);
}
  else {
    // console.log(randStream.childElementCount,randStream)
    randStream.insertBefore(nameSlot,randStream.childNodes[0]);
  }
  return randStream;
 
}

// function placeName(titles,randStream,counter){
//   console.log(titles,counter)
//   console.log(randStream);
//   randStream.innerHTML = titles[counter];
// }

function wordChecker(names,APIs) {
  let userInput = startingVariables()[2];
  let SWW = window.innerWidth;
  userInput.addEventListener('input', ()=> { //word checker
    let streams = document.querySelectorAll(".stream");
    // console.log(names,APIs)
    // spellingCheck();
    for (i=0; i < streams.length; i++) {
      let lastChild;
      try {
        lastChild = streams[i].lastChild.innerHTML;
      }
      catch(err) {
        lastChild = streams[i+1].lastChild.innerHTML; //the plus one trick wont work with more than two columns
      }
      if (lastChild == userInput.value) {
        let indexNumb = names.indexOf(lastChild);
        // console.log(indexNumb);
        if (SWW >= 1200) {
          displayScreen_L(lastChild);
          getFilmInfo(APIs,indexNumb,lastChild);
        }
        // names.splice(indexNumb,1);
        try {
          streams[i].lastChild.remove();
        }
        catch(err) {

          streams[i+1].lastChild.remove();
        }
        userInput.value=""
        
        getPoint();
      };
    }
  }
  )

}


// function spellingCheck () { //scrap
//   userInput.addEventListener('input',() => { 
//     const arrayQuote  = document.querySelectorAll(".stream"); 
//     const arrayValue = userInput.value.split('');
//     for (i=0;i<arrayQuote.length;i++) {
//       console.log(arrayQuote[i].lastChild)
//     }


//     let correct = true;
//     arrayQuote.forEach((characterSpan,index) => { 
//         const character = arrayValue[index];
//         if (character == null) {
//             characterSpan.classList.remove('correct');
//             characterSpan.classList.remove('incorrect');
//             correct = false 
//         }
//         else if (character === characterSpan.innerText) {
//             characterSpan.classList.add('correct');
//             characterSpan.classList.remove('incorrect');
//         } else {
//             characterSpan.classList.remove('correct');
//             characterSpan.classList.add('incorrect');
//             correct = false;
//         }
//         })
//     }
//   )}


function getPoint() {
  let yourPoints = parseInt(document.getElementById("yourPoints").innerHTML);
  let newScore = yourPoints+1;
  document.getElementById("yourPoints").innerHTML = newScore;
}


function displayScreen_L(lastChild){
  let correctScreen = document.getElementById("correct");
  let storedName = document.createElement('p');
  // console.log(lastChild);
  storedName.innerHTML = lastChild;
  // console.log(storedName)
  correctScreen.appendChild(storedName);
  // console.log(correctScreen.childElementCount)
  if (correctScreen.childElementCount == 11) {
    // document.getElementById('correct').style.width = 27.5; 
  }
}


function getFilmInfo(APIs,indexNumb,lastChild){
  // console.log(APIs,indexNumb);
  console.log(APIs[indexNumb], indexNumb)
  let apiURL = "https://ghibliapi.herokuapp.com/films";
  let MYjsonFile = "../featuredAttraction/characterNames.json";
  let API_id = APIs[indexNumb];
  searchForName(API_id,lastChild);
//   if (API_id == 2) {
//     fetch(MYjsonFile)
//     .then((response) => response.json())
//     .then((jsObject) => {
//       for (i=0;i<jsObject.length;i++) {
//         // console.log(jsObject[i])
//         for (ii=0;ii < jsObject[i].characters.length;ii++) {
//           let listName = jsObject[i].characters[ii];
//           // console.log(listName)
//           if (lastChild == listName) {
//             let film_id = (jsObject[i].film_id)
//             fetch(apiURL)
//             .then((response) => response.json())
//             .then((jsObject) => {
//               let target_film = jsObject[film_id]
//               displayScreen_R(target_film)
              
//           })
//         }
//         // let name = jsObject[i].characters.forEach(searchMyAPI);
//         // console.log(name)
//       }
//     }
//       // jsObject.forEach(searchMyAPI,lastChild)  
//   })
// }
//   else if (API_id == 1){
//   searchForName(API_id,lastChild);
// }
}

function displayScreen_R(targetFilm) {
  let infoScreen = document.getElementById("description");
  getImage(targetFilm)
  // console.log(infoScreen.childElementCount)
  console.log(targetFilm)
  if (infoScreen.childElementCount == 0) {
    let filmTitle =  document.createElement('h3');
    let filmDescript = document.createElement('p');
    filmTitle.innerHTML = targetFilm.title;
    filmDescript.innerHTML = targetFilm.description;
    infoScreen.appendChild(filmTitle);
    infoScreen.appendChild(filmDescript);
  }
  else {
    infoScreen.lastChild.previousSibling.innerHTML = targetFilm.title;
    infoScreen.lastChild.innerHTML = targetFilm.description;
  }
}


function searchForName(API_id,lastChild) {
  if (API_id == 1) {
    let searchThis = "https://ghibliapi.herokuapp.com/films";
    fetch(searchThis)
    .then((response) => response.json())
    .then((jsObject_a) => {
      console.log(jsObject_a);
      for (i=0;i < jsObject_a.length;i++) {
        if (jsObject_a[i].people.length > 1) {
          console.log(jsObject_a[i].people);
          for (ii=0;ii < jsObject_a[i].people.length;ii++) {
            let film_id = jsObject_a[i];
            console.log(film_id)
            fetch(jsObject_a[i].people[ii])
            .then((response) => response.json())
            .then((jsObject_b) => {
              console.log(jsObject_b.name)
              if (jsObject_b.name == lastChild) {
                console.log("match")
                targetFilm = jsObject_b.films;
                console.log(film_id)
                displayScreen_R(film_id)
              }
            })
          }
        } 
      }
    })
  }
  else {
    let apiURL = "https://ghibliapi.herokuapp.com/films";
    let searchThis = "../featuredAttraction/characterNames.json"
    fetch(searchThis)
    .then((response) => response.json())
    .then((jsObject) => {
      for (i=0;i<jsObject.length;i++) {
        // console.log(jsObject[i])
        for (ii=0;ii < jsObject[i].characters.length;ii++) {
          let listName = jsObject[i].characters[ii];
          // console.log(listName)
          if (lastChild == listName) {
            let film_id = (jsObject[i].film_id)
            fetch(apiURL)
            .then((response) => response.json())
            .then((jsObject) => {
              let target_film = jsObject[film_id]
              displayScreen_R(target_film)
            })
          }
        }
      }
    })
  }
}

function getImage(targetFilm) {
  let score = parseInt(document.getElementById('yourPoints').innerHTML);
  let SWW = window.innerWidth;
  let backgroundPic = document.getElementById("screen_background");
  let smallPic = targetFilm.image;
  let largePic = targetFilm.movie_banner;
  console.log(targetFilm);
  console.log(score);
  if (score%10 == 0) {
    if (SWW >= 1200) {
      backgroundPic.style.backgroundImage = `url(${largePic})`;
    }
    else {
      backgroundPic.style.backgroundImage = `url(${smallPic})`;
    }
  }

}


function endGame(ticker){
  let streamArray = document.getElementById("screen_textStream").children;
  for (i=0; i<streamArray.length;i++) {
    // console.log(streamArray[i].childElementCount)
    if (streamArray[i].childElementCount >= 10) {
      clearInterval(ticker)
      closeMessage()
    }
  }
}


function closeMessage() {
  let messageBtn = document.getElementById("gameMessage");
  messageBtn.addEventListener('click',e=> {
    message = document.getElementById("gameMessage");
    message.classList.toggle("hidden");
  
  })
}
runGame();
