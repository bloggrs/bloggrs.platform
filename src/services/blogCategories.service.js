import { toast } from 'react-toastify';
import { API_URL } from '../config';

const getBlogCategories = (query = {}) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/blogcategories?${new URLSearchParams(
    query,
  )}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch blog categories');
      }
      return res.json();
    })
    .then(data => {
      return data.data.blogcategories;
    })
    .catch(error => {
      toast.error(error.message);
      throw error;
    });
};

const getBlogCategory = categoryId => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/blogcategories/${categoryId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch blog category');
      }
      return res.json();
    })
    .then(data => {
      return data.data.blogcategory;
    })
    .catch(error => {
      toast.error(error.message);
      throw error;
    });
};

const createBlogCategory = async ({
  name,
  description,
  parentCategoryId,
  blog_id,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('bloggrs:token')}`,
    },
    body: JSON.stringify({
      name,
      description,
      parentCategoryId,
      blog_id,
    }),
  };

  try {
    const response = await fetch(
      `${API_URL}/api/v1/blogcategories`,
      requestOptions,
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create blog category');
    }

    const {
      data: { blogcategory },
    } = await response.json();
    toast.success('Blog category created successfully');
    return blogcategory;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

const createBlogPostCategory = async ({
  name,
  description,
  parentCategoryId,
  blog_id,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('bloggrs:token')}`,
    },
    body: JSON.stringify({
      CategoryId: name,
      description,
      parentCategoryId,
      BlogId: blog_id,
    }),
  };

  try {
    const response = await fetch(
      `${API_URL}/api/v1/blogpostcategories`,
      requestOptions,
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create blog post category');
    }

    const {
      data: { blogpostcategory },
    } = await response.json();
    toast.success('Blog post category created successfully');
    return blogpostcategory;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

const updateBlogCategory = (categoryId, categoryData) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify(categoryData),
  };
  const endpoint = `${API_URL}/api/v1/blogcategories/${categoryId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to update blog category');
      }
      return res.json();
    })
    .then(data => {
      toast.success('Blog category updated successfully');
      return data.data.blogcategory;
    })
    .catch(error => {
      toast.error(error.message);
      throw error;
    });
};

const deleteBlogCategory = categoryId => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/blogcategories/${categoryId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to delete blog category');
      }
      return res.json();
    })
    .then(() => {
      toast.success('Blog category deleted successfully');
      return categoryId;
    })
    .catch(error => {
      toast.error(error.message);
      throw error;
    });
};

export const blogCategoriesService = {
  getBlogCategories,
  getBlogCategory,
  createBlogCategory,
  createBlogPostCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
