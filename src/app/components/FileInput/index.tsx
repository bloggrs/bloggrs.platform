import React from 'react';

const noop = () => {};

export const FileInput = ({ value, onChange, ...rest }) => (
  <div>
    {Boolean(value) && <div>Selected files: {value.name}</div>}
    <label>
      Click to select file...
      <input
        {...rest}
        style={{ display: 'none' }}
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
