function fetchAndDisplayMovie(idFilms, posterElementId, titleElementId) {
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

fetchAndDisplayMovie('tt0816692', 'AfficheFilm1', 'AfficheFilm1', 'NomFilm1'); //Interstellar
fetchAndDisplayMovie('tt15398776', 'AfficheFilm2', 'AfficheFilm2', 'NomFilm2'); //Oppenheimer
fetchAndDisplayMovie('tt0137523', 'AfficheFilm3', 'AfficheFilm3', 'NomFilm3'); //Fight Club


const listeFilms2024 = ["tt26446278",//Le comte de monte cristo
                        "tt15239678",//Dune 2
                        "tt12037194", //Furiosa
                        "tt13186482", //Mufasa : Le roi lion
                        "tt4772188", //Flow
                        "tt1684562", //The fall guy
                        "tt17526714", //The substance
                        "tt1262426", //Wicked
                        "tt10462154", //La plus précieuse des marchandises
                        "tt30795948", //Un petit truc en plus
                        "tt27490099", //L'amour ouf
                        "tt18259086" //Sonic 3                        
];

function chargerPlusDeFilms() {
    let filmsAffiches = 0;
    document.getElementById('ChargerPlusDeFilms').addEventListener('click', () => {
        const conteneurFilmsSupplementaires = document.querySelector('.EnAvant');
        const filmsAAfficher = listeFilms2024.slice(filmsAffiches, filmsAffiches + 6);

        filmsAAfficher.forEach((filmId, index) => {
            const filmIndex = filmsAffiches + index + 4;
            const filmElementId = `AfficheFilm${filmIndex}`;
            const titleElementId = `NomFilm${filmIndex}`;

            const filmDiv = document.createElement('div');
            filmDiv.classList.add(`film${filmIndex}`);
            filmDiv.innerHTML = `
                <div id="${filmElementId}" class="AfficheFilm${filmIndex}" film-description=""></div>
                <div id="${titleElementId}" class="NomFilm${filmIndex}"></div>
            `;
            conteneurFilmsSupplementaires.appendChild(filmDiv);

            fetchAndDisplayMovie(filmId, filmElementId, filmElementId, titleElementId);
        });

        filmsAffiches += 6;

        const dernierFilm = document.getElementById(`AfficheFilm${filmsAffiches + 3}`);
        if (dernierFilm) {
            dernierFilm.scrollIntoView({ behavior: 'smooth' });
        }

        if (filmsAffiches >= listeFilms2024.length) {
            document.getElementById('ChargerPlusDeFilms').style.display = 'none';
        }
    });
}

chargerPlusDeFilms();