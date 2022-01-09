import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Formik } from 'formik';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useUsersSlice } from 'features/users';
import { isRegisterLoading } from 'features/users/selectors';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { authUserSelector } from 'features/auth/selectors';

const RegisterSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required.'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Email is not in correct format.')
    .required('Email is required.'),
  password: Yup.string()
    .min(3, 'Password must be at least 3 characters.')
    .required('Password is a required field'),
});

const RegisterPage_ = props => {
  const { actions } = useUsersSlice();
  const dispatch = useDispatch();
  const user = useSelector(authUserSelector);
  const loading = useSelector(isRegisterLoading);
  if (user) return <Redirect to="/" />;
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A Boilerplate application RegisterPage"
        />
      </Helmet>
      <span>RegisterPage container</span>
      <hr />
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          password: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting }) => {
          dispatch(actions.register(values));
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
            <div style={{ display: 'flex' }}>
              <input
                type="first_name"
                name="first_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
              />
              {errors.first_name && touched.first_name && errors.first_name}
              <input
                type="last_name"
                name="last_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
              />
              {errors.last_name && touched.last_name && errors.last_name}
            </div>
            <br />
            <div style={{ display: 'flex' }}>
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
            </div>
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

export const RegisterPage = connect(mapStateToProps)(RegisterPage_);
