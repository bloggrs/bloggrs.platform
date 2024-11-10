import React, { useRef } from 'react';

const noop = () => {};

export const FileInput = ({ value, onChange, ...rest }) => {
  const inputRef: any = useRef(null);
  const clickInputRef = () => inputRef.current.click();
  return (
    <div className="w-full">
      <label className="block w-full cursor-pointer">
        {(Boolean(value) && (
          <div className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm">
            <span className="text-gray-900 font-medium">
              Selected file: {value.name}
            </span>
          </div>
        )) || (
          <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors text-center">
            <span onClick={clickInputRef} className="text-gray-600">
              Drag and drop here or
            </span>
            <br />
            <span
              onClick={clickInputRef}
              className="text-[#f4a261] hover:text-[#e76f51] transition-colors font-medium"
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
