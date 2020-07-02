//Константы для запроса новостей с NewsApi
export const formSearch = document.forms.search;
export const themeInput = formSearch.elements.theme;
export const apiKey = '120e230c0c434d5ea46860f7bce533cf';
export const pageSize = '100';


//DOM-элементы
export const newsContainer = document.querySelector('.news__container');
export const newsButton = document.querySelector('.news__button');
export const newsData = document.querySelector('.news__data');
export const newsFind = document.querySelector('.news__find');
export const newsOut = document.querySelector('.news__out');
export const errorMessage = document.querySelector('.lead__search-error-message');
export const searchButton = document.querySelector('.lead__button');
export const newsError = document.querySelector('.news__error');
export const validationWords = {
  validationInput: 'Не менее 2-х символов!'
};
