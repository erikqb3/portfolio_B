//INITiALS
const track = document.querySelector('.PCW_MI_tabs'); //element
const tabs = Array.from(track.children); //array
const allDescriptions = document.querySelector(".all_descriptions"); //element
const singleDescriptions = Array.from(allDescriptions.children); //array
const arrayOfImages = document.querySelectorAll(".offering"); //array
const galleryStuff = document.querySelector('.gallery'); //element
const addItemButtons = document.querySelectorAll(".add_item");
const listBox = document.querySelector("#listOfPurchases");
const currentPageItems = document.querySelector(".showing")
const arrayOfItems = Array.from(currentPageItems.children);
const subelements = Array.from(arrayOfItems[3].children);
const purchasedItemsList = [];
const purchasedItemsPrices = [];
const purchasedItemsQuantity = [];
const totalPrices = []
var totalSum = 0;
var tax = 0;
var grandTotal = 0;


//FUNCTIONS
const updateTabs = (currentTab, targetTab) => { //WORKS
  currentTab.classList.remove('current-tab');
  targetTab.classList.add('current-tab');
  const oldText = document.querySelector(".showingText");
  if (oldText != null) {
    oldText.classList.remove("showingText");
  }
  // console.log(targetTab);
  // tabs.indexOf(targetTab);
}

const changeItems = (targetTab,tabs) => {
  current_items = document.querySelector(".showing")
  if (targetTab==tabs[0]) {
    drinks = document.querySelector(".items_drinks")
    current_items.classList.remove("showing");
    drinks.classList.add("showing");
    // console.log(drinks);
  }
  else if (targetTab==tabs[1]) {
    sweets = document.querySelector(".items_sweets");
    current_items.classList.remove("showing");
    sweets.classList.add("showing");
    // console.log(sweets);
  }
  else if (targetTab==tabs[2]) {
    plates = document.querySelector(".items_plates");
    current_items.classList.remove("showing");
    plates.classList.add("showing");
    // console.log(plates);
  }
  else if (targetTab==tabs[3]) {
    entrees = document.querySelector(".items_entrees");
    current_items.classList.remove("showing");
    entrees.classList.add("showing");
    // console.log(entrees);
  }
  }

// const showCart = () => {
//   const addButtons = document.querySelectorAll(".add_item");
//   const Cart = document.querySelector(".cart");
//   for (i = 0; i <=36; i++) {
//     addButtons[i].addEventListener('click', e=> {
//       Cart.classList.remove("invisible");
//     })
//   }
// }
 



function addToCart (event) {
  const addedItem = event.target.parentNode;
  let addedItem_quantity = parseFloat(addedItem.children[5].value);
  console.log(addedItem_quantity);

  if (addedItem_quantity <= 0) {
    return;
  }
  else {
    listBox.classList.remove("invisible");
  }

    const itemElements = Array.from(addedItem.children);
  console.log(itemElements);

  let purchasedInfo = extractInfo(itemElements);
  console.log(purchasedInfo);

  stackItems(purchasedInfo);
  stackQuantity(purchasedInfo);
  convertPrices(purchasedInfo);
  totalTogether(totalPrices);
  calcTax(totalSum);
  calcGrandTotal(totalSum,tax,grandTotal);
  // console.log(totalPrices)

  
  // purchasedItemsList.join(" ");
  
}


const extractInfo = (itemElements) => {
  let purchasedItem = itemElements[1].innerHTML;
  let purchasedQuantity = itemElements[5].value;
  let purchasedPrice = itemElements[2].innerHTML;

  purchasedInfo = [];
  purchasedInfo.push(purchasedItem);
  purchasedInfo.push(purchasedQuantity);
  purchasedInfo.push(purchasedPrice);
  return purchasedInfo;
}

