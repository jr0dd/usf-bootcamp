let movies = []

const createRow = (movie) => {
  return `
    <tr>
      <td class="title">${movie.title}</td>
      <td class="rating">${movie.rating}</td>
      <td>
        <button class="remove">remove</button>
      </td>
    </tr>
    `
}

const sortTable = (arr, key, order) => {
  return arr.sort((a, b) => {
    if (a[key] > b[key]) {
      return order === 'asc' ? 1 : -1
    }
    if (a[key] < b[key]) {
      return order === 'asc' ? -1 : 1
    }
    return 0
  })
}

$(() => {
  $('#rating-form').on('submit', (e) => {
    e.preventDefault()

    const title = $('#title-input').val()
    const rating = parseInt($('#rating-input').val())
    const movieObj = { title, rating }
    const html = createRow(movieObj)
    movies.push(movieObj)

    $('#tbody').append(html)
    $('#rating-form').trigger('reset')
    $('#title-input').trigger('focus')
    $('.sort').removeClass('desc').addClass('asc')
  })

  $('#tbody').on('click', '.remove', (e) => {
    const title = $(e.target).closest('tr').find('.title').text()
    movies = movies.filter(movie => movie.title !== title)

    $(e.target).closest('tr').remove()
  })

  $('thead').on('click', '.sort', (e) => {
    const order = $(e.target).hasClass('asc') ? 'desc' : 'asc'
    const key = $(e.target).attr('id')
    const sorted = sortTable(movies, key, order)

    $('#tbody').empty()
    for (const movie of sorted) {
      const html = createRow(movie)
      $('#tbody').append(html)
    }

    $(e.target).toggleClass('asc')
    $(e.target).toggleClass('desc')
  })
})
