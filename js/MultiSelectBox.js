const selectBoxTitles = document.querySelectorAll('.select-box-title')

const toggleList = (selectBoxTitle, selectBoxList) => {

} 

selectBoxTitles.forEach(el => {
  const selectBoxList = document.querySelector(`ul#${el.id}`)
  let options = ['Hentai', 'Seinen', 'Echi'] // Use API call instead
  const selectedOptions = []

  options.forEach(value => {
    const li = document.createElement('li')
    li.innerText = value
    li.addEventListener('click', () => {
      li.classList.toggle('active')
      li.classList.contains('active')
        ? selectedOptions.push(li.innerText) 
        : selectedOptions.splice(selectedOptions.indexOf(li.innerText), 1)
      console.log('Selected options in ', el.id, selectedOptions)
    })
    selectBoxList.appendChild(li)
    return li
  })

  el.addEventListener('click', () => {
    el.classList.toggle('open')
    selectBoxList.classList.toggle('open')
  })
})




