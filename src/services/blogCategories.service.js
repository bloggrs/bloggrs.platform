import { toast } from 'react-toastify';
import { API_URL } from '../config';

const getBlogCategories = (query = '') => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const endpoint = `${API_URL}/api/v1/blogcategories?query=` + query;
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data.data.blogcategories;
    });
};

export const blogCategoriesService = {
  getBlogCategories,
};
