const APIContorller = () => {
    const apiKey = '12a3033a8c864c6fb35193919230608';

    async function getCurrentWeatherData(cityName) {
        const urlForCurrentWeather = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;

        try {
            const fetchWeather = await fetch(`${urlForCurrentWeather}`);
            const parseWeatherData = await fetchWeather.json();

            return parseWeatherData;
        } catch (err) {
            return err;
        }
    }

    async function getMatchingDataForAutocomplete(cityName) {
        const urlForMatchingData = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${cityName}`;

        try {
            const fetchMatchingData = await fetch(urlForMatchingData);
            const parseMatchingData = await fetchMatchingData.json();

            return parseMatchingData;
        } catch (err) {
            return err;
        }
    }

    return {
        getCurrentWeatherData,
        getMatchingDataForAutocomplete,
    };
};

export default APIContorller();
