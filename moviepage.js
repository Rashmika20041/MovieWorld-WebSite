const moviePage = new URLSearchParams(window.location.search);
const id = moviePage.get('id');
console.log(id);

const newPage = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDg3NjNhZjdkNmQ0NDdlMDBhNzQzNDE2NzM5NTM1NiIsIm5iZiI6MTczMjY0Mzc2My4wMjgsInN1YiI6IjY3NDYwYmIzMDY0MjRiZGUyNzA0ZjJmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0RWcVueVKHVlh3oaLKuW0UrI8XTdB-vd78aY0W36Kn0'
    }
};

const inMovie = document.getElementById('movies');

fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, newPage)
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        console.log(data);

        const maintitle = document.getElementById('maintitle');
        maintitle.textContent = `${data.original_title} | Movie World`;

        const film = document.getElementById('background');
        film.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${data.backdrop_path})`;

        //Film Image
        const filmImage = document.createElement('div');
        filmImage.classList.add('film-image');

        const imgcard = document.createElement('img');
        imgcard.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;

        //Film Title
        const filmTitle = document.createElement('div');
        filmTitle.classList.add('film-title');
        filmTitle.textContent = data.original_title;


        const filmYear = document.createElement('span');
        filmYear.classList.add('film-year');
        filmYear.textContent = ` (${data.release_date.split('-')[0]})`;

        //Release Date
        const releaseDate = document.createElement('div');
        releaseDate.classList.add('release-date');
        releaseDate.textContent = data.release_date;

        //Origin Country
        const originCountry = document.createElement('span');
        originCountry.classList.add('origin-country');

        data.origin_country.forEach(country => {
            const countryElement = document.createElement('span');
            countryElement.classList.add('country');
            countryElement.textContent = `(${country}) `;
            originCountry.appendChild(countryElement);
        });

        //Genres
        const Genres = document.createElement('div');
        Genres.classList.add('genres');

        data.genres.forEach(genre => {
            const genreElemnt = document.createElement('span');
            genreElemnt.classList.add('genre');
            genreElemnt.textContent = `${genre.name}, `;
            Genres.appendChild(genreElemnt);
        });

        //Time Period
        const timePeriod = document.createElement('div');
        timePeriod.classList.add('time-period');

        function convertToHours(num) {
            const hours = Math.floor(num / 60);
            const minutes = num % 60;
            return `${hours}h ${minutes}m`;
        }
        timePeriod.textContent = convertToHours(data.runtime);

        //Count
        const sliderCount = document.createElement('div');
        sliderCount.classList.add('vote-count');

        const countImage = document.createElement('img');
        countImage.src = "Others/heart.png";
        countImage.alt = "HEART logo";
        countImage.style.width = "25px";
        countImage.style.height = "25px";

        const voteCount = document.createElement('span');
        voteCount.textContent = data.vote_count;
        voteCount.style.fontWeight = "600";
        voteCount.style.fontSize = "20px"
        voteCount.style.marginLeft = "40px";

        //Vote Avarage___________
        const sliderAverage = document.createElement('div');
        sliderAverage.classList.add('vote-average');

        const imdbImage = document.createElement('img');
        imdbImage.src = "Others/imdb.png";
        imdbImage.alt = "IMDb logo";
        imdbImage.style.width = "40px";
        imdbImage.style.height = "40px";

        const voteText = document.createElement('span');
        voteText.textContent = `${data.vote_average} / 10`;
        voteText.style.fontWeight = "600";
        voteText.style.marginLeft = "25px";
        voteText.style.fontSize = "20px";

        //trailers_____________
        const trailers = document.createElement('div');
        trailers.classList.add('trailers');
        trailers.innerHTML = `<button onclick="watchtrailer()" class="buttonStyle"><i class='bx bx-play bx-lg bx-fw' class="trailer-button"></i>Play Trailer</button>`;

        //Modal for Fullscreen Trailer
        let trailerButton = document.getElementById('video-modal');

        if (!trailerButton) {
            trailerButton = document.createElement('div');
            trailerButton.classList.add('modal');
            trailerButton.id = "video-modal";
            trailerButton.innerHTML = `<button class="close-button">&times;</button>
            <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" style="width:700px; height:400px;"></iframe>`;

            document.body.appendChild(trailerButton);

            const closeButton = trailerButton.querySelector('.close-button');
            closeButton.addEventListener('click', () => {
                trailerButton.style.display = 'none';
                trailerButton.querySelector('iframe').src = '';
            });

            trailerButton.addEventListener('click', (e) => {
                if (e.target === trailerButton) {
                    trailerButton.style.display = 'none';
                    trailerButton.querySelector('iframe').src = '';
                }
            });
        }


        //tagline_____________
        const tagline = document.createElement('div');
        tagline.classList.add('tagline');
        tagline.textContent = data.tagline;

        //Oveview_____________
        const Overview = document.createElement('div');
        Overview.classList.add('slider-overview');
        Overview.innerHTML = `<h3 style="font-size: 23px; font-weight: 500;">Overview</h3><p>${data.overview}</p>`;
        Overview.style.fontWeight = "500";

        inMovie.appendChild(maintitle);
        filmImage.appendChild(imgcard);
        inMovie.appendChild(filmImage);
        inMovie.appendChild(filmTitle);
        filmTitle.appendChild(filmYear);
        filmTitle.appendChild(Genres);
        filmTitle.appendChild(releaseDate);
        releaseDate.appendChild(originCountry);
        filmTitle.appendChild(timePeriod);
        sliderCount.appendChild(countImage);
        sliderCount.appendChild(voteCount);
        filmTitle.appendChild(sliderCount);
        sliderAverage.appendChild(imdbImage);
        sliderAverage.appendChild(voteText);
        filmTitle.appendChild(sliderAverage);
        filmTitle.appendChild(trailers);
        filmTitle.appendChild(trailerButton);
        filmTitle.appendChild(tagline);
        filmTitle.appendChild(Overview);
    })
    .catch(error => {
        console.error('Error fetching movie data:', error);
    });

//Trailers
function watchtrailer() {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, newPage)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log(data);

            const videos = data.results;

            let modal = document.getElementById('video-modal');
                
            const video = videos.find(video => video.type === 'Trailer' && video.name === 'Official Trailer' && video.site === 'YouTube');
            if (video) {
                const iframe = modal.querySelector('iframe');
                iframe.src = `https://www.youtube.com/embed/${video.key}`;
                modal.style.display = 'flex';
            } else {
                alert('No valid trailer found!');
            }
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
        });
}