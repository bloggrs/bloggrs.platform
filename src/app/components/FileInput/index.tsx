import React, { useRef } from 'react';

const noop = () => {};

export const FileInput = ({ value, onChange, ...rest }) => {
  const inputRef: any = useRef(null);
  const clickInputRef = () => inputRef.current.click();
  return (
    <div>
      <label>
        {(Boolean(value) && <div>Selected file: {value.name}</div>) || (
          <>
            <span onClick={clickInputRef}>Drag and drop here or</span> <br />
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
  );
};
