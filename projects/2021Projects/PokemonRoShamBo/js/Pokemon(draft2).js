let button1 = document.getElementById("choosePokemon");
let button2 = document.getElementById("FIGHT");
let button3 = document.getElementById("feelingLucky");
let button4 = document.getElementById("gameInfo_button")
let button5 = document.getElementById("backToGame");



function stageChange () {
  let stage = document.getElementById("mainScreen");
  let stagesArray = ['url(\"../PokemonRoShamBo/imgs/Stage1.png\")', 'url(\"../PokemonRoShamBo/imgs/Stage2.png\")','url(\"../PokemonRoShamBo/imgs/Stage3.png\")','url(\"../PokemonRoShamBo/imgs/Stage4.png\")','url(\"../PokemonRoShamBo/imgs/Stage5.png\")','url(\"../PokemonRoShamBo/imgs/Stage6.png\")','url(\"../PokemonRoShamBo/imgs/Stage7.png\")']
  let randomStage = Math.floor(Math.random() * stagesArray.length);
  stage.style.backgroundImage = stagesArray[randomStage];
}


function mainButtons () {
  button1.addEventListener('click', e => {
    let path = 1;
    getRandomPokemon(path);
  })
  
  button2.addEventListener('click', e => {
    let path = 2;
    // stageChange();
    getRandomPokemon(path);
  })
  
  button3.addEventListener('click', e => {
    let path = 3;
    stageChange();
    getRandomPokemon(path);
  })
  button4.addEventListener('click', e => {
    document.getElementById("gameInfo_content").classList.toggle("hidden");
  })
  
  button5.addEventListener('click', e => {
    document.getElementById("gameInfo_content").classList.toggle("hidden");
  })

}


function getRandomPokemon (path) {
  // import { testRunFunction } from 'TestRun.js';
  // testRunFunction();

  // console.log(path)
  let number = Math.floor(Math.random() * 899);
  const url = `https://pokeapi.co/api/v2/pokemon/${number}`;
  console.log(number)
//function pathResults(path, number, url)
   
  if (path === 1) { 
    clearOtherPokemon();
    fetch(url)
      .then(response => 
        response.json())
      .then(yourPokemon); 
    console.log("Hellow!")
  }
  else if (path === 2) {
    yourPokemonCount = document.getElementById("yourPokemon_img").children.length;

    if (yourPokemonCount === 0) {
      alert("You need to get a Pokemon!")
    }
    else {
      fetch(url)
        .then(response => 
          response.json())
        .then(otherPokemon)
        .then(prepForCalculations);
    }
  }
  else if (path === 3) {
    clearOtherPokemon();
    let otherNumber = Math.floor(Math.random() * 899);
    const otherUrl = `https://pokeapi.co/api/v2/pokemon/${otherNumber}`;
    Promise
      .all([fetch(url)
                  .then(response => 
                    response.json())
                  .then(yourPokemon),
                fetch(otherUrl)
                  .then(response => 
                    response.json())
                  .then(otherPokemon)])
      .then(prepForCalculations);
    // fetch(url).then(response => response.json()).then(yourPokemon).then(fetch(otherUrl).then(response => response.json()).then(otherPokemon)).then(prepForCalculations);
  }
}

// function convertToJson(jsonData) {
//   if (jsonData.ok) {
//     return jsonData.json();
//   } else {
//     console.log("error:", jsonData);
//   }
// }

function choosePokemon(results) {
  let type1;
  let type2;
  
  let pokemonName = `<h2>${results.name}</h2>`;
  let pokemonSize = `<p>${results.height}</p>`
  console.log(pokemonName, pokemonSize)
  // console.log(pokemonSize)
  type1 = `<p>${results.types[0].type.name}</p>`;
  try {
    type2 = `<p>${results.types[1].type.name}</p>`;
  }
  catch (err) {
    type2 = null;
  }
    let pokemonImg = `<img src="${results.sprites.front_default}" alt="Image of ${results.name}" width="200">`;
    let damageDelt = `<p class="damageCount">Damage Delt = 0</p>`


    let pokemonInfo = [pokemonName,type1,type2,pokemonImg,pokemonSize,damageDelt];
    
    
    return pokemonInfo;
}
  
function yourPokemon(jsonData) {
  let yourPokemon = choosePokemon(jsonData);
  let htmlStorage = document.getElementById("yourPokemon_info");
  // console.log(yourPokemon[0]);
  // console.log(htmlStorage);
  if (yourPokemon[2] != null) {
    htmlStorage.innerHTML = yourPokemon[0].toUpperCase() + yourPokemon[4] + yourPokemon[1] + yourPokemon[2] + yourPokemon[5];
  }
  else {
    htmlStorage.innerHTML = yourPokemon[0].toUpperCase() + yourPokemon[4] + yourPokemon[1] + yourPokemon[5];
  }

  document.getElementById("yourPokemon_img").innerHTML = yourPokemon[3];

  // let otherPokemon = document.getElementById("otherPokemon_img").children;
  // // console.log(otherPokemon)
  // if (otherPokemon.length != 0) {
  //   document.getElementById("otherPokemon_img").innerHTML = "";
  //   document.getElementById("otherPokemon_info").innerHTML = "";
  // }

}

