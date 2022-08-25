function fetchCountries(nazva) {
  return fetch(
    `https://restcountries.com/v3.1/name/${nazva}?fields=name,capital,population,flags,languages`
  ).then(response => response.json());
}

export { fetchCountries };
