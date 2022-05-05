// export const establishHTML  = {
//   createTabs: function(
//     nav = essentialFunctions.generateElement('nav','tabs'),
//     ul = essentialFunctions.generateElement('ul',"tabList"),
//     tabs = ["Timer","Call Out","History"]
//   ) {
//     for (let i in tabs) {
//       let li = essentialFunctions.generateElement('li',"","",tabs[i]);
//       ul.appendChild(li);
//       li.addEventListener("click", (e)=> {
//         console.log(e.target);
//       })
//     }
//     nav.appendChild(ul);
//     document.questySelector('main').insertBefore(nav,document.querySelector('div#mainScreen'))
//   },
//   createTimer: function (
//     timer = essentialFunctions.generateElement('div',"timer"),
//     timer_display = essentialFunctions.generateElement('div',"timer_display"),
//     timer_keypad = essentialFunctions.generateElement('div',"timer_keypad"),
//     numbers = [7,8,9,4,5,6,1,2,3,0],
//     number_div = essentialFunctions.generateElement('div',"","number")
//   ) {
//     for (let i in numbers) {
//       let number_p = essentialFunctions.generateElement('p',"","",numbers[i]);
//       number_div.appendChild(number_p);
//       timer_keypad.appendChild(number_div);
//     }
//     timer = essentialFunctions.appendChildren(timer, timer_display,timer_keypad)
//     document.questySelector('main').insertBefore(timer,document.querySelector('div#mainScreen'))
//   },
//   createCallOut: function(
//     callOut = essentialFunctions.generateElement('div',"callOut"),
//     callOut_text = essentialFunctions.generateElement('p',"callOut_text")
//   ){
//     callOut.appendChild(callOut_text);
//     document.questySelector('main').insertBefore(callOut,document.querySelector('div#mainScreen'))
//   },
//   createHistory: function(
//     history = essentialFunctions.generateElement('div',"history"),
//     history_text = essentialFunctions.generateElement('p',"history_text")
//   ){
//     history.appendChild(history_text);
//     document.questySelector('main').insertBefore(history,document.querySelector('div#mainScreen'))
//   },
// }

// export const essentialFunctions = {
//   generateElement: function (
//     paramElement,
//     paramId = '',
//     paramClass = '',
//     paramText = '',
//     paramLink = ''
//   ) {
//     let element = document.createElement(paramElement);
//     element.id = paramId;
//     element.setAttribute('class', paramClass);
//     switch (paramElement) {
//       case 'img':
//         element.setAttribute('src', paramLink);
//         element.setAttribute('alt', paramId);
//         break;
//       case 'a':
//         element.setAttribute('href', paramLink);
//         break;
//       case 'input':
//         element.setAttribute('type', paramClass);
//         element.setAttribute('name', paramId);
//       case 'source':
//         element.setAttribute('src', paramLink);
//         element.setAttribute('type', paramClass);
//       default:
//         break;
//     }
//     if (paramText != '') {
//       element.innerHTML = paramText;
//     }
//     return element;
//   },
//   clearElement: function (elementStr) {
//     document.querySelector(elementStr).innerHTML = '';
//   },
//   appendChildren: function (parent, ...elementChildren) {
//     for (let i in elementChildren) {
//       parent.appendChild(elementChildren[i]);
//     }
//     return parent;
//   },
// }

// console.log("HELLOW")

// establishHTML.createTabs();
























let goodCombos = [];

haveTimer();
autoOrManual();
inputTime();
resetTimer();

function haveTimer() {
  let screenWidth = screen.width;
  let timerSection = document.getElementById("timer_sect")
  console.log(screenWidth)
  if (screenWidth >= 1200) {
    timerSection.classList.remove('hidden');
  }
}

function autoOrManual() {
  let autoButton = document.getElementById("start/pause_btn");
  let manualButton = document.getElementById("theButton");
  let pause = true;
  autoButton.addEventListener('click',e=> {
    let timerDisplay = document.getElementById('timer_display').innerHTML
    if (timerDisplay == "Count Down in Sec.") {
      alert("Input a time first")
      console.log(timerDisplay)
    }
    else {
      if (autoButton.innerHTML == "Start") {
        autoButton.innerHTML = "Pause";
        pause = false;
        manualButton.classList.add("hidden");
      }
      else if (autoButton.innerHTML == "Pause") {
        autoButton.innerHTML = "Start";
        pause = true;
        manualButton.classList.remove("hidden");
      }
      runTimer_loop(pause);
  }
  })
}

