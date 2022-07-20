import React, { useState } from 'react';

const SelectStatus = ({ initialValue, onChange: _onChange }) => {
  const [value, setValue] = useState(initialValue);
  const onChange = e => {
    e.preventDefault();
    const { value } = e.target;
    setValue(value);
    _onChange(value);
  };
  console.log({ value });
  return (
    <div className=" row">
      <label className="col-sm-2 form-label align-self-center mb-lg-0 text-end">
        Status:{' '}
      </label>
      <div className="col-sm-10">
        <select
          onChange={onChange}
          className="form-select"
          aria-label="Default select example"
        >
          <option value="NONE">Select status</option>
          <option selected={value === 'ARCHIVED'} value="ARCHIVED">
            Archived
          </option>
          <option selected={value === 'DRAFT'} value="DRAFT">
            Draft
          </option>
          <option selected={value === 'PUBLISHED'} value="PUBLISHED">
            Published
          </option>
        </select>
      </div>
    </div>
  );
};

export { SelectStatus };
