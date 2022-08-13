const favNum = 42
const favNums = [12, 27, 42]
const baseUrl = 'http://numbersapi.com'

// 1
axios.get(`${baseUrl}/${favNum}?json`)
  .then(res => console.log(res.data.text))

// 2
$(() => {
  const query = axios.get(`${baseUrl}/${favNums}?json`)
  query
    .then(res => {
      for (const val of Object.values(res.data)) {
        $('#num-list').append(`<li>${val}(</li>`)
      }
    })
    .catch(err => console.error(err))
})

// 3
$(() => {
  Promise.all(
    Array.from({ length: 4 }, () => {
      return axios.get(`${baseUrl}/${favNum}?json`)
    })
  ).then(ele => {
    ele.forEach(res => $('#fav-list').append(`<li>${res.data.text}</li>`))
  })
    .catch(err => console.error(err))
})