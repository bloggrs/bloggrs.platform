import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { usePostsSlice } from '../slice';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 398,
    borderRadius: 25,
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

  function onDelete(id) {
    return async e => {
      alert(JSON.stringify({ id, title }));
      e.preventDefault();
      dispatch({
        type: 'postsListing.posts/deletePost',
        payload: { id },
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
        <div className="ml-2">
          <img src="/dist/static/icons8-delete-96 (1).png" />
          <h1 className="text-2xl text-slate-700 font-medium">
            Delete '{title}' post
          </h1>
          <h1 className="text-xl text-slate-700 font-bold">
            Are you sure you want to perform this action?
          </h1>
          <span
            style={{
              textAlign: 'left',
              font: 'normal normal normal 14px/21px Poppins;',
              letterSpacing: 0,
              color: '#000000',
              opacity: 0.35,
            }}
          >
            This action cannot be reversed.
          </span>
          {/* <div>I am a modal</div> */}
          <div
            className="flex w-6/6"
            style={{
              bottom: 15,
              position: 'absolute',
              width: '90%',
            }}
          >
            <div className="w-11/12">
              <button
                onClick={onDelete(id)}
                className=" btn-base w-52 bg-red-500  text-white rounded-full hover:bg-red-500"
              >
                Delete
              </button>
            </div>
            <br />

            <div className="">
              <button
                onClick={closeModal}
                className="btn-base w-32 bg-white border-2 border-yellow-300 text-yellow-300 rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
