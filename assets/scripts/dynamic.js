
let localId = localStorage.getItem("movieId");
// let localName = localStorage.getItem("moviename");
// let localImg = localStorage.getItem("movieimg");
// let localDesc = localStorage.getItem("storyline");
// let localDate = localStorage.getItem("releasedate");



const info =
    `https://api.themoviedb.org/3/movie/${localId}?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=en-US`


const vidUrl =
    `https://api.themoviedb.org/3/movie/${localId}/videos?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=en-US`;


async function getVid() {
    const fetchData = await fetch(vidUrl).then((response) => {
            //api call successful
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then((data) => {
            //json from our response
            console.log('-----', data.results);
            //search reesult with name of search query
            showVid(data.results);
        })
        .catch((err) => {
            console.warn("data fetching failed", err);
        });
}

function showVid(data) {
    console.log(data)
}

showVid()
async function getInfo(url) {
    const fetchData = await fetch(url).then((response) => {
            //api call successful
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then((data) => {
            //json from our response
            console.log('-----', data.results);
            //search reesult with name of search query
            showMovies(data);
        })
        .catch((err) => {
            console.warn("data fetching failed", err);
        });

}
getInfo(info)

function showMovies(data) {
    console.log(data)
}

function showMovies(data) {
    data.forEach((movie) => {
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
        console.log(movie, '+++++')
        const movieEl = document.createElement("div");
        movieEl.className = "movie col-md-4 col-lg-3 col-sm-6";

        content.innerHTML = `
            <div class="row">
                <div class="col-lg-6">
                    <img class="poster-img" alt="" src="https://image.tmdb.org/t/p//w500"+${poster_path.trim()}" />
                </div>
                <div class="col-lg-6">
                    <div class="content-main">
                        <h1 class="movie-title fw-bold py-2">Title : ${localName}</h1>
                        <p class="para fs-6 fw-normal"><strong>Released on</strong> : ${localDate}</p>
                        <p class="para fs-6 fw-normal"><strong>Storyline</strong> : ${localDesc}</p>

                    </div>
                </div>
            </div>              
        `;
        showContent.appendChild(movieEl);
    });
}


showMovies()