const stackItems = (purchasedInfo) => {
  const itemName = purchasedInfo[0];
  purchasedItemsList.push(itemName);
  // purchasedItemsList.join(' ');
  document.getElementById("purchases").innerHTML = purchasedItemsList.join('<br>');
}
const stackQuantity = (purchasedInfo) => {
  const itemQuantity_value = purchasedInfo[1];
  purchasedItemsQuantity.push(itemQuantity_value);
  // console.log(purchasedItemsQuantity)
  document.getElementById("quantities").innerHTML = purchasedItemsQuantity.join('<br>')

  return itemQuantity_value;
}
const convertPrices = (itemElements) => {
  const newPrice_$ = "$"
  const itemPrice = purchasedInfo[2].substr(1,4);
  const itemPrice_float = parseFloat(itemPrice); //is now a float
  const itemQuantity_value = parseFloat(purchasedInfo[1]); //needs to be made a float
  const itemPrice_withQuant = parseFloat((itemPrice_float * itemQuantity_value).toFixed(2));
  // const priceAndQuant_float = (itemPrice_withQuant);
  totalPrices.push(itemPrice_withQuant);
  const newPrice = newPrice_$.concat(itemPrice_withQuant);
  purchasedItemsPrices.push(newPrice);
  // console.log(purchasedItemsPrices)


  // console.log(purchasedItemsPrices)
  // purchasedItemsPrices.push(newPrice.innerHTML);
  document.getElementById("prices").innerHTML = purchasedItemsPrices.join('<br>');
  return newPrice;
}

const totalTogether = (totalPrices) => {
  for (i=0; i < totalPrices.length; i++) {
    totalSum = totalSum + totalPrices[i];
  }
  const totalSum_$ = "$";
  const totalSum_str = totalSum.toFixed(2);
  const newTotalSum = totalSum_$.concat(totalSum_str)
  document.getElementById("subtotalCost").innerHTML = newTotalSum;
}
const calcTax = (totalSum,tax) => {
  const tax_$ = "$";
  const tax_str = (totalSum * 0.06).toFixed(2);
  const newTax = tax_$.concat(tax_str)
  document.getElementById("salesTax").innerHTML = newTax;
}
const calcGrandTotal = (totalSum,tax,grandTotal) => {
  tax = parseFloat((totalSum * 0.06).toFixed(2));
  const grandTotal_$ = "$";
  const grandTotal_str = (parseFloat(totalSum) + parseFloat(tax)).toFixed(2)
  const newGrandTotal = grandTotal_$.concat(grandTotal_str)
  // grandTotal = parseFloat((parseFloat(totalSum) + parseFloat(tax)).toFixed(2));
;

  document.getElementById("grandTotal").innerHTML = newGrandTotal;
}

const removeItems = (event) => {
  let listItems_array = document.getElementById("purchases").innerHTML.split("<br>");
  let listQuantities_array = document.getElementById("quantities").innerHTML.split("<br>");
  let listPrices_array = document.getElementById("prices").innerHTML.split("<br>");


  console.log(listItems_array);
  console.log(document.getElementById("purchases").innerHTML)
  
  document.getElementById("purchases").innerHTML = "";
  document.getElementById("quantities").innerHTML = "";
  document.getElementById("prices").innerHTML = "";

  stackItems(newInfo);
  stackQuantity(newInfo);
  convertPrices(newInfo);
  totalTogether(totalPrices);
  calcTax(totalSum);
  calcGrandTotal(totalSum,tax,grandTotal);
  
  listItems_array.pop();
  listQuantities_array.pop();
  listPrices_array.pop()

  console.log(listItems_array);
  console.log(document.getElementById("purchases").innerHTML)


  for (i=0; i < listItems_array.length; i++) {
    console.log("Hellow?")
    let newInfo = [];
    newInfo.push(listItems_array[i]);
    newInfo.push(listQuantities_array[i]);
    newInfo.push(listPrices_array[i]);
  }
  stackItems(newInfo);
  stackQuantity(newInfo);
  convertPrices(newInfo);
  totalTogether(totalPrices);
  calcTax(totalSum);
  calcGrandTotal(totalSum,tax,grandTotal);

}


// CLICK
track.addEventListener('click', e => {
  //what indicator was clicked on
  const targetTab = e.target.closest('button');
  // console.log(targetTab)
  if (!targetTab) return;
  const currentTab = track.querySelector('.current-tab');
  //changePics(targetTab)
  updateTabs(currentTab,targetTab);
  changeItems(targetTab,tabs);
  // console.log("hello");
})

