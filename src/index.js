import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js-modules/fetchCountries';

// import countryCardTpl from '../src/country-list.hbs';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput(event) {
  event.preventDefault();
  const countryName = event.target.value;
  fetchCountries(countryName).then(renderCountryCard).catch(onError);
}

function renderCountryCard(country) {
  let markup = '';

  if (country.length > 10) {
    resetMarkuUp();
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (country.length > 1 && country.length <= 10) {
    resetMarkuUp();
    country.forEach(el => {
      markup += `<li class = "country__item"><img class = "country__flag--list" src="${el.flags.svg}" alt="flag" width="60" /><p class="country__name--list">${el.name.official}</p>`;
    });
    countryListEl.innerHTML = markup;
  } else if ((country.length = 1)) {
    console.log(Object.values(country[0].languages).join(', '));
    resetMarkuUp();
    markup = `
    <div class = "country__title--item">
    <img class = "country__flag--item" src="${
      country[0].flags.svg
    }" alt="flag" width="60" />
      <p class="country__name--item">${country[0].name.official}</p>
    </div>

      <p class="country__details"><span class = "country__descr"> Capital: </span>${
        country[0].capital[0]
      }</p>
      <p class="country__details"><span class = "country__descr"> Population: </span>${
        country[0].population
      }</p>

      <p class="country__details"><span class = "country__descr"> Languages: </span>${Object.values(
        country[0].languages
      ).join(', ')}</p>
      `;
    countryInfoEl.innerHTML = markup;
  }
}

function onError() {
  resetMarkuUp();
  Notify.failure('Oops, there is no country with that name');
}

function resetMarkuUp() {
  markup = '';
  countryInfoEl.innerHTML = markup;
  countryListEl.innerHTML = markup;
}
