export default class Api {
    apiKey = '2e950a87400e57dae5de6f86124de468';
    cities(searchString) {
        const LIMIT = 5;
        const citiesUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchString}&limit=${LIMIT}&appid=${this.apiKey}`;
        console.log(citiesUrl);
        return fetch(citiesUrl)
            .then(response => response.json());
    }

}