galleryStuff.addEventListener('click', e=> {
  const clickedImage = e.target.closest('img');
  const currentTab = track.querySelector('.current-tab');

  for (i = 0; i <=36; i++) {
    if (clickedImage == arrayOfImages[i]) {
      // console.log("Works!")
      for (ii = 0; ii <=3; ii++) {
        if (currentTab == tabs[ii]) {
          const itemSlot = singleDescriptions[i-(ii*9)]
          // console.log(itemSlot)
          const arrayOfItems = Array.from(itemSlot.children);
          const previousText = document.querySelector(".showingText");
          if (previousText == null) {
            arrayOfItems[ii].classList.toggle("showingText")
          }
          else if (previousText == arrayOfItems[ii]) {
            arrayOfItems[ii].classList.toggle("showingText")
          }
          else if (previousText != arrayOfItems) {
            previousText.classList.remove("showingText");
            arrayOfItems[ii].classList.toggle("showingText");
          }
        }
      }

    }
  }
}


)




// galleryStuff.addEventListener('click', e=> {
//   const addButton = e.target.closest('button');
//   listBox.classList.remove("invisible");

//   const addedItem = addButton.parentNode;
//   const itemElements = Array.from(addedItem.children);
//   const itemName = itemElements[1]
//   const itemPrice = itemElements[2]






//   // console.log(addItemButtons[i])
//   console.log(addButton);
//   // const addedItem = addButton.parentNode;
//   console.log(addedItem);
//   // const itemElements = Array.from(addedItem.children);
//   console.log(itemElements)
//   // const itemPrice = itemElements[1];
//   console.log(itemName.innerHTML)
//   console.log(itemPrice.innerHTML)
//   // console.log(listBox);
  
//   const currentPageItems = document.querySelector(".showing")
//   console.log(currentPageItems)
//   // console.log(document.getElementById("purchases"))
//   // console.log(document.getElementById("price"[i]))
//   // console.log(addedItem,"okay")
//   // document.getElementById("purchases").innerHTML = document.getElementById("price"[i]).innerHTML;
//   const purchasedItem = document.getElementById("purchases").innerHTML = subelements[1].innerHTML
//   const purchasedItemList = []

  
// })




















































// console.log(Math.PI)



// const track = document.querySelector('.PCW_MI_tabs');
// const tabs = Array.from(track.children);
// const menu_items = document.querySelector('gallery');
// const items = Array.from(menu_items.children);

// const track = document.querySelector('.gallery');
// const tabs = Array.from(track.children);
// console.log('Me');  
// // console.log(track);
// // console.log(tabs);
// const something = document.querySelectorAll('.drink');
// console.log(something);

// const track = document.querySelector('.PCW_MI_tabs'); //element
// const tabs = Array.from(track.children); //array

// const blah = document.querySelector(".all_descriptions");
// console.log(blah);

// const allDescriptions = document.querySelector(".all_descriptions"); //element
// console.log(allDescriptions);
// const singleDescriptions = Array.from(allDescriptions.children); //array

// const arrayOfImages = document.querySelectorAll(".offering"); //array

// const galleryStuff = document.querySelector('.gallery'); //element


// const arrayForPrevious = [null];


// const addItemButtons = document.querySelectorAll(".add_item");
// console.log(addItemButtons);


// const listBox = document.querySelector("#listOfPurchases");

// const currentPageItems = document.querySelector(".showing")
// const arrayOfItems = Array.from(currentPageItems.children);
// console.log(currentPageItems,"currentPageItems")
// console.log(arrayOfItems,"arrayOfItems")
// console.log(arrayOfItems[3])
// const subelements = Array.from(arrayOfItems[3].children)
// console.log(subelements,"subelements")
// console.log(subelements[1].innerHTML)
// console.log(subelements[2].innerHTML)
// console.log(subelements[5].value)








