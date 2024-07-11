async function getWeatherByCity() {
    const apiKey = 'feff206daa60b539abe8fae8f2ab7f29'; // Replace with your OpenWeatherMap API key
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
            <h2>${data.name}</h2>
            <p><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}"></p>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity} %</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherInfo.innerHTML = `<p>Location not found!</p>`;
    }
}
