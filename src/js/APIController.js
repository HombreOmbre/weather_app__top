const APIContorller = () => {
    const apiKey = '12a3033a8c864c6fb35193919230608';
    let currentLocation = 'Warsaw';

    const changeCurrentLocation = (newLocation) => {
        currentLocation = newLocation;
    };

    async function getDailyAndForecastData() {
        const urlForForecast = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=4&q=${currentLocation}`;

        try {
            const fetchForecastData = await fetch(urlForForecast);
            const parseFetchinData = await fetchForecastData.json();

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
        changeCurrentLocation,
    };
};

export default APIContorller();
