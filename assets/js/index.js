const apiKey = "ad5cf6c137508191f6fa6359d025a03e";
// const city = document.getElementbyId("userSearch").value.trim()
// const city = "toronto";
const searchFormEl = document.querySelector("#search-form");
const seachInputEl = document.querySelector("#userSearch");
const searchList = document.querySelector("#history");
const forecastContainer = document.querySelector("#forecast")
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
    var weatherIcon = weather.current.weather[0].icon
    

    var currentCityName = city
    var fiveDayWeather = weather.daily
    
    currentCityEl.textContent = currentCityName +" (" + currentDate + ")";
    
    var currentIcon = document.createElement("img");
    currentIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png")

    
    currentTempEl.textContent = "Temp: " + weather.current.temp + "°C"

    
    currentWindEl.textContent = "Wind: " +weather.current.wind_speed + " KM/H"

    
    currentHumidityEl.textContent = "Humidity: " + weather.current.humidity + " %"
    
    
    currentUvIndexEl.textContent = "UV Index: " + weather.current.uvi
    if (weather.current.uvi < 2) {
        currentUvIndexEl.classList.add("green")
    } else if (5 > weather.current.uvi > 2) {
        currentUvIndexEl.classList.add("yellow")
    } else if (7 > weather.current.uvi > 5) {
        currentUvIndexEl.classList.add("orange")
    }  else if (10 > weather.current.uvi > 7) {
        currentUvIndexEl.classList.add("red")
    }  else if (weather.current.uvi > 10) {
        currentUvIndexEl.classList.add("purple")
    }

    currentCityEl.appendChild(currentIcon)
    fivedayForecast(fiveDayWeather)
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
var fivedayForecast = function(weather) {
    forecastCards = document.querySelectorAll(".card")
    forecastArr = Array.from(forecastCards)
    if (forecastArr) {
        for (i=0; i < forecastArr.length; i++)
        forecastArr[i].remove();
    }
        for (i = 1; i < 6; i++) {
        
            var weatherIcon = weather[i].weather[0].icon
            dayId = document.createElement("div")
            dayId.classList.add("card")
    
            futureDate = document.createElement("h3")
            futureDate.textContent = moment().add(i, 'days').format("MM/DD/YYYY")
            futureDate.classList.add("five-day-container-item")
    
            futureTemp = document.createElement("p")
            futureTemp.textContent = "Temp: " + weather[i].temp.max + "°C"
    
            futureWind = document.createElement("p")
            futureWind.textContent = "Wind: " + weather[i].wind_speed + " KM/H"
    
            futureHumidity = document.createElement("p")
            futureHumidity.textContent = "Humidity: " + weather[i].humidity + " %"
    
            futureIcon = document.createElement("img")
            futureIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png")
    
            
            dayId.appendChild(futureDate);
            dayId.appendChild(futureIcon);
            dayId.appendChild(futureTemp);
            dayId.appendChild(futureWind);
            dayId.appendChild(futureHumidity);
            forecastContainer.appendChild(dayId);         
        };
    };

searchFormEl.addEventListener("submit", formSubmitHandler)

