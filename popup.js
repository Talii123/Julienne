
var MIN_DELAY = 0;
var startTime;

function handleResponse(ingredients) {
  var responseTime = new Date().getTime()
      , timeToWait = MIN_DELAY - (responseTime - startTime)
      ;

  if (timeToWait > 0) {
    setTimeout(function() {
      receiveIngredients(ingredients);
    }, timeToWait)
  }
  else {
    receiveIngredients(ingredients);
  }
}

function receiveIngredients(ingredients) {
  ingredients = JSON.parse(ingredients);
  if (ingredients.length) {
    document.getElementById('Body').value = document.getElementById('main').innerText = ingredients.join('\n');    
    document.getElementById('twilio').style.display = 'block';
  }
  else {
    document.getElementById('main').innerText = "I'm sorry I couldn't find any ingredients for you :(";
  }
}

function getIngredients() {
  startTime = new Date().getTime();
  chrome.tabs.executeScript(null, {file: "get_ingredients.js"}, handleResponse);
}

function callTwilio() {
  console.log('Calling Twilio...');
  $('.error').text(''); // clear out any previous errors

  var toNumber = 
     '+' + 
      $('#countryCode').val() +
      $('#areaCode').val() +
      $('#number3').val() +
      $('#number4').val()
    , data = {
      'To' : toNumber
      , 'Body' : $('#Body').val()
      , 'Format' : 'json'
    }
    ;

  // simulate random errors
  /*if (new Date().getTime() % 2 == 0) {
    data.testFailureCode = 503
  }*/

  $('#To').val(toNumber);

  $.post('https://twiliorelayserver.appspot.com/relay',
    data
    , onTwilioSuccess
  ).fail(onTwilioFailure);
}

function onTwilioSuccess() {
  console.log('\n\n Twilio succeeded!! \n\n');
  var $twilio = $('#twilio');
  $twilio.find('.request').hide();
  $twilio.find('.response').show();
}

function onTwilioFailure() {
  console.log('\n\n Twilio FAILED!! \n\n');
  $('.error').text('Oops! I wasn\'t able to text you the ingredients :( ');
}

document.addEventListener('DOMContentLoaded', function() {
  $('#callTwilioBtn').click(callTwilio);

  getIngredients();
}, false);