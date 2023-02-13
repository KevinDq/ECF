//"http://www.omdbapi.com/?apikey=f2eda4e9&t=";

const key = "f2eda4e9";
var btnSearch = document.querySelector("#search");
var result = document.querySelector("#result");

btnSearch.addEventListener("click", () => {
    appelApi()
})

function appelApi(page) {
  let url = `http://www.omdbapi.com/?apikey=${key}`;
  let search = ""

  let form = {
    title: document.querySelector("#title").value,
    years: document.querySelector("#years").value,
    type: document.querySelector("#type").value,
  };

  if (form.title.length != 0 && form.title != null) {
    search += "&s=" + form.title;
  }
  if (form.years.length != 0) {
    search += "&y=" + form.years;
  }
  if (form.type != "#") {
    search += "&type=" + form.type;
  }

  if (page != undefined || page == null){
    search += "&page=" + page
  }

  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let films = JSON.parse(xhr.response);

      result.innerHTML = ""

      pagination.innerHTML = ""
      
      creerPagination(Math.floor(films.totalResults / films.Search.length));

      films.Search.forEach(film => {
        cardFilm(film)
      })
    } 
  };
  
  xhr.open("GET", url + search);
  xhr.send();
}

function cardFilm(film){

    let poster = film.Poster
    if(film.Poster == "N/A"){
        poster = "https://via.placeholder.com/150x220"
    }

    result.innerHTML += `
    <article>
        <div class="card" style="width: 18rem;">
            <img src="${poster}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${film.Title}</h5>
                <p class="card-text">${film.Year}</p>    
            </div>
        </div>
    </article>
    `;
}

function creerPagination(pages){
    let pagination = document.querySelector('#pagination')

    let ulPage = document.createElement('ul')
    ulPage.classList.add('pagination')

    for(i = 1; i < pages; i++){
        let liPage = document.createElement('li')
        liPage.classList.add('page-item')
        let aPage = document.createElement('a')
        aPage.classList.add('page-link')
        aPage.href = i
        aPage.textContent = i

        aPage.addEventListener('click', function(e) {
            e.preventDefault()
            appelApi(this.getAttribute('href'))
        })

        liPage.append(aPage)
        ulPage.append(liPage)
    }
    pagination.append(ulPage)
}