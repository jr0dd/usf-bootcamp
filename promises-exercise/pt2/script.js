const baseUrl = 'http://deckofcardsapi.com/api/deck'
let currCard
let deckId

// 1
axios.get(`${baseUrl}/new/draw/`)
  .then(res => {
     console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
  })
  .catch(err => console.error(err))



// 2
const cards = []
axios.get(`${baseUrl}/new/draw/`)
  .then(res => {
    deckId = res.data.deck_id
    cards.push(res.data.cards[0])
  })
  .then(() => {
    axios.get(`${baseUrl}/${deckId}/draw/?count=1`)
      .then(res => {
        cards.push(res.data.cards[0])
        cards.forEach(card => console.log(`${card.value} of ${card.suit}`))
      })
  })
  .catch(err => console.error(err))

// 3
$(() => {
  axios.get(`${baseUrl}/new/shuffle/`)
    .then(res => {
      deckId = res.data.deck_id
      $('.draw').show()
    })

  $('.main').on('click', '.draw', () => {
    axios.get(`${baseUrl}/${deckId}/draw/?count=1`)
      .then(res => {
        let card = res.data.cards[0]
        $('.card-stack').append(`<img src=${card.image}>`)
        if (res.data.remaining === 0) {
          return $('.draw').remove()
        }
      })
  })
})

// console.log(deckId)