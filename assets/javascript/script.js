// From the <form> element, listen to the "submit"
var searchBtn = $("#searchBtn");
// From the <button> container element, listen to the <button> "click"
searchBtn.click(renderWeather);

// Select <input>, get its value, and provide it to the geo API
var cityNameEl = $("#cityInput");  
var cityName = "";

// Fetch the geo data (lat, lon) (city name) http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
function geoData(city){

    var url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=949ac09a20eff646d7416ecc12078edc`;
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
            console.log(cityName);
            dailyWeatherEl.append(`
                <li class="collection-header"><h4>${cityName} <img src="http://openweathermap.org/img/w/${data.daily[0].weather[0].icon}.png" alt="weather icon"> ${moment().format("dddd, MMMM Do")}</h4></li>
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
    
    cityName = cityNameEl.val()
    console.log(cityName);
    // Calls geoData on city 
    geoData(cityName);

    // save searches
    saveCities();

};

// Move the creation of the cityBtns into a function
var cityBtns = $("#city-buttons")
var previousCityBtns = document.getElementsByClassName("prevCity");

function saveCities() {
    var prevCitySearch = cityNameEl.val(); 
    var prevCities = {
        searchHistory: prevCitySearch,
    };
    // And previous search buttons to cityBtns container
    cityBtns.append(
        `<button data-city=${cityNameEl.val()} class="prevCity btn blue darken-2">${cityNameEl.val()}</button>
        <br>`
    )
    
    // Event Listener for the new city buttons
    cityBtns.click(renderWeatherAgain);
    
    // Store prevCitySearch searches
    localStorage.setItem(prevCitySearch,JSON.stringify(prevCities));
    console.log(localStorage);
}


// Get the city from the button's innertext
function renderWeatherAgain(event){
    event.preventDefault();
    console.log(event.target.innerText);
    // $("#cityInput") = "";
    $("#cityInput").append(event.target.innerText); //This isn't doing what I want it to do
    cityName = event.target.innerText;
    geoData(cityName);
    console.log(cityNameEl.val());
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

// checks if local storage was empty and if not populates buttons with previous searches
function populatePrevCitySearches() {
    // Calls getPrevCities to check if data is stored
    var storedCities = getPrevCities();

    if (storedCities.length == 0) {
        return
    }
    
    // Assign Data to buttons
    storedCities.map(storedCity => { // storedCity is being declared in this anonymous function
        $(`button [data-city='${storedCity.prevCitySearch}']`).val(storedCity.prevCitySearch);
    })
    
}

populatePrevCitySearches();