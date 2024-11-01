import React, { useRef } from 'react';

const noop = () => {};

export const FileInput = ({ value, onChange, ...rest }) => {
  const inputRef: any = useRef(null);
  const clickInputRef = () => inputRef.current.click();
  return (
    <div className="w-full">
      <label className="block w-full cursor-pointer">
        {(Boolean(value) && (
          <div className="p-4 rounded-lg border-2 border-blue-500 bg-white">
            <span className="text-gray-700">Selected file: {value.name}</span>
          </div>
        )) || (
          <div className="p-6 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors text-center">
            <span onClick={clickInputRef} className="text-gray-600">
              Drag and drop here or
            </span>
            <br />
            <span
              onClick={clickInputRef}
              className="text-blue-500 hover:text-blue-600"
            >
              browse
            </span>
          </div>
        )}
        <input
          {...rest}
          style={{ display: 'none' }}
          ref={inputRef}
          type="file"
          onChange={e => {
            const { files } = e.target;
            onChange((files && files[0]) || undefined);
          }}
        />
      </label>
    </div>
  );
};
