import { menuDatabase } from "../JS/database.js"


const establishHTML = {
  NAV: function(tabList,
    tabArray = ["Drinks","Sweets","Small Plates","Entrées"],
    navHolder = this.generateElement('div',"navHolder")
  ){
   
    if (window.innerWidth < 1200) {
      tabList = this.generateElement('select',"tabList");
      for (let tab in tabArray) {
        let option = this.generateElement('option',`${tabArray[tab]}`,"navtab",`${tabArray[tab]}`)
        if (tabArray[tab] == "Drinks") {
          option.classList.add("current-tab") //DEFAULT TAB
        }
        tabList.appendChild(option);
      }
      tabList.addEventListener('change', (e)=> {
        myEvents.changeCurrentTab(e);
      })
    }
    else {
      tabList = this.generateElement('div',"tabList","PCM_MI_tab");
      for (let tab in tabArray) {
        let button = this.generateElement('button',`${tabArray[tab]}`,"navtab",`${tabArray[tab]}`)
        button.addEventListener('click',(e)=>{
          myEvents.changeCurrentTab(e);
        })
        if (tabArray[tab] == "Drinks") {
          button.classList.add("current-tab") //DEFAULT TAB
        }
        tabList.appendChild(button);
      }
    } 
    // console.log(document.querySelector(".main_stuff"))
    console.log(tabList)
    navHolder.appendChild(tabList);
    document.querySelector("main").appendChild(navHolder);
  },
  CART: function(
    cart = this.generateElement('div',"cart"),
    cartItems = this.generateElement('table',"cartItems"),
    headers = this.generateElement('tr', "headers"),
    headersArray = ["Item","Quantity","Price","Delete"],
    closeBtn = this.generateElement('button',"closeBtn","","X"),
    buyBtn = this.generateElement('button',"buyBtn","","Buy"),
    totalsHolder = this.generateElement('table',"totalsInfo"),
    subTotal = 0
  ){
    closeBtn.addEventListener('click', (e)=> {
      document.getElementById('cart').remove();
    });
    buyBtn.addEventListener('click', (e)=> {
      cartFunctions.buyBtn();
    })
    for (let i in headersArray) {
      // console.log(headersArray[i]);
      let header = this.generateElement('th',"","",`${headersArray[i]}`);
      headers.appendChild(header);
    }
    cartItems.appendChild(headers);

    let PCMcart = JSON.parse(localStorage.PCMcart);

    for (let i in PCMcart) {
      let tr = establishHTML.generateElement('tr');
      let td;
      for (let ii in PCMcart[i]) {
        if (ii != "id") {
          console.log(ii)
          // if (ii == "Qty") {
          //   console.log("Quantity!!!")
          //   let td_input = establishHTML.generateElement('input',"","number",`${PCMcart[i][ii]}`);
          //   td = establishHTML.generateElement('td',"","",`${td_input}`);
          // }
          if (ii == "CalcPrice") {
           td = establishHTML.generateElement('td',"","",`$${PCMcart[i][ii]}`);
           subTotal += Number(PCMcart[i][ii]);
          }
          else {
           td = establishHTML.generateElement('td',"","",PCMcart[i][ii]);
          }
          tr.appendChild(td);
        }
      }
      let cancelBtn = establishHTML.generateElement('td',"","cancelBtn","X");
      cancelBtn.addEventListener('click',(e)=>{
        cartFunctions.removeFromCart(e);
      })
      tr.appendChild(cancelBtn);
      cartItems.appendChild(tr);
      
    }
    // console.log(tr)

    let totalsInfo = [
      ["Subtotal",`$${subTotal.toFixed(2)}`],
      ["Tax",`$${(subTotal*0.06).toFixed(2)}`],
      ["Total",`$${(subTotal + (subTotal*0.06)).toFixed(2)}`]
    ]
    for (let ii in totalsInfo) {
      let row = this.generateElement('tr');
      let label = this.generateElement('td',"","",totalsInfo[ii][0]);
      let value = this.generateElement('td',`${totalsInfo[ii][0]}_value`,"",`${totalsInfo[ii][1]}`)
      row = this.appendChildren(row, label,value);
      totalsHolder.appendChild(row);
    }
    // cart.appendChild(totalsHolder);
    cart = this.appendChildren(cart, closeBtn,cartItems,totalsHolder,buyBtn)

    document.querySelector("main").appendChild(cart);


    // if (window.innerWidth < 500) {

    // }
    // else{}
  },

  DISPLAY: function(
    currentTab = document.querySelector(".current-tab"),
    display_holder = this.generateElement('div',"display_holder")
  ){
    

    switch(currentTab.id) {
      case "Drinks":
        let drinksArray = menuDatabase[0].drinks;
        for (let i=0; i<drinksArray.length;i++) {
          if (drinksArray != "Null") {
            display_holder.appendChild(this.MENUITEM(drinksArray[i]));
          }
        }
        break;
      case "Sweets":
        let sweetsArray = menuDatabase[1].sweets;
        for (let i=0; i<sweetsArray.length;i++) {
          if (sweetsArray[i].name != "Null"){
            display_holder.appendChild(this.MENUITEM(sweetsArray[i]));
          }
        }
        break;
      case "Small Plates":
        let platesArray = menuDatabase[2].plates;
        for (let i=0; i<platesArray.length;i++) {
          if (platesArray[i].name != "Null") {
            display_holder.appendChild(this.MENUITEM(platesArray[i]));
          }
        }
        break;
      case "Entrées":
        let entreesArray = menuDatabase[3].entrées;
        for (let i=0; i<entreesArray.length;i++) {
          if (entreesArray[i].name != "Null") {
            display_holder.appendChild(this.MENUITEM(entreesArray[i]));
          }
        }
        break;
    }
    document.querySelector("main").appendChild(display_holder);

  },
  MENUITEM: function(itemInfo_array,
    card = this.generateElement('div',`${itemInfo_array.name}`,"card"),
    itemImg = this.generateElement('img',`${itemInfo_array.name}_img`,"","",`${itemInfo_array.imgLink}`),

    itemStats_holder = this.generateElement('div',"","itemStats"),
    itemPrice = this.generateElement('p',"","",`$${itemInfo_array.price}`),
    itemRating = this.generateElement('p',"","rating",`${itemInfo_array.rating}`),
    itemCal = this.generateElement('p',"","",`Cal. ${itemInfo_array.cal}`),

    quantityInfo = this.generateElement('div',"","quantityInfo"),
    inputLabel = this.generateElement('label',"","","Qty."),
    pricing = this.generateElement('p',"","","$0"),
    input = this.generateElement('input',"","number","0"),
    addBtn = this.generateElement('button',"","submitBtn","Add to Cart")
    ){

    itemImg.addEventListener('click', (e) => {
      console.log(itemInfo_array.name);
    })
    

    itemStats_holder = this.appendChildren(itemStats_holder, itemPrice,itemCal),
    input.addEventListener('change', (e)=> {
      pricing.innerHTML = (`$${(e.target.value * itemInfo_array.price).toFixed(2)}`)
    })
    this.specialElements(input);
    quantityInfo = this.appendChildren(quantityInfo, inputLabel,input,pricing);

    
    this.specialElements(addBtn);
    
    addBtn.addEventListener('click',(e)=>{

      cartFunctions.createCartBtn(e);
      // console.log("hellow")
      cartFunctions.addToCart(e);
    })


    
    card = this.appendChildren(card, itemImg,itemRating,itemStats_holder,quantityInfo,addBtn);
    // console.log(card)
    return(card)
  },

  generateElement: function(paramElement,
    paramId="",
    paramClass="",
    paramText="",
    paramLink="", 
    element = document.createElement(paramElement)
  ){
    element.id = paramId;
    element.setAttribute('class',paramClass);
    switch (paramElement) {
      case 'img':
        element.setAttribute('src',paramLink);
        element.setAttribute('alt',paramId);
        break;
      case 'a':
        element.setAttribute('href',paramLink);
        break;
      case 'input':
        element.setAttribute('type',paramClass);
        element.setAttribute('name',paramId);
      case 'source':
        element.setAttribute('src',paramLink);
        element.setAttribute('type',paramClass);
      default:
        break;
    }
    if (paramText != "") {
      element.innerHTML = paramText;
    }
    return element;
  },
  specialElements: function(element){
    switch (element.classList.value) {
      case 'number':
        // element.setAttribute('default',0);
        element.setAttribute('min',0);
        // console.log(element);
        break;
      case 'submitBtn':
        // console.log(element);
        break;
    }
  },
  clearElement: function(elementStr){
    document.querySelector(elementStr).innerHTML = "";
  },
  appendChildren: function(parent, ...elementChildren){
    for (let i in elementChildren) {
      parent.appendChild(elementChildren[i]);
    }
    return parent;
  },
};


