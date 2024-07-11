document.addEventListener('DOMContentLoaded', (event) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByLocation(lat, lon);
        }, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

async function getWeatherByLocation(lat, lon) {
    const apiKey = 'feff206daa60b539abe8fae8f2ab7f29';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching the weather data:', error);
    }
}

async function getWeatherByCity() {
    const apiKey = 'feff206daa60b539abe8fae8f2ab7f29';
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching the weather data:', error);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    if (data.cod === 200) {
        weatherInfo.innerHTML = `
            <div class="weather-card">
                <h2>${data.name}</h2>
                <p><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}"></p>
                <p>${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Humidity: ${data.main.humidity} %</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            </div>
        `;
    } else {
        weatherInfo.innerHTML = `<p>Location not found!</p>`;
    }
}
