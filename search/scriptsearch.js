document.addEventListener("DOMContentLoaded", () => {
  const formulaireRecherche = document.querySelector(".barre-recherche");
  const inputRecherche = document.getElementById("search");
  const boutonChargerPlus = document.getElementById("ChargerPlusDeFilms");
  let pageActuelle = 1;
  let rechercheActuelle = "";

  formulaireRecherche.addEventListener("submit", (event) => {
    event.preventDefault();
    const recherche = inputRecherche.value.trim();
    if (recherche) {
      rechercheActuelle = recherche;
      pageActuelle = 1;
      chercherFilms(recherche, pageActuelle);
    } else {
      console.error("Le champ de recherche est vide");
      afficherErreurMessage("Le champ de recherche est vide");
    }
  });

  boutonChargerPlus.addEventListener("click", () => {
    pageActuelle++;
    chercherFilms(rechercheActuelle, pageActuelle);
  });

  boutonChargerPlus.style.display = "none";
});

function chercherFilms(recherche, page) {
  fetch(
    `https://www.omdbapi.com/?apikey=586caa23&s=${recherche}&page=${page}&type=movie`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        afficherResultatsRecherche(data.Search, page);
        document.getElementById("ChargerPlusDeFilms").style.display = "block";
      } else {
        console.error("Aucun résultat trouvé :", data.Error);
        afficherErreurMessage("Aucun résultat trouvé");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données :", error);
      afficherErreurMessage("Erreur lors de la récupération des données");
    });
}

function afficherResultatsRecherche(films, page) {
  let conteneurResultats = document.querySelector(".resultats");
  if (!conteneurResultats) {
    conteneurResultats = document.createElement("div");
    conteneurResultats.classList.add("resultats");
    document.body.appendChild(conteneurResultats);
  } else if (page === 1) {
    conteneurResultats.innerHTML = "";
  }

  conteneurResultats.style.display = 'grid';
  conteneurResultats.style.gridTemplateColumns = 'repeat(5, 1fr)';
  conteneurResultats.style.columnGap = '2%';

  films.forEach((film) => {
    const filmDiv = document.createElement("div");
    filmDiv.classList.add("films");

    const afficheFilm = document.createElement("div");
    afficheFilm.classList.add("AfficheFilm");
    afficheFilm.style.backgroundImage = `url(${film.Poster !== "N/A" ? film.Poster : "../img/noposter.png"})`;

    const titreFilm = document.createElement("div");
    titreFilm.classList.add("NomFilm");
    titreFilm.innerText = film.Title;

    filmDiv.appendChild(afficheFilm);
    filmDiv.appendChild(titreFilm);
    conteneurResultats.appendChild(filmDiv);

    filmDiv.addEventListener("click", () => {
      sessionStorage.setItem("selectedFilmId", film.imdbID);
      window.location.href = "../movie/movie.html";
    });
  });
}

function afficherErreurMessage(message) {
  let conteneurResultats = document.querySelector(".resultats");
  if (!conteneurResultats) {
    conteneurResultats = document.createElement("div");
    conteneurResultats.classList.add("resultats");
    document.body.appendChild(conteneurResultats);
  }
  conteneurResultats.innerHTML = `<div class="error-message">${message}</div>`;
  conteneurResultats.style.display = 'flex';
  conteneurResultats.style.justifyContent = 'center';
  conteneurResultats.style.alignItems = 'center';

}