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

  getWeekdays(date.getDay());
}
function getWeekdays(today) {
  let daysNumber = [1, 2, 3, 4, 5, 6];
  let daysWeekElement = document.querySelector("#daysWeek");
  let daysWeekHTML = `<div class="row">`;
  daysNumber.forEach(function (day) {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let newDay = days[(today + day) % days.length];
    daysWeekHTML =
      daysWeekHTML +
      `<div class="col-2">
          <div> ${newDay} </div>`;

    daysWeekHTML = daysWeekHTML + `</div>`;
    daysWeekElement.innerHTML = daysWeekHTML;
    console.log(daysWeekHTML);
  });
}

function getForecast(coordinates) {
  let apiKey = "3dce9b1c66837262a25b3f448d354a76";
  let weeklyWeatherUrl = `https:api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  //console.log(weeklyWeatherUrl);

  axios.get(weeklyWeatherUrl).then(displayWeeklyWeather);
}
function displayWeeklyWeather(response) {
  //console.log(response.data);
  let weekForecastElement = document.querySelector("#weekForecast");
  let numbers = [1, 2, 3, 4, 5, 6];
  let weekForecastHTML = `<div class="row">`;
  numbers.forEach(function (number) {
    weekForecastHTML =
      weekForecastHTML +
      `
      <div class="col-2">
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="temp-max"> 18 </span> <span class="temp-min"> 12 </span>
        </div>
      </div>
  `;
  });
  weekForecastHTML = weekForecastHTML + `</div>`;
  weekForecastElement.innerHTML = weekForecastHTML;
  console.log(weekForecastHTML);
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
