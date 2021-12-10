// From the <form> element, listen to the "submit"

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

            oneCall( /* provide lat and lon here */ ); // Call oneCall here so that we are waiting for the data from the city name

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

        })

}
    

// Print/Render the weather data to the page