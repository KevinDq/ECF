var films = [
  { title: "Deadpool", years: 2016, authors: "Tim Miller" },
  { title: "Spiderman", years: 2002, authors: "Sam Raimi" },
  { title: "Scream", years: 1996, authors: "Wes Craven" },
  { title: "It: chapter 1", years: 2019, authors: "Andy Muschietti" },
];

var tbody = document.querySelector("tbody");
var formElt = document.querySelector("#form");
var alert = document.querySelector("#alert");
var filtre = document.querySelector("#filtre");

filtre.addEventListener("change", filterBy);

var btnForm = document.createElement("button");
btnForm.textContent = "Ajouter";
btnForm.classList.add("btn", "btn-success");
form.append(btnForm);
btnForm.addEventListener("click", afficherFormulaire);

//création du tableau
afficherFilm();

function afficherFilm() {
  tbody.innerHTML = "";

  films.forEach((film, index) => {
    let tr = document.createElement("tr");
    let tdTitle = document.createElement("td");
    let tdYear = document.createElement("td");
    let tdAuthor = document.createElement("td");
    let tdAction = document.createElement("td");
    let btnDelete = document.createElement("button");

    tdTitle.textContent = film.title;
    tdYear.textContent = film.years;
    tdAuthor.textContent = film.authors;

    btnDelete.textContent = "Supprimer";
    btnDelete.classList.add("btn", "btn-danger");
    btnDelete.dataset.id = index;
    btnDelete.addEventListener("click", supprimerFilm);

    tdAction.append(btnDelete);
    tr.append(tdTitle);
    tr.append(tdYear);
    tr.append(tdAuthor);
    tr.append(tdAction);
    tbody.append(tr);
  });
}

//suppression de ligne avec demande de confirmation
function supprimerFilm() {
  if (confirm("Etes-vous sûr de vouloir supprimer ce film ?")) {
    films.splice(this.dataset.id, 1);
    afficherFilm()
  }
}

//afficher le formulaire
function afficherFormulaire() {
  section = document.createElement("section");
  section.classList.add("form-inline");

  let inputTitre = document.createElement("input");
  inputTitre.type = "text";
  inputTitre.id = "titre";
  inputTitre.placeholder = "Entrez un titre";
  inputTitre.classList.add("form-control");

  let inputYears = document.createElement("input");
  inputYears.type = "number";
  inputYears.id = "annee";
  inputYears.placeholder = "Entrez une année";
  inputYears.classList.add("form-control");

  let inputAuthor = document.createElement("input");
  inputAuthor.type = "text";
  inputAuthor.id = "auteur";
  inputAuthor.placeholder = "Entrez un réalisateur";
  inputAuthor.classList.add("form-control");

  btnSave = document.createElement("button");
  btnSave.textContent = "Sauvegarder";
  btnSave.classList.add("btn", "btn-success");
  btnSave.addEventListener("click", verifForm);

  section.append(inputTitre);
  section.append(inputYears);
  section.append(inputAuthor);
  section.append(btnSave);
  formElt.replaceChild(section, btnForm);
}

// //verifier la saisie
function verifForm() {
  let form = {
    title: document.querySelector("#titre").value,
    years: parseInt(document.querySelector("#annee").value),
    author: document.querySelector("#auteur").value,
  };

  let regex = new RegExp("^[0-9]{4}$");
  let currentYear = new Date().getFullYear();
  let alerts = [];

  if (form.title == null || form.title.length < 2) {
    alerts.push("Le titre doit contenir 2 caractères au minimum");
  }

  if (!regex.test(form.years)) {
    alerts.push("L'année doit contenir 4 chiffres");
  } else if (form.years < 1900 || form.years > currentYear) {
    alerts.push(`L'année doit être comprise entre 1900 et ${currentYear}`);
  }

  if (form.author == null || form.author.length < 5) {
    alerts.push("L'auteur doit contenir 5 caractères minimum");
  }

  let pAlert = document.createElement("p");
  pAlert.innerHTML = "";

  if (alerts.length != 0) {
    pAlert.innerHTML +=
      "Une erreur est survenue sur les informations suivantes : ";

    let ul = document.createElement("ul");
    alerts.forEach((alert) => {
      let li = document.createElement("li");
      li.textContent = alert;
      ul.appendChild(li);
    });
    pAlert.append(ul);
    pAlert.classList.add("alert", "alert-danger");
  } else {
    films.push({
      title: capitalize(form.title),
      years: form.years,
      authors: capitalize(form.author),
    });
    pAlert.classList.add("alert", "alert-success");
    pAlert.innerHTML = "Film enregistré avec succès";
    formElt.replaceChild(btnForm, section);
  }
  alert.append(pAlert);
  this.removeEventListener("click", verifForm);

  setInterval(() => {
    alerts = [];
    alert.remove(pAlert);
    this.addEventListener("click", verifForm);
  }, 5000);

  afficherFilm();
}

//premier mot en majuscule
/**
 * @param {string} chaine
 */
function capitalize(chaine) {
  return chaine.charAt(0).toUpperCase() + chaine.slice(1);
}

//filtre titre et année

function filterBy() {
  if (this.value != "#") {
    if (this.value === "title") {
      films.sort((a, b) => {
        let aMin = a.title.toLowerCase();
        let bMin = b.title.toLowerCase();
        if (aMin < bMin) {
          return -1;
        }
        if (aMin > bMin) {
          return 1;
        }
        return 0;
      });
    } else if (this.value === "years") {
      films.sort((a, b) => {
        return b.years - a.years;
      });
    } else {
      console.error("Commande non autorisée");
    }
    afficherFilm();
  }
}