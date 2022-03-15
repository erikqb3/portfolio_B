/**
 * APIS that work
 * // let url = "https://pokeapi.co/api/v2/pokemon/666"; //PokemonPokedex
 * // let url = "https://db.ygoprodeck.com/api/v7/cardinfo.php"; //YuioghCard
 * // let url = "https://botw-compendium.herokuapp.com/api/v2"; //ZeldaBOTWcompendium
 * // let url = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1 " //DeckOfCards see website for instructions http://deckofcardsapi.com/
 * // let url = "https://ghibliapi.herokuapp.com/films/" //Studioh Ghibli
 * // let url = "https://foodish-api.herokuapp.com/api" //Random Food api, single image
 * // let url = "https://api.genshin.dev" //Gehnshin Impact? Not sure how to work it
*/


// export default function useAPI () {
//   const express = require('express');
//   const request = require('request');

//   const app = express();

//   app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

//   app.get('/api/random', (req, res) => {
//     request(
//       { url: 'https://botw-compendium.herokuapp.com/api/v2' },
//       (error, response, body) => {
//         if (error || response.statusCode !== 200) {
//           return res.status(500).json({ type: 'error', message: err.message });
//         }

//         res.json(JSON.parse(body));
//       }
//     )
//   });
//   return ("HELLOW")
// }
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`listening on ${PORT}`));
















let url = "https://botw-compendium.herokuapp.com/api/v2"; //ZeldaBOTWcompendium
fetch(url)
  .then(response => response.json())
  .then(lookAtData);


function lookAtData(jsonData) {
    console.log(jsonData);
  //   const creatures_array = jsonData.data.creatures;
  //   const equipment_array = jsonData.data.equipment;
  //   const materials_array = jsonData.data.materials;
  //   const monsters_array = jsonData.data.monsters;
  //   const treaure_array = jsonData.data.treaure;

  // for(let i=0; i<materials_array.length; i++) {
  //   console.log(materials_array[i].name)
  // }
  // for(let i=0; i<creatures_array.non_food.length; i++) {
  //   console.log(creatures_array.non_food[i])
  // }
  //  for(let i=0; i<monsters_array.length; i++) {
  //   console.log(monsters_array[i]);
  // }

  // console.log(equipment_array);
  // for(let i=0; i<equipment_array.length; i++) {
  //   console.log(equipment_array[i].name);
  //   counter++;
  // }
}

// if (path === 1) {
//   clearOtherPokemon();
//   fetch(url)
//     .then(response =>
//       response.json())
//     .then(yourPokemon);
//   console.log("Hellow!")
// }