// From the <form> element, listen to the "submit"
var searchBtn = $("#searchBtn");
// From the <button> container element, listen to the <button> "click"
searchBtn.click(renderWeather);

// Select <input>, get its value, and provide it to the geo API
var cityName = $("#cityInput");  

// Fetch the geo data (lat, lon) (city name) http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
function geoData(cityName){

    var url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=949ac09a20eff646d7416ecc12078edc`;
    // q = Name of the city as a query string (key value pairs)
    // limit = 5 cities (optional parameter)
    // appid = Your custom API key (make an account and then add it here) 949ac09a20eff646d7416ecc12078edc
    fetch( url )
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            // console.log(data);

            oneCall( data[0].lat, data[0].lon ); // Call oneCall here so that we are waiting for the data from the city name

        })

};

    
// Fetch the one call weather data
function oneCall(lat,lon){

    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=949ac09a20eff646d7416ecc12078edc`;
    // units = imperial
    // exclude = minutely,hourly
    fetch( url )
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            console.log(data);
            
            // Render the day of weather
            var dailyWeatherEl = $("#dailyWeather");
            var forecastEl = $("#forecastContainer")

            dailyWeatherEl.html("");
            dailyWeatherEl.append(`
                <li class="collection-header"><h4>${cityName.val()} <img src="http://openweathermap.org/img/w/${data.daily[0].weather[0].icon}.png" alt="weather icon"> ${moment().format("dddd, MMMM Do")}</h4></li>
                <li class="collection-item">Temp: ${Math.round((data.daily[0].temp.day -273.15)*(9/5)+32)} °F</li>
                <li class="collection-item">Wind: ${data.daily[0].wind_speed} MPH</li>
                <li class="collection-item">Humidity: ${data.daily[0].humidity} %</li>
                `);

            // Modify text color of UV index depending on value
            if (data.daily[0].uvi < 2) {
                dailyWeatherEl.append(`
                <li class="collection-item favorable">UV Index: ${data.daily[0].uvi}</li>
                `);
            } else if (data.daily[0].uvi < 5) {
                dailyWeatherEl.append(`
                <li class="collection-item moderate">UV Index: ${data.daily[0].uvi}</li>
                `);
            } else {
                dailyWeatherEl.append(`
                <li class="collection-item severe">UV Index: ${data.daily[0].uvi}</li>
                `);
            };

            // Render the 5-day forecast
            forecastEl.html("");
            for (var i=1; i<6; i++) {
            forecastEl.append(`
                <div class="col s2.5">
                    <div class="row">
                        <div class="col s12">
                            <div class="card-panel blue darken-2">
                            <span class="white-text forecastCards">
                            <li class="collection-header"><h5>${moment().add(i,'days').format("M/D/YYYY")}</h5></li>
                            <li class="collection-header"><img src="http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png" alt="weather icon"></li>
                            <li class="collection-item">Temp: ${Math.round((data.daily[i].temp.day -273.15)*(9/5)+32)} °F</li>
                            <li class="collection-item">Wind: ${data.daily[i].wind_speed} MPH</li>
                            <li class="collection-item">Humidity: ${data.daily[i].humidity} %</li>
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            `)};

        })

};


// Print/Render the weather data to the page and save searches
function renderWeather(event){
    // stops the page from refreshing automatically
    event.preventDefault();
    // console.log(event.target);
    
    // Calls geoData on city 
    geoData(cityName.val());

    // save searches
    saveCities();

};

// Move the creation of the cityBtns into a function
// Declare variables
var cityBtns = $("#city-buttons")
var prevCitySearch = cityName.val(); 
var prevCities = {
    searchHistory: prevCitySearch,
};

function saveCities() {
    // And previous search buttons to cityBtns container
    cityBtns.append(
        `<button data-city=${cityName.val()} class="prevCity btn blue darken-2">${cityName.val()}</button>
        <br>`
    )
    // Event Listener for the new city buttons
    var previousCityBtns = document.getElementsByClassName("prevCity");
    console.log(previousCityBtns);
    for (var i=0; i < previousCityBtns.length; i++) {
        previousCityBtns[i].click(renderWeatherAgain);
    };
    
    // Store prevCitySearch searches
    localStorage.setItem(prevCitySearch,JSON.stringify(prevCities));
}


// Get the city from the button's innertext
function renderWeatherAgain(event){
    console.log(event.target);
    event.preventDefault();
    console.log(event.target);
    console.log("clicking prevCity");
    geoData(event.target.innerText);
};



// get previous city searches from local storage
function getPrevCities() {
    var prevCitiesData = [];

    for (var i=0; i<5; i++) {
        //grab the data
        var prevCities = JSON.parse(localStorage.getItem(i));
        // console.log(prevCities);

        // Does local storage contain data
        if (prevCities) {
            prevCitiesData.push(prevCities);
        };
    }
    return prevCitiesData;
};

getPrevCities();