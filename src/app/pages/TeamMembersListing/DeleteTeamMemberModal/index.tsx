import { Loading } from 'app/components/Loading';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { NotAuthorized } from 'app/components/NotAuthorized';
import { ReactNode } from 'react';
import { teamMembersService } from 'services/teammembers.service';

const customStyles = {
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
};

interface TeamMember {
  id: string;
  name: string;
}

interface DeleteTeamMemberModalProps {
  item: TeamMember;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const DeleteTeamMemberModal: React.FC<DeleteTeamMemberModalProps> = ({
  item: { id, name },
  isOpen,
  onClose,
  onSuccess,
}: DeleteTeamMemberModalProps) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);

  async function handleDelete(e) {
    e.preventDefault();
    setDeleteLoading(true);

    try {
      await teamMembersService.deleteTeamMember(id);
      onClose();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      if (error.status === 403) {
        setIsAuthorized(false);
      }
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Delete Team Member Modal"
    >
      {!isAuthorized ? (
        <NotAuthorized />
      ) : deleteLoading ? (
        <Loading forModal={true} />
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
              <img
                src="/dist/static/icons8-delete-96 (1).png"
                className="w-8 h-8"
              />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Delete team member '{name}'
            </h1>
            <p className="text-sm text-gray-500">
              Are you sure you want to remove this team member? This action
              cannot be reversed.
            </p>
          </div>

          <div className="flex flex-row-reverse gap-3 mt-8">
            <button
              onClick={handleDelete}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a365d]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
