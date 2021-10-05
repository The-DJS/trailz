
app.get("/", async (req, res, next) => {
  const locKey = process.env.LOCATION_KEY;
  const locResponse = await fetch(
    `http://api.ipstack.com/${req.ip}?access_key=${locKey}`
  );
  const location = await locResponse.json();
});

app.get("/", async (req, res, next) => {
  // ...

  // weather request
  const weatherKey = process.env.WEATHER_KEY;
  const response = await fetch(
    `http://api.weatherstack.com/current?access_key=${weatherKey}&query=${location.city}`
  );
  const weather = await response.json();
});
