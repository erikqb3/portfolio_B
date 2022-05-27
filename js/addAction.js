export const addAction = {
  showfilterSettings: function (
    hamBtn
    ){
    hamBtn.addEventListener('click', (
      e, 
      filterSettings_void = document.getElementById('filterSettings_void'),
      filterSettings_holder = document.getElementById('filterSettings_holder'),
      dropDwn_content_array = document.querySelectorAll("ul.DDList"))=> { 
        filterSettings_void.classList.add('visible');
        filterSettings_holder.classList.add('visible');

        console.log(dropDwn_content_array)
        for (let value of dropDwn_content_array) {
          value.classList.add("flipUp_animation")
          let DDButton = value.previousElementSibling
          console.log(DDButton, "L14");
          DDButton.addEventListener('click',(e)=>{
            console.log(e.target);
            console.log(e.target.nextElementSibling);
            let DDList = e.target.nextElementSibling;
            DDList.classList.toggle("dropDown_animation");
            DDList.classList.toggle("flipUp_animation")
            if (DDList.classList.contains("dropDown_animation")) {
              DDList.style.display = "block";
              e.target.style.backgroundColor = "rgba(100,100,100,1)";
              DDList.parentElement.style.padding = "0";
              DDList.parentElement.style.margin = "1.5rem 0";
            } else {
              DDList.style.display = "none";
              e.target.style.backgroundColor = "inherit";
              DDList.parentElement.style.padding = "1.5rem 0";
              DDList.parentElement.style.margin = "0";
            }
            
          })
        }


        filterSettings_void.addEventListener('click', (e) => {
          filterSettings_void.classList.remove('visible')
        filterSettings_holder.classList.remove('visible');
        })
    })
  }
}