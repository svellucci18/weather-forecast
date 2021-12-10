// From the <form> element, listen to the "submit"
var searchBtn = $("#searchBtn");

searchBtn.click(renderWeather);

    // Select <input>, get its value, and provide it to the geo API

// From the <button> container element, listen to the <button> "click"

    // Get the city from the button's data attribute

// Fetch the geo data (lat, lon) (city name) http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
function geoData(cityName){

    var url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=949ac09a20eff646d7416ecc12078edc`;

    fetch( url )
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            console.log(data);

            oneCall( data[0].lat, data[0].lon ); // Call oneCall here so that we are waiting for the data from the city name

        })

}

    // q = Name of the city as a query string (key value pairs)
    // limit = 5 cities (optional parameter)
    // appid = Your custom API key (make an account and then add it here) 949ac09a20eff646d7416ecc12078edc

// Fetch the one call weather data

    // lat
    // lon
    // appid
    // units = imperial
    // exclude = minutely,hourly

function oneCall(lat,lon){

    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=949ac09a20eff646d7416ecc12078edc`;

    fetch( url )
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            console.log(data);
            
            // Render the weather data to the page
            // Print the daily weather
            var dailyWeatherEl = $("#dailyWeather");

            dailyWeatherEl.html("");
            dailyWeatherEl.append( 
                `<li class="collection-header"><h4>${cityName.val()} ${moment().format("dddd, MMMM Do")}</h4></li>
                <li class="collection-item">Temp: ${data.daily[0].temp.max}</li>
                <li class="collection-item">Wind:</li>
                <li class="collection-item">Humidity:</li>
                <li class="collection-item">UV Index:</li>`);

        })

}
    
// Print/Render the weather data to the page and save searches
var cityName = $("#cityInput");

function renderWeather(event){
    console.log(event.target);
    geoData(cityName.val());

    var cityBtns = $("#city-buttons")

    cityBtns.append(
        `<button data-city=${cityName.val()} class=" prevCity btn blue darken-2">${cityName.val()}</button>
        <br>`
    )
};

function renderWeather2(event){
    console.log(event.target);
    geoData(event.target.innerText);
};

// Event Listener for the new city buttons
var previousCityBtn = document.querySelectorAll(".prevCity");
for (var i=0; i < previousCityBtn.length; i++) {
    previousCityBtn[i].click(renderWeather2);
}
