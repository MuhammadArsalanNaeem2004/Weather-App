let API_KEY = "fe29d5218a3b28e30d59823b94fee9af";

let showData = document.getElementById("showData");

let searchData = () => {
  let input = document.getElementById("input").value.trim();

  if (input === "") {
    showData.innerHTML = `<p class="text-danger">Please enter city name</p>`;
    return;
  }

  showData.innerHTML = `
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `;

  let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}&units=metric`;

  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => showWeatherData(data))
    .catch((err) => {
      console.log(err);
      showData.innerHTML = `<p class="text-danger">Something went wrong</p>`;
    });
};

let showWeatherData = (data) => {
  if (data.cod !== 200) {
    showData.innerHTML = `<h5 class="text-danger">${data.message}</h5>`;
    return;
  }

  showData.innerHTML = `
    <div style="
      border: 1px solid #ccc;
      width: 320px;
      margin: auto;
      padding: 20px;
      margin-top: 35px;
      border-radius: 12px;
      text-align: center;
      background: #f8f9fa;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    ">
      <img
        src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        alt="weather icon"
      />
      <h2>${data.name}</h2>
      <h1>${data.main.temp}°C</h1>
      <h5 class="text-capitalize">${data.weather[0].description}</h5>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind: ${(data.wind.speed * 3.6).toFixed(1)} km/h</p>
    </div>
  `;
};
