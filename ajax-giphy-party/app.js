$(() => {
  $('#search-form').on('submit', async (e) => {
    e.preventDefault()

    const imgUrl = await giphySearch($('#query').val())

    //create gif
    $('#gif-container').prepend(`
      <div class="gif">
        <img src=${imgUrl}></img>
      </div>
    `)
  
    $('#search-form').trigger('reset')
    $('#query').trigger('focus')
  })

  $('#remove').on('click', () => {
    $('#gif-container').empty()
  })
})

const giphySearch = async (str) => {
  try {
    const res = await axios.get("http://api.giphy.com/v1/gifs/search", {
      params: {
        q: str,
        api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'
      }
    })
    const count = res.data.data.length
    const idx = Math.floor(Math.random() * count)
    return res.data.data[idx].images.original.url
  } catch (err) {
    console.error(err)
  }
}
