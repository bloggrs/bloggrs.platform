const IS_LOCALHOST = window.location.href.indexOf('localhost') !== -1;

export const API_URL = IS_LOCALHOST
  ? 'http://localhost:5500'
  : 'https://bloggrs-api-i1.herokuapp.com';
