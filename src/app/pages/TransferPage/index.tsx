import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  MoreVertical,
  X,
  Menu,
  Clock,
  FileText,
  MessageSquare,
  Users,
  Settings,
  ChevronLeft,
} from 'lucide-react';

interface Role {
  id: number;
  name: string;
  value: string;
  description?: string;
  parentRoleId?: number;
}

interface Permission {
  id: number;
  name: string;
  description?: string;
  roleId?: number;
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

interface User {
  id: string;
  name: string;
}

const users: User[] = [
  { id: 'user1', name: 'User 1' },
  { id: 'user2', name: 'User 2' },
  { id: 'user3', name: 'User 3' },
];

export const TransferPage = () => {
  // ===== State and Data Handling Section =====
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [blogPermissions, setBlogPermissions] = useState<BlogPermission[]>([]);
  const [userPermissions, setUserPermissions] = useState<UserPermission[]>([]);

  const [activeTab, setActiveTab] = useState<
    'roles' | 'permissions' | 'blogPermissions' | 'userPermissions'
  >('roles');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentOwner, setCurrentOwner] = useState<User | null>(null);
  const [newOwner, setNewOwner] = useState<User | null>(null);

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
      default:
        return [];
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentStep(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStep(0);
    setCurrentOwner(null);
    setNewOwner(null);
  };

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const confirmTransfer = () => {
    console.log('Ownership transfer confirmed');
    setCurrentStep(3); // Show success step
  };

  const renderStep = () => {
    const buttonBaseClasses =
      'px-4 py-2 rounded-md transition-colors font-medium';
    const primaryButtonClasses = `${buttonBaseClasses} bg-[#4A90E2] text-white hover:bg-[#357ABD]`;
    const secondaryButtonClasses = `${buttonBaseClasses} bg-gray-100 text-gray-600 hover:bg-gray-200`;
    const selectClasses =
      'w-full p-2 border border-gray-200 rounded-md mb-4 focus:border-[#4A90E2] focus:ring-1 focus:ring-[#4A90E2] outline-none';

    switch (currentStep) {
      case 0:
        return (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Step 1: Current Owner
            </h4>
            <select
              className={selectClasses}
              value={currentOwner?.id || ''}
              onChange={e =>
                setCurrentOwner(
                  users.find(user => user.id === e.target.value) || null,
                )
              }
            >
              <option value="">Select an owner</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <button
              className={primaryButtonClasses}
              onClick={nextStep}
              disabled={!currentOwner}
            >
              Next
            </button>
          </div>
        );
      case 1:
        return (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Step 2: New Owner
            </h4>
            <select
              className={selectClasses}
              value={newOwner?.id || ''}
              onChange={e =>
                setNewOwner(
                  users.find(user => user.id === e.target.value) || null,
                )
              }
            >
              <option value="">Select an owner</option>
              {users
                .filter(user => user.id !== currentOwner?.id)
                .map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
            </select>
            <div className="flex justify-between gap-3">
              <button className={secondaryButtonClasses} onClick={prevStep}>
                Previous
              </button>
              <button
                className={primaryButtonClasses}
                onClick={nextStep}
                disabled={!newOwner}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h4 className="text-lg font-semibold mb-2">
              Step 3: Confirm Transfer
            </h4>
            <p className="mb-4">
              Confirm the transfer of ownership from{' '}
              <span className="font-semibold">{currentOwner?.name}</span> to{' '}
              <span className="font-semibold">{newOwner?.name}</span>.
            </p>
            <div className="flex justify-between">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={prevStep}
              >
                Previous
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={confirmTransfer}
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h4 className="text-lg font-semibold mb-2">Success!</h4>
            <p className="mb-4">
              The resource ownership has been successfully transferred.
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50" style={{ marginTop: '3%' }}>
      {/* Sidebar */}
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-[#f4a261] hover:text-[#e76f51] transition-colors">
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>
              <h1 className="text-2xl font-semibold text-gray-800">
                Resource Transfer
              </h1>
            </div>
            <button
              className="px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] text-white rounded-lg transition-colors"
              onClick={openModal}
            >
              Transfer Ownership
            </button>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl w-full max-w-md shadow-lg">
                {/* Modal Header */}
                <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Transfer Resource Ownership
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">{renderStep()}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
