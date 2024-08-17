const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const api_KEY = "27f1318abb5147523b18590f6a668ff2";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInformation(weatherData);
    } catch (error) {
      console.log(error);
      displayError(error);
    }
  } else {
    displayError("Please enter the city");
  }
});

async function getWeatherData(city) {
  const api_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_KEY}`;
  const response = await fetch(api_URL);
  console.log(response);

  if (!response.ok) {
    throw new Error(`Http error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

async function displayWeatherInformation(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(((temp - 273.15) * 9) / 5 + 32).toFixed(1)}° C`;
  humidityDisplay.textContent = `humidity: ` + humidity;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

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

function getWeatherEmoji(weatherID) {
  switch (true) {
    case weatherID >= 200 && weatherID < 300:
      return "⛈";
      break;

    case weatherID >= 300 && weatherID < 400:
      return "🌧";
      break;

    case weatherID >= 500 && weatherID < 600:
      return "🌧";
      break;

    case weatherID >= 600 && weatherID < 700:
      return "❄";
      break;

    case weatherID >= 700 && weatherID < 800:
      return "🌫";
      break;

    case weatherID >= 800 && weatherID < 810:
      return "☁";
      break;

    default:
      return "🛸";
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
