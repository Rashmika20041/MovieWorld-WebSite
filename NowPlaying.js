const Top = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDg3NjNhZjdkNmQ0NDdlMDBhNzQzNDE2NzM5NTM1NiIsIm5iZiI6MTczMjY0Mzc2My4wMjgsInN1YiI6IjY3NDYwYmIzMDY0MjRiZGUyNzA0ZjJmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0RWcVueVKHVlh3oaLKuW0UrI8XTdB-vd78aY0W36Kn0'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', Top)
  .then(res => {
    if (!res.ok) {
      throw Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then(TopMovies => {
    const movies = TopMovies.results;
    console.log(movies);
  
    const moviesList = document.getElementById('movies');
   
    movies.forEach(movie => {
  
      const listItem = document.createElement('li');
  
      listItem.innerHTML = `
      <a href="moviepage.html?id=${movie.id}"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"></a>
      <h3 class="movie-title">${movie.title} <p style="font-weight:400; font-size:15px; margin-top:4px; color: rgba(255, 255, 255, 0.7);">${movie.release_date.split('-')[0]}</p></h3>`;
  
      moviesList.appendChild(listItem);
    });
  
  })
  .catch(err => {
    console.error(err);
    document.getElementById('movies').innerHTML = `<p>${err.message}</p>`;
  });
  
  
  
  //  Search Function
  function movieResults() {
    const searchInput = document.getElementById('searchInput').value.trim();
  
    if (!searchInput) {
      alert('Please enter a movie name to search.');
      return;
    }
  
    const searchbar = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: '908763af7d6d447e00a7434167395356'
      },
    };
  
    const movieContainer = document.getElementById('movieLo');
  
    loading.style.display = 'block';
    movieContainer.innerHTML = '';
  
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`, searchbar)
      .then(res => res.json())
      .then(data => {
  
        if (!data.results || data.results.length === 0) {
  
          const notFound = document.createElement('div');
          notFound.classList.add('not-found');
  
          notFound.innerHTML = '<p><img src="Others/not-found.png" alt="" >No movies found. Try a different title.</p>';
  
          movieContainer.appendChild(notFound);
  
          const ul = document.getElementById('movies');
          ul.innerHTML = '';
  
          const slidermovies = document.getElementById('slidermovies');
          slidermovies.innerHTML = '';
  
          const sliderBorder = document.getElementById('slider-border');
          sliderBorder.style.display = 'none';
  
  
          return;
        }
  
        const ul = document.getElementById('movies');
        ul.innerHTML = '';
  
        data.results.forEach(movie => {
          const movieDiv = document.createElement('div');
          movieDiv.innerHTML = `
            <a href="moviepage.html?id=${movie.id}"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"></a>
            <h3 class="movie-title">${movie.title}<p style="font-weight:400; font-size:15px; margin-top:4px; color: rgba(255, 255, 255, 0.7);">${movie.release_date.split('-')[0]}</p></h3>`;
  
          movieContainer.appendChild(movieDiv);
  
        });
      })
      .catch(err => {
        console.error(err);
        loading.style.display = 'none';
        movieContainer.innerHTML = `<p>${err.message}</p>`;
      });
  }
  
  function toggleSearchBar() {
      const searchInput = document.getElementById('searchInput');
      const searchButton = document.getElementById('searchButton');
      searchInput.classList.toggle('show');
      searchButton.classList.toggle('show');
    }