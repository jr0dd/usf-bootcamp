// 1
const containerNoQuery = document.getElementById('container')
console.log(containerNoQuery)

// 2
const containerQuery = document.querySelector('#container')
console.log(containerQuery)

// 3
const secondClass = document.querySelectorAll('.second')
console.log(secondClass)

// 4
const thirdClass = document.querySelector('ol.third')
console.log(thirdClass)

// 5
// const section = document.querySelector('#container')
// section.innerHTML = 'Hello'
// console.log(section)

// 6
const classMain = document.querySelector('div.footer')
classMain.classList.add('main')

// 7
classMain.classList.remove('main')
console.log(classMain.classList)

// 8
const li = document.createElement('li')

// 9
li.innerHTML = 'four'
console.log(li)

// 10
const ul = document.querySelector('ul')
ul.appendChild(li)

// 11
const olList = document.querySelectorAll('ol li')
for (const li of olList) {
    li.style.backgroundColor = 'green'
}

// 12
document.querySelector('div.footer').remove()