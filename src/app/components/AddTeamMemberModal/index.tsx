/* eslint-disable */
import React, { useState } from 'react';
import Modal from 'react-modal';
import { ConnectTeamMember } from './ConnectTeamMember/Loadable';
import { CreateTeamMember } from './CreateTeamMember';

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };

const AddTeamMemberModal = ({ initialValue = [] }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [tab, setTab] = React.useState('CONNECT');

  const [values, setValues] = useState(initialValue || []);

  let subtitle: any = { style: {} };

  function openModal(e) {
    if (e) e.preventDefault();
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const onConnect = value => {
    console.log(value);
  };
  const ConnectTeamMember_ = (
    <ConnectTeamMember
      initialValue={values}
      onAdd={onConnect}
      onClose={closeModal}
    />
  );
  const onCreate = user => {
    console.log(user);
  };
  const CreateTabModalBody_ = (
    <CreateTeamMember onCreate={onCreate} onClose={closeModal} />
  );
  const Comp = tab === 'CONNECT' ? ConnectTeamMember_ : CreateTabModalBody_;
  const modal_body = Comp;

  return (
    <>
      <div className="col-lg-3">
        {' '}
        <div className="" style={{ marginLeft: 10 }}>
          <div className="img-group">
            <a
              onClick={openModal}
              href=""
              className="avatar-box thumb-md align-self-center"
            >
              <span className="avatar-title bg-soft-info rounded-circle font-weight-normal">
                <i className="las la-plus" />
              </span>
            </a>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{}}
        contentLabel="Example Modal"
        className={'modal-dialog'}
      >
        <div className="modal-content">
          <div className="modal-header bg-info">
            <h6 className="modal-title m-0 text-white" id="exampleModalInfo1">
              Add team members
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          {/*end modal-header*/}
          <div className="pb-1" style={{ margin: 'auto' }}>
            <ul
              className="nav-border nav nav-pills mb-0 "
              style={{ borderBottom: 'initial' }}
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="settings_detail_tab"
                  data-bs-toggle="pill"
                  href="#Profile_Settings"
                  onClick={() => setTab('CONNECT')}
                >
                  Connect
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="Profile_Post_tab"
                  data-bs-toggle="pill"
                  href="#Profile_Post"
                  onClick={() => setTab('CREATE')}
                >
                  Create
                </a>
              </li>
            </ul>
          </div>
          {modal_body}
        </div>
        {/*end modal-content*/}
      </Modal>
    </>
  );
};

export { AddTeamMemberModal };
