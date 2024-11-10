import { toast } from 'react-toastify';
import { API_URL } from '../config';

const handleApiError = error => {
  let errorMessage;

  if (error.response?.data?.message) {
    errorMessage = error.response.data.message;
  } else if (error.response?.data?.error?.message) {
    // Handle nested error message structure
    errorMessage = error.response.data.error.message;
  } else if (error.message) {
    // Handle error object with message property
    errorMessage = error.message;
  } else {
    // Fallback error message
    errorMessage = 'An unexpected error occurred';
  }

  toast.error(errorMessage);
  throw error;
};

const getBlogPermissions = (query = {}) => {
  const token = localStorage.getItem('bloggrs:token');
  console.log('Current token:', token);

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };
  const endpoint = `${API_URL}/api/v1/blogpermissions?${new URLSearchParams(
    query,
  )}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          const error = new Error();
          error.response = { data };
          throw error;
        });
      }
      return res.json();
    })
    .then(data => {
      return data.data.blogpermissions;
    })
    .catch(handleApiError);
};

const getBlogPermission = permissionId => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/blogpermissions/${permissionId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          const error = new Error();
          error.response = { data };
          throw error;
        });
      }
      return res.json();
    })
    .then(data => {
      return data.data.blogpermission;
    })
    .catch(handleApiError);
};

const createBlogPermission = ({
  action,
  resourceId,
  resourceType,
  teammemberId,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify({
      action,
      resourceId,
      resourceType,
      teammemberId,
    }),
  };
  const endpoint = `${API_URL}/api/v1/blogpermissions`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          const error = new Error();
          error.response = { data };
          throw error;
        });
      }
      return res.json();
    })
    .then(data => {
      toast.success('Blog permission created successfully');
      return data.data.blogpermission;
    })
    .catch(handleApiError);
};

const updateBlogPermission = (permissionId, permissionData) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify(permissionData),
  };
  const endpoint = `${API_URL}/api/v1/blogpermissions/${permissionId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          const error = new Error();
          error.response = { data };
          throw error;
        });
      }
      return res.json();
    })
    .then(data => {
      toast.success('Blog permission updated successfully');
      return data.data.blogpermission;
    })
    .catch(handleApiError);
};

const deleteBlogPermission = permissionId => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/blogpermissions/${permissionId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          const error = new Error();
          error.response = { data };
          throw error;
        });
      }
      return res.json();
    })
    .then(() => {
      toast.success('Blog permission deleted successfully');
      return permissionId;
    })
    .catch(handleApiError);
};

const deleteResourcePermissions = (resourceId, resourceType) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/blogpermissions/resource/${resourceId}/${resourceType}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          const error = new Error();
          error.response = { data };
          throw error;
        });
      }
      return res.json();
    })
    .then(() => {
      toast.success('Resource permissions deleted successfully');
      return { resourceId, resourceType };
    })
    .catch(handleApiError);
};

export const blogPermissionsService = {
  getBlogPermissions,
  getBlogPermission,
  createBlogPermission,
  updateBlogPermission,
  deleteBlogPermission,
  deleteResourcePermissions,
};
