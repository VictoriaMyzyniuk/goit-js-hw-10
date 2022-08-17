import './css/styles.css';
import CounriesApiService from './fetchCountries';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const counriesApiService = new CounriesApiService();

inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';

  counriesApiService.query = e.target.value.trim();

  if (counriesApiService.query !== '') {
    counriesApiService.fetchCountries().then(response => {
      if (response.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (response.length < 10 && response.length >= 2) {
        countryListEl.insertAdjacentHTML(
          'beforeend',
          listOfCountriesMarkup(response)
        );
      } else {
        countryInfoEl.insertAdjacentHTML('beforeend', countryMarkup(response));
      }
    });
  }
}

function countryMarkup(countries) {
  return countries
    .map(element => {
      return `<div class='one-country'>
      <img width="60px" height="60px" src='${element.flags.svg}' alt='${
        element.name.common
      } flag' />
      <p class="country-name">${element.name.official}</p></div>
      <p class="additional-info"><b>Capital:</b> ${element.capital}</p>
      <p class="additional-info"><b>Population:</b> ${element.population}</p>
      <p class="additional-info"><b>Languages:</b> ${Object.values(
        element.languages
      )}</p>`;
    })
    .join('');
}
function listOfCountriesMarkup(countries) {
  return countries
    .map(element => {
      return `<li class="multiple-countries">
    <img width="60px" height="60px" src="${element.flags.svg}" alt="${element.name.common} flag" />
    <p class="country-name">${element.name.common}</p></li>`;
    })
    .join('');
}
