/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
const searchShows = async (query) => {
  const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`)
  const shows = []
  res.data.forEach(show => {
    shows.push(
      {
        id: show.show.id,
        name: show.show.name,
        summary: show.show.summary,
        image: (!show.show.image ? 'https://tinyurl.com/tv-missing' : show.show.image.medium)
      }
    )
  })
  return shows
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

const populateShows = (shows) => {
  const $showsList = $('#shows-list')
  $showsList.empty()

  shows.forEach(show => {
    const $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         <img class="card-img-top" src="${show.image}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
           <button class="btn btn-primary episodes" data-toggle="modal" data-target="#Episodes">Episodes</button>
         </div>
       </div>
      `)

    $showsList.append($item)
  })
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */
$('#search-form').on('submit', async function handleSearch (evt) {
  evt.preventDefault()

  const query = $('#search-query').val()
  if (!query) return

  const shows = await searchShows(query)

  populateShows(shows)
})

// get all the episodes of a show
const getEpisodes = async (id) => {
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
  const episodes = []
  res.data.forEach(episode => {
    episodes.push(
      {
        id: episode.id,
        name: episode.name,
        season: episode.season,
        number: episode.number
      }
    )
  })
  return episodes
}

// populate episodes list
const populateEpisodes = (episodes) => {
  const $episodesList = $('#episodes-list')
  // make sure list is empty
  $episodesList.empty()

  // append a list item for each episode
  episodes.forEach(episode => {
    const $item = $(
      `<li data-episode-id="${episode.id}">
        S${episode.season}E${episode.number} - ${episode.name}
      </li>
      `)
    $episodesList.append($item)
  })
  // remove bullets
  $episodesList.css('list-style-type', 'none')
  $episodesList.css('padding-left', '0')
}

// handle getting the episodes and populating the list
$('#shows-list').on('click', '.episodes', async function handleEpisodes (evt) {
  // get the show id 
  const show = $(evt.target).closest('.Show').data('showId')

  // get episodes for the show
  const episodes = await getEpisodes(show)
  populateEpisodes(episodes)

  $('#Episodes').modal('show')
})

// handle closing of the modal
$('#Episodes').on('click', () => {
  $('#Episodes').modal('hide')
})