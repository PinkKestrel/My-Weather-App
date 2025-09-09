const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const API_KEY = "cfdtb229644obe0a8ca750dd05413af0";

function displayDay(timestamp) {
  const date = new Date(timestamp * 1000);
  const currentDay = DAYS[date.getDay()];

  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  const dayLine = document.querySelector("#current-day");
  dayLine.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`;

  displayWeekdays(date.getDay());
}

function displayWeekdays(today) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysNumber = [1, 2, 3, 4, 5, 6];
  const daysWeekElement = document.querySelector("#daysWeek");

  let daysWeekHTML = `<div class="row">`;
  daysNumber.forEach(function (day) {
    const newDay = days[(today + day) % days.length];
    daysWeekHTML =
      daysWeekHTML +
      `<div class="col-2">
          <div> ${newDay} </div>
       </div>`;
  });

  daysWeekElement.innerHTML = daysWeekHTML;
}

function getAndDisplayForecast(coordinates) {
  const weeklyWeatherUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${API_KEY}&units=metric`;

  axios.get(weeklyWeatherUrl).then(displayWeeklyWeather);
}

function displayWeeklyWeather(response) {
  const forecast = response.data.daily;
  const weekForecastElement = document.querySelector("#weekForecast");
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
  weekForecastHTML += `</div>`;
  weekForecastElement.innerHTML = weekForecastHTML;
}

function displayWeather(response) {
  const city = response.data.city;
  const weather = response.data.condition.description;
  const temperature = Math.round(response.data.temperature.current);
  const humidity = response.data.temperature.humidity;
  const windSpeed = Math.round((response.data.wind.speed / 1000) * 3600);

  const currentCityElement = document.querySelector("#current-city");
  const currentWeatherElement = document.querySelector("#current-weather");
  const currentTempElement = document.querySelector("#current-temp");
  const currentHumidityElement = document.querySelector("#current-humidity");
  const windSpeedElement = document.querySelector("#wind-speed");
  const todayIconElement = document.querySelector("#today-icon");
  const weatherIcon = response.data.condition.icon;

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
  getAndDisplayForecast(response.data.coordinates);
}

function searchCityWeather(event) {
  event.preventDefault();
  const cityInput = document.querySelector("#enter-city");
  const searchCity = cityInput.value;
  getAndDisplayCityWeather(searchCity);
}

function getAndDisplayCityWeather(city) {
  const localWeatherUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${API_KEY}&units=metric`;

  axios.get(localWeatherUrl).then(displayWeather);
}

const cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCityWeather);
getAndDisplayCityWeather("Madrid");