// const updateTabs = (currentTab, targetTab) => { //WORKS
//   currentTab.classList.remove('current-tab');
//   targetTab.classList.add('current-tab');
//   const oldText = document.querySelector(".showingText");
//   if (oldText != null) {
//     oldText.classList.remove("showingText");
//   }
//   // console.log(targetTab);
//   // tabs.indexOf(targetTab);
// }

// const changeItems = (targetTab,tabs) => {
//   current_items = document.querySelector(".showing")
//   if (targetTab==tabs[0]) {
//     drinks = document.querySelector(".items_drinks")
//     current_items.classList.remove("showing");
//     drinks.classList.add("showing");
//     // console.log(drinks);
//   }
//   else if (targetTab==tabs[1]) {
//     sweets = document.querySelector(".items_sweets");
//     current_items.classList.remove("showing");
//     sweets.classList.add("showing");
//     // console.log(sweets);
//   }
//   else if (targetTab==tabs[2]) {
//     plates = document.querySelector(".items_plates");
//     current_items.classList.remove("showing");
//     plates.classList.add("showing");
//     // console.log(plates);
//   }
//   else if (targetTab==tabs[3]) {
//     entrees = document.querySelector(".items_entrees");
//     current_items.classList.remove("showing");
//     entrees.classList.add("showing");
//     // console.log(entrees);
//   }
//   }

// const showCart = () => {
//   const addButtons = document.querySelectorAll(".add_item");
//   const Cart = document.querySelector(".cart");
//   for (i = 0; i <=36; i++) {
//     addButtons[i].addEventListener('click', e=> {
//       Cart.classList.remove("invisible");
//     })
//   }
// }
 







// galleryStuff.addEventListener('click', e=> {
//   const clickedImage = e.target.closest('img');
//   const currentTab = track.querySelector('.current-tab');

//   for (i = 0; i <=36; i++) {
//     if (clickedImage == arrayOfImages[i]) {
//       console.log("Works!")
//       for (ii = 0; ii <=3; ii++) {
//         if (currentTab == tabs[ii]) {
//           const itemSlot = singleDescriptions[i-(ii*9)]
//           // console.log(itemSlot)
//           const arrayOfItems = Array.from(itemSlot.children);
//           const previousText = document.querySelector(".showingText");
//           if (previousText == null) {
//             arrayOfItems[ii].classList.toggle("showingText")
//           }
//           else if (previousText == arrayOfItems[ii]) {
//             arrayOfItems[ii].classList.toggle("showingText")
//           }
//           else if (previousText != arrayOfItems) {
//             previousText.classList.remove("showingText");
//             arrayOfItems[ii].classList.toggle("showingText");
//           }
//         }
//       }

//     }
//   }
// })





// while (true) {
//   for (i=0; i<=36; i++) {
//     addItemButtons[i].addEventListener('click', e=> {
//       const addedItem = e.target.closest('.add_item');
//       console.log(addedItem);
//     })
//   }
// }

// addItemButtons[0].addEventListener('click', e=> {
//   const addedItem = e.target.querySelectorAll('.add_item');
//   console.log(addedItem);
// })




  // for (i=0; i<=36; i++) {
    // console.log(i);

    // galleryStuff.addEventListener('click', e=> {
    //   const addButton = e.target.closest('.add_item');
    //   listBox.classList.remove("invisible");
    //   const addedItem = addButton.parentNode;
    //   const itemElements = Array.from(addedItem.children);
    //   const itemName = itemElements[1]
    //   const itemPrice = itemElements[2]






    //   // console.log(addItemButtons[i])
    //   console.log(addButton);
    //   // const addedItem = addButton.parentNode;
    //   console.log(addedItem);
    //   // const itemElements = Array.from(addedItem.children);
    //   console.log(itemElements)
    //   // const itemPrice = itemElements[1];
    //   console.log(itemName.innerHTML)
    //   console.log(itemPrice.innerHTML)
    //   // console.log(listBox);
      
    //   const currentPageItems = document.querySelector(".showing")
    //   console.log(currentPageItems)
    //   // console.log(document.getElementById("purchases"))
    //   // console.log(document.getElementById("price"[i]))
    //   // console.log(addedItem,"okay")
    //   // document.getElementById("purchases").innerHTML = document.getElementById("price"[i]).innerHTML;
    //   const purchasedItem = document.getElementById("purchases").innerHTML = subelements[1].innerHTML
    //   const purchasedItemList = []

      
    // })


    
  // }

