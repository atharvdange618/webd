let userInput = document.querySelector('.container .search-box input');
let cocktailImg = document.querySelector('.container .info-box .cocktail-img img');
let cocktailNameText = document.querySelector('.container .info-box .cocktail-name .cocktail');
let ingredientsBox = document.querySelector('.container .ingredients');
let instruction = document.querySelector('.container .instruction');
let infoBox = document.querySelector('.container .info-box');
let dispMsg = document.querySelector('.container .display-msg');

userInput.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        if (userInput.value != '') {
            getCocktailInfo(userInput.value);
        }
    }
})

let getCocktailInfo = (cocktailName) => {
    ingredientsBox.innerHTML = '';
    infoBox.style.display = 'block';
    dispMsg.style.display = 'none';
    let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
    fetch(url + cocktailName).then(res => res.json()).then(data => {
        let myCocktail = data.drinks[0];
        cocktailImg.src = myCocktail.strDrinkThumb;
        cocktailNameText.innerHTML = `<i class="fa-solid fa-martini-glass-citrus"></i> <span>${myCocktail.strDrink}</span>`;
        let count = 1;
        let ingredients = [];

        for (let i in myCocktail) {
            let ingredient = '';
            let measure = '';

            if (i.startsWith('strIngredient') && myCocktail[i]) {
                ingredient = myCocktail[i];
                measure = myCocktail['strMeasure' + count];
                count += 1;
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        let ul = document.createElement('ul');
        ingredients.forEach((ingredient) => {
            let child = document.createElement('li');
            child.innerHTML = ingredient;
            ul.appendChild(child)
            ingredientsBox.appendChild(ul)
        })
        instruction.innerHTML = myCocktail.strInstructions;
    })
}