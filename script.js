const name = document.querySelector('#name')
const sort = document.querySelector('#sort')
const btn = document.querySelector('#button')
const displayNames = document.querySelector('#displayNames')

let arrName = JSON.parse(localStorage.getItem('localList')) 
const showNames = () => {
    if (arrName) {
        arrName.forEach(({ name }, i) => {
            displayNames.innerHTML += `${i + 1} : ${name}`
        })
    }
}
function byField(field) {
    return(a, b) => a[field] > b[field] ? 1 : -1;
}
sort.addEventListener('click', (event) => {
    event.preventDefault()
    if (event.target.datasetId == 1) {
        arrName.sort(byField('name'))
        event.target.datasetId = 2
    } else {
        arrName.sort(byField('name'))
        event.target.datasetId = 1
    }
    displayNames.innerHTML = ''
    arrName.forEach(({ name }, i) => {
        displayNames.innerHTML += `${i + 1} : ${name}`
    }) 
})
btn.addEventListener('click', (event) => {
    event.preventDefault()
    let nameValue = name.value.toLowerCase().trim()
    if (nameValue) {
        if (!arrName) {
            arrName = []
        }
        let obj = { name:nameValue }
        const { name } = obj 
        arrName.push(obj)
        localStorage.setItem('localList', JSON.stringify(arrName))
        name.value = ''
        displayNames.innerHTML = ''
        showNames()
    } else {
        alert('name must to be completed')
    }
})
showNames()