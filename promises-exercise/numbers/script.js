const favNum = 42
const favNums = [12, 27, 42]
const baseUrl = 'http://numbersapi.com/'

axios.get(`${baseUrl + favNum}?json`)
  .then(data => console.log(data.data.text))

$(() => {
  const query = axios.get(`${baseUrl + favNums}?json`)
  query
    .then(item => {
      for (const val of Object.values(item.data)) {
        $('#num-list').append(`<li>${val}(</li>`)
      }
    })
    .catch(err => console.error(err))
})

$(() => {
  Promise.all(
    Array.from({ length: 4 }, () => {
      return axios.get(`${baseUrl + favNum}?json`)
    })
  ).then(ele => {
    ele.forEach(item => $('#fav-list').append(`<li>${item.data.text}</li>`))
  })
    .catch(err => console.error(err))
})