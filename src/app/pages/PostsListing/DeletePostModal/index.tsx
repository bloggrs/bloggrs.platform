import { Loading } from 'app/components/Loading';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { usePostsSlice } from '../slice';
import { isPostDeleteLoading } from '../slice/selectors';
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

interface DeletePostModalProps {
  post: Post;
  children: React.Component | string;
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
        contentLabel="Example Modal"
        //   className="w-2/6 h-2/6"
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
                className="w-16 h-16 mb-2"
              />
              <h1 className="text-2xl text-[#1e3a8a] font-medium">
                Delete '{title}' post
              </h1>
              <h2 className="text-lg text-gray-700 font-medium">
                Are you sure you want to perform this action?
              </h2>
              <span className="text-sm text-gray-500">
                This action cannot be reversed.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-6">
              <button
                onClick={onDelete(id)}
                className="btn-base px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={closeModal}
                className="btn-base px-6 py-2 bg-white border-2 border-[#1e3a8a] text-[#1e3a8a] rounded-full hover:bg-gray-50 transition-colors"
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
