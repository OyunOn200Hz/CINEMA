function fetchAndDisplayMovie(idFilms, posterElementId, descriptionFilm, titleElementId) {
    fetch(`https://www.omdbapi.com/?apikey=586caa23&i=${(idFilms)}`)
        .then(response => response.json())
        .then(data => {
            const moviePoster = data.Poster;
            document.getElementById(posterElementId).style.backgroundImage = `url(${moviePoster})`;
            document.getElementById(titleElementId).innerHTML = data.Title;
            document.getElementById(posterElementId).setAttribute('film-description', data.Plot);
            if (!data.Poster) {
                console.error('Pas de Résultats trouvé pour : ', idFilms);
            }
        })
        .catch(error => console.error('Error fetching data for', idFilms, ':', error));
}

fetchAndDisplayMovie('tt26446278', 'AfficheFilm1', 'AfficheFilm1', 'NomFilm1'); //Interstellar
fetchAndDisplayMovie('tt15398776', 'AfficheFilm2', 'AfficheFilm2', 'NomFilm2'); //Oppenheimer
fetchAndDisplayMovie('tt0137523', 'AfficheFilm3', 'AfficheFilm3', 'NomFilm3'); //Fight Club


const listeFilms2024 = ["tt26446278",//Le comte de monte cristo
                        "tt15239678",//Dune 2
                        "tt12037194", //Furiosa
                        "tt13186482", //Mufasa : Le roi lion
                        "", 
                        
];