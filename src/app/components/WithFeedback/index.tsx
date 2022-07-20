import React from 'react';

const WithFeedback = ({ errors, name, children }: any) => {
  const has_error = Boolean(errors[name]);
  const element = !has_error ? null : (
    <div className="form-control-feedback">{errors[name]}</div>
  );
  const className = has_error ? 'has-error' : '';
  if (children) {
    return (
      <div className={className}>
        {children}
        {element}
      </div>
    );
  }
  return element;
};

export { WithFeedback };
