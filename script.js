function fetchAndDisplayMovie(idFilms, posterElementId, titleElementId, GenreElementId, PlotElementId, DateElementId, NoteElementId, RealisateurElementId, ActeursElementId) {
    fetch(`https://www.omdbapi.com/?apikey=586caa23&i=${(idFilms)}&plot=full`)
        .then(response => response.json())
        .then(data => {
            const moviePoster = data.Poster;
            document.getElementById(posterElementId).style.backgroundImage = `url(${moviePoster})`;
            document.getElementById(titleElementId).innerHTML = data.Title;
            document.getElementById(GenreElementId).innerHTML = data.Genre;
            document.getElementById(PlotElementId).innerHTML = data.Plot;
            const date = new Date(data.Released);
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
            document.getElementById(DateElementId).innerHTML = formattedDate;

            document.getElementById(NoteElementId).innerHTML = data.imdbRating + '/10';
            document.getElementById(RealisateurElementId).innerHTML = data.Director;
            document.getElementById(ActeursElementId).innerHTML = data.Actors;
            if (!data.Poster) {
                console.error('Pas de Résultats trouvé pour : ', idFilms);
            }
        })
        .catch(error => console.error('Error fetching data for', idFilms, ':', error));
}

const movieId = sessionStorage.getItem('selectedMovieId');
if (movieId) {
    fetchAndDisplayMovie(movieId, 'AfficheFilm', 'TitreFilm', 'GenreFilm', 'DescriptionFilm', 'DateFilm', 'NoteFilm', 'RealisateurFilm', 'ActeursFilm');
} else {
    console.error('No movie ID found in sessionStorage');
}