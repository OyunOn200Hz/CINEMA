function fetchAndDisplayMovie(movieTitle, posterElementId, titleElementId, voletElementId) {
    fetch(`https://www.omdbapi.com/?apikey=586caa23&t=${encodeURIComponent(movieTitle)}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                const moviePoster = data.Poster;
                const movieType = data.Genre;
                const movieReleaseDate = data.Released;
                document.getElementById(posterElementId).style.backgroundImage = `url(${moviePoster})`;
                document.getElementById(titleElementId).innerHTML = data.Title;
                document.getElementById(voletElementId).innerHTML = `Type: ${movieType}<br>Date de sortie: ${movieReleaseDate}`;
            } else {
                console.error('Pas de Résultats trouvé pour : ', movieTitle);
            }
        })
        .catch(error => console.error('Error fetching data for', movieTitle, ':', error));
}

fetchAndDisplayMovie('Interstellar', 'AfficheFilm1', 'NomFilm1', 'Volet1');
fetchAndDisplayMovie('Oppenheimer', 'AfficheFilm2', 'NomFilm2', 'Volet2');
fetchAndDisplayMovie('Fight Club', 'AfficheFilm3', 'NomFilm3', 'Volet3');

function fetchAndDisplayMoviesByYear(year, startIndex) {
    fetch(`https://www.omdbapi.com/?apikey=586caa23&s=&y=${year}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True" && data.Search) {
                data.Search.slice(startIndex, startIndex + 9).forEach((movie, index) => {
                    const filmId = `film${startIndex + index + 4}`;
                    const afficheId = `AfficheFilm${startIndex + index + 4}`;
                    const nomId = `NomFilm${startIndex + index + 4}`;
                    const voletId = `Volet${startIndex + index + 4}`;

                    const filmDiv = document.createElement('div');
                    filmDiv.classList.add('film');
                    filmDiv.innerHTML = `
                        <div class="AfficheFilm" id="${afficheId}"></div>
                        <div class="NomFilm" id="${nomId}"></div>
                        <div class="Volet" id="${voletId}"></div>
                    `;
                    document.getElementById('EnAvant').appendChild(filmDiv);

                    fetchAndDisplayMovie(movie.Title, afficheId, nomId, voletId);
                });
            } else {
                console.error('Pas de Résultats trouvé pour l\'année : ', year);
            }
        })
        .catch(error => console.error('Error fetching data for year', year, ':', error));
}

document.getElementById('loadMoreBtn').addEventListener('click', () => {
    fetchAndDisplayMoviesByYear(2024, 0);
});