const movies = [
  {
    title: "Oppenheimer",
    description:
      "Durante la Segunda Guerra Mundial, el teniente general Leslie Groves designa al físico J. Robert Oppenheimer para un grupo de trabajo que está desarrollando el Proyecto Manhattan, cuyo objetivo consiste en fabricar la primera bomba atómica.",
    year: 2023,
  },
  {
    title: "The Batman",
    description:
      "Batman explora la corrupción existente en la ciudad de Gotham y el vínculo de esta con su propia familia. Además, entra en conflicto con un asesino en serie conocido como 'el Acertijo'.",
    year: 2022,
  },
  {
    title: "The Diplomat",
    description:
      "The Diplomat es un thriller político indio en hindi de 2025, dirigido por Shivam Nair y escrito por Ritesh Shah. La película, protagonizada por John Abraham y Sadia Khateeb, se ambienta en las relaciones entre India y Pakistán, explorando temas de diplomacia y los conflictos personales que enfrentan los diplomáticos.",
    year: 2025,
  },
];

const movieList = document.getElementById("movieList");
const searchTitle = document.getElementById("searchTitle");
const yearFilter = document.getElementById("yearFilter");
const addMovieForm = document.getElementById("addMovieForm");
const homeView = document.getElementById("homeView");
const addView = document.getElementById("addView");

// RF1 - Mostrar peliculas

function renderMovies(list) {
  movieList.innerHTML = "";

  if (list.length === 0) {
    movieList.innerHTML = "<p>No se encontraron películas.</p>";
    return;
  }

  list.forEach(({ title, description, year }) => {
    const card = `
                <div class="movie-card">
                <h3>${title} (${year})</h3>
                <p>${description}</p>
                </div>
            `;
    movieList.innerHTML = movieList.innerHTML.concat(card); //inserto tarjeta en el contenedor
  });
}

renderMovies(movies);

// Funcion para cargar años únicos al filtro
function updateYearFilter() {
  yearFilter.innerHTML = `<option value="">Año de estreno</option>`;

  const uniqueYears = [...new Set(movies.map((movie) => movie.year))].sort(
    (a, b) => b - a
  );

  uniqueYears.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
  });
}

updateYearFilter(); //muestra los años

//RF2 - Buscar por titulo
searchTitle.addEventListener("input", () => {
  const searchValue = searchTitle.value.toLowerCase();

  const filtered = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchValue)
  );
  renderMovies(filtered);
});

//RF3 - Filtrar por año
yearFilter.addEventListener("change", () => {
  const selectYear = yearFilter.value;

  if (selectYear === "") {
    renderMovies(movies);
    return;
  }

  const filtered = movies.filter((movie) => {
    return movie.year.toString() === selectYear;
  });

  renderMovies(filtered);
});

//RF4 - Agregar nueva pelicula
addMovieForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const year = document.getElementById("year").value.trim();

  if (!title || !description || !year) {
    //valido
    alert("Todos los campos son obligatorios.");
    return;
  }

  const newMovie = {
    title,
    description,
    year: parseInt(year),
  };
  movies.push(newMovie); // agrego al arraay
  renderMovies(movies); // actualizo el listado
  updateYearFilter(); // actualizo filtro por año

  addMovieForm.reset();
  history.pushState({}, "", "#home"); //actualiza la url
  renderView("home"); //cambia la vista
});

// Cambiar de vista SPA
function renderView(hash) {
  history.pushState({}, "", `#${hash}`); //guarda el historial

  homeView.style.display = "none";
  addView.style.display = "none";

  if (hash === "add") {
    addView.style.display = "block"; //muestro formulario
  } else if (hash === "home" || hash === "") {
    searchTitle.value = ""; //limpia la barra de busqueda
    yearFilter.value = ""; // limpia el filtro
    homeView.style.display = "block"; //muestro lista de peliculas
    renderMovies(movies);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const currentView = location.hash.slice(1) || "home"; //queda con el hash actual o home
  renderView(currentView);
});

window.addEventListener("hashchange", () => {
  const newView = location.hash.slice(1);
  renderView(newView);
});
