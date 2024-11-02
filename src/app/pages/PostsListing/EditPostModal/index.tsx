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
        contentLabel="Example Modal"
        //   className="w-2/6 h-2/6"
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-col space-y-4">
            <img
              src="/dist/static/icons8-pencil-64.png"
              className="w-16 h-16 mb-2"
            />
            <h1 className="text-2xl text-[#1e3a8a] font-medium">
              Edit '{title}' post
            </h1>

            <div className="w-full">
              <input
                name="name"
                type="name"
                placeholder="Name"
                className="
                  w-full
                  px-4
                  py-3
                  text-base
                  rounded-lg
                  border-2
                  border-gray-200
                  focus:border-[#1e3a8a]
                  focus:outline-none
                  transition-colors
                "
                id="first_name"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-6">
            <Link to={`/`} className="flex-1">
              <button className="w-full px-6 py-2 bg-[#1e3a8a] text-white rounded-full hover:bg-[#2d4a9e] transition-colors">
                Save
              </button>
            </Link>
            <button
              onClick={closeModal}
              className="flex-1 px-6 py-2 bg-white border-2 border-[#1e3a8a] text-[#1e3a8a] rounded-full hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
