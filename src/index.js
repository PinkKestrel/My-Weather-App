function displayDay(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let dayLine = document.querySelector("#current-day");
  dayLine.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`;

  let dayOne = document.querySelector("#day1");
  dayOne.innerHTML = days[(date.getDay() + 1) % days.length].slice(0, 3);
  let dayTwo = document.querySelector("#day2");
  dayTwo.innerHTML = days[(date.getDay() + 2) % days.length].slice(0, 3);
  let dayThree = document.querySelector("#day3");
  dayThree.innerHTML = days[(date.getDay() + 3) % days.length].slice(0, 3);
  let dayFour = document.querySelector("#day4");
  dayFour.innerHTML = days[(date.getDay() + 4) % days.length].slice(0, 3);
  let dayFive = document.querySelector("#day5");
  dayFive.innerHTML = days[(date.getDay() + 5) % days.length].slice(0, 3);
  let daySix = document.querySelector("#day6");
  daySix.innerHTML = days[(date.getDay() + 6) % days.length].slice(0, 3);
}
function getForecast(coordinates) {
  let apiKey = "3dce9b1c66837262a25b3f448d354a76";
  let weeklyWeatherUrl = `https:api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  //console.log(weeklyWeatherUrl);

  axios.get(weeklyWeatherUrl).then(displayWeeklyWeather);
}
function displayWeeklyWeather(response) {
  console.log(response.data);
}
function displayWeather(response) {
  //console.log(response.data);
  let city = response.data.name;
  let weather = response.data.weather[0].description;
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let windSpeed = Math.round((response.data.wind.speed / 1000) * 3600);

  celsiusTemperature = response.data.main.temp;

  let currentCityElement = document.querySelector("#current-city");
  let currentWeatherElement = document.querySelector("#current-weather");
  let currentTempElement = document.querySelector("#current-temp");
  let currentHumidityElement = document.querySelector("#current-humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let todayIconElement = document.querySelector("#today-icon");
  let weatherIcon = response.data.weather[0].icon;

  currentCityElement.innerHTML = city;
  currentWeatherElement.innerHTML = weather;
  currentTempElement.innerHTML = temperature;
  currentHumidityElement.innerHTML = `Humidity: ${humidity}%`;
  windSpeedElement.innerHTML = `Wind speed: ${windSpeed} km/h`;
  todayIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
  todayIconElement.setAttribute("alt", response.data.weather[0].description);

  displayDay(response.data.dt * 1000);
  getForecast(response.data.coord);
}
function searchCityWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city");
  let searchCity = cityInput.value;
  getCityWeather(searchCity);
}

function getCityWeather(city) {
  let apiKey = "3dce9b1c66837262a25b3f448d354a76";
  let units = "metric";
  let localWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(localWeatherUrl).then(displayWeather);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let currentTempElement = document.querySelector("#current-temp");
  currentTempElement.innerHTML = Math.round(fahrenheitTemperature);
  //let celsiusLink = document.querySelector("#to-celsius");
  //let fahrenheitLink = document.querySelector("#to-fahrenheit");
  celsiusLink.classList.remove("link-selected");
  fahrenheitLink.classList.add("link-selected");
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  let currentTempElement = document.querySelector("#current-temp");
  currentTempElement.innerHTML = Math.round(celsiusTemperature);
  //let celsiusLink = document.querySelector("#to-celsius");
  //let fahrenheitLink = document.querySelector("#to-fahrenheit");
  celsiusLink.classList.add("link-selected");
  fahrenheitLink.classList.remove("link-selected");
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCityWeather);
getCityWeather("Madrid");

let celsiusTemperature = null;
let celsiusLink = document.querySelector("#to-celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);
let fahrenheitLink = document.querySelector("#to-fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);
