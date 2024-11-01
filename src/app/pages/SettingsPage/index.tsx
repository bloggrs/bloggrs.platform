import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { rolesService } from 'services/roles.service';

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
  userId: number;
}

interface UserPermission {
  id: number;
  userId: number;
  permissionId: number;
  isCustom: boolean;
}

export const SettingsPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [blogPermissions, setBlogPermissions] = useState<BlogPermission[]>([]);
  const [userPermissions, setUserPermissions] = useState<UserPermission[]>([]);
  const [resourcePolicies, setResourcePolicies] = useState<ResourcePolicy[]>(
    [],
  );

  const [activeTab, setActiveTab] = useState<
    | 'roles'
    | 'permissions'
    | 'blogPermissions'
    | 'userPermissions'
    | 'resourcePolicies'
  >('roles');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');

  const handleShowRoles = async () => {
    try {
      setActiveTab('roles');
      const fetchedRoles = await rolesService.getRoles();
      
      // Transform the data if needed for display
      const formattedRoles = fetchedRoles.map(role => ({
        ...role,
        parentRoleName: roles.find(r => r.id === role.parentRoleId)?.name || '-'
      }));
      
      setRoles(formattedRoles);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
      // You might want to show an error message to the user here
    }
  };

  // Add this useEffect to load roles when component mounts
  useEffect(() => {
    handleShowRoles();
  }, []); // Empty dependency array means this runs once on mount

  // Add useEffect to load roles
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const fetchedRoles = await rolesService.getRoles();
        setRoles(fetchedRoles);
      } catch (error) {
        console.error('Failed to load roles:', error);
      }
    };

    if (activeTab === 'roles') {
      loadRoles();
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

  const handleEditItem = (id: number) => {
    setModalType('edit');
    setIsModalOpen(true);
    // Fetch item details and populate form
  };

  const handleDeleteItem = (id: number) => {
    // Implement delete logic
    console.log('Delete item', id);
  };

  const handleRoleSubmit = async (formData: FormData) => {
    const roleData = {
      name: formData.get('name'),
      value: formData.get('value'),
      description: formData.get('description'),
      parentRoleId: formData.get('parentRoleId') ? Number(formData.get('parentRoleId')) : null,
      isSystem: formData.get('isSystem') === 'on',
      permissions: [],
      tenantId: null
    };

    alert(JSON.stringify(roleData, null, 2));
    await rolesService.createRole(roleData);
    setIsModalOpen(false);
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    switch (activeTab) {
      case 'roles':
        handleRoleSubmit(formData);
        break;
      // Add other cases for different tabs here
      default:
        console.log('Unhandled tab type:', activeTab);
    }
  };

  const getCurrentItems = () => {
    switch (activeTab) {
      case 'roles':
        return roles.filter(
          role =>
            role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            role.description?.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      case 'permissions':
        return permissions.filter(
          permission =>
            permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            permission.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()),
        );
      case 'blogPermissions':
        return blogPermissions.filter(
          bp =>
            bp.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bp.resourceType.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      case 'userPermissions':
        return userPermissions.filter(
          up =>
            up.userId.toString().includes(searchQuery) ||
            up.permissionId.toString().includes(searchQuery),
        );
      case 'resourcePolicies':
        return resourcePolicies.filter(
          rp =>
            rp.resourceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rp.resourceId.toString().includes(searchQuery) ||
            rp.roleId.toString().includes(searchQuery),
        );
      default:
        return [];
    }
  };

  const renderTableHeaders = () => {
    switch (activeTab) {
      case 'roles':
        return (
          <>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Parent Role
            </th>
          </>
        );
      case 'permissions':
        return (
          <>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
          </>
        );
      case 'blogPermissions':
        return (
          <>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Resource Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Resource ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User ID
            </th>
          </>
        );
      case 'userPermissions':
        return (
          <>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Permission ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Custom
            </th>
          </>
        );
      case 'resourcePolicies':
        return (
          <>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Resource Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Resource ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Permissions
            </th>
          </>
        );
      default:
        return null;
    }
  };

  const renderTableRows = () => {
    const items = getCurrentItems();
    
    if (items.length === 0) {
      return (
        <tr>
          <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
            No roles found
          </td>
        </tr>
      );
    }

    return items.map(item => (
      <tr 
        key={item.id}
        className="hover:bg-gray-50 transition-colors duration-200"
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="checkbox"
            checked={selectedItems.includes(item.id)}
            onChange={() => handleSelectItem(item.id)}
            className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        </td>
        {activeTab === 'roles' && (
          <>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="text-sm font-medium text-gray-900">
                  {(item as Role).name}
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {(item as Role).value}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-500 max-w-xs overflow-hidden overflow-ellipsis">
                {(item as Role).description || '-'}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${(item as Role).parentRoleId 
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'}`
              }>
                {(item as Role).parentRoleId 
                  ? `ID: ${(item as Role).parentRoleId}`
                  : 'No Parent'}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${(item as Role).isSystem 
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'}`
              }>
                {(item as Role).isSystem ? 'System' : 'Custom'}
              </span>
            </td>
          </>
        )}
        {activeTab === 'permissions' && (
          <>
            <td className="px-6 py-4 whitespace-nowrap">
              {(item as Permission).name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {(item as Permission).description}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {(item as Permission).roleId}
            </td>
          </>
        )}
        {activeTab === 'blogPermissions' && (
          <>
            <td className="px-6 py-4 whitespace-nowrap">
              {(item as BlogPermission).action}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {(item as BlogPermission).resourceType}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {(item as BlogPermission).resourceId}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {(item as BlogPermission).userId}
            </td>
          </>
        )}
        {activeTab === 'userPermissions' && (
          <>
            <td className="px-6 py-4 whitespace-nowrap">
              {(item as UserPermission).userId}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {(item as UserPermission).permissionId}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {(item as UserPermission).isCustom ? 'Yes' : 'No'}
            </td>
          </>
        )}
        {activeTab === 'resourcePolicies' && (
          <>
            <td className="px-6 py-4 whitespace-nowrap">
              {(item as ResourcePolicy).resourceType}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {(item as ResourcePolicy).resourceId}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {(item as ResourcePolicy).roleId}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {(item as ResourcePolicy).priority}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {(item as ResourcePolicy).permissions}
            </td>
          </>
        )}
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="relative inline-block text-left">
            <button
              onClick={() => setOpenDropdownId(openDropdownId === item.id ? null : item.id)}
              className="inline-flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            
            {openDropdownId === item.id && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu">
                  <button
                    onClick={() => handleEditItem(item.id)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    <span className="flex items-center">
                      <span className="mr-2">✏️</span> Edit
                    </span>
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                    role="menuitem"
                  >
                    <span className="flex items-center">
                      <span className="mr-2">🗑️</span> Delete
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main content area */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Permissions Management System
            </h1>
          </div>

          {/* Tabs */}
          <div className="mb-6 overflow-x-auto">
            <nav className="flex space-x-2 sm:space-x-4 border-b border-gray-200">
              {[
                'roles',
                'permissions',
                'blogPermissions',
                'userPermissions',
                'resourcePolicies',
              ].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-3 py-2 text-sm sm:text-base whitespace-nowrap border-b-2 ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600 font-medium'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.replace(/([A-Z])/g, ' $1').trim()}
                </button>
              ))}
            </nav>
          </div>

          {/* Search and Add button */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <button
              onClick={handleAddItem}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="mr-2" size={20} />
              <span>Add {activeTab.slice(0, -1)}</span>
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === getCurrentItems().length}
                        onChange={handleSelectAll}
                        className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Parent Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {renderTableRows()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer button */}
      <div className="fixed bottom-8 right-8">
        <Link to={window.location.pathname + '/transfer'}>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 shadow-lg transition-colors">
            Transfer Blog Ownership
          </button>
        </Link>
      </div>

      {/* Modal - update styling */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {modalType === 'create' ? 'Create' : 'Edit'} {activeTab.slice(0, -1)}
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleSubmitForm} className="space-y-4">
                  {activeTab === 'roles' && (
                    <>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="Enter role name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                          Value
                        </label>
                        <input
                          type="text"
                          id="value"
                          name="value"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="Enter role value"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="Enter role description"
                        />
                      </div>
                      <div>
                        <label htmlFor="parentRoleId" className="block text-sm font-medium text-gray-700">
                          Parent Role ID
                        </label>
                        <input
                          type="number"
                          id="parentRoleId"
                          name="parentRoleId"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="Enter parent role ID"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isSystem"
                          name="isSystem"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="isSystem" className="ml-2 block text-sm text-gray-700">
                          System Role
                        </label>
                      </div>
                    </>
                  )}
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {modalType === 'create' ? 'Create' : 'Update'} Role
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
