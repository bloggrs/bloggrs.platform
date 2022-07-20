import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'debounce';
import { useUsersSlice } from './slice';
import { Formik } from 'formik';
import * as yup from 'yup';
import { WithFeedback } from 'app/components/WithFeedback';

const schema = yup.object().shape({
  first_name: yup.string().min(4).required(),
  last_name: yup.string().min(4).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
};

const CreateTeamMember = ({ onCreate: onParentCreate, onClose }) => {
  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await onParentCreate(values);
        setSubmitting(false);
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
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label" htmlFor="username">
                    First Name
                  </label>
                  <WithFeedback errors={errors} name="first_name">
                    <input
                      type="text"
                      placeholder="Enter first name.."
                      className="form-control"
                      id="username"
                      onChange={handleChange}
                      name="first_name"
                    />
                  </WithFeedback>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label" htmlFor="username">
                    Last Name
                  </label>
                  <WithFeedback errors={errors} name="last_name">
                    <input
                      type="text"
                      placeholder="Enter last name.."
                      className="form-control"
                      id="username"
                      name="last_name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.last_name}
                    />
                  </WithFeedback>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="exampleInputEmail1">
                Email address
              </label>
              <WithFeedback errors={errors} name="email">
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                />
              </WithFeedback>
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="exampleInputPassword1">
                Password
              </label>
              <WithFeedback errors={errors} name="password">
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </WithFeedback>
            </div>
            {/*end row*/}
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="btn btn-soft-info btn-sm"
              disabled={isSubmitting}
            >
              Create
            </button>
            <button
              type="button"
              className="btn btn-soft-secondary btn-sm"
              data-bs-dismiss="modal"
              disabled={isSubmitting}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export { CreateTeamMember };
