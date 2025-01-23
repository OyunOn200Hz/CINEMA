document.addEventListener('DOMContentLoaded', () => {
    const selectedMovieId = sessionStorage.getItem('selectedFilmId');
    if (selectedMovieId) {
        fetchAndDisplaySelectedMovie(selectedMovieId);
    } else {
        console.error('No movie ID found in sessionStorage');
    }
});

function fetchAndDisplaySelectedMovie(movieId) {
    fetch(`https://www.omdbapi.com/?apikey=586caa23&i=${movieId}&plot=full&type=movie`)
        .then(response => response.json())
        .then(data => {
            const posterUrl = data.Poster !== "N/A" ? data.Poster : '../img/noposter.png';
            document.getElementById('AfficheFilm').style.backgroundImage = `url(${posterUrl})`;
            document.getElementById('TitreFilm').innerText = 'Name : '+data.Title;
            document.getElementById('GenreFilm').innerText = 'Genre : '+data.Genre;
            document.getElementById('DescriptionFilm').innerText = 'Plot : '+data.Plot;
            document.getElementById('DateFilm').innerText = 'Release date : '+formatDate(data.Released);
            document.getElementById('NoteFilm').innerText = 'Score : '+data.imdbRating+'/10';
            document.getElementById('RealisateurFilm').innerText = 'Director : '+data.Director;
            document.getElementById('ActeursFilm').innerText = 'Actors : '+data.Actors;
        })
        .catch(error => console.error('Error fetching movie data:', error));
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}