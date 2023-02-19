import Api from "./api.js";

class Cities {
    timeout = 2000;
    timeoutPointer = null;
    lastTimeoutTime = 0;
    cities = ['Kharkiv', 'Kyiv', 'Poltava', 'Lviv', 'Washington', 'Kanberra'];

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initSearch();
        });
    }

    initSearch() {
        document.getElementById('city-search')
            .addEventListener('keyup', (evt) => {
                this.handleSearchInputKeyup(evt);
            });
    }

    handleSearchInputKeyup(evt) {
        const input = evt.target;
        const searchString = input.value;
        const currentTime = (new Date()).getTime();
        if ((currentTime - this.lastTimeoutTime) < this.timeout) {
            window.clearTimeout(this.timeoutPointer);
        }
        this.lastTimeoutTime = currentTime;
        this.timeoutPointer = window.setTimeout(() => {
            this.getCities(searchString);
        }, this.timeout)
    }

    getCities(searchString) {
        const api = new Api();
        api.cities(searchString)
            .then(json => {
                console.log('Halo from api openweather');
                console.log(json);
                // this.renderCitiesList(json);
                // this.showCitiesPopup();
            });
        this.renderCitiesList();
        this.showCitiesPopup();
    }

    renderCitiesList() {
        const container = document.querySelector('.cities-autofill ul');
        container.innerHTML = '';
        for (let city of this.cities) {
            const li = this.createCityElement(city);
            container.insertAdjacentElement('beforeend', li);
        }
    }

    createCityElement(city) {
        const li = document.createElement('LI');
        li.innerHTML = city;
        li.addEventListener('click', (evt) => {
            this.getClickedCity(evt.target.innerHTML);
            this.hideCitiesPopup();
        });
        return li;
    }

    showCitiesPopup() {
        document.getElementById('cities-autofill').style.display = 'block';
    }

    hideCitiesPopup() {
        document.getElementById('cities-autofill').style.display = 'none';
    }

    getClickedCity(city) {
        document.getElementById('city-search').value = city;
    }
}

const cities = new Cities();
cities.init();

