import React, { useRef } from 'react';

const noop = () => {};

export const FileInput = ({ value, onChange, ...rest }) => {
  const inputRef: any = useRef(null);
  const clickInputRef = () => inputRef.current.click();
  return (
    <div className="card-body">
      <div className="dropify-wrapper">
        <div className="dropify-message">
          <span className="file-icon">
            <img src="/upload-cloud.svg" alt="Upload" />
            <p>Drag and drop a file here or click</p>
          </span>
          <p className="dropify-error">Ooops, something wrong appended.</p>
        </div>
        <div className="dropify-loader" />
        <div className="dropify-errors-container">
          <ul />
        </div>
        <input type="file" id="input-file-now" className="dropify" />
        <button type="button" className="dropify-clear">
          Remove
        </button>
        <div className="dropify-preview">
          <span className="dropify-render" />
          <div className="dropify-infos">
            <div className="dropify-infos-inner">
              <p className="dropify-filename">
                <span className="file-icon" />{' '}
                <span className="dropify-filename-inner" />
              </p>
              <p className="dropify-infos-message">
                Drag and drop or click to replace
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="mx-auto w-5/6 lg:w-6/6 px-2 h-44 bg-transparent border-slate-200 border-2 border-dashed">
      <img
        className="my-3 mx-auto"
        src="/dist/static/icons8-upload-100.png"
        style={{
          opacity: value && value.name !== 'default.png' ? 1 : 0.3,
          marginTop: '2vh',
        }}
      />
      <h6
        className="my-2"
        style={{
          textAlign: 'center',
          marginTop: '2.0vh',
        }}
      >
        <div>
          <label>
            {(Boolean(value) && <div>Selected file: {value.name}</div>) || (
              <>
                <span onClick={clickInputRef}>Drag and drop here or</span>{' '}
                <br />
                <span onClick={clickInputRef} className="text-blue-500">
                  browse
                </span>
              </>
            )}
            <input
              {...rest}
              style={{ display: 'none' }}
              ref={inputRef}
              type="file"
              onChange={e => {
                // onChange([...e.target.files]);
                const { files } = e.target;
                onChange((files && files[0]) || undefined);
              }}
            />
          </label>
        </div>
      </h6>
    </div>
  );
};
