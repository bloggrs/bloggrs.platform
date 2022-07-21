import { useMediasSlice } from 'features/medias';
import { getPaginatedMedias } from 'features/medias/selectors';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { AdvancedPagination } from '../AdvancedPagination';
import { UploadButton } from './UploadButton';

const ChooseMediaModal = props => {
  const { actions } = useMediasSlice();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  let subtitle: any = { style: {} };

  const [showEntries, setShowEntries] = React.useState(6);
  const [query, setQuery] = React.useState('');
  const onQueryChange = e => setQuery(e.target.value);
  const onShowEntriesChange = e => setShowEntries(Number(e.target.value));

  const [ selectedMediaId, setSelectedMediaId ]: any = useState(undefined);

  const dispatch = useDispatch();
  const [init, setInit] = useState(false);
  useEffect(() => {
    dispatch(actions.loadMedias({ query, pageSize: showEntries }));
  }, [query, showEntries, init]);
  useEffect(() => setInit(true), []);

  function openModal(e) {
    if (e) e.preventDefault();
    setIsOpen(true);
  }

  const medias = useSelector(getPaginatedMedias({ query, pageSize: showEntries }))
  
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const disabled = isNaN(Number(selectedMediaId))
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
        onAfterOpen={props.afterOpenModal}
        onRequestClose={closeModal}
        style={{}}
        contentLabel="Example Modal"
        className={'modal-dialog modal-xl'}
      >
        <div className="modal-content">
          <div className="modal-header bg-info">
            <h6 className="modal-title m-0 text-white" id="exampleModalInfo1">
              Choose media
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          {/*end modal-header*/}
          <div className="card-body">
            <AdvancedPagination
              query={query}
              onQueryChange={onQueryChange}
              onShowEntriesChange={onShowEntriesChange}
              showEntries={showEntries}
            />
          </div>
          <div className="row">
            {
              medias.map(media => {
                const selected = media.id === selectedMediaId;
                const onClick = e => {
                  e.preventDefault();
                  const value = selected ? undefined : media.id
                  setSelectedMediaId(value);
                }
                return (
                  <div className="col-lg-3" onClick={onClick}>
                    <div className="card-body">
                      <div className="blog-card">
                        {
                          selected && 
                            <span
                              className="badge badge-purple px-3 py-2 bg-danger fw-semibold mt-035"
                              style={{
                                margin: 5,
                                zoom: '70%',
                                fontSize: 15,
                                position: 'absolute',
                              }}
                            >
                              Selected
                            </span>
                        }
                        <img
                          src={media.media_url}
                          alt=""
                          className="img-fluid rounded"
                        />
                        <p className="text-muted mt-2">my-favorite-vacation-image</p>
                        <hr className="hr-dashed" />
                      </div>
                      {/*end blog-card*/}
                    </div>
                    {/*end card-body*/}
                  </div>
                )
              })
            }
          </div>
          {/*end modal-body*/}
          <div className="modal-footer">
            <UploadButton />
            <button
              disabled={disabled} 
              type="button" className="btn btn-soft-info btn-sm">
              Select
            </button>
            <button
              disabled={disabled}
              type="button"
              className="btn btn-soft-secondary btn-sm"
              data-bs-dismiss="modal"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
          {/*end modal-footer*/}
        </div>
        {/*end modal-content*/}
      </Modal>
    </>
  );
};

export { ChooseMediaModal };
