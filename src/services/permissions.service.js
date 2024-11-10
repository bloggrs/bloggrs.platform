import { toast } from 'react-toastify';
import { API_URL } from '../config';

const getPermissions = (query = {}) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/permissions?${new URLSearchParams(
    query,
  )}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch permissions');
      }
      return res.json();
    })
    .then(data => {
      return {
        permissions: data.data.permissions,
        pagination: data.data.pagination,
      };
    })
    .catch(error => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch permissions';
      toast.error(errorMessage);
      throw error;
    });
};

const getPermission = permissionId => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/permissions/${permissionId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch permission');
      }
      return res.json();
    })
    .then(data => {
      return data.data.permission;
    })
    .catch(error => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch permission';
      toast.error(errorMessage);
      throw error;
    });
};

const createPermission = permissionData => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify(permissionData),
  };
  const endpoint = `${API_URL}/api/v1/permissions`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to create permission');
      }
      return res.json();
    })
    .then(data => {
      toast.success('Permission created successfully');
      return data.data.permission;
    })
    .catch(error => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to create permission';
      toast.error(errorMessage);
      throw error;
    });
};

const updatePermission = (permissionId, permissionData) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify(permissionData),
  };
  const endpoint = `${API_URL}/api/v1/permissions/${permissionId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to update permission');
      }
      return res.json();
    })
    .then(data => {
      toast.success('Permission updated successfully');
      return data.data.permission;
    })
    .catch(error => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update permission';
      toast.error(errorMessage);
      throw error;
    });
};

const deletePermission = permissionId => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/permissions/${permissionId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to delete permission');
      }
      return res.json();
    })
    .then(() => {
      toast.success('Permission deleted successfully');
      return permissionId;
    })
    .catch(error => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to delete permission';
      toast.error(errorMessage);
      throw error;
    });
};

const deleteRolePermissions = roleId => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/permissions/role/${roleId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to delete role permissions');
      }
      return res.json();
    })
    .then(() => {
      toast.success('Role permissions deleted successfully');
      return roleId;
    })
    .catch(error => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to delete role permissions';
      toast.error(errorMessage);
      throw error;
    });
};

const deleteTenantPermissions = tenantId => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/permissions/tenant/${tenantId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to delete tenant permissions');
      }
      return res.json();
    })
    .then(() => {
      toast.success('Tenant permissions deleted successfully');
      return tenantId;
    })
    .catch(error => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to delete tenant permissions';
      toast.error(errorMessage);
      throw error;
    });
};

export const permissionsService = {
  getPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
  deleteRolePermissions,
  deleteTenantPermissions,
};
