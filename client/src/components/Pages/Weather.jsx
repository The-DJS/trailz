/* eslint-disable no-unused-vars */
/* eslint-disable */
import React, { useEffect, useState } from 'react';

import { useOpenWeather } from 'react-open-weather';

const Weather = () => {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '38491011dd620ff8c6051b3c4ef716d7',
    lat: '48.137154',
    lon: '11.576124',
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });

  return (
    <Weather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Munich"
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast
    />
  );
};

export default Weather;
