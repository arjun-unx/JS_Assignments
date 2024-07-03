// script.js
const apiKey = 'b96553c3d75c37c02926f686eb3d52c8';

document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('cityInput').value.trim();
    document.getElementById('error').textContent = ''; // Clear previous errors
    if (city) {
        getWeather(city);
    }
});

document.getElementById('cityInput').addEventListener('input', function() {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
    document.getElementById('error').textContent = ''; // Clear error on input change
});

document.getElementById('cityInput').addEventListener('mouseover', function() {
    this.style.backgroundColor = '#f0f0f0';
});

document.getElementById('cityInput').addEventListener('mouseout', function() {
    this.style.backgroundColor = '';
});

document.getElementById('submitBtn').addEventListener('mouseover', function() {
    this.style.backgroundColor = '#005bb5';
});

document.getElementById('submitBtn').addEventListener('mouseout', function() {
    this.style.backgroundColor = '#0072ff';
});

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
                saveCity(city);
                displayPreviousCities();
            } else {
                document.getElementById('error').textContent = 'Invalid city name';
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    const weatherDetails = document.getElementById('weatherDetails');
    weatherDetails.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Feels Like: ${data.main.feels_like} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Pressure: ${data.main.pressure} hPa</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function saveCity(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem('cities', JSON.stringify(cities));
    }
}

function loadPreviousCities() {
    displayPreviousCities();
}

function displayPreviousCities() {
    const previousCitiesDiv = document.getElementById('previousCities');
    previousCitiesDiv.innerHTML = '';
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.forEach(city => {
        const cityDiv = document.createElement('div');
        cityDiv.className = 'city';
        cityDiv.textContent = city;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            removeCity(city);
        });

        cityDiv.appendChild(removeBtn);
        cityDiv.addEventListener('click', function() {
            getWeather(city);
        });
        previousCitiesDiv.appendChild(cityDiv);
    });
}

function removeCity(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities = cities.filter(c => c !== city);
    localStorage.setItem('cities', JSON.stringify(cities));
    displayPreviousCities();
}
