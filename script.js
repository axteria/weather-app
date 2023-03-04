// TIMESTAMP
function formatDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hour}:${minutes}`;
}

let timestamp = document.querySelector("#timestamp");
let currentTime = new Date();
timestamp.innerHTML = formatDate(currentTime);

// SEARCH BAR
function displayWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;

  // show temp
  let temp = Math.round(celsiusTemp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${temp}`;

  // show description
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  // show humidity
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  // show wind
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  // show weather icon
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// CURRENT BUTTON
function getCoords(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function showGeolocation(event) {
  navigator.geolocation.getCurrentPosition(getCoords);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showGeolocation);

// TEMPERATURE UNITS
function showFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  let showFahrenheit = (celsiusTemp * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(showFahrenheit);
}

function showCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

// FORECAST
function showForecast() {
  let forecast = document.querySelector("#forecast");
  let days = ["Mon", "Tues", "Wed", "Thurs", "Fri"];

  let forecastHTML = `<div class="card-group row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="card">
            <div class="card-body px-0">
              <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
              <h5 class="card-title">${day}</h5>
              <h4 class="card-text"><span class="forecast-max">20°</span> | <span class="forecast-min">14°</span></h4>
            </div>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

search("Melbourne");
showForecast();