function otherPokemon(jsonData) {
  let otherPokemon = choosePokemon(jsonData);
  let htmlStorage = document.getElementById("otherPokemon_info");

  if (otherPokemon[2] != null) {
    htmlStorage.innerHTML = otherPokemon[0].toUpperCase() + otherPokemon[4] + otherPokemon[1] + otherPokemon[2] + otherPokemon[5];
  }
  else {
    htmlStorage.innerHTML = otherPokemon[0].toUpperCase() + otherPokemon[4] + otherPokemon[1] + otherPokemon[5];
  }
  document.getElementById("otherPokemon_img").innerHTML = otherPokemon[3];

}

function prepForCalculations () {
  yourPokemon_type1 = document.getElementById("yourPokemon_info").children[2];
  yourPokemon_type2 = document.getElementById("yourPokemon_info").children[3];
  yourPokemon_size = parseInt(document.getElementById("yourPokemon_info").children[1].innerHTML);
  otherPokemon_type1 = document.getElementById("otherPokemon_info").children[2];
  otherPokemon_type2 = document.getElementById("otherPokemon_info").children[3];
  otherPokemon_size = parseInt(document.getElementById("otherPokemon_info").children[1].innerHTML);

  let competingTypes = [yourPokemon_type1, yourPokemon_type2, otherPokemon_type1, otherPokemon_type2];
  let competingSizes = [yourPokemon_size,otherPokemon_size];
  // console.log(competingTypes)
  // console.log(competingTypes[0].innerHTML)
  for (i=0; i < competingTypes.length; i++) {
    if (competingTypes[i] != undefined) {
      competingTypes[i] = competingTypes[i].innerHTML;
    }
    else {
      competingTypes[i] = null;
    }
  }

  timeToFight(competingTypes,competingSizes);
  // console.log(yourPokemon[3])
}

function timeToFight (competingTypes,competingSizes) {
  let yourDamageDelt = (checkTypeAdvantage(competingTypes[0],competingTypes[2])) * (checkTypeAdvantage(competingTypes[0],competingTypes[3])) + (checkTypeAdvantage(competingTypes[1],competingTypes[2])) * (checkTypeAdvantage(competingTypes[1],competingTypes[3]));
  let otherDamageDelt = (checkTypeAdvantage(competingTypes[2],competingTypes[0])) * (checkTypeAdvantage(competingTypes[2],competingTypes[1])) + (checkTypeAdvantage(competingTypes[3],competingTypes[0])) * (checkTypeAdvantage(competingTypes[3],competingTypes[1]));

  // console.log("yourDamageDelt = " +yourDamageDelt)
  // console.log("otherDamageDelt = " +otherDamageDelt)

  if (competingSizes[0] > competingSizes[1]) {
    yourDamageDelt = yourDamageDelt + 0.5;
  }
  else if (competingSizes[0] < competingSizes[1]) {
    otherDamageDelt = otherDamageDelt + 0.5;
  }
  else (
    console.log("tie")
  )

    infoCount_you = document.getElementById("yourPokemon_info");
    infoCount_other = document.getElementById("otherPokemon_info");
    // console.log(infoCount_you)

  let damageYou = `Damage Delt = ${yourDamageDelt}`;
  let damageOther = `Damage Delt = ${otherDamageDelt}`;

  // console.log(yourDamageDelt);
  // console.log(otherDamageDelt);

  // console.log("children length you = " + infoCount_you.children.length);
  // console.log("children length other = " + infoCount_other.children.length)

  if (infoCount_you.children.length == 5) {
    document.getElementById("yourPokemon_info").children[4].textContent = damageYou;
  }
  else {
    document.getElementById("yourPokemon_info").children[3].textContent = damageYou;
  }
  if (infoCount_other.children.length == 5) {
    document.getElementById("otherPokemon_info").children[4].textContent = damageOther;
  }
  else {
    document.getElementById("otherPokemon_info").children[3].textContent = damageOther;
  }


  // document.getElementById("yourPokemon_info").children[3].textContent = damageYou;
  // document.getElementById("otherPokemon_info").children[3].textContent = damageOther;

  // console.log(document.getElementById("otherPokemon_info").children[3]);
  // console.log(damageYou)

  scoreChange(yourDamageDelt,otherDamageDelt);
}

// function damagePointGap (damageElement){

  
// }

function scoreChange (yourDamageDelt,otherDamageDelt) {
  let yourScore = parseInt(document.getElementById("yourPoints").textContent);
  let otherScore = parseInt(document.getElementById("otherPoints").innerHTML);
  if (yourDamageDelt > otherDamageDelt) {
    yourScore += 1;
    document.getElementById("yourPoints").textContent = yourScore;
  }
  else if (yourDamageDelt < otherDamageDelt) {
    otherScore += 1;
    document.getElementById("otherPoints").innerHTML = otherScore;
  }
  else {
    console.log("tie");
  }

  // console.log(yourScore,otherScore)
};

function clearOtherPokemon () {
  if (otherPokemon.length != 0) {
    document.getElementById("otherPokemon_img").innerHTML = "";
    document.getElementById("otherPokemon_info").innerHTML = "";
  }
}


mainButtons();