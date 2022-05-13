export const addAction = {
  showfilterSettings: function (
    hamBtn
    ){
    hamBtn.addEventListener('click', (
      e, 
      filterSettings_void = document.getElementById('filterSettings_void'),
      filterSettings_holder = document.getElementById('filterSettings_holder'))=> { 
        filterSettings_void.classList.add('visible')
        filterSettings_holder.classList.add('visible');

        let dropDwn_content_array = document.querySelectorAll("ul.DDList");
        console.log(dropDwn_content_array)
        for (let value of dropDwn_content_array) {
          value.classList.add("flipUp_animation")
          let DDButton = value.previousElementSibling
          console.log(DDButton, "L14");
          DDButton.addEventListener('click',(e)=>{
            console.log(e.target);
            console.log(e.target.nextElementSibling);
            // e.target.nextElementSibling.style.display = "block";
            e.target.nextElementSibling.classList.toggle("dropDown_animation");
            e.target.nextElementSibling.classList.toggle("flipUp_animation")
          })
        }



        filterSettings_void.addEventListener('click', (e) => {
          filterSettings_void.classList.remove('visible')
        filterSettings_holder.classList.remove('visible');
        })
    })
  }
}