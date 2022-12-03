const query = document.getElementById("intro-title");

const APIKey = "199f20ed7afdbe0b41908ed0ca3f6cff";

const trending = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKey}`;

const SEARCHAPI = `https://api.themoviedb.org/3/search/multi?api_key=${APIKey}&language=en-US&page=1&query=`;

const form = document.getElementById("form");

const searchBar = document.getElementById("search");

const showContent = document.getElementById("content");

//get movies

// .then((x)=> console.log("====>", x.json())).then((x)=> console.log(x))
async function getMovies(url) {
  // const response = await fetch(url);
  // const data = await response.json();
  // console.log(data);
  // showMovies(data.results);

  const fetchData = await fetch(url)
    .then((response) => {
      //api call successful
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((data) => {
      //json from our response
      console.log("-----", data.results);
      //search reesult with name of search query
      showMovies(data.results);
    })
    .catch((err) => {
      console.warn("data fetching failed", err);
    });
}

getMovies(trending);

//extract movies data to the dom
function showMovies(movies) {
  //main content
  // console.log(showContent);
  showContent.innerHTML = "";
  movies.forEach((movie) => {
    // console.log(movie)
    const {
      poster_path,
      release_date,
      name,
      id,
      title,
      vote_average,
      overview,
    } = movie;
    const movieEl = document.createElement("div");

    // movieEl.setAttribute("class", "movie, col-md-6");
    // or
    movieEl.className = "movie col-md-4 col-lg-3 col-sm-6";
    // let ntitle = title.replace(/[']/g, "\\'");

    movieEl.innerHTML = `
    <button class="id-url btn text-dark btn-warning shadow-none" onclick="goto('${id}')">Know More</button>
    <div class="img-wrapper">
    <img src="${
      "https://image.tmdb.org/t/p//w500" + poster_path
    }" alt="${title}">
    </div>
    <span><span class="heading">Rating: </span>${vote_average.toFixed(1)}</span>
    <h5 class="title">${!title ? name : title}</h5>
    <span class="release-date"><span class="heading">Released: </span>${release_date}</span>
            <p class="desc"><span class="heading">Plot : </span>${
              overview.length < 45
                ? overview
                : overview.slice(0, 150) + "<span>...</span>"
            }</p>
            `;
    showContent.appendChild(movieEl);
  });
}

async function searchMovie(e) {
  e.preventDefault();

  const searchTerm = search.value;
  let name = document.querySelector("#intro-title");

  if (searchTerm) {
    async function searchText(url) {
      const fetchData = fetch(url)
        .then((response) => {
          //api call successful
          if (response.ok) {
            return response.json();
          } else {
            throw Error(response.statusText);
          }
        })
        .then((data) => {
          if (data.results.length === 0) {
            name.innerText = `Search Results for: ${searchTerm}`;
            let errorMsg = document.createElement("h5");
            name.parentNode.appendChild(errorMsg);
            errorMsg.innerText = "Oops! No Results were Found!";
          } else {
            name.innerHTML = `Search Results for: ${searchTerm}`;
          }
          showMovies(data.results);
        })
        .catch((err) => {
          console.warn("data fetching failed", err);
        });
    }
    console.log(searchText(SEARCHAPI + searchTerm));
  }
}

form.addEventListener("submit", searchMovie);


//dynamic paGE
function goto(id) {
  localStorage.setItem("movieId", id);
  window.location.href = "./id.html";
}