function runTimer_loop(pause) {
  
  console.log(pause)
  let timerDisplay = document.getElementById('timer_display');
  let inputTime = parseFloat(timerDisplay.innerHTML)
  let time = parseFloat(timerDisplay.innerHTML);

  console.log(time)
  let countDown = setInterval(function() {
    time=parseFloat(time-0.1).toPrecision(3);
    timerDisplay.innerHTML = time;
    // document.getElementById('timer_display').innerHTML = time;
    // console.log("milisecond")
    console.log(time)
    if (time == 0) {
      console.log(time)
      playGame();
      time=inputTime; //reset timer
      console.log("Done")
    }
  }, 100);

  // while (pause == false) {
  // }
}

function inputTime() {
  let numberButtons_array = document.getElementById("timer_keypad").children;
  let timerDisplay = document.getElementById('timer_display');
  for (i=0;i<numberButtons_array.length; i++) {
    numberButtons_array[i].addEventListener("click", e=> {
      let number = e.target.closest("div.number").innerHTML.toString();
      console.log(number)
      if (timerDisplay.innerHTML == "Count Down in Sec."){
        timerDisplay.innerHTML = number;
      }
      else {
        timerDisplay.innerHTML = timerDisplay.innerHTML + number;
      }
    })
  }

}

function resetTimer() {
  let resetButton = document.getElementById("reset_btn");
  let timerDisplay = document.getElementById('timer_display');
  let manualButton = document.getElementById("theButton");
  resetButton.addEventListener('click', e=> {
    timerDisplay.innerHTML = "Count Down in Sec."
    let autoButton = document.getElementById("start/pause_btn");
    try {
      manualButton.classList.remove('hidden')
      autoButton.innerHTML = "Start"
    }
    catch {
    }
  })
}



function playGame () {
  let testCombo = getCombo();
  let jixu = false
  let complete = false;

  if (goodCombos.length == 0) {
    document.getElementById("combo").innerHTML = testCombo;
    goodCombos.push(testCombo);
  }
  else {
    while ((!jixu) && (!complete)) {
      testCombo=getCombo();
      results = checkCombo(goodCombos,testCombo,jixu,complete);
      jixu = results[0];
      complete = results[1];
      console.log(jixu, complete)
    }
    if ((results[0] == true) && (results[1] == false)) {
      document.getElementById("combo").innerHTML = testCombo;
      goodCombos.push(testCombo);
      console.log(goodCombos)
      document.getElementById("allCombos").innerHTML = goodCombos.join('\n');
    }
    else if ((results[0] == false) && (results[1] == true)) {
      console.log("hello")
      document.getElementById("combo").innerHTML = "Black Out"
    }
    console.log(results[0], results[1], goodCombos.length);
    // goodCombos.forEach(checkCombo);
  }
}



function getCombo () {
  let letters = ["A","B","C","D","E"];
  let theColumn = letters[Math.floor(Math.random() * 5)] // range is A - E
  let theRow = Math.floor(Math.random() * 5) + 1 //range is 1 - 5
  let combo = theColumn + theRow;
  // document.getElementById("combo").innerHTML = combo;
  return combo;
}

function checkCombo (goodCombos,testCombo,jixu, complete) {
  let results = [];
  let strikes = 0;
  console.log(testCombo);
  for (i=0; i<goodCombos.length; i++) {
    if (testCombo == goodCombos[i]) {
      strikes += 1;
      console.log(strikes, goodCombos.length);
    }
  }
  if (strikes > 0) {
    jixu = false;
  }
  else {
    jixu = true;
  }


  if (goodCombos.length == 25) {
    complete=true;
  }

  results.push(jixu);
  results.push(complete);
  return results;

}





let button = document.getElementById("theButton").addEventListener("click",playGame)