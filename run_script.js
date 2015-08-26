
alert('running scripts!');

function receiveIngredients(ingredients) {
	ingredients = ingredients.join(', \n');
 	//alert("Received ingredients: "+ingredients);
 	document.getElementById('main').innerText = ingredients;
}

// chrome.runtime.onMessage.addListener(function (ingredients) {
// 	alert("Received ingredients: "+ingredients.join(', \n'));
// });
chrome.tabs.executeScript(null, {file: "get_ingredients.js"}, receiveIngredients);
