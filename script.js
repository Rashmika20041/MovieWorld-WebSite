const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDg3NjNhZjdkNmQ0NDdlMDBhNzQzNDE2NzM5NTM1NiIsIm5iZiI6MTczMjY0Mzc2My4wMjgsInN1YiI6IjY3NDYwYmIzMDY0MjRiZGUyNzA0ZjJmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0RWcVueVKHVlh3oaLKuW0UrI8XTdB-vd78aY0W36Kn0'
  }
};


fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.des', options)

  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    const movies = data.results;
    console.log(movies);
    const moviesList = document.getElementById('movies');

    const firstimage = document.getElementById('first-image');
    const secondimage = document.getElementById('second-image');
    const thirdimage = document.getElementById('third-image');
    const fourthimage = document.getElementById('fourth-image');
    const fifthimage = document.getElementById('fifth-image');
    const sixthimage = document.getElementById('sixth-image');

    // Set carousel images and titles
    const carsuselImage = [firstimage, secondimage, thirdimage, fourthimage, fifthimage, sixthimage];
    carsuselImage.forEach((img, index) => {
      if (movies[index]) {
        const container = document.getElementsByClassName('carousel-item')[index];
        if (container) {

          //Image_____________
          const sliderImage = document.createElement('div');
          sliderImage.classList.add('slider-image');

          img.src = `https://image.tmdb.org/t/p/w500${movies[index].poster_path}`;
          img.alt = movies[index].original_title;

          //Title_____________
          const sliderTitle = document.createElement('div');
          sliderTitle.classList.add('slider-title');
          sliderTitle.textContent = movies[index].original_title;

          //Realesedate__________
          const sliderRelesedate = document.createElement('div');
          sliderRelesedate.classList.add('slider-releasedate');
          sliderRelesedate.textContent = movies[index].release_date.split('-')[0];

          //Count___________
          const sliderCount = document.createElement('div');
          sliderCount.classList.add('vote-count');

          const countImage = document.createElement('img');
          countImage.src = "Others/heart.png";
          countImage.alt = "HEART logo";
          countImage.style.width = "25px";
          countImage.style.height = "25px";

          const voteCount = document.createElement('span');
          voteCount.textContent = `${movies[index].vote_count}`;
          voteCount.style.fontWeight = "700";
          voteCount.style.marginLeft = "48px";
          voteCount.style.marginTop = "50px";

          //Vote Avarage___________
          const sliderAverage = document.createElement('div');
          sliderAverage.classList.add('vote-average');

          const imdbImage = document.createElement('img');
          imdbImage.src = "Others/imdb.png";
          imdbImage.alt = "IMDb logo";
          imdbImage.style.width = "40px";
          imdbImage.style.height = "40px";

          const voteText = document.createElement('span');
          voteText.textContent = `${movies[index].vote_average} / 10`;
          voteText.style.fontWeight = "700";
          voteText.style.marginLeft = "30px";
          voteText.style.marginTop = "20px";


          //Oveview_____________
          const sliderOverview = document.createElement('div');
          sliderOverview.classList.add('slider-overview');
          sliderOverview.textContent = `${movies[index].overview}`;
          sliderOverview.style.fontweight = "600";


          sliderCount.appendChild(countImage);
          sliderCount.appendChild(voteCount);
          sliderAverage.appendChild(imdbImage);
          sliderAverage.appendChild(voteText);

          document.body.appendChild(sliderCount);
          document.body.appendChild(sliderAverage);

          sliderImage.appendChild(img);
          sliderImage.appendChild(sliderTitle);
          sliderTitle.appendChild(sliderRelesedate);
          sliderTitle.appendChild(sliderCount);
          sliderTitle.appendChild(sliderAverage);
          sliderTitle.appendChild(sliderOverview);

          container.appendChild(sliderImage);
        }
        else {
          console.error(`Container not found for index ${index}`);
        }

      }
    });

    // Populate movie list
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
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDg3NjNhZjdkNmQ0NDdlMDBhNzQzNDE2NzM5NTM1NiIsIm5iZiI6MTczMjY0Mzc2My4wMjgsInN1YiI6IjY3NDYwYmIzMDY0MjRiZGUyNzA0ZjJmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0RWcVueVKHVlh3oaLKuW0UrI8XTdB-vd78aY0W36Kn0'
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

      const slidermovies = document.getElementById('slidermovies');
      slidermovies.innerHTML = '';

      const sliderBorder = document.getElementById('slider-border');
      sliderBorder.style.display = 'none';

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