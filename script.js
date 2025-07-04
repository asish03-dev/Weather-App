const apiKey = '5ab2acb36b30d9271c49c8ae0386252b';

async function getCityWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const weatherDisplay = document.getElementById('weatherDisplay');
  const error = document.getElementById('errorMessage');

  error.textContent = '';
  weatherDisplay.innerHTML = '';

  if (!city) {
    error.textContent = 'Please enter a city name.';
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    const { name, main, weather } = data;
    const icon = weather[0].icon;
    let desc = weather[0].description.toLowerCase();

    // Simple keyword mapping
    if (desc.includes("cloud")) desc = "Cloudy";
    else if (desc.includes("rain")) desc = "Rainy";
    else if (desc.includes("clear")) desc = "Sunny";
    else if (desc.includes("snow")) desc = "Snowy";
    else desc = desc.charAt(0).toUpperCase() + desc.slice(1); // Fallback: capitalize

    weatherDisplay.innerHTML = `
      <div class="weather-card">
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" />
        <div class="temp">${main.temp}°C</div>
        <p>${desc}</p>
      </div>
    `;
  } catch (err) {
    error.textContent = err.message;
  }
}
