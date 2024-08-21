const global = {
  currentPage: window.location.pathname,
};

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';

  showSpinner();

  const response = await fetch(`${BASE_URL}/${endpoint}?api_key=${API_KEY}`);
  const data = await response.json();

  hideSpinner();

  return data;
}

// Display popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');
  console.log(results);

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <a href="./movie-details.html?id=${movie.id}">
          ${
            movie.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            alt="${movie.title}"
            class="card-img-top"
          />`
              : `<img
            src="images/no-image.jpg"
            alt="${movie.title}"
            class="card-img-top"
          />`
          }
        </a>

        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Released: ${movie.release_date}</small>
          </p>
        </div>
    `;
    document.querySelector('#popular-movies').appendChild(div);
  });
}

// Display popular TV Shows
async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');
  console.log(results);

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
          ${
            show.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            alt="${show.name}"
            class="card-img-top"
          />`
              : `<img
            src="images/no-image.jpg"
            alt="${show.name}"
            class="card-img-top"
          />`
          }
        </a>

        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Air Date: ${show.first_air_date}</small>
          </p>
        </div>
    `;
    document.querySelector('#popular-shows').appendChild(div);
  });
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
function highlightActiveLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

// Init app
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('TV Details');
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
