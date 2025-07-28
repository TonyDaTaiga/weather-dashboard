document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const city = document.getElementById('cityInput').value;
    const formData = new FormData();
    formData.append('city', city);

    fetch('/weather', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            displayWeather(data.data);
        } else {
            showError(data.message);
        }
    })
    .catch(error => {
        showError('An error occured while fetching weather data.');
    });
});

function displayWeather(weather) {
    document.getElementById('weatherResult').classList.remove('d-none');
    document.getElementById('errorMessage').classList.add('d-none');

    document.getElementById('cityName').textContent = `${weather.city}, ${weather.country}`;
    document.getElementById('temperature').textContent = weather.temperature;
    document.getElementById('description').textContent = weather.description;
    document.getElementById('humidity').textContent = weather.humidity;
    document.getElementById('windSpeed').textContent = weather.wind_speed;
    document.getElementById('weatherIcon').src = 
        `http://openweathermap.org/img/w/${weather.icon}.png`;
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.classList.remove('d-none');
    document.getElementById('weatherResult').classList.add('d-none');
}