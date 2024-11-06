import { toast } from 'react-toastify';
import { API_URL } from '../config';
const handleErrorResponse = async (response) => {
  const errorData = await response.json();
  // Map specific error codes to user-friendly messages
  switch (errorData.code) {
    case 400:
      if (errorData.message.includes('permission is already assigned')) {
        toast.error('This team member already has this permission');
        return;
      }
      toast.error(errorData.message || 'Invalid request. Please check your input.');
      return;
    case 401:
      toast.error('You are not authorized to perform this action');
      return;
    case 403:
      toast.error('You do not have permission to perform this action');
      return;
    case 404:
      toast.error('Team member not found');
      return;
    case 409:
      toast.error('This team member already exists');
      return;
    default:
      toast.error(errorData.message || 'An unexpected error occurred');
      return;
  }
};

const getTeamMembers = (query = {}) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/teammembers?${new URLSearchParams(
    query,
  )}`;
  return fetch(endpoint, requestOptions)
    .then(async res => {
      if (!res.ok) {
        await handleErrorResponse(res);
        return null;
      }
      return res.json();
    })
    .then(data => {
      if (!data) return { teammembers: [], pagination: { total: 0 } };
      if (!(data.message === "success") ) {
        toast.error(data.message || 'Operation failed');
        return { teammembers: [], pagination: { total: 0 } };
      }
      return {
        teammembers: data.data.teammembers,
        pagination: data.data.pagination,
      };
    })
    .catch(error => {
      const errorMessage = error.message || 'Failed to fetch team members';
      toast.error(errorMessage, { autoClose: 5000 });
      return { teammembers: [], pagination: { total: 0 } }; // Return empty state instead of throwing
    });
};

const getTeamMember = teammemberId => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/teammembers/${teammemberId}`;
  return fetch(endpoint, requestOptions)
    .then(async res => {
      if (!res.ok) {
        await handleErrorResponse(res);
        return null;
      }
      return res.json();
    })
    .then(data => {
      if (!data) return null;
      if (!(data.message === "success")) {
        toast.error(data.message || 'Failed to fetch team member');
        return null;
      }
      return data.data.teammember;
    })
    .catch(error => {
      const errorMessage = error.message || 'Failed to fetch team member details';
      toast.error(errorMessage, { autoClose: 5000 });
      return null; // Return null instead of throwing
    });
};

const createTeamMember = memberData => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify(memberData),
  };
  const endpoint = `${API_URL}/api/v1/teammembers`;
  return fetch(endpoint, requestOptions)
    .then(async res => {
      if (!res.ok) {
        await handleErrorResponse(res);
        return null;
      }
      return res.json();
    })
    .then(data => {
      if (!data) return null;
      if (!(data.message === "success")) {
        toast.error(data.message || 'Operation failed');
        return null;
      }
      return data.data.teammember;
    })
    .catch(error => {
      const errorMessage = error.message || 'Failed to create team member';
      toast.error(errorMessage, { autoClose: 5000 });
      throw error;
    });
};

const updateTeamMember = (teammemberId, memberData) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify(memberData),
  };
  const endpoint = `${API_URL}/api/v1/teammembers/${teammemberId}`;
  return fetch(endpoint, requestOptions)
    .then(async res => {
      if (!res.ok) {
        await handleErrorResponse(res);
        return null;
      }
      return res.json();
    })
    .then(data => {
      if (!data) return null;
      if (!(data.message === "success")) {
        toast.error(data.message || 'Operation failed');
        return null;
      }
      return data.data.teammember;
    })
    .catch(error => {
      const errorMessage = error.message || 'Failed to update team member';
      toast.error(errorMessage, { autoClose: 5000 });
      throw error;
    });
};

const deleteTeamMember = teammemberId => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/teammembers/${teammemberId}`;
  return fetch(endpoint, requestOptions)
    .then(async res => {
      if (!res.ok) {
        await handleErrorResponse(res);
        return null;
      }
      return res.json();
    })
    .then(data => {
      if (!data) return null;
      if (!(data.message === "success")) {
        toast.error(data.message || 'Operation failed');
        return null;
      }
      return teammemberId;
    })
    .catch(error => {
      const errorMessage = error.message || 'Failed to delete team member';
      toast.error(errorMessage, { autoClose: 5000 });
      throw error;
    });
};

export const teamMembersService = {
  getTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
