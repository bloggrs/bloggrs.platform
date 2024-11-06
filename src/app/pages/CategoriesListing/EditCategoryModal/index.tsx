import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { NotAuthorized } from 'app/components/NotAuthorized';
import { ChevronLeft } from 'lucide-react';

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
            <div className="flex items-center space-x-4 mb-2">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center text-[#f4a261] hover:text-[#e76f51] transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>
              <h1 className="text-2xl font-semibold text-gray-800">
                Edit Category
              </h1>
            </div>

            <div className="w-full">
              <input
                name="name"
                type="text"
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
                placeholder="Category Name"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                id="category_name"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-6">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] text-white rounded-lg transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
