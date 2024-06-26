async function getWeather() {
    const city = document.getElementById("city").value;
    const response = await fetch(`http://127.0.0.1:5000/weather?city=${city}`);
    const data = await response.json();
    displayWeather(data);
    getForecast(city);
}

function displayWeather(data) {
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
}

async function getForecast(city) {
    const response = await fetch(`http://127.0.0.1:5000/forecast?city=${city}`);
    const data = await response.json();
    displayForecast(data);
}

function displayForecast(data) {
    const forecastInfo = document.getElementById("forecast-info");
    forecastInfo.innerHTML = data.list
        .map(
            (day) => `
        <div>
            <p>Date: ${new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>Temperature: ${day.temp.day}°C</p>
            <p>Weather: ${day.weather[0].description}</p>
        </div>
    `
        )
        .join("");
}

function addFavoriteCity() {
    const city = document.getElementById("favorite-city").value;
    const favoriteCities = document.getElementById("favorite-cities");
    const li = document.createElement("li");
    li.innerText = city;
    favoriteCities.appendChild(li);
    li.addEventListener("click", () => {
        document.getElementById("city").value = city;
        getWeather();
    });
}
