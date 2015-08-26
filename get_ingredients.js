 (function() {
	var i
		, numIngredients
		, ingredients = [];

	var ingredientNodes = document.getElementsByClassName('ingredient');
	console.log("ingredientNodes.length: ", ingredientNodes.length);
	console.log("ingredientNodes: ", ingredientNodes);

	numIngredients = ingredientNodes.length;
	for (i=0; i < numIngredients; ++i) {
		ingredients.push(ingredientNodes.item(i).innerText);
	}
	console.log("ingredients.length: ", ingredients.length);
	console.log("ingredients: ", ingredients);

	//chrome.tabs.sendMessage()
	return JSON.stringify(ingredients);
})();