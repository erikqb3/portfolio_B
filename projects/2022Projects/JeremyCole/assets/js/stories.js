// const establishHTML={test:function(){console.log("export/import connection works :P")},header:function(){},hero:function(){},progress:function(){},bookList:function(){}},helperFunctions={generateElement:function(e,t="",r="",n="",o=""){let c=document.createElement(e);switch(c.id=t,c.setAttribute("class",r),e){case"img":c.setAttribute("src",o),c.setAttribute("alt",t);break;case"a":c.setAttribute("href",o);break;case"input":c.setAttribute("type",r),c.setAttribute("name",t);case"source":c.setAttribute("src",o),c.setAttribute("type",r)}return""!=n&&(c.innerHTML=n),c},clearElement:function(e){document.querySelector(e).innerHTML=""},appendChildren:function(e,...t){for(let r in t)e.appendChild(t[r]);return e},lazyLoading:function(){let e=document.querySelectorAll("img[data-src");const t=e=>{console.log("Img Loaded"),e.setAttribute("src",e.getAttribute("data-src")),e.onload=()=>{e.removeAttribute("data-src")}};if("IntersectionObserver"in window){const r=new IntersectionObserver(((e,r)=>{e.forEach((e=>{e.isIntersecting&&(t(e.target),r.unobserve(e.target))}))}),{threshold:0,rootMargin:"0px 0px -50px 0px"});e.forEach((e=>{r.observe(e)}))}else e.forEach((e=>{t(e)}))}};function carousel(e=document.querySelectorAll("article.even"),t=document.querySelectorAll("article.odd")){console.log(e);for(let t of e)console.log(t.children[0]),t.children[0].style.padding="0px"}console.log("Hellow Honest");

console.log("hello honest")


// let url = window.location.href;
// let seriesID_pos = parseFloat(url.search('seriesID'))
// let seriesID_value = url.substring(seriesID_pos+9, seriesID_pos+10)
// let storyID_pos = parseFloat(url.search('storyID'))
// let storyID_value = url.substring(storyID_pos+8, storyID_pos+10)
// console.log(storyID_value)

// console.log(window.location.href)

async function getMyJSON() {
    let jsonPath = "assets/js/stories.json"
    // let data = await fetch(jsonPath)
    //     .then(response => response.json())
    //     // .then(console.log("HELLOW HONEST"))
    //     // .then(useData)
    // return data;
    // console.log(data);
    
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {console.log(data)})
}

getMyJSON();



function useData(){
    console.log("HELLOW")
    // console.log(jsonData)
}
