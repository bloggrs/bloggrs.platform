import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { NotAuthorized } from 'app/components/NotAuthorized';

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

type Post = {
  id: number;
  title: string;
};

interface EditPostModalProps {
  post: Partial<Post>;
  children: React.ReactNode;
  hasAccess?: boolean;
}

export const EditPostModal = ({
  post: { id, title },
  children,
  hasAccess = true,
}: EditPostModalProps) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  if (!hasAccess) {
    return <NotAuthorized />;
  }

  return (
    <div>
      <div onClick={openModal}>{children}</div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Post Modal"
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src="/dist/static/icons8-pencil-64.png"
                className="w-12 h-12"
              />
              <h1 className="text-2xl font-semibold text-gray-800">
                Edit Post
              </h1>
            </div>

            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                name="title"
                type="text"
                defaultValue={title}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 
                          focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                id="title"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-8">
            <button
              className="flex-1 px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] 
                         text-white rounded-lg transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={closeModal}
              className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 
                         text-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
