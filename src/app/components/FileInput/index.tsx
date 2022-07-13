import React, { useRef } from 'react';

const noop = () => {};

export const FileInput = ({ value, onChange, ...rest }) => {
  const inputRef: any = useRef(null);
  const clickInputRef = () => inputRef.current.click();
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
