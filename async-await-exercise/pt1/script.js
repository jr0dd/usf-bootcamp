const favNum = 42
const favNums = [12, 27, 42]
const baseUrl = 'http://numbersapi.com'

// 1
const getFact = async () => {
  try {
    const res = await axios.get(`${baseUrl}/${favNum}?json`)
    console.log(res.data.text)
  } catch (err) {
    console.error(err)
  }
}

// 2
$( async () => {
  try {
    const res = await axios.get(`${baseUrl}/${favNums}?json`)
    for (const val of Object.values(res.data)) {
      $('#num-list').append(`<li>${val}</li>`)
    }
  } catch (err) {
    console.error(err)
  }
})

// 3
$( async () => {
  const urls = Array.from({ length: 4 }, () => `${baseUrl}/${favNum}?json`)
  for (const url of urls) {
    try {
      const res = await axios.get(url)
      $('#fav-list').append(`<li>${res.data.text}</li>`)      
    } catch (err) {
      console.error(err)
    }
  }
})