// addItemButtons[1].addEventListener('click', e=> {
//   const addedItem = e.target.closest('.add_item');
//   console.log(addedItem);
// })

// addItemButtons[2].addEventListener('click', e=> {
//   const addedItem = e.target.closest('.add_item');
//   console.log(addedItem);
// })



// function showdescription(currentTab,tabs) {
//   if (currentTab==tabs[0]) {

//   }
//   const popup_text = document.
// }



// const changePics = (targetTab,tabs) => {
//   current = document.querySelectorAll(".current-img");
//   if (targetTab==tabs[0]) {
//     drinks = document.querySelectorAll(".drink");
//     for (i = 0; i <= 9; i++) {
//       current[i].classList.remove('current-img')
//       drinks[i].classList.add('current-img')
//     }
//   }
//   else if (targetTab==tabs[1]) {
//     sweets = document.querySelectorAll(".sweet");
//     for (i = 0; i <= 9; i++) {
//       current[i].classList.remove('current-img')
//       sweets[i].classList.add('current-img')
//     }
//   } 
//   else if (targetTab==tabs[2]) {
//     plates = document.querySelectorAll(".plate");
//     for (i = 0; i <= 9; i++) {
//       current[i].classList.remove('current-img')
//       plates[i].classList.add('current-img')
//     }
//   } 
//   else if (targetTab==tabs[3]) {
//     entrees = document.querySelectorAll(".entree");
//     for (i = 0; i <= 9; i++) {
//       current[i].classList.remove('current-img')
//       entrees[i].classList.add('current-img')
//     }
//   } 

// }


// const changePics = (targetTab)  => {
//   current = document.querySelectorAll(".current-img");
//   try{
//     targetTab.classList.remove('sweetsTab');
//     targetTab.classList.add('sweetsTab');
//     sweets = document.querySelectorAll(".sweet");
//     for (i = 0; i < current.length; i++) {
//      current[i].classList.remove('current-img')
//      sweets[i].classList.add('current-img')
//      }
//     }
//   try{
//     targetTab.classList.remove('platesTab');
//     targetTab.classList.add('platesTab');
//     plates = document.querySelectorAll(".plate");
//     for (i = 0; i < current.length; i++) {
//      current[i].classList.remove('current-img')
//      plates[i].classList.add('current-img')
//      }
//          }
//   try{
//     targetTab.classList.remove('entreesTab');
//     targetTab.classList.add('entreesTab');
//     entrees = document.querySelectorAll(".entree");
//     for (i = 0; i < current.length; i++) {
//       current[i].classList.remove('current-img')
//       entrees[i].classList.add('current-img')
//       }
//     }
//   finally{
//       targetTab.classList.remove('drinksTab');
//       targetTab.classList.add('drinksTab');
//       drinks = document.querySelectorAll(".drink");
//       for (i = 0; i < current.length; i++) {
//        current[i].classList.remove('current-img')
//        drinks[i].classList.add('current-img')
//        }
//       }
//   }



//   }
// }






// const changePics = (targetTab,tabs) => { //DOESN"T WORK
//   // console.log(currentItems)
//   var x, y, i;
  
//   current = document.querySelectorAll(".current-img");
//   drinks = document.querySelectorAll(".drink");
//   sweets = document.querySelectorAll(".sweet");
//   plates = document.querySelectorAll(".plate");
//   entree = document.querySelectorAll(".entree");
  
//   console.log(tabs[1])
//   console.log(targetTab)

//   if (tabs[1]==targetTab) {
//     console.log("WORKS")
//   }

//   for (i = 0; i < current.length; i++) {
//     // x[i].style.backgroundColor = "red";
//     // console.log(drinks[i]) //WORKS
//     current[i].classList.remove('current-img')
//     entree[i].classList.add('current-img')
//   }
//   // console.log(x)
// }



