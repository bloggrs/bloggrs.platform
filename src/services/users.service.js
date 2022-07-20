import { toast } from 'react-toastify';
import { API_URL } from '../config';

const register = (first_name, last_name, email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ first_name, last_name, email, password }),
  };
  const endpoint = API_URL + '/api/v1/users';
  return fetch(endpoint, requestOptions)
    .then(handleResponse)
    .then(data => {
      const {
        data: { user, token },
      } = data;
      console.log({ data });
      localStorage.setItem('bloggrs:token', token);
      return data;
    });
};

const handleResponse = (response, disableToast) => {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        register();
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

const getUsers = (query = '') => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };

  const endpoint = `${API_URL}/api/v1/users?query=${query}`;
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return [data.data.users, data.data._meta || { count: data.data.users }];
    });
};

export const usersService = {
  register,
  getUsers,
};
