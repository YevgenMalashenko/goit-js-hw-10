import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

// import countryCardTpl from '../src/country-list.hbs';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

Notify.failure('Oops, there is no country with that name');
Notify.info('Too many matches found. Please enter a more specific name.');

function onFormInput(event) {
  event.preventDefault();
  const name = event.target.value;
  fetchCountries(name)
    // .then(response => response.json())
    .then(renderCountryCard)
    .catch(onError)
    .finally(console.log('Ura'));
}

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => response.json());
}

function renderCountryCard(country) {
  console.log(country[0].name.official);
  console.log(country[0].capital[0]);
  console.log(country[0].flags.svg);
  // console.log(country[0].languages.ukr);
  // console.log(country[0].capital[0]);
  console.log(country[0].population);
  console.log(country[0].name.nativeName);

  if ((country.length = 1)) {
    const markup = `<img src="${country[0].flags.svg}" alt="flag" width="100" />
      <p class="country__name">${country[0].name.official}</p>
      <p class="country__capital">${country[0].capital[0]}</p>
      <p class="country__population">${country[0].population}</p>`;
    countryListEl.innerHTML = markup;
  } else if (country.length > 1) {
    // const markup = country.forEach(element => {
    // });
  }
}
