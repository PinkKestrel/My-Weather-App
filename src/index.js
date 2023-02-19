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

  let dayOne = document.querySelector("#day1");
  dayOne.innerHTML = days[(today.getDay() + 1) % days.length];
  let dayTwo = document.querySelector("#day2");
  dayTwo.innerHTML = days[(today.getDay() + 2) % days.length];
  let dayThree = document.querySelector("#day3");
  dayThree.innerHTML = days[(today.getDay() + 3) % days.length];
  let dayFour = document.querySelector("#day4");
  dayFour.innerHTML = days[(today.getDay() + 4) % days.length];
  let dayFive = document.querySelector("#day5");
  dayFive.innerHTML = days[(today.getDay() + 5) % days.length];
}

displayDay(new Date());

function displayTemperature(response) {
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

  axios.get(localWeatherUrl).then(displayTemperature);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCityWeather);
getCityWeather("Madrid");
