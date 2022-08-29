console.log("Hello? Its me...");

function addRecipe(id) {
  let request = fetch(`/api/addrecipe/${id}`, {
    method: "POST",
    headers: { "x-access-token": `Bearer ${window.userToken}` },
  }).then((response) => {
    alert(`${id} has been added to your Recipe book.`);
    console.log(response);
  });
}
function RecipeById(id) {
    recipe_number = document.getElementById(id).value;
    console.log(`The id being passed to RecipeById is: ${recipe_number}`)
    RandomRecipe(recipe_number);
}
async function RandomRecipe(id) {
    console.log(`HIIIIIIIIIII id is ${id}`);
  if (id == 0) {
    console.log('HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
    console.log(id)
    let request = fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("NETWORK RESPONSE ERROR");
        }
      })
      .then((recipe) => {
        console.log(recipe);
        displayRecipe(recipe);
      })
      .catch((error) => console.error("FUNKY FETCH ERROR:", error));
  } else {
    let request = fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    )
      .then((response) => {
        if (response.ok) {
          console.log('Is this happening too?');
        //   console.log(recipe)
        //   console.log(id)
          return response.json();
        } else {
          throw new Error("NETWORK RESPONSE ERROR");
        }
      })
      .then((recipe) => {
        console.log(recipe);
        displayRecipe(recipe);
      })
      .catch((error) => console.error("FUNKY FETCH ERROR:", error));
  }
}
function displayRecipe(recipe) {
  const recipe_name = recipe.meals[0].strMeal;
  const recipe_id = recipe.meals[0].idMeal;
  const recipe_img = recipe.meals[0].strMealThumb;
  const recipe_instructions = recipe.meals[0].strInstructions;
  const ingredients = [];
  const measures = [];
//   console.log(recipe.meals[0].strMeasure1)  
  ingredients.push(recipe.meals[0].strIngredient1);
  ingredients.push(recipe.meals[0].strIngredient2);  
  ingredients.push(recipe.meals[0].strIngredient3);
  ingredients.push(recipe.meals[0].strIngredient4);
  ingredients.push(recipe.meals[0].strIngredient5);
  ingredients.push(recipe.meals[0].strIngredient6);
  ingredients.push(recipe.meals[0].strIngredient7);
  ingredients.push(recipe.meals[0].strIngredient8);
  ingredients.push(recipe.meals[0].strIngredient9);
  ingredients.push(recipe.meals[0].strIngredient10);
  ingredients.push(recipe.meals[0].strIngredient11);
  ingredients.push(recipe.meals[0].strIngredient12);
  ingredients.push(recipe.meals[0].strIngredient13);
  ingredients.push(recipe.meals[0].strIngredient14);
  ingredients.push(recipe.meals[0].strIngredient15);
  ingredients.push(recipe.meals[0].strIngredient16);
  ingredients.push(recipe.meals[0].strIngredient17);
  ingredients.push(recipe.meals[0].strIngredient18);
  ingredients.push(recipe.meals[0].strIngredient19);
  ingredients.push(recipe.meals[0].strIngredient20);

  measures.push(recipe.meals[0].strMeasure1);
  measures.push(recipe.meals[0].strMeasure2);  
  measures.push(recipe.meals[0].strMeasure3);
  measures.push(recipe.meals[0].strMeasure4);
  measures.push(recipe.meals[0].strMeasure5);
  measures.push(recipe.meals[0].strMeasure6);
  measures.push(recipe.meals[0].strMeasure7);
  measures.push(recipe.meals[0].strMeasure8);
  measures.push(recipe.meals[0].strMeasure9);
  measures.push(recipe.meals[0].strMeasure10);
  measures.push(recipe.meals[0].strMeasure11);
  measures.push(recipe.meals[0].strMeasure12);
  measures.push(recipe.meals[0].strMeasure13);
  measures.push(recipe.meals[0].strMeasure14);
  measures.push(recipe.meals[0].strMeasure15);
  measures.push(recipe.meals[0].strMeasure16);
  measures.push(recipe.meals[0].strMeasure17);
  measures.push(recipe.meals[0].strMeasure18);
  measures.push(recipe.meals[0].strMeasure19);
  measures.push(recipe.meals[0].strMeasure20);

  console.log(`Recipe name: ${recipe_name}, recipe id: ${recipe_id}`);
  console.log(`Measure: ${measures[0]}, Ingredient: ${ingredients[0]}`);

  const recipeDiv = document.getElementById("RecipeDiv");
  let displayHTML = `<li class="list-group-item"><h5>Recipe Name: ${recipe_name}</h5></li>`;
  displayHTML += `<li class="list-group-item"><button class="btn btn-primary btn-block mt-2" onclick="addRecipe(${recipe_id})">Add to my Recipe Book</button></li>`;
  displayHTML += `<li class="list-group-item"><h6>Recipe ID: ${recipe_id}</h6></li>`;
  displayHTML += `<li><img src=${recipe_img}></li>`;
  for (i=0; i < 20; i++) {
    if (ingredients[i]) {
        displayHTML += `<li>${measures[i]}   ${ingredients[i]}</li>`
    }
  }
  displayHTML += `<li>${recipe_instructions}</li>`;

  recipeDiv.innerHTML = displayHTML;
}
// RandomRecipe();