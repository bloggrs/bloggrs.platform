import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, X, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { rolesService } from 'services/roles.service';
import { blogPermissionsService } from 'services/blogpermissions.service';
import { permissionsService } from 'services/permissions.service';
import { teamMemberPermissionsService } from 'services/teamMemberPermissionsService';
import { resourcePoliciesService } from 'services/resourcepolicies.service';
import { toast } from 'react-toastify';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import Modal from 'react-modal';

interface Role {
  id: number;
  name: string;
  value: string;
  description?: string;
  isSystem: boolean;
  parentRoleId?: number;
  tenantId?: number;
}

interface Permission {
  id: number;
  name: string;
  action: string;
  resource: string;
  description?: string;
  isSystem: boolean;
  roleId?: number;
  tenantId?: number;
}

interface ResourcePolicy {
  id: number;
  resourceType: string;
  resourceId: number;
  roleId: number;
  permissions: any; // JSON type
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

interface BlogPermission {
  id: number;
  action: string;
  resourceId: number;
  resourceType: string;
  teamMemberId: number;
}

interface TeamMemberPermission {
  id: number;
  teamMemberId: number;
  permissionId: number;
  isCustom: boolean;
  teammember: {
    id: number;
    createdAt: string;
    updatedAt: string;
    UserId: number;
    BlogId: number;
    isOwner: boolean;
  };
  permission: {
    id: number;
    name: string;
    action: string;
    resource: string;
    description: string | null;
    isSystem: boolean;
    roleId: number | null;
    tenantId: number | null;
  };
}

// Add this after the interfaces and before the component
const TABLE_INFO = {
  userRoles: {
    title: 'Team Member Roles',
    description:
      'Manage team member roles and their hierarchies. Roles define sets of permissions that can be assigned to team members.',
    fields: [
      { name: 'Name', description: 'Unique identifier for the role' },
      { name: 'Value', description: 'Internal value used by the system' },
      {
        name: 'Description',
        description: "Detailed explanation of the role's purpose",
      },
      {
        name: 'Parent Role',
        description: 'The role this inherits permissions from',
      },
      {
        name: 'System',
        description: 'Whether this is a system-defined or custom role',
      },
    ],
  },
  accessRights: {
    title: 'Access Rights',
    description:
      'Define granular access controls for different resources and actions.',
    fields: [
      { name: 'Name', description: 'Unique identifier for the permission' },
      {
        name: 'Action',
        description: 'The operation being permitted (e.g., read, write)',
      },
      { name: 'Resource', description: 'The entity being accessed' },
      {
        name: 'Description',
        description: 'Details about what this permission allows',
      },
      {
        name: 'System',
        description: 'Whether this is a system-defined permission',
      },
    ],
  },
  blogAccess: {
    title: 'Blog Team Member Permissions',
    description: 'Manage specific permissions for blog-related operations.',
    fields: [
      { name: 'Action', description: 'The permitted blog operation' },
      { name: 'Resource Type', description: 'Type of blog resource' },
      { name: 'Resource ID', description: 'Identifier of the specific blog' },
      {
        name: 'Team Member ID',
        description: 'Team member granted this permission',
      },
    ],
  },
  memberAccess: {
    title: 'Team Member Permissions',
    description:
      'Direct permission assignments to users, overriding role-based permissions.',
    fields: [
      { name: 'Team Member ID', description: 'Identifier of the user' },
      { name: 'Permission ID', description: 'The permission being granted' },
      { name: 'Custom', description: 'Whether this is a custom override' },
    ],
  },
  accessPolicies: {
    title: 'Resource Policies',
    description: 'Complex permission rules for specific resources.',
    fields: [
      { name: 'Resource Type', description: 'Category of resource' },
      { name: 'Resource ID', description: 'Specific resource identifier' },
      { name: 'Role ID', description: 'Role this policy applies to' },
      { name: 'Priority', description: 'Order of policy evaluation' },
      { name: 'Permissions', description: 'Detailed permission configuration' },
    ],
  },
};

// Add this helper function before renderTableRows
const formatPermissions = (permissions: any) => {
  try {
    const permObj =
      typeof permissions === 'string' ? JSON.parse(permissions) : permissions;
    return (
      <div className="text-left">
        {Object.entries(permObj).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2 text-sm">
            <span className="font-medium text-gray-700">{key}:</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                value
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {value ? 'Allowed' : 'Denied'}
            </span>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    return (
      <span className="text-red-500 text-xs">Invalid permissions format</span>
    );
  }
};

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  modalType: 'create' | 'edit';
  activeTab: string;
  editingItem: any; // Consider creating a union type of all possible item types
}

const FormModal: React.FC<FormModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  modalType, 
  activeTab, 
  editingItem 
}) => {
  if (!isOpen) return null;

  const getFormFields = () => {
    const inputClassName = "w-full px-4 py-3 text-base rounded-lg border-2 border-gray-200 focus:border-[#1e3a8a] focus:outline-none transition-colors";
    const labelClassName = "block text-sm font-medium text-gray-700 mb-1";
    const checkboxClassName = "h-4 w-4 rounded border-2 border-gray-200 text-[#1e3a8a] focus:ring-[#1e3a8a]";

    switch (activeTab) {
      case 'userRoles':
        return (
          <>
            <div>
              <label className={labelClassName}>Name</label>
              <input
                type="text"
                name="name"
                defaultValue={editingItem?.name || ''}
                className={inputClassName}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Value</label>
              <input
                type="text"
                name="value"
                defaultValue={editingItem?.value || ''}
                className={inputClassName}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Description</label>
              <textarea
                name="description"
                defaultValue={editingItem?.description || ''}
                className={inputClassName}
                rows={3}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isSystem"
                defaultChecked={editingItem?.isSystem || false}
                className={checkboxClassName}
              />
              <label className="ml-2 text-sm text-gray-700">System Role</label>
            </div>
          </>
        );

      case 'accessRights':
        return (
          <>
            <div>
              <label className={labelClassName}>Name</label>
              <input
                type="text"
                name="name"
                defaultValue={editingItem?.name || ''}
                className={inputClassName}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Action</label>
              <input
                type="text"
                name="action"
                defaultValue={editingItem?.action || ''}
                className={inputClassName}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Resource</label>
              <input
                type="text"
                name="resource"
                defaultValue={editingItem?.resource || ''}
                className={inputClassName}
                required
              />
            </div>
          </>
        );

      case 'blogAccess':
        return (
          <>
            <div>
              <label className={labelClassName}>Action</label>
              <input
                type="text"
                name="action"
                defaultValue={editingItem?.action || ''}
                className={inputClassName}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Resource Type</label>
              <input
                type="text"
                name="resourceType"
                defaultValue={editingItem?.resourceType || ''}
                className={inputClassName}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Resource ID</label>
              <input
                type="number"
                name="resourceId"
                defaultValue={editingItem?.resourceId || ''}
                className={inputClassName}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Team Member ID</label>
              <input
                type="number"
                name="teamMemberId"
                defaultValue={editingItem?.teamMemberId || ''}
                className={inputClassName}
                required
              />
            </div>
          </>
        );

      case 'memberAccess':
        return (
          <>
            <div>
              <label className={labelClassName}>Team Member ID</label>
              <input
                type="number"
                name="teamMemberId"
                defaultValue={editingItem?.teamMemberId || ''}
                className={inputClassName}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Permission ID</label>
              <input
                type="number"
                name="permissionId"
                defaultValue={editingItem?.permissionId || ''}
                className={inputClassName}
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isCustom"
                defaultChecked={editingItem?.isCustom || false}
                className={checkboxClassName}
              />
              <label className="ml-2 text-sm text-gray-700">Custom Override</label>
            </div>
          </>
        );

      case 'accessPolicies':
        return (
          <>
            <div>
              <label className={labelClassName}>Resource Type</label>
              <input
                type="text"
                name="resourceType"
                defaultValue={editingItem?.resourceType || ''}
                className={inputClassName}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Resource ID</label>
              <input
                type="number"
                name="resourceId"
                defaultValue={editingItem?.resourceId || ''}
                className={inputClassName}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Role ID</label>
              <input
                type="number"
                name="roleId"
                defaultValue={editingItem?.roleId || ''}
                className={inputClassName}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Priority</label>
              <input
                type="number"
                name="priority"
                defaultValue={editingItem?.priority || 0}
                className={inputClassName}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Permissions</label>
              <textarea
                name="permissions"
                defaultValue={editingItem?.permissions ? JSON.stringify(editingItem.permissions, null, 2) : '{}'}
                className={inputClassName}
                rows={3}
                required
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '500px',
          height: 'auto',
          minHeight: '300px',
          borderRadius: '12px',
          padding: '24px',
        },
      }}
      contentLabel={`${modalType === 'create' ? 'Add new' : 'Edit'} ${activeTab.slice(0, -1)}`}
    >
      <form onSubmit={onSubmit} className="flex flex-col h-full">
        <div className="flex flex-col space-y-4">
          <img
            src="/dist/static/icons8-pencil-64.png"
            className="w-16 h-16 mb-2"
          />
          <h1 className="text-2xl text-[#1e3a8a] font-medium">
            {modalType === 'create' ? 'Add new' : `Edit '${editingItem?.name || ''}'`} {activeTab.slice(0, -1)}
          </h1>

          <div className="space-y-4">
            {getFormFields()}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-6">
          <button
            type="submit"
            className="flex-1 px-6 py-2 bg-[#1e3a8a] text-white rounded-full hover:bg-[#2d4a9e] transition-colors"
          >
            {modalType === 'create' ? 'Create' : 'Save'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-2 bg-white border-2 border-[#1e3a8a] text-[#1e3a8a] rounded-full hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Add this helper function
const validateFormData = (formData: FormData, tab: string) => {
  const errors: string[] = [];

  switch (tab) {
    case 'userRoles':
      if (!(formData.get('name') as string)?.trim()) {
        errors.push('Name is required');
      }
      if (!(formData.get('value') as string)?.trim()) {
        errors.push('Value is required');
      }
      break;
    case 'accessRights':
      if (!(formData.get('name') as string)?.trim()) {
        errors.push('Name is required');
      }
      if (!(formData.get('action') as string)?.trim()) {
        errors.push('Action is required');
      }
      if (!(formData.get('resource') as string)?.trim()) {
        errors.push('Resource is required');
      }
      break;
    // Add validation for other tabs...
  }

  return errors;
};

export const SettingsPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [blogPermissions, setBlogPermissions] = useState<BlogPermission[]>([]);
  const [teamMemberPermissions, setTeamMemberPermissions] = useState<TeamMemberPermission[]>([]);
  const [resourcePolicies, setResourcePolicies] = useState<ResourcePolicy[]>([]);

  const [activeTab, setActiveTab] = useState<
    | 'userRoles'
    | 'accessRights'
    | 'blogAccess'
    | 'memberAccess'
    | 'accessPolicies'
  >('userRoles');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  // Keep this useEffect as the single source for loading roles
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const fetchedRoles = await rolesService.getRoles();
        const formattedRoles = fetchedRoles.map(role => ({
          ...role,
          parentRoleName:
            roles.find(r => r.id === role.parentRoleId)?.name || '-',
        }));
        setRoles(formattedRoles);
      } catch (error) {
        console.error('Failed to load roles:', error);
      }
    };

    if (activeTab === 'userRoles') {
      loadRoles();
    }
  }, [activeTab]);

  // Add this useEffect near the other useEffect hooks
  useEffect(() => {
    const loadBlogPermissions = async () => {
      try {
        const fetchedPermissions =
          await blogPermissionsService.getBlogPermissions();
        setBlogPermissions(fetchedPermissions);
      } catch (error) {
        console.error('Failed to load blog permissions:', error);
      }
    };

    if (activeTab === 'blogAccess') {
      loadBlogPermissions();
    }
  }, [activeTab]);

  // Add useEffect hooks for loading data when tab changes
  useEffect(() => {
    const loadPermissions = async () => {
      try {
        const response = await permissionsService.getPermissions();
        setPermissions(response.permissions);
      } catch (error) {
        console.error('Failed to load permissions:', error);
      }
    };

    const loadTeamMemberPermissions = async () => {
      try {
        const response = await teamMemberPermissionsService.getTeamMemberPermissions();
        // Add type checking and default to empty array if data is missing
        const permissions = response?.teammemberpermissions || [];
        console.log('Loaded permissions:', permissions); // Debug log
        setTeamMemberPermissions(permissions);
      } catch (error) {
        console.error('Failed to load team member permissions:', error);
        setTeamMemberPermissions([]);
      }
    };

    const loadResourcePolicies = async () => {
      try {
        const response = await resourcePoliciesService.getResourcePolicies();
        setResourcePolicies(response.resourcePolicies);
      } catch (error) {
        console.error('Failed to load resource policies:', error);
      }
    };

    switch (activeTab) {
      case 'accessRights':
        loadPermissions();
        break;
      case 'memberAccess':
        loadTeamMemberPermissions();
        break;
      case 'accessPolicies':
        loadResourcePolicies();
        break;
    }
  }, [activeTab]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allItems = getCurrentItems().map(item => item.id);
    setSelectedItems(e.target.checked ? allItems : []);
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const handleAddItem = () => {
    setModalType('create');
    setIsModalOpen(true);
  };

  const handleEditItem = async (id: number) => {
    try {
      let item;
      switch (activeTab) {
        case 'userRoles':
          item = roles.find(r => r.id === id);
          break;
        case 'accessRights':
          item = permissions.find(p => p.id === id);
          break;
        case 'blogAccess':
          item = blogPermissions.find(bp => bp.id === id);
          break;
        case 'memberAccess':
          item = teamMemberPermissions.find(tmp => tmp.id === id);
          break;
        case 'accessPolicies':
          item = resourcePolicies.find(rp => rp.id === id);
          break;
      }

      if (!item) {
        throw new Error('Item not found');
      }

      setEditingItem(item);
      setModalType('edit');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch item details:', error);
      toast.error('Failed to fetch item details');
    }
  };

  const handleDeleteClick = (item: any) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      switch (activeTab) {
        case 'userRoles':
          await rolesService.deleteRole(itemToDelete.id);
          setRoles(prev => prev.filter(role => role.id !== itemToDelete.id));
          break;
        case 'accessRights':
          await permissionsService.deletePermission(itemToDelete.id);
          setPermissions(prev => prev.filter(perm => perm.id !== itemToDelete.id));
          break;
        case 'blogAccess':
          await blogPermissionsService.deleteBlogPermission(itemToDelete.id);
          setBlogPermissions(prev => prev.filter(bp => bp.id !== itemToDelete.id));
          break;
        case 'memberAccess':
          await teamMemberPermissionsService.deleteTeamMemberPermission(itemToDelete.id);
          setTeamMemberPermissions(prev => prev.filter(tmp => tmp.id !== itemToDelete.id));
          break;
        case 'accessPolicies':
          await resourcePoliciesService.deleteResourcePolicy(itemToDelete.id);
          setResourcePolicies(prev => prev.filter(rp => rp.id !== itemToDelete.id));
          break;
      }
      toast.success('Item deleted successfully');
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error('Failed to delete item:', error);
      toast.error('Failed to delete item');
    }
  };

  const handleRoleSubmit = async (formData: FormData) => {
    const roleData = {
      name: formData.get('name') as string,
      value: formData.get('value') as string,
      description: formData.get('description') as string,
      parentRoleId: formData.get('parentRoleId')
        ? Number(formData.get('parentRoleId'))
        : null,
      isSystem: formData.get('isSystem') === 'on',
      permissions: [],
      tenantId: null,
    };

    try {
      if (modalType === 'edit' && editingItem) {
        const updatedRole = await rolesService.updateRole(
          editingItem.id,
          roleData,
        );
        setRoles(prev =>
          prev.map(role => (role.id === editingItem.id ? updatedRole : role)),
        );
      } else {
        const newRole = await rolesService.createRole(roleData);
        setRoles(prev => [...prev, newRole]);
      }
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error(`Failed to ${modalType} role:`, error);
      toast.error(`Failed to ${modalType} role`);
    }
  };

  const handleBlogPermissionSubmit = async (formData: FormData) => {
    const blogPermissionData = {
      action: formData.get('action') as string,
      resourceId: Number(formData.get('resourceId')),
      resourceType: formData.get('resourceType') as string,
      teammemberId: Number(formData.get('teamMemberId'))
    };

    try {
      if (modalType === 'edit' && editingItem) {
        const updatedPermission = await blogPermissionsService.updateBlogPermission(
          editingItem.id,
          blogPermissionData
        );
        setBlogPermissions(prev =>
          prev.map(bp => (bp.id === editingItem.id ? updatedPermission : bp))
        );
      } else {
        const newPermission = await blogPermissionsService.createBlogPermission(
          blogPermissionData
        );
        setBlogPermissions(prev => [...prev, newPermission]);
      }
      toast.success(`Blog permission ${modalType === 'edit' ? 'updated' : 'created'} successfully`);
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error(`Failed to ${modalType} blog permission:`, error);
      toast.error(`Failed to ${modalType} blog permission`);
    }
  };

  const handlePermissionSubmit = async (formData: FormData) => {
    const permissionData = {
      name: formData.get('name') as string,
      action: formData.get('action') as string,
      resource: formData.get('resource') as string,
      description: formData.get('description') as string || null,
      isSystem: formData.get('isSystem') === 'on',
      roleId: null,
      tenantId: null
    };

    try {
      if (modalType === 'edit' && editingItem) {
        const updatedPermission = await permissionsService.updatePermission(
          editingItem.id,
          permissionData
        );
        setPermissions(prev =>
          prev.map(permission => (permission.id === editingItem.id ? updatedPermission : permission))
        );
        toast.success('Permission updated successfully');
      } else {
        const newPermission = await permissionsService.createPermission(permissionData);
        setPermissions(prev => [...prev, newPermission]);
        toast.success('Permission created successfully');
      }
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error(`Failed to ${modalType} permission:`, error);
      toast.error(`Failed to ${modalType} permission`);
    }
  };

  const handleTeamMemberPermissionSubmit = async (formData: FormData) => {
    const teamMemberPermissionData = {
      teammemberId: Number(formData.get('teamMemberId')),
      permissionId: Number(formData.get('permissionId')),
      isCustom: formData.get('isCustom') === 'on',
    };

    try {
      if (modalType === 'edit' && editingItem) {
        const updatedPermission = await teamMemberPermissionsService.updateTeamMemberPermission(
          editingItem.id,
          teamMemberPermissionData,
        );
        setTeamMemberPermissions((prev: TeamMemberPermission[]) => {
          if (!Array.isArray(prev)) return [updatedPermission];
          return prev.map(tmp => 
            tmp.id === editingItem.id ? updatedPermission : tmp
          );
        });
      } else {
        const newPermission = await teamMemberPermissionsService.createTeamMemberPermission(
          teamMemberPermissionData,
        );
        setTeamMemberPermissions((prev: TeamMemberPermission[]) => {
          if (!Array.isArray(prev)) return [newPermission];
          return [...prev, newPermission];
        });
      }
      toast.success(`Team member permission ${modalType === 'edit' ? 'updated' : 'created'} successfully`);
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error(`Failed to ${modalType} team member permission:`, error);
      toast.error(`Failed to ${modalType} team member permission`);
    }
  };

  const handleResourcePolicySubmit = async (formData: FormData) => {
    try {
      // Get the permissions string from form and parse it to validate JSON
      const permissionsStr = formData.get('permissions') as string;
      let permissions;
      try {
        // Validate that it's proper JSON
        permissions = JSON.parse(permissionsStr);
      } catch (error) {
        toast.error('Invalid JSON format in permissions field');
        return;
      }

      const resourcePolicyData = {
        resourceType: formData.get('resourceType') as string,
        resourceId: Number(formData.get('resourceId')),
        roleId: Number(formData.get('roleId')),
        permissions: JSON.stringify(permissions), // Convert back to string for API
        priority: Number(formData.get('priority')),
      };

      if (modalType === 'edit' && editingItem) {
        const updatedPolicy = await resourcePoliciesService.updateResourcePolicy(
          editingItem.id,
          resourcePolicyData,
        );
        setResourcePolicies(prev =>
          prev.map(policy => (policy.id === editingItem.id ? updatedPolicy : policy)),
        );
        toast.success('Resource policy updated successfully');
      } else {
        const newPolicy = await resourcePoliciesService.createResourcePolicy(
          resourcePolicyData,
        );
        setResourcePolicies(prev => [...prev, newPolicy]);
        toast.success('Resource policy created successfully');
      }
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error(`Failed to ${modalType} resource policy:`, error);
      toast.error(`Failed to ${modalType} resource policy`);
    }
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const errors = validateFormData(formData, activeTab);
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }

    switch (activeTab) {
      case 'userRoles':
        handleRoleSubmit(formData);
        break;
      case 'accessRights':
        handlePermissionSubmit(formData);
        break;
      case 'blogAccess':
        handleBlogPermissionSubmit(formData);
        break;
      case 'memberAccess':
        handleTeamMemberPermissionSubmit(formData);
        break;
      case 'accessPolicies':
        handleResourcePolicySubmit(formData);
        break;
      default:
        console.log('Unhandled tab type:', activeTab);
    }
  };

  const getCurrentItems = () => {
    switch (activeTab) {
      case 'userRoles':
        return roles?.filter(
          role =>
            role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            role.description?.toLowerCase().includes(searchQuery.toLowerCase()),
        ) || [];
      case 'accessRights':
        return permissions?.filter(
          permission =>
            permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            permission.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()),
        ) || [];
      case 'blogAccess':
        return blogPermissions?.filter(
          bp =>
            bp.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bp.resourceType.toLowerCase().includes(searchQuery.toLowerCase()),
        ) || [];
      case 'memberAccess':
        return (teamMemberPermissions || []).filter(tmp => {
          if (!tmp) return false;
          
          const searchTerms = searchQuery.toLowerCase();
          return (
            // User ID search
            tmp.teammember?.UserId?.toString()?.includes(searchQuery) ||
            // Permission name search
            tmp.permission?.name?.toLowerCase()?.includes(searchTerms) ||
            // Permission action search
            tmp.permission?.action?.toLowerCase()?.includes(searchTerms) ||
            // Permission resource search
            tmp.permission?.resource?.toLowerCase()?.includes(searchTerms)
          );
        });
      case 'accessPolicies':
        return resourcePolicies?.filter(
          rp =>
            rp.resourceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rp.resourceId.toString().includes(searchQuery) ||
            rp.roleId.toString().includes(searchQuery),
        ) || [];
      default:
        return [];
    }
  };

  // Update renderTableHeaders to show correct headers for each tab
  const renderTableHeaders = () => {
    const commonClasses =
      'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';

    const tabSpecificHeaders = {
      userRoles: (
        <>
          <th className={commonClasses}>Name</th>
          <th className={commonClasses}>Value</th>
          <th className={commonClasses}>Description</th>
          <th className={commonClasses}>Parent Role</th>
          <th className={commonClasses}>System</th>
        </>
      ),
      accessRights: (
        <>
          <th className={commonClasses}>Name</th>
          <th className={commonClasses}>Action</th>
          <th className={commonClasses}>Resource</th>
          <th className={commonClasses}>Description</th>
          <th className={commonClasses}>System</th>
        </>
      ),
      blogAccess: (
        <>
          <th className={commonClasses}>Action</th>
          <th className={commonClasses}>Resource Type</th>
          <th className={commonClasses}>Resource ID</th>
          <th className={commonClasses}>Team Member ID</th>
        </>
      ),
      memberAccess: (
        <>
          <th className={commonClasses}>Team Member</th>
          <th className={commonClasses}>Permission</th>
          <th className={commonClasses}>Type</th>
        </>
      ),
      accessPolicies: (
        <>
          <th className={commonClasses}>Resource</th>
          <th className={commonClasses}>Role</th>
          <th className={commonClasses}>Priority</th>
          <th className={commonClasses}>Permissions</th>
        </>
      ),
    };

    return tabSpecificHeaders[activeTab] || null;
  };

  // Update renderTableRows to show correct data for each tab
  const renderTableRows = () => {
    try {
      const items = getCurrentItems();

      if (!Array.isArray(items)) {
        console.error('Items is not an array:', items);
        return (
          <tr>
            <td colSpan={6} className="px-6 py-4 text-center text-red-500">
              Error loading items
            </td>
          </tr>
        );
      }

      if (items.length === 0) {
        return (
          <tr>
            <td colSpan={6} className="px-6 py-12 text-center">
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="text-gray-400">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div className="text-gray-500 text-lg font-medium">
                  No team member permissions found
                </div>
                <div className="text-gray-400 text-sm">
                  Get started by adding a new team member permission
                </div>
                <button
                  onClick={handleAddItem}
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add {activeTab.slice(0, -1)}
                </button>
              </div>
            </td>
          </tr>
        );
      }

      return items.map(item => (
        <tr key={item.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => handleSelectItem(item.id)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
          </td>

          {activeTab === 'userRoles' && (
            <>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-md bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 font-medium">
                      {item.name?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-500">{item.value}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                  {item.value}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {item.description || '-'}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                  {roles.find(r => r.id === item.parentRoleId)?.name || 'No parent'}
                </span>
              </td>
              <td className="px-6 py-4">
                {item.isSystem && (
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    System
                  </span>
                )}
              </td>
            </>
          )}

          {activeTab === 'accessRights' && (
            <>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {item.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-500">{item.action}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {item.action}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {item.resource}
                </span>
              </td>
              <td className="px-6 py-4">
                <div
                  className="text-sm text-gray-900 max-w-xs truncate"
                  title={item.description || '-'}
                >
                  {item.description || '-'}
                </div>
              </td>
              <td className="px-6 py-4">
                {item.isSystem ? (
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    System
                  </span>
                ) : (
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    Custom
                  </span>
                )}
              </td>
            </>
          )}

          {activeTab === 'blogAccess' && (
            <>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-md bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-medium">
                      {item.action.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.action}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.resourceType}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {item.resourceType}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  ID: {item.resourceId}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                  Team Member ID: {item.teamMemberId}
                </span>
              </td>
            </>
          )}

          {activeTab === 'memberAccess' && (
            <>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-md bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">TM</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      ID: {item.teammember?.id}
                    </div>
                    <div className="text-xs text-gray-500">
                      User ID: {item.teammember?.UserId}
                    </div>
                    <div className="text-xs text-gray-500">
                      Blog ID: {item.teammember?.BlogId}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {item.permission?.name}
                  </span>
                  <div className="flex gap-1">
                    <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">
                      {item.permission?.action}
                    </span>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">
                      {item.permission?.resource}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-2">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.isCustom 
                      ? 'bg-orange-100 text-orange-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.isCustom ? 'Custom' : 'Standard'}
                  </span>
                  {item.teammember?.isOwner && (
                    <span className="px-2 py-1 block text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      Owner
                    </span>
                  )}
                </div>
              </td>
            </>
          )}

          {activeTab === 'accessPolicies' && (
            <>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-md bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 font-medium">
                      {item.resourceType.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.resourceType}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {item.resourceId}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  Role ID: {item.roleId}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  {item.priority}
                </span>
              </td>
              <td className="px-6 py-4">
                {formatPermissions(item.permissions)}
              </td>
            </>
          )}

          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div className="opacity-0 group-hover:opacity-100 flex justify-end space-x-2">
              <button
                onClick={() => handleEditItem(item.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-400 hover:text-gray-600"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDeleteClick(item)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-400 hover:text-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </td>
        </tr>
      ));
    } catch (error) {
      console.error('Error rendering table rows:', error);
      return (
        <tr>
          <td colSpan={6} className="px-6 py-4 text-center text-red-500">
            Error rendering table
          </td>
        </tr>
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  // Add this new component before renderTableInfo
  const renderTabInfo = () => {
    const info = {
      userRoles: {
        title: 'Team Member Role-Based Access Control',
        description:
          'Manage team member roles and hierarchies to control access across your blog platform. Roles define sets of permissions that can be assigned to team members, creating a structured approach to access management.',
        keyPoints: [
          'Create and manage hierarchical roles',
          'Inherit permissions from parent roles',
          'Distinguish between system and custom roles',
          'Assign roles to team members and groups',
        ],
      },
      accessRights: {
        title: 'Team Member Permission Management',
        description:
          'Define and control granular permissions that specify what actions team members can perform on different resources within your blog platform.',
        keyPoints: [
          'Create custom permissions',
          'Define resource-specific access rules',
          'Manage system-level permissions',
          'Link permissions to roles',
        ],
      },
      blogAccess: {
        title: 'Blog Team Member Permissions',
        description: 'Manage specific permissions for blog-related operations.',
        keyPoints: [
          'Set blog-specific access rules',
          'Control content management permissions',
          'Manage user access to blogs',
          'Configure publishing rights',
        ],
      },
      memberAccess: {
        title: 'Team Member Permissions',
        description:
          'Directly assign or override permissions for specific users, providing flexibility beyond role-based permissions.',
        keyPoints: [
          'Override role-based permissions',
          'Assign temporary access rights',
          'Manage custom user privileges',
          'Track individual permissions',
        ],
      },
      accessPolicies: {
        title: 'Resource Access Policies',
        description:
          'Define complex access policies for different resources, with priority-based rules and detailed permission configurations.',
        keyPoints: [
          'Create resource-specific policies',
          'Set policy priorities',
          'Configure detailed access rules',
          'Manage policy inheritance',
        ],
      },
    };

    const currentInfo = info[activeTab];

    return (
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {currentInfo.title}
        </h2>
        <p className="text-gray-600 mb-4">{currentInfo.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentInfo.keyPoints.map((point, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-xs">{index + 1}</span>
              </div>
              <span className="text-gray-700">{point}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Add this component inside SettingsPage but before the return statement
  const renderTableInfo = () => {
    const info = TABLE_INFO[activeTab];

    return (
      <div className="mb-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {info.title}
        </h2>
        <p className="text-gray-600 mb-4">{info.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {info.fields.map((field, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gray-50">
              <h3 className="font-medium text-gray-900">{field.name}</h3>
              <p className="text-sm text-gray-600">{field.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    // Clear selections and search when switching tabs
    setSelectedItems([]);
    setSearchQuery('');
    setOpenDropdownId(null);
    setEditingItem(null);
    setIsModalOpen(false);
  }, [activeTab]);

  useEffect(() => {
    // Cleanup function for modals
    return () => {
      setIsModalOpen(false);
      setIsDeleteModalOpen(false);
      setEditingItem(null);
      setItemToDelete(null);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 backdrop-blur-sm">
      {/* Main content area */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Access Control & Security Center
          </h1>
          <p className="mt-2 text-gray-600">
            Manage and configure all aspects of your platform's security and access control
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <nav className="flex space-x-2 sm:space-x-4 border-b border-gray-200">
            {[
              { id: 'userRoles', label: 'User Roles' },
              { id: 'accessRights', label: 'Access Rights' },
              { id: 'blogAccess', label: 'Blog Access' },
              { id: 'memberAccess', label: 'Member Access' },
              { id: 'accessPolicies', label: 'Access Policies' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Info Section */}
        <div className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm">
          {renderTabInfo()}
        </div>

        {/* Table Info Section */}
        <div className="mb-6 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          {renderTableInfo()}
        </div>

        {/* Search and Add button */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder={`Quick search ${activeTab}...`}
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
            />
            <Search 
              className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" 
            />
          </div>
          <button
            onClick={handleAddItem}
            className="px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5 inline-block mr-2" />
            Add {activeTab.slice(0, -1)}
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-4 pl-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === getCurrentItems().length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-[#1a365d] focus:ring-[#1a365d]"
                    />
                  </th>
                  {renderTableHeaders()}
                </tr>
              </thead>
              <tbody>
                {renderTableRows()}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transfer button */}
        <div className="fixed bottom-8 right-8">
          <Link to={window.location.pathname + '/transfer'}>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Transfer Blog Ownership
            </button>
          </Link>
        </div>

        {/* Add the FormModal component */}
        <FormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitForm}
          modalType={modalType}
          activeTab={activeTab}
          editingItem={editingItem}
        />
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        item={itemToDelete}
        activeTab={activeTab}
      />
    </div>
  );
};
