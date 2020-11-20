import './styles.css';
import templateCard from "../template/templateCauntry.hbs";
import templateAllCauntry from "../template/all-countries.hbs";
import API from './api-service';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import { defaults } from '@pnotify/core';
import '@pnotify/core/dist/Material.css';

//import 'material-design-icons/iconfont/material-icons.css';
import { error } from '@pnotify/core';


defaults.sticker = false;
defaults.addClass = 'error';
defaults.autoOpen = false;


const refs = {
    countryContainer: document.querySelector('.js-countainer-cauntry'),
    inputCauntry: document.querySelector('.input-country'),

};


const debounce = require('lodash.debounce');

refs.inputCauntry.addEventListener('input', debounce(onInputChange, 500));
refs.inputCauntry.addEventListener('focus', onInputFocus);

function onInputFocus(event) {
    console.log(event.currentTarget.value);
};

function onInputChange(e) {
    e.preventDefault();

    const searchQuery = e.target.value;
    clearResult();

    API.fetchCountries(searchQuery)
        .then(renderCountryCard)
        .catch()
};


function renderCountryCard(country) {
    const markup = templateCard(country);
    const markupC = templateAllCauntry(country);

    if (country.length === 1) {
        refs.countryContainer.innerHTML = markup;

    } else if (country.length >= 2 && country.length <= 10) {
        console.log('список до 10 стран');
        refs.countryContainer.innerHTML = markupC;

    } else if (country.length > 10) {
        console.log('список более 10 стран');
        const myError = error({
            text: "Too many matches found. Please enter a more spesific query!",
            width: '360px',
            minHeight: '60px',
            icons: 'brighttheme',
            delay: '2000 ',
            autoOpen: true,
            maxTextHeight: null,
        });
    }
}


function clearResult(country) {
    refs.countryContainer.innerHTML = '';

}
