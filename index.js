//render function
function renderRecipes(recipeArray) {
  let recipeHTML = recipeArray.map(function (currentRecipe) {
    return `  <div class=recipe>
            <div class="card" style="width: 18rem;">
            <img src=${currentRecipe.image}>
            <div class="card-body">
              <h5 class="recipe-title">${currentRecipe.title}</h5>
              <p class="recipe-ingredients">${renderIngredients(
                currentRecipe.extendedIngredients
              )}</p>
              <p class="recipe-description">${renderSteps(
                currentRecipe.analyzedInstructions[0].steps
              )}</p>
            </div>
            </div>
          </div>`;
  });
  return recipeHTML.join("");
}

//render function for random cocktail:
function renderCocktail(cocktailArray) {
  let cocktailHTML = cocktailArray.map(function (currentCocktail) {
    let cocktailString = `  <div class=cocktail col-12 col-md-6">
            <div class="cocktail-card">
            <img src=${currentCocktail.strDrinkThumb}>
            <div class="card-body">
              <h5 class="cocktail-title">${currentCocktail.strDrink}</h5>`;

    // if else statements for displaying cocktail ingredients:
    if (
      currentCocktail.strIngredient1 != null &&
      currentCocktail.strMeasure1 != null
    ) {
      cocktailString += `<p>${currentCocktail.strMeasure1} ${currentCocktail.strIngredient1}</p>`;
    } else if (currentCocktail.strIngredient1 != null) {
      cocktailString += `<p>${currentCocktail.strIngredient1}</p>`;
    }
    if (
      currentCocktail.strIngredient2 != null &&
      currentCocktail.strMeasure2 != null
    ) {
      cocktailString += `<p>${currentCocktail.strMeasure2} ${currentCocktail.strIngredient2}</p>`;
    } else if (currentCocktail.strIngredient2 != null) {
      cocktailString += `<p>${currentCocktail.strIngredient2}</p>`;
    }
    if (
      currentCocktail.strIngredient3 != null &&
      currentCocktail.strMeasure3 != null
    ) {
      cocktailString += `<p>${currentCocktail.strMeasure3} ${currentCocktail.strIngredient3}</p>`;
    } else if (currentCocktail.strIngredient3 != null) {
      cocktailString += `<p>${currentCocktail.strIngredient3}</p>`;
    }
    if (
      currentCocktail.strIngredient4 != null &&
      currentCocktail.strMeasure4 != null
    ) {
      cocktailString += `<p>${currentCocktail.strMeasure4} ${currentCocktail.strIngredient4}</p>`;
    } else if (currentCocktail.strIngredient4 != null) {
      cocktailString += `<p>${currentCocktail.strIngredient4}</p>`;
    }
    if (
      currentCocktail.strIngredient5 != null &&
      currentCocktail.strMeasure5 != null
    ) {
      cocktailString += `<p>${currentCocktail.strMeasure5} ${currentCocktail.strIngredient5}</p>`;
    } else if (currentCocktail.strIngredient5 != null) {
      cocktailString += `<p>${currentCocktail.strIngredient5}</p>`;
    }
    cocktailString += `
              <div class="cocktail-instructions">
              ${currentCocktail.strInstructions}
              </div>
              </div>
            </div>
          </div>`;

    return cocktailString;
  });
  return cocktailHTML.join("");
}

//function for handling submit event
let handleSubmit = (event) => {
  event.preventDefault();
  console.log(event);
  console.log(event.target.cuisine.value);

  //fetch recipe API
  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=78d7dfa988514b18b52ac1ab9f833947&cuisine=${event.target.cuisine.value}&addRecipeInformation=true&fillIngredients=true`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      results.innerHTML = renderRecipes(data.results);
    });
};

function renderIngredients(ingredientsArray) {
  let ingredientsHTML = ingredientsArray.map(function (currentIngredient) {
    return `<p>${currentIngredient.original}</p>`;
  });
  return ingredientsHTML.join("");
}

function renderSteps(stepsArray) {
  let stepsHTML = stepsArray.map(function (currentStep) {
    return `<p>${currentStep.step}</p>`;
  });

  return stepsHTML.join("");
}

let handleButton = (event) => {
  console.log(event);

  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      cocktailBtn.innerHTML = renderCocktail(data.drinks);
    });
};
//adding event listener to cuisine submit button
let submit = document.getElementById("cuisine-form");
let results = document.getElementById("result");
let cocktailBtn = document.getElementById("cocktail");
cocktailBtn.addEventListener("click", handleButton);
submit.addEventListener("submit", handleSubmit);

const btn = document.querySelector(".btn-filmSearch");

//DOM DATA
function renderMovies(moviesArray) {
  let moviesHTML = moviesArray.map(function (currentMovie) {
    return `<div class="movie col-12 col-lg-6">
         <div class="card" >
         <img src=${"https://image.tmdb.org/t/p/w500"}${currentMovie.poster_path}>
         <div class="card-body">
         <h5 class="movie-title">${currentMovie.original_title}</h5>
    <p class="movie-summary"> ${currentMovie.overview}</p>
            </div>
            </div>
            </div>`;
  });

  function getRandomMovie(randomMovie) {
    let movie = moviesArray[Math.floor(Math.random() * moviesArray.length)];
    return randomMovie;
  }
  return moviesHTML.join("");
}

//ADD EVENT LISTENER AND FETCH API
btn.addEventListener("click", function () {
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=82e1848b816f617aaf08521963085a8e&language=en-US&page=1`
  )
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      let movies = document.getElementById("movie");
      movies.innerHTML = renderMovies(data.results);
    });
});
