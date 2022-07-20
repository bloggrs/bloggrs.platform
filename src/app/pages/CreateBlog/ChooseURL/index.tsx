/* eslint-disable */

import { MainPanel } from 'app/components/MainPanel';
import { Formik } from 'formik';
import * as React from 'react';
import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().min(4).required(),
});

export const ChooseURL = ({
  nextStep,
  onContinueClick,
  onPreviousClick,
  sendValueToParent,
  parentValue: parentValue_,
}) => {
  const getFeedback = (errors, key) =>
    errors[key] && <div className="form-control-feedback">{errors[key]}</div>;

  return (
    <div className="card-body">
      <Formik
        initialValues={{ username: parentValue_.username }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          if (onContinueClick) onContinueClick(values)();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form
            id="form-horizontal"
            className="form-horizontal form-wizard-wrapper wizard clearfix"
            role="application"
            onSubmit={handleSubmit}
          >
            <div className="container-fluid" style={{ display: 'block' }}>
              <div className="container row">
                <h4 className="mt-4 mb-4">General details</h4>
                <div
                  className={
                    'col-md-8 row ' + (errors.username ? 'has-error' : '')
                  }
                >
                  <div className="col-2" style={{ margin: 'auto' }}>
                    <label className="mt-2 form-label mb-lg-0 text-end">
                      Username:{' '}
                    </label>
                  </div>
                  <div className="col-offset-2 col-2 card-body m-auto">
                    <div className="input-group">
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="username"
                        aria-label="username"
                        aria-describedby="basic-addon2"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                      />
                      <span className="input-group-text" id="basic-addon2">
                        .gjergjkadriu.com
                      </span>
                    </div>
                    {getFeedback(errors, 'username')}
                  </div>

                  <div style={{ display: 'flex', marginTop: '2vh' }}>
                    <div style={{ width: '50%', textAlign: 'left' }}>
                      <button
                        className="btn btn-outline-light"
                        style={{ right: '-6vw', marginRight: '2vw' }}
                        disabled={!onPreviousClick}
                        onClick={onPreviousClick && onPreviousClick(values)}
                      >
                        Previous
                      </button>
                    </div>
                    <div
                      style={{
                        width: '50%',
                        textAlign: 'right',
                        display: 'inline',
                      }}
                    >
                      <button
                        className="btn btn-outline-primary"
                        style={{ right: '-6vw', marginRight: '0.5vw' }}
                        disabled={!onContinueClick || isSubmitting}
                        type="submit"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
