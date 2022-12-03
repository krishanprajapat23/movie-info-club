let localId = localStorage.getItem("movieId");
const content = document.getElementById("content");

//api url
const info = `https://api.themoviedb.org/3/movie/${localId}?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=en-US`;


const vidUrl = `https://api.themoviedb.org/3/movie/${localId}/videos?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=en-US`;


// function to fetch api
async function getInfo(url) {
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
      showMovies(data);
      showVid(data);
    })
    .catch((err) => {
      console.warn("data fetching failed", err);
    });
}
getInfo(info);


// function to show data to dom
function showMovies(movie) {
//   console.log(movie);
  //for dynamic page title
  let titlePage = document.querySelector("title");
  titlePage.textContent = movie?.title;
  //=============================================================
  //page rendering the movie details
  const singleEl = document.createElement("div");
  const allGenre = movie.genres.map((genre) => genre.name);
  content.innerHTML = `
            <div class="row">
                <div class="col-lg-6">
                    <img class="poster-img" alt="" src="https://image.tmdb.org/t/p//w500/${movie?.poster_path.trim()}" />
                </div>
                <div class="col-lg-6">
                    <div class="content-main">
                        <h1 class="movie-title fw-bold py-2">${
                          movie?.title
                        }</h1>
                        <p class="para mb-2 fs-6 fw-normal"><strong>Tagline</strong> : ${
                          movie?.tagline
                        }</p>
                        <p class="para mb-2 fs-6 fw-normal"><strong>Status</strong> : ${
                          movie?.status
                        }</p>
                        <p class="para mb-2 fs-6 fw-normal"><strong>Runtime</strong> : ${
                          movie?.runtime
                        } minutes</p>
                        <p class="para mb-2 fs-6 fw-normal"><strong>Genre</strong> : ${allGenre}</p>
                        <p class="para mb-2 fs-6 fw-normal"><strong>Released on</strong> : ${
                          movie?.release_date
                        }</p>
                        <p class="para desc mb-2 fs-6 fw-normal"><strong>Storyline</strong> : ${
                          movie?.overview
                        }</p>

                    </div>
                </div>
            </div>              
        `;
  content.appendChild(singleEl);
}


// function to show youtube video
 function showVid() {
  async function getInfo() {
    try {
        const fetchData = await fetch(vidUrl)
      .then((response) => {
        //api call successful
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        let storeArrKey = data.results.map((x) => (x.type === "Trailer" ? x.key : null))
          .filter((x) => x !== null);
          console.log(storeArrKey[0]);
          const ytVid = `https://www.youtube.com/embed/${storeArrKey[0]}`;
          // console.log(ytVid);
          const nearEl = document.querySelector(".content-main");
          const iframe = document.createElement("iframe");
          iframe.src = ytVid;
          nearEl.parentNode.insertBefore(iframe, nearEl.nextSibling);

      })
    } catch (err) {
        console.warn("data fetching failed", err);
    }
  }
  getInfo();
}

