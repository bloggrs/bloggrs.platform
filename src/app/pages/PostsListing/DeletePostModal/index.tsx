import { Loading } from 'app/components/Loading';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { usePostsSlice } from '../slice';
import { isPostDeleteLoading } from '../slice/selectors';
import { NotAuthorized } from 'app/components/NotAuthorized';
import { ReactNode } from 'react';

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

type Post = {
  id: number;
  title: string;
};

interface DeletePostModalProps {
  post: Post;
  children: ReactNode;
}

export const DeletePostModal = ({
  post: { id, title },
  children,
}: DeletePostModalProps) => {
  const dispatch = useDispatch();
  const { actions } = usePostsSlice();
  const deleteLoading = useSelector(isPostDeleteLoading);

  const subtitle = { style: { color: '' } };
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);

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

  function onDelete(id) {
    return async e => {
      e.preventDefault();
      dispatch({
        type: 'postsListing.posts/deletePost',
        payload: {
          id,
          onSuccess: closeModal,
          onError: error => {
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
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Post Modal"
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
                className="w-12 h-12 mb-2"
              />
              <h1 className="text-2xl font-semibold text-gray-900">
                Delete '{title}' post
              </h1>
              <h2 className="text-base text-gray-600">
                Are you sure you want to perform this action?
              </h2>
              <span className="text-sm text-gray-500">
                This action cannot be reversed.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-8">
              <button
                onClick={onDelete(id)}
                className="inline-flex justify-center items-center px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={closeModal}
                className="inline-flex justify-center items-center px-4 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
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
