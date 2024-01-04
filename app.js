const weatherForm = document.querySelector(".weatherForm");
const cityName = document.querySelector(".cityName");
const card = document.querySelector(".card");
const apiKey = "7b653c59668ccd96de4c638b6b6b8835";

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityName.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.log(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Please provide with proper city name");
  }
  return (await response).json();
}
function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  // HTML Elements
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");
  const descDisplay = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = displayWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}
function displayWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "🌧️";
      break;
    case weatherId >= 300 && weatherId < 400:
      return "⛈️";
      break;
    case weatherId >= 500 && weatherId < 600:
      return "☔️";
      break;
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
      break;
    case weatherId >= 700 && weatherId < 800:
      return "💨";
      break;
    case weatherId === 800:
      return "☀️";
      break;
    case weatherId > 800 && weatherId < 810:
      return "🌥️";
      break;

    default:
      break;
  }
}
function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
