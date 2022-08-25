import { establishHTML } from "../js/establishHTML.js";
import { addAction } from '../js/addAction.js';


function startup() {
  establishHTML.header();
  establishHTML.hero();
  establishHTML.filterDropDowns()
  establishHTML.mainContent();
  addAction.fixedheader();

  // console.log(document.getElementById("filterSettings_void"))
  // establishHTML.footer();
}

// function loopTruDisplayCase(){}
// function pullJSONData(){}
// function createLinkBox(){}
// function viewDescription(){}

startup();