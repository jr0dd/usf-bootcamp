const url = 'http://127.0.0.1:5000/api'

const htmlTemplate = (cupcake) => {
  return `
    <div class="c-wrapper" id=${cupcake.id}>
      <img class="avatar-md" src=${cupcake.image} alt=${cupcake.flavor}>
      <li>
        <span class="c-name">${cupcake.flavor}</span>
        <span>${cupcake.size}</span>
        <br>
        <small><i>Rating: ${cupcake.rating}</i><small>
      </li>
      <button class="delete">Delete</button>
    </div>
    `
}

const showList = async () => {
  const res = await axios.get(`${url}/cupcakes`)
  res.data.cupcakes.forEach(cupcake => {
    $('.c-list').append(htmlTemplate(cupcake))
  })
}

$('.c-form').on('submit', async (evt) => {
  evt.preventDefault()

  const cupcakeObj = {
    flavor: $('#flavor').val(),
    size: $('#size').val(),
    rating: $('#rating').val(),
    image: $('#image').val()
  }

  console.log(cupcakeObj)
  const res = await axios.post(`${url}/cupcakes`, cupcakeObj)
  $('.c-list').append(htmlTemplate(res.data.cupcake))
  $('.c-form').trigger('reset')
})

$('.c-list').on('click', '.delete', async (evt) => {
  evt.preventDefault()

  const $cupcake = $(evt.target).closest('div')
  const id = $cupcake.attr('id')
  await axios.delete(`${url}/cupcakes/${id}`)
  $cupcake.remove()
})

showList()
