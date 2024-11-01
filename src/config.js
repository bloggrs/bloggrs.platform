const IS_LOCALHOST = window.location.href.indexOf('localhost') !== -1;

// export const API_URL = 'http://localhost:5500';

export const API_URL = IS_LOCALHOST
  ? 'http://localhost:4000' //'http://localhost:5500'
  : 'https://bloggrs-api-i1.herokuapp.com';
// ? 'http://localhost:5500'
