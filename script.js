'use strict'

const API_URL =
  'https://api.themoviedb.org/3/discover/movie?api_key=4197ebd91940cdbeadaa87325da15fd0&sort_by=popularity.desc&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_PATH =
  'https://api.themoviedb.org/3/search/movie?api_key=4197ebd91940cdbeadaa87325da15fd0&query="'

const form = document.querySelector('#form')
const search = document.querySelector('#search')
const main = document.querySelector('#main')

// get initial movies
getMovies(API_URL)

async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()

  showMovies(data.results)
}

function showMovies(movies) {
  main.innerHTML = ''

  movies.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')

    movieEl.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="${title}"/>
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassbyVote(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">${overview}</div>
    `

    main.appendChild(movieEl)
  })
}

form.addEventListener('submit', e => {
  // don't submit to the page
  e.preventDefault()

  const userInput = search.value

  if (userInput && userInput !== '') {
    const userURL = `${SEARCH_PATH}${userInput}`
    const res = getMovies(userURL)

    search.value = ''
  } else {
    // if nothing is entered reload the page
    window.location.reload()
  }
})

function getClassbyVote(vote) {
  if (vote < 5) {
    return 'red'
  } else if (vote < 8) {
    return 'orange'
  } else {
    return 'green'
  }
}