const myEvents = {
  changeCurrentTab: function (e){
    if (window.innerWidth < 1200) {
      document.querySelector('.current-tab').classList.remove('current-tab');
      document.getElementById(`${e.target.value}`).classList.add('current-tab');
      document.getElementById('display_holder').remove();
    }
    else {
      document.querySelector('.current-tab').classList.remove('current-tab');
      e.target.classList.add('current-tab');
      document.getElementById('display_holder').remove();
    }
    establishHTML.DISPLAY();
  },
  changeTabList: function(e){
    console.log("Hellow")
  }
}


const descriptionFunctions = {};

const cartFunctions = {
  createCartBtn: function (e, 
    cartBtn = establishHTML.generateElement('button',"cartBtn","","Cart"))
    {
    if ((!localStorage.getItem('PCMcart'))) {
      // localStorage.removeItem('PCMcart');
      console.log("HI")
      localStorage.setItem('PCMcart',JSON.stringify([]));
    }
  
    if (!(document.getElementById('cartBtn'))) {
      if (!(document.querySelector('div#tabList'))){
        document.querySelector('#navHolder').appendChild(cartBtn);
        document.getElementById("tabList").style.marginRight = "1rem";
      }
      else {
        document.querySelector('div#tabList').appendChild(cartBtn);
        cartBtn.classList.add("specialBtn");
        let allButtons = document.querySelectorAll('div#tabList > button')
        for (let i in allButtons) {
          try {
            allButtons[i].style.width = "12.5rem";
            // allButtons[i].style.backgroundColor = "red";
          }
          catch(err) {
          }
        }
      }
    }
    cartBtn.addEventListener('click',(e)=>{
      establishHTML.CART();
    })
  },
  addToCart: function(e){
    let cartArray = JSON.parse(localStorage.PCMcart);
    let card = e.target.parentElement;
    let card_children = card.children
    let purchase = {
      "id":cartArray.length,
      "Name":card.id,
      "Qty":card_children[3].children[1].value,
      "CalcPrice":card_children[3].children[2].innerHTML.substring(1,card_children[3].children[2].innerHTML.length)
    }
    let clear = 0;
    if (purchase.Qty != 0) {
      for (let i in cartArray) {
        if (cartArray[i].Name == purchase.Name){
          clear++;
        }
      }
      if (clear>0){
        for (let ii in cartArray) {
          if (cartArray[ii].Name == purchase.Name){
            cartArray[ii].Qty = Number(cartArray[ii].Qty) + Number(purchase.Qty);
            cartArray[ii].CalcPrice = Number(cartArray[ii].CalcPrice) + Number(purchase.CalcPrice);
          }
        }
      }
      else {
        cartArray.push(purchase);
      }
      console.log(clear)
      localStorage.setItem("PCMcart",JSON.stringify(cartArray))
    }
    else {
      alert("Input a Qty greater that Zero")
    }
  },
  buyBtn: function(e){
    document.getElementById("tabList").style.margin = "0 auto";
    document.getElementById('cart').remove();
    document.getElementById('cartBtn').remove();
    localStorage.removeItem("PCMcart");
    alert("Thank you for your purchase!")
  },
  calculateTotals: function(){},
  removeFromCart: function(e){
    e.target.parentElement.remove();
    let itemName = e.target.parentElement.children[0].innerHTML;
    let cartArray = JSON.parse(localStorage.PCMcart);
    for (let i in cartArray) {
      console.log(cartArray[i].Name);
      console.log(Number(i))
      if (cartArray[i].Name == itemName) {
        console.log("SPLICED")
        cartArray.splice(i,1);
        localStorage.setItem('PCMcart',JSON.stringify(cartArray));
      }
    }
   this.recalcTotals(e)
  },
  recalcTotals: function(e){
    let deletedPrice = Number(e.target.parentElement.children[2].innerHTML.substring(1,e.target.parentElement.children[2].innerHTML.length));
    let subTotal = Number(document.getElementById("Subtotal_value").innerHTML.substring(1,document.getElementById("Subtotal_value").innerHTML.length));
  
    let subTotal_new = Number((subTotal-deletedPrice).toFixed(2));
    let tax_new = Number((subTotal_new*0.06).toFixed(2));
    let total_new = Number((subTotal_new + tax_new).toFixed(2));

    document.getElementById("Subtotal_value").innerHTML = `$${subTotal_new}`;
    document.getElementById("Tax_value").innerHTML = `$${tax_new}`;
    document.getElementById("Total_value").innerHTML = `$${total_new}`;

    if (document.getElementById("Total_value").innerHTML == "$0") {
      document.querySelector('div#cart').remove();
    }

  }
};


function main() {
  establishHTML.NAV();
  establishHTML.DISPLAY();
}

localStorage.removeItem("PCMcart");
// console.log(window.screen);
// window.screen.addEventListener('change',(e)=>{
//   console.log(e.target)
// })
// window.innerWidth.addEventListener('change',(e)=>{
//   console.log
// })
main();