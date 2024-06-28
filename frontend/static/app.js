async function getWeather() {
    const city = document.getElementById("city").value;
    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();
    displayWeather(data);
}

async function getForecast() {
    const city = document.getElementById("forecast-city").value;
    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();
    displayForecast(data);
}

function displayWeather(data) {
    const weatherInfo = document.getElementById("weather-info");
    if (!weatherInfo) return;

    const current = data.current;
    weatherInfo.innerHTML = `
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">${data.timezone}</h2>
                    <p class="card-text">Temperature: ${current.temp}°C</p>
                    <p class="card-text">Weather: ${current.weather[0].description}</p>
                    <p class="card-text">Humidity: ${current.humidity}%</p>
                </div>
            </div>
        </div>
    `;
}

function displayForecast(data) {
    const forecastInfo = document.getElementById("forecast-info");
    if (!forecastInfo) return;

    forecastInfo.innerHTML = data.daily
        .map(
            (day) => `
        <div class="col-md-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${new Date(
                        day.dt * 1000
                    ).toLocaleDateString()}</h5>
                    <p class="card-text">Temperature: Day ${
                        day.temp.day
                    }°C, Night ${day.temp.night}°C</p>
                    <p class="card-text">Weather: ${
                        day.weather[0].description
                    }</p>
                    <p class="card-text">Humidity: ${day.humidity}%</p>
                    <p class="card-text">Wind Speed: ${day.wind_speed} m/s</p>
                    <p class="card-text">Cloudiness: ${day.clouds}%</p>
                </div>
            </div>
        </div>
    `
        )
        .join("");
}

function addFavoriteCity() {
    const city = document.getElementById("favorite-city").value;
    const favoriteCities = document.getElementById("favorite-cities");
    if (!favoriteCities) return;

    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerText = city;
    favoriteCities.appendChild(li);
    li.addEventListener("click", () => {
        document.getElementById("city").value = city;
        getWeather();
    });
}
