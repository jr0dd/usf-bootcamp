const baseUrl = 'http://deckofcardsapi.com/api/deck'
let currCard
let deckId

// 1
const shuffDrawOne = async () => {
  try {
    const res = await axios.get(`${baseUrl}/new/draw/`)
    console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
  } catch (err) {
    console.error(err)
  }
}

// 2
const shuffDrawTwo = async () => {
  const cards = []
  try {
    const c1 = await axios.get(`${baseUrl}/new/draw/`)
    deckId = c1.data.deck_id
    cards.push(c1.data.cards[0])
    const c2 = await axios.get(`${baseUrl}/${deckId}/draw/?count=1`)   
    cards.push(c2.data.cards[0])
  } catch (err) {
    console.error(err)
  }
  cards.forEach(card => console.log(`${card.value} of ${card.suit}`))
}

// 3
$( async () => {
  try {
    const res = await axios.get(`${baseUrl}/new/shuffle/`)
    deckId = res.data.deck_id
    $('.draw').show()
  } catch (err) {
    console.error(err)
  }


  $('.main').on('click', '.draw', async () => {
    try {
      const res = await axios.get(`${baseUrl}/${deckId}/draw/?count=1`)
      const card = res.data.cards[0]   
      $('.card-stack').append(`<img src=${card.image}>`)
      if (res.data.remaining === 0) {
        $('.draw').remove()
        $('h1').text('Reached end of deck')
      }
    } catch (err) {
      console.error(err)
    }
  })
})
