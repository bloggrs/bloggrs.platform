import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Formik } from 'formik';
import { connect, useDispatch, useSelector } from 'react-redux';
import { authActions } from 'features/auth/index';
import { authUserSelector, isAuthLoading } from 'features/auth/selectors';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is not in correct format.')
    .required('Email is required.'),
  password: Yup.string()
    .min(3, 'Password must be at least 3 characters.')
    .required('Password is a required field'),
});

const LoginPage_ = props => {
  const dispatch = useDispatch();
  const user = useSelector(authUserSelector);
  const loading = useSelector(isAuthLoading);
  if (user) return <Redirect to="/" />;
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A Boilerplate application LoginPage"
        />
      </Helmet>
      <span>LoginPage container</span>
      <hr />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          dispatch(authActions.login(values));
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
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={loading}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = (state: any) => {
  console.log({ state });
  const { auth } = state;
  return {
    loading: auth.loading,
  };
};

export const LoginPage = connect(mapStateToProps)(LoginPage_);
