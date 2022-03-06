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


let url = "https://botw-compendium.herokuapp.com/api/v2"; //ZeldaBOTWcompendium
fetch(url)
  .then(response => response.json())
  .then(lookAtData);


function lookAtData(jsonData) {
  console.log(jsonData);
  const creatures_array = jsonData.data.creatures;
  const equipment_array = jsonData.data.euipment;
  const materials_array = jsonData.data.materials;
  const monsters_array = jsonData.data.monsters;
  const treaure_array = jsonData.data.treaure;

  // for(let i=0; i<materials_array.length; i++) {
  //   console.log(materials_array[i].name)
  // }
  for(let i=0; i<creatures_array.non_food.length; i++) {
    console.log(creatures_array.non_food[i])
  }
  //  for(let i=0; i<monsters_array.length; i++) {
  //   console.log(monsters_array[i]);
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