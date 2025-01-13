function fetchAndDisplayMovie(movieTitle, posterElementId, titleElementId) {
    fetch(`https://www.omdbapi.com/?apikey=586caa23&s=${encodeURIComponent(movieTitle)}`)
        .then(response => response.json())
        .then(data => {
            if (data.Search && data.Search.length > 0) {
                const moviePoster = data.Search[0].Poster;
                document.getElementById(posterElementId).style.backgroundImage = `url(${moviePoster})`;
                document.getElementById(titleElementId).innerHTML = data.Search[0].Title;
            } else {
                console.error('Pas de Résultats trouvé pour : ', movieTitle);
            }
        })
        .catch(error => console.error('Error fetching data for', movieTitle, ':', error));
}

fetchAndDisplayMovie('Interstellar', 'AfficheFilm1', 'NomFilm1');
fetchAndDisplayMovie('Oppenheimer', 'AfficheFilm2', 'NomFilm2');
fetchAndDisplayMovie('Fight Club', 'AfficheFilm3', 'NomFilm3');
