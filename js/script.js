const global = {
  currentPage: window.location.pathname,
};

// Fetch data from TMDB API

async function fetchAPIData(endpoint) {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Use the Vite environment variable
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();

  return data;
}

// Example usage
fetchAPIData('movie/popular').then((data) => console.log(data));

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
      console.log('Home');
      break;
    case '/shows.html':
      console.log('Shows');
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
