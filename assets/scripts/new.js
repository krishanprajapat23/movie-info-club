// const API =
//   "https://api.themoviedb.org/3/movie/now_playing?api_key=199f20ed7afdbe0b41908ed0ca3f6cff";
const apiKey = "199f20ed7afdbe0b41908ed0ca3f6cff";

const trending =
  `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`;


  const SEARCHAPI = `https://api.themoviedb.org/3/search/multi/?api_key=${apiKey}&language=en-US&page=1&query=`;
    
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
        console.log(data.results);
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
        first_air_date,
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
  
      movieEl.innerHTML = `
      <a class="id-url d-none" type="button" href="${
        window.location.href + "/#" + displayHash(id)
      }"></a>
      <div class="img-wrapper">
      <img src="${
        "https://image.tmdb.org/t/p//w500" + poster_path
      }" alt="${title}">
      </div>
      <span><span>Rating: </span>${vote_average.toFixed(1)}</span>
      <h5 class="title">${!title ? name : title}</h5>
      <span class="release-date">Released : ${first_air_date}</span>
              <p class="desc"><span>Plot : </span>${
                overview.length < 45
                  ? overview
                  : overview.slice(0, 90) + "<span>...</span>"
              }</p>
              `;
      showContent.appendChild(movieEl);
    });
  }

  function searchMovie(e) {
    e.preventDefault();
  
    const query = document.getElementById('intro-title');
    const searchTerm = search.value;
  
     query.innerText = `Showing result for "${searchTerm}"`
    
    if (searchTerm) {
      getMovies(SEARCHAPI + searchTerm);
      search.value = "";
    }
  }
  
  form.addEventListener("submit", searchMovie);
  
  //=========================================================
  function displayHash(id) {
    let theHash = window.location.hash;
    let currentUrl = window.location.href;
    if (theHash.length == 0) {
      theHash = id;
    }
  
    let elems = document.querySelectorAll(".id-url");
    window.location.assign = currentUrl + "/" + theHash;
    return id;
  }
  
  window.addEventListener("hashchange", function () {
    console.log("hashchange event");
    displayHash(id);
  });
  
  window.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event");
    displayHash();
  });
  