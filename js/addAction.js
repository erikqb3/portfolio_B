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
        filterSettings_void.addEventListener('click', (e) => {
          filterSettings_void.classList.remove('visible')
        filterSettings_holder.classList.remove('visible');
        })
    })
  }
}