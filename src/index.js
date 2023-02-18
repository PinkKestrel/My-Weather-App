function displayDay(today) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[today.getDay()];
  let currentHour = today.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = today.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let dayLine = document.querySelector("#current-day");
  dayLine.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`;
}

displayDay(new Date());

function displayTemperature(response) {
  console.log(response.data);
  let city = response.data.name;
  let weather = response.data.weather[0].main;
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let windSpeed = Math.round((response.data.wind.speed / 1000) * 3600);

  let currentCityElement = document.querySelector("#current-city");
  let currentWeatherElement = document.querySelector("#current-weather");
  let currentTempElement = document.querySelector("#current-temp");
  let currentHumidityElement = document.querySelector("#current-humidity");
  let windSpeedElement = document.querySelector("#wind-speed");

  currentCityElement.innerHTML = city;
  currentWeatherElement.innerHTML = weather;
  currentTempElement.innerHTML = `${temperature} °C`;
  currentHumidityElement.innerHTML = `Humidity: ${humidity}%`;
  windSpeedElement.innerHTML = `Wind speed: ${windSpeed} km/h`;
}
function getCityWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city");
  let searchCity = cityInput.value;
  let apiKey = "3dce9b1c66837262a25b3f448d354a76";
  let units = "metric";
  let localWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=${units}`;

  axios.get(localWeatherUrl).then(displayTemperature);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", getCityWeather);

/*function displayCity(event) {
  event.preventDefault();
  let cityLine = document.querySelector("#current-city");
  let userCity = document.querySelector("#enter-city");
  cityLine.innerHTML = userCity.value;
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", displayCity);

let celsiusLink = document.querySelector("#to-celsius");
let fahrenheitLink = document.querySelector("#to-fahrenheit");
celsiusLink.addEventListener("click", displayCelsius);
fahrenheitLink.addEventListener("click", displayFahrenheit);

function displayCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "16";
}
function displayFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "61";
}
/*function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

/*Homework Week 3:
let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  oslo: {
    temp: -5,
    humidity: 20
  }
};

let userCityName = prompt("Enter a city");
let cityKey = userCityName.trim().toLowerCase();
let cityWeather = weather[cityKey];

function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

if (cityWeather !== undefined) {
  let tempCelsius = Math.round(cityWeather.temp);
  alert(
    `It is currently ${tempCelsius}°C (${celsiusToFahrenheit(
      tempCelsius
    )}°F) in ${userCityName.trim()} with a humidity of ${cityWeather.humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${cityKey}`
  );
}
*/
