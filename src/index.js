import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
// console.log(inputEl);

const countryListEl = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

Notify.failure('Oops, there is no country with that name');
Notify.info('Too many matches found. Please enter a more specific name.');

function onFormInput(event) {
  event.preventDefault();
  const name = event.target.value;
  fetchCountries(name);

  // .then(renderCountryCard);

  // .catch(onFetchError);
}

// name.official,capital,population,flags.svg,languages

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    response.json();
    console.log(response.json());
  });
}

// function renderCountryCard(name) {}
