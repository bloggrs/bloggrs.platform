import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    width: '90%',
    padding: '24px',
    borderRadius: '12px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: any;
  activeTab: string;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  item,
  activeTab,
}) => {
  if (!item) return null;

  const renderItemDetails = () => {
    switch (activeTab) {
      case 'userRoles':
        return (
          <>
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {item.name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Value:</span> {item.value}
            </p>
            {item.description && (
              <p className="mb-2">
                <span className="font-semibold">Description:</span>{' '}
                {item.description}
              </p>
            )}
          </>
        );
      case 'accessRights':
        return (
          <>
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {item.name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Action:</span> {item.action}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Resource:</span> {item.resource}
            </p>
          </>
        );
      case 'blogAccess':
        return (
          <>
            <p className="mb-2">
              <span className="font-semibold">Action:</span> {item.action}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Resource Type:</span>{' '}
              {item.resourceType}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Resource ID:</span> {item.resourceId}
            </p>
          </>
        );
      case 'memberAccess':
        return (
          <>
            <p className="mb-2">
              <span className="font-semibold">Team Member ID:</span>{' '}
              {item.teamMemberId}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Permission ID:</span>{' '}
              {item.permissionId}
            </p>
          </>
        );
      case 'accessPolicies':
        return (
          <>
            <p className="mb-2">
              <span className="font-semibold">Resource Type:</span>{' '}
              {item.resourceType}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Resource ID:</span> {item.resourceId}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Role ID:</span> {item.roleId}
            </p>
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
      style={customStyles}
      contentLabel="Delete Confirmation Modal"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-red-50 rounded-full p-3">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          Confirm Deletion
        </h2>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
          {renderItemDetails()}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a365d]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}; 