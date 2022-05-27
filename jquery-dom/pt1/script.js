// 1
$(() => {
  console.log('Let\’s get ready to party with jQuery!')
})

// 2
$('article img').addClass('image-center')

// 3
$('article p').last().remove()

// 4
$('#title').css('font-size', (Math.random() * 100) + 'px')

// 5
$('ol').append('<li>my fancy jquery li</li>')

// 6
$('aside').empty().append('<p>i apologize for the list\'s existence</p>')

// 7
$('.form-control').on('change', () => {
  const red = $('.form-control').eq(0).val()
  const blue = $('.form-control').eq(2).val()
  const green = $('.form-control').eq(1).val()
  $('body').css('background-color', `rgb(${red}, ${blue}, ${green})`)
})

// 8
$('img').on('click', (e) => {
  $(e.target).remove()
})