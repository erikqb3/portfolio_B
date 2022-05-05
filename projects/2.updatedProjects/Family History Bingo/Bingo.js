export const establishHTML  = {
  createTabs: function(
    nav = essentialFunctions.generateElement('nav','tabs'),
    ul = essentialFunctions.generateElement('ul',"tabList"),
    tabs = ["Timer","Call Out","History"]
  ) {
    for (let i in tabs) {
      let li = essentialFunctions.generateElement('li',"","",tabs[i]);
      ul.appendChild(li);
      li.addEventListener("click", (e)=> {
        console.log(e.target);
        essentialFunctions.clearElement("div#mainScreen");
        switch(e.target.textContent) {
          case "Timer":
            this.createTimer();
            break;
          case "Call Out":
            this.createCallOut();
            break;
          case "History":
            this.createHistory();
            break;
        }
      })
    }
    nav.appendChild(ul);
    document.querySelector('main').insertBefore(nav,document.querySelector('div#mainScreen'))
  },
  createTimer: function (
    timer = essentialFunctions.generateElement('div',"timer"),
    timer_display = essentialFunctions.generateElement('div',"timer_display","","Count Down in Sec."),
    timer_keypad = essentialFunctions.generateElement('div',"timer_keypad"),
    numbers = [7,8,9,4,5,6,1,2,3,0]
  ) {
    for (let i in numbers) {
      let number_p = essentialFunctions.generateElement('p',"","",numbers[i].toString());
      let number_div = essentialFunctions.generateElement('div',"","number")
      number_div.appendChild(number_p);
      timer_keypad.appendChild(number_div);
    }
    timer = essentialFunctions.appendChildren(timer, timer_display,timer_keypad)
    document.querySelector('div#mainScreen').appendChild(timer);
    // document.querySelector('main').insertBefore(timer,document.querySelector('div#btnHolder'))
  },
  createCallOut: function(
    callOut = essentialFunctions.generateElement('div',"callOut"),
    callOut_text = essentialFunctions.generateElement('p',"callOut_text")
  ){
    callOut.appendChild(callOut_text);
    document.querySelector('div#mainScreen').appendChild(callOut);
    // document.querySelector('main').insertBefore(callOut,document.querySelector('div#btnHolder'))
  },
  createHistory: function(
    history = essentialFunctions.generateElement('div',"history"),
    history_text = essentialFunctions.generateElement('p',"history_text")
  ){
    history.appendChild(history_text);
    document.querySelector('div#mainScreen').appendChild(history);
    // document.querySelector('main').insertBefore(history,document.querySelector('div#btnHolder'))
  },
}

export const essentialFunctions = {
  generateElement: function (
    paramElement,
    paramId = '',
    paramClass = '',
    paramText = '',
    paramLink = ''
  ) {
    let element = document.createElement(paramElement);
    element.id = paramId;
    element.setAttribute('class', paramClass);
    switch (paramElement) {
      case 'img':
        element.setAttribute('src', paramLink);
        element.setAttribute('alt', paramId);
        break;
      case 'a':
        element.setAttribute('href', paramLink);
        break;
      case 'input':
        element.setAttribute('type', paramClass);
        element.setAttribute('name', paramId);
      case 'source':
        element.setAttribute('src', paramLink);
        element.setAttribute('type', paramClass);
      default:
        break;
    }
    if (paramText != '') {
      element.innerHTML = paramText;
    }
    return element;
  },
  clearElement: function (targetStr) {
    document.querySelector(targetStr).innerHTML = '';
  },
  appendChildren: function (parent, ...elementChildren) {
    for (let i in elementChildren) {
      parent.appendChild(elementChildren[i]);
    }
    return parent;
  },
}


establishHTML.createTabs();


