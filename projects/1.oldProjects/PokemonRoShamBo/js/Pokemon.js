//One Pokemon

// import { testRunFunction } from 'TestRun.js';
// testRunFunction();

document.querySelector("body").setAttribute("background-color","orange")

function getRandomPokemon () {
  let number = Math.floor(Math.random() * 899);


  const url = `https://pokeapi.co/api/v2/pokemon/${number}`;


  let results = null;
  // takes a fetch response and checks to make sure it was OK.
  // then returns the body of the response as a PROMISE to some JSON.
  function convertToJson(response) {
    if (response.ok) {
      return response.json();
    } else {
      console.log("error:", response);
    }
  }
  // this is where we would do whatever we needed to do with the resulting data.
  function doStuff(data) {

      const outputElement = document.querySelector('#output');
      results = data;
      const html = `<h2>${results.name.toUpperCase()}</h2>
                    <img src="${results.sprites.front_default}" alt="Image of ${results.name}" width="200">`;
      let html2;
      try {
        html2 = 
        `<p>${results.types[0].type.name}</p>
        <p>${results.types[1].type.name}</p>`;
      }
      catch (err) {
        html2 = `<p>${results.types[0].type.name}</p>`;
      }
      outputElement.innerHTML = html + html2;
      // console.log("first: ", results);
    }


  // read this as: make a request to URL, WHEN it finishes THEN run convertToJson
  // WHEN it finishes THEN run doStuff
  fetch(url).then(convertToJson).then(doStuff);
  // meanwhile...continue with the rest of the program..
  console.log("second: ", results);
  }
// fetch(url).then((response)).then((data));

getRandomPokemon();


// const url = "https://pokeapi.co/api/v2/pokemon";
// let results = null;
// // takes a fetch response and checks to make sure it was OK.
// // then returns the body of the response as a PROMISE to some JSON.
// function convertToJson(response) {
//   if (response.ok) {
//     return response.json();
//   } else {
//     console.log("error:", response);
//   }
// }


// function doStuffList(data) {
//   console.log(data);
//   const pokeListElement = document.querySelector('#outputList');
//   const pokeList = data.results;
//   console.log(pokeList)
//   pokeList.forEach((currentItem) => {
//       const html = `<li>${currentItem.name}</li>`;
//       // note the += here...
//       pokeListElement.innerHTML += html;
//   })
// }

// fetch(url).then(convertToJson).then(doStuffList);

function massReturnsFunction () {
  let x = 1;
  let y = 2;
  let z = 3;
  let xyz = [x,y,z]
  return xyz
}

let massReturns = massReturnsFunction();
console.log(massReturns[0]);
console.log(massReturns[1]);
console.log(massReturns[2]);