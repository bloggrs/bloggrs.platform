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
    maxWidth: '600px',
    height: 'auto',
    minHeight: '400px',
    borderRadius: '12px',
    padding: '24px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
};

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface EditTeamMemberModalProps {
  item: TeamMember;
  children: ReactNode;
  onSuccess?: () => void;
}

export const EditTeamMemberModal = ({
  item,
  children,
  onSuccess,
}: EditTeamMemberModalProps) => {
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [formData, setFormData] = useState<TeamMember>(item);
  const [errors, setErrors] = useState<Partial<TeamMember>>({});

  function openModal() {
    setIsOpen(true);
    setFormData(item);
    setErrors({});
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof TeamMember]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  }

  function validateForm(): boolean {
    const newErrors: Partial<TeamMember> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await teamMembersService.updateTeamMember(formData.id, formData);
      closeModal();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      if (error.status === 403) {
        setIsAuthorized(false);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div onClick={openModal}>{children}</div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Team Member Modal"
      >
        {!isAuthorized ? (
          <NotAuthorized />
        ) : loading ? (
          <Loading forModal={true} />
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-semibold text-gray-800">
                Edit Team Member
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.name && (
                  <span className="text-sm text-red-500">{errors.name}</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">{errors.email}</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent ${
                    errors.role ? 'border-red-500' : 'border-gray-200'
                  }`}
                >
                  <option value="">Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="author">Author</option>
                  <option value="contributor">Contributor</option>
                </select>
                {errors.role && (
                  <span className="text-sm text-red-500">{errors.role}</span>
                )}
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] text-white rounded-lg transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};
