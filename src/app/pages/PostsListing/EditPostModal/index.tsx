import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

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
    borderRadius: 25
  },
};

type Post = {
    id: number;
    title: string;
}

interface EditPostModalProps {
    post: Partial<Post>;
    children: React.Component | string;
}

export const EditPostModal = ({ post: { id, title }, children }: EditPostModalProps) => {
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
  
    return (
      <div>
        <div onClick={openModal}>
            {children}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        //   className="w-2/6 h-2/6"
        >
            <div className='ml-2'>
            <img src="/dist/static/icons8-pencil-64.png"/>
          <h1 className="text-2xl text-slate-700 font-medium">Edit '{title}' post</h1>

          <div className="my-2 px-2 mb-3 xl:w-96">
              <input 
                name="name" 
                type="name" 
                placeholder="Name" 
                className="
                    mt-10
                    form-control
                    block
                    w-full
                    h-12
                    border-white
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-slate-700
                    bg-white bg-clip-padding
                    border border-solid border-slate-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-slate-700
                    focus:bg-white
                    focus:border-slate-800
                    focus:border-2
                    focus:outline-none
                    " 
                id="first_name" 
            />
        {/* <p className="error-feedback">Email is required.</p> */}
        </div>

          {/* <div>I am a modal</div> */}
            <div className="flex w-6/6" style={{
                bottom: 15,
                position: "absolute",
                width: "90%"
            }}>
                <div className="w-11/12">
                    <Link to={`/`}>
                    <button className=" btn-base w-52 bg-green-300  text-white rounded-full hover:bg-green-500">
                        Save
                    </button>
                    </Link>
                </div>
                <br/>

                <div className="">
                    <button
                        onClick={closeModal}
                        className="btn-base w-32 bg-white border-2 border-yellow-500 text-yellow-500 rounded-full"
                    >
                        Cancel
                    </button>
                </div>
            </div>
         </div>
        </Modal>
      </div>
    );
  }
  