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

type Category = {
  id: number;
  name: string;
};

interface EditCategoryModalProps {
  category: Partial<Category>;
  children: React.ReactNode;
  hasAccess?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const EditCategoryModal = ({
  category: { id, name },
  children,
  hasAccess = true,
  isOpen,
  onClose,
}: EditCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState(name || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API call to update category
    console.log('Updating category:', { id, name: categoryName });
    onClose();
  };

  if (!hasAccess) {
    return <NotAuthorized />;
  }

  return (
    <div>
      <div>{children}</div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Edit Category Modal"
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex flex-col space-y-4">
            <img
              src="/dist/static/icons8-pencil-64.png"
              className="w-16 h-16 mb-2"
            />
            <h1 className="text-2xl text-[#1e3a8a] font-medium">
              Edit '{name}' category
            </h1>

            <div className="w-full">
              <input
                name="name"
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Category Name"
                className="w-full px-4 py-3 text-base rounded-lg border-2 border-gray-200 focus:border-[#1e3a8a] focus:outline-none transition-colors"
                id="category_name"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-6">
            <button
              type="submit"
              className="flex-1 px-6 py-2 bg-[#1e3a8a] text-white rounded-full hover:bg-[#2d4a9e] transition-colors"
            >
              Save
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
    </div>
  );
};
