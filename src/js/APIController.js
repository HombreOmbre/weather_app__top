const APIContorller = () => {
    const apiKey = 'cfb858272abd3fbbac3ebd2e5e0e3afa';

    async function getCoordinatesOfCity(cityName) {
        const urlForGeocoding = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

        try {
            const fetchCoordinates = await fetch(urlForGeocoding);
            const parseData = await fetchCoordinates.json();
            const { lat, lon } = await parseData[0];

            return { lat, lon };
        } catch (err) {
            return err;
        }
    }

    async function getWeatherData(cityName) {
        const city = cityName || 'Warsaw';
        const urlForWeather =
            'https://api.openweathermap.org/data/2.5/weather?';
        try {
            const coordinatesOfTheCity = await getCoordinatesOfCity(city);
            const fetchWeather = await fetch(
                `${urlForWeather}lat=${coordinatesOfTheCity.lat}&lon=${coordinatesOfTheCity.lon}&units=metric&appid=${apiKey}`,
            );
            const parseWeatherData = await fetchWeather.json();
            const { main, name, sys, weather, wind } = await parseWeatherData;

            return { main, name, sys, weather, wind };
        } catch (err) {
            return err;
        }
    }

    return {
        getWeatherData,
    };
};

export default APIContorller();
