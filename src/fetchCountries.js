import Notiflix from 'notiflix';
export default class CounriesApiService {
  constructor() {
    this.searchQuery = '';
  }
  fetchCountries() {
    const url = `https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,capital,population,flags,languages`;

    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject('error 404');
      }
    });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
