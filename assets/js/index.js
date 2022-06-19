const apiKey = "ad5cf6c137508191f6fa6359d025a03e";
// const city = document.getElementbyId("userSearch").value.trim()
// const city = "toronto";
const searchFormEl = document.querySelector("#search-form");
const seachInputEl = document.querySelector("#userSearch");
const searchList = document.querySelector("#history");
const currentDate = moment().format("MM/DD/YYYY");
const currentCityEl = document.getElementById("currentCity");
const currentTempEl = document.getElementById("currentTemp");
const currentWindEl = document.getElementById("currentWind");
const currentHumidityEl = document.getElementById("currentHumidity");
const currentUvIndexEl = document.getElementById("currentUvindex");






var getCityCoordinates = function(city, apiKey) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            getCityWeather(lat, lon, city);
        });
    }); 
};

var getCityWeather = function(lat, lon, city){
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + apiKey + "&units=metric";

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            displayCurrentWeather(data, city);
        });
    });
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = seachInputEl.value.trim();

    if (city) {
        getCityCoordinates(city, apiKey);
        searchHistory(city)
        seachInputEl.value = ""
    } else {
        alert("Please enter a city");
    }
}
var displayCurrentWeather = function(weather, city){

    var currentCityName = city
    
    currentCityEl.textContent = currentCityName +" (" + currentDate + ")";

    
    currentTempEl.textContent = "Temp: " + weather.current.temp + "°C"

    
    currentWindEl.textContent = "Wind: " +weather.current.wind_speed + "KM/H"

    
    currentHumidityEl.textContent = "Humidity: " + weather.current.humidity + " %"
    
    
    currentUvIndexEl.textContent = "UV Index: " + weather.current.uvi

}
var searchHistory = function(city) {
    var searchTerm = city;
    var searchHistoryBtn = document.createElement("button");
    searchHistoryBtn.textContent = searchTerm;
    searchHistoryBtn.setAttribute("id", searchTerm);
    searchHistoryBtn.classList = "historyBtn"
    searchList.appendChild(searchHistoryBtn);
    searchHistoryBtn.addEventListener("click", () => {getCityCoordinates(searchTerm, apiKey)})
}

searchFormEl.addEventListener("submit", formSubmitHandler)

