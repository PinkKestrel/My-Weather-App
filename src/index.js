function displayDay(timestamp) {
  let date = new Date(timestamp * 1000);
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
  });
}

function getForecast(coordinates) {
  let apiKey = "cfdtb229644obe0a8ca750dd05413af0";
  let weeklyWeatherUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(weeklyWeatherUrl);

  axios.get(weeklyWeatherUrl).then(displayWeeklyWeather);
}
function displayWeeklyWeather(response) {
  let forecast = response.data.daily;
  let weekForecastElement = document.querySelector("#weekForecast");
  let weekForecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      weekForecastHTML =
        weekForecastHTML +
        `
      <div class="col-2">
      <img
          src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
          width="50"
        />
        <div class="weather-forecast-temperatures">
          <span class="temp-max">${Math.round(
            forecastDay.temperature.maximum
          )}°</span> <span class="temp-min"> ${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
        </div>
      </div>
  `;
    }
  });
  weekForecastHTML = weekForecastHTML + `</div>`;
  weekForecastElement.innerHTML = weekForecastHTML;
}

function displayWeather(response) {
  let city = response.data.city;
  let weather = response.data.condition.description;
  let temperature = Math.round(response.data.temperature.current);
  let humidity = response.data.temperature.humidity;
  let windSpeed = Math.round((response.data.wind.speed / 1000) * 3600);

  celsiusTemperature = response.data.temperature.current;

  let currentCityElement = document.querySelector("#current-city");
  let currentWeatherElement = document.querySelector("#current-weather");
  let currentTempElement = document.querySelector("#current-temp");
  let currentHumidityElement = document.querySelector("#current-humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let todayIconElement = document.querySelector("#today-icon");
  let weatherIcon = response.data.condition.icon;

  currentCityElement.innerHTML = city;
  currentWeatherElement.innerHTML = weather;
  currentTempElement.innerHTML = temperature;
  currentHumidityElement.innerHTML = `Humidity: ${humidity}%`;
  windSpeedElement.innerHTML = `Wind speed: ${windSpeed} km/h`;
  todayIconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherIcon}.png`
  );
  todayIconElement.setAttribute("alt", response.data.condition.icon);

  displayDay(response.data.time);
  getForecast(response.data.coordinates);
}
function searchCityWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city");
  let searchCity = cityInput.value;
  getCityWeather(searchCity);
}

function getCityWeather(city) {
  let apiKey = "cfdtb229644obe0a8ca750dd05413af0";
  let units = "metric";
  let localWeatherUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(localWeatherUrl).then(displayWeather);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCityWeather);
getCityWeather("Madrid");
