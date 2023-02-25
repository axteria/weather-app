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
  // show temp
  let temp = Math.round(response.data.main.temp);
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

search("Melbourne");

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
function showFarenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = 86;
}
function showCelcius(event) {
  event.preventDefault();
  temp.innerHTML = 30;
}

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", showFarenheit);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelcius);
