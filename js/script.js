const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: import.meta.env.VITE_TMDB_API_KEY,
    apiUrl: 'https://api.themoviedb.org/3',
  },
};

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = global.api.apiKey;
  const BASE_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(`${BASE_URL}/${endpoint}?api_key=${API_KEY}`);
  const data = await response.json();

  hideSpinner();

  return data;
}

// Request to Search
async function searchAPIData() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}/search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );
  const data = await response.json();

  hideSpinner();

  return data;
}

// Display popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

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
            <small class="text-muted">Released: ${formatReleaseDate(
              movie.release_date
            )}</small>
          </p>
        </div>
    `;
    document.querySelector('#popular-movies').appendChild(div);
  });
}

// Display movie details
async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];

  const movie = await fetchAPIData(`movie/${movieId}`);

  // Image backdrop overlay
  displayBackdropImg('movie', movie.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
  <div class="details-top">
          <div>
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
          </div>

          <div>
            <h1>${movie.title}</h1>
            <p><i class="fas fa-star text-primary"></i> ${movie.vote_average.toFixed(
              1
            )} / 10</p>
            <p class="text-muted">Release Date: ${formatReleaseDate(
              movie.release_date
            )}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>

        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $ ${formatNumberWithComma(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $ ${formatNumberWithComma(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
            <li><span class="text-secondary">Production:</span> ${movie.production_companies
              .map((company) => `${company.name}`)
              .join(', ')}
            </li>
          </ul>
        </div>`;

  document.querySelector('#movie-details').appendChild(div);
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
            <small class="text-muted">Air Date: ${formatReleaseDate(
              show.first_air_date
            )}</small>
          </p>
        </div>
    `;
    document.querySelector('#popular-shows').appendChild(div);
  });
}

// Display TV Series details
async function displayTVSeriesDetails() {
  const tvID = window.location.search.split('=')[1];

  const tv = await fetchAPIData(`tv/${tvID}`);

  console.log(tv);

  // Image backdrop overlay
  displayBackdropImg('tv', tv.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
  <div class="details-top">
          <div>
          ${
            tv.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${tv.poster_path}"
            alt="${tv.name}"
            class="card-img-top"
          />`
              : `<img
            src="images/no-image.jpg"
            alt="${tv.name}"
            class="card-img-top"
          />`
          }
          </div>

          <div>
            <h1>${tv.name}</h1>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${tv.vote_average.toFixed(1)}/10
            </p>
            <p class="text-muted">Released Date: ${formatReleaseDate(
              tv.first_air_date
            )}</p>
            <p>
              ${tv.overview}
            </p>

            <h5>Genres</h5>
            <ul class="list-group">
              ${tv.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
              tv.homepage
            }" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
      </div>

      <div class="details-bottom">
        <h2>Show Info</h2>
        <ul>
          <li><span class="text-secondary">Number of Episodes: </span>${
            tv.number_of_episodes
          }</li>
          <li><span class="text-secondary">Last Episode to Air: </span>${
            tv.last_episode_to_air.episode_number
          }</li>
          <li><span class="text-secondary">Status: </span>${tv.status}</li>
          <li><span class="text-secondary">Production:</span> ${tv.production_companies
            .map((company) => `${company.name}`)
            .join(', ')}
            </li>
        </ul>
      </div>`;

  document.querySelector('#show-details').appendChild(div);
}

// Spinner
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Display backdrop image
function displayBackdropImg(type, backdropPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), url(https://image.tmdb.org/t/p/original/${backdropPath})`;

  overlayDiv.classList.add('backdrop-img-overlay');

  if (type === 'tv') {
    document.querySelector('#show-details').appendChild(overlayDiv);
  } else if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  }
}

// Display slider movies
async function displaySlider() {
  const { results } = await fetchAPIData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
      movie.title
    }" srcset="" />
      </a>

      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
          1
        )}/10
      </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });

  console.log(results);
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
    },
  });
}

// Search Movie or TV title
async function searchTitle() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    document.querySelector('#search-term').value = global.search.term;

    // Set radio button based on the search type
    if (global.search.type === 'movie') {
      document.querySelector('#movie').checked = true;
    } else if (global.search.type === 'tv') {
      document.querySelector('#tv').checked = true;
    }

    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert('No results found', 'alert-error');
      return;
    }

    console.log(results);

    displaySearchResult(results);
  } else {
    showAlert('Please enter a title');
  }
}

// Display search results
function displaySearchResult(results) {
  // Clear previous results
  document.querySelector('#search-results').innerHTML = ``;
  document.querySelector('#search-results-heading').innerHTML = ``;
  document.querySelector('#pagination').innerHTML = ``;

  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <a href="./${global.search.type}-details.html?id=${result.id}">
          ${
            result.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${result.poster_path}"
            alt="${
              global.search.type === 'movie'
                ? result.release_date
                : result.first_air_date
            }"
            class="card-img-top"
          />`
              : `<img
            src="images/no-image.jpg"
            alt="${
              global.search.type === 'movie'
                ? result.release_date
                : result.first_air_date
            }"
            class="card-img-top"
          />`
          }
        </a>

        <div class="card-body">
          <h5 class="card-title">${
            global.search.type === 'movie' ? result.title : result.name
          }</h5>
          <p class="card-text">
            <small class="text-muted">Released: ${formatReleaseDate(
              global.search.type === 'movie'
                ? result.release_date
                : result.first_air_date
            )}</small>
          </p>
        </div>
    `;

    document.querySelector('#search-results-heading').innerHTML = `
    <h2 class="text-center">${results.length} of ${global.search.totalResults} Results for ${global.search.term}`;

    document.querySelector('#search-results').appendChild(div);
  });

  displayPagination();
}

// Create and Display Pagination for Search
function displayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
    <button class="btn btn-primary" id="prev">Prev</button>
    <button class="btn btn-primary" id="next">Next</button>
    <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>`;

  document.querySelector('#pagination').appendChild(div);

  // Disable Prev button on first page
  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }

  // Disable Next button on last page
  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }

  // Next page
  document.querySelector('#next').addEventListener('click', async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();
    displaySearchResult(results);
  });

  // Previous page
  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData();
    displaySearchResult(results);
  });
}

// Show Alert
function showAlert(message, className = 'alert-error') {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  // Style alert to absolute position
  alertEl.style.position = 'absolute';
  alertEl.style.top = '50px';
  alertEl.style.left = '50%';
  alertEl.style.transform = 'translateX(-50%)';
  alertEl.style.zIndex = '1000';

  setTimeout(() => {
    alertEl.remove();
  }, 3000);
}

// Format release date
function formatReleaseDate(releaseDateStr) {
  const releaseDate = new Date(releaseDateStr);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedReleaseDate = releaseDate.toLocaleDateString('en-US', options);
  return formattedReleaseDate;
}

// Format number with comma
function formatNumberWithComma(number) {
  return new Intl.NumberFormat('en-US').format(number);
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
      displaySlider();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/tv-details.html':
      displayTVSeriesDetails();
      break;
    case '/search.html':
      searchTitle();
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
