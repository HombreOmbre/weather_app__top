const APIContorller = () => {
    const apiKey = '12a3033a8c864c6fb35193919230608';
    let currentLocationData = '';

    const changeCurrentLocationData = (newLocationData) => {
        currentLocationData = newLocationData;
    };

    const getCurrentLocationData = () => {
        return currentLocationData;
    };

    async function getDailyAndForecastData(newLocation = 'Warsaw') {
        const urlForForecast = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=4&q=${newLocation.trim()}`;

        try {
            const fetchForecastData = await fetch(urlForForecast);
            const parseFetchinData = await fetchForecastData.json();

            changeCurrentLocationData(parseFetchinData);

            return parseFetchinData;
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
        getMatchingDataForAutocomplete,
        getDailyAndForecastData,
        getCurrentLocationData,
    };
};

export default APIContorller();
