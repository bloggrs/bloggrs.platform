import { toast } from 'react-toastify';
import { API_URL } from '../config';

const authenticate = () => {
  const token = localStorage.getItem('bloggrs:token');
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };
  const endpoint = API_URL + '/api/v1/auth';
  return fetch(endpoint, requestOptions)
    .then(res => handleResponse(res, true))
    .then(data => {
      const {
        data: { token },
      } = data;
      localStorage.setItem('bloggrs:token', token);
      return data;
    });
};

const login = (email, password) => {
  console.log(email, password, 'email, password');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };
  const endpoint = API_URL + '/api/v1/auth';
  return fetch(endpoint, requestOptions)
    .then(handleResponse)
    .then(data => {
      const {
        data: { token },
      } = data;
      console.log({ data });
      toast.success('Logged in successfully.');
      localStorage.setItem('bloggrs:token', token);
      return data;
    });
};
const logout = () => {
  localStorage.removeItem('bloggrs:token');
};

const handleResponse = (response, disableToast) => {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }
      const error =
        (data && data.errors && data.errors[0]) ||
        (data && data.message) ||
        response.statusText;
      if (!disableToast) toast.error(error);

      return Promise.reject(error);
    }
    return data;
  });
};

export const authService = {
  authenticate,
  login,
  logout,
};
