import { Loading } from 'app/components/Loading';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { NotAuthorized } from 'app/components/NotAuthorized';
import { ReactNode } from 'react';
import { useCategoriesSlice } from '../slice';
import { isCategoryDeleteLoading } from '../slice/selectors';

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
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  },
};

type Category = {
  id: number;
  name: string;
};

interface DeleteCategoryModalProps {
  category: Category;
  children: ReactNode;
}

export const DeleteCategoryModal = ({
  category: { id, name },
  children,
}: DeleteCategoryModalProps) => {
  const dispatch = useDispatch();
  const { actions } = useCategoriesSlice();
  const deleteLoading = useSelector(isCategoryDeleteLoading);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onDelete(id: number) {
    return async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      dispatch({
        type: 'categoryListing.categories/deleteCategory',
        payload: {
          id,
          onSuccess: closeModal,
          onError: (error: { status: number }) => {
            if (error.status === 403) {
              setIsAuthorized(false);
            }
          },
        },
      });
    };
  }

  return (
    <div>
      <div onClick={openModal}>{children}</div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Category Modal"
      >
        {!isAuthorized ? (
          <NotAuthorized />
        ) : deleteLoading ? (
          <Loading forModal={true} />
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex flex-col space-y-4">
              <img
                src="/dist/static/icons8-delete-96 (1).png"
                className="w-12 h-12 mb-2 text-gray-400"
              />
              <h1 className="text-xl font-semibold text-gray-900">
                Delete '{name}' category
              </h1>
              <h2 className="text-sm text-gray-500">
                Are you sure you want to perform this action?
              </h2>
              <span className="text-sm text-gray-500">
                This action cannot be reversed.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-6">
              <button
                onClick={onDelete(id)}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={closeModal}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a365d] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
