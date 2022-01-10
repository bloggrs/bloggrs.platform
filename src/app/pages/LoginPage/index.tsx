import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Formik } from 'formik';
import { connect, useDispatch, useSelector } from 'react-redux';
import { authActions } from 'features/auth/index';
import { authUserSelector, isAuthLoading } from 'features/auth/selectors';
import { Redirect } from 'react-router-dom';
import { NotAuthenticatedHeader } from '../../components/NotAuthenticatedHeader';
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
      {/* This example requires Tailwind CSS v2.0+ */}
      <Helmet>
        <title>Bloggrs - Login</title>
        <meta
          name="description"
          content="A Boilerplate application LoginPage"
        />
      </Helmet>
      <NotAuthenticatedHeader />
      <div className="container max-h-full max-w-7xl py-9 px-12">
        <div className="px-2">
          <div className="flex -mx-2">
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={async (values, { setSubmitting }) => {
                console.log(values);
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
                <form
                  onSubmit={handleSubmit}
                  className="lg:w-3/6 sm:w-6/6 px-2"
                >
                  <div className="h-12">
                    <h1 className="mx-2 text-slate-900 font-bold text-5xl font-medium">
                      Log in
                    </h1>
                    <h2 className="mx-2 py-5 text-xl font-medium text-slate-600">
                      What are you waiting for? Get <br />
                      blogging already!
                    </h2>
                    <hr className="mx-1" />
                    <div className="py-7">
                      <div className="my-2 px-2 mb-3 xl:w-96">
                        <input
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          type="email"
                          placeholder="E-Mail"
                          className="
                    form-control
                    block
                    w-full
                    h-12
                    border-white
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-slate-700
                    bg-white bg-clip-padding
                    border border-solid border-slate-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-slate-700
                    focus:bg-white
                    focus:border-slate-800
                    focus:border-2
                    focus:outline-none
                  "
                          id="first_name"
                        />
                        <p className="error-feedback">
                          {errors.email && touched.email && errors.email}
                        </p>
                      </div>
                      <div className="px-2 mb-3 xl:w-96">
                        <input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          placeholder="Password"
                          className="
                    form-control
                    block
                    w-full
                    h-12
                    border-white
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-slate-700
                    bg-white bg-clip-padding
                    border border-solid border-slate-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-slate-700
                    focus:bg-white
                    focus:border-slate-800
                    focus:border-2
                    focus:outline-none
                  "
                          id="last_name"
                        />
                        <p className="error-feedback">
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </p>
                      </div>
                      <div className="px-2 mb-3 xl:w-96 my-40">
                        {Object.keys(errors).length ? (
                          <button
                            type="submit"
                            className="w-full py-5/6 btn bg-slate-200 block shadow-md"
                          >
                            <span className="font-medium text-slate-900">
                              Sign Up
                            </span>
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="w-full py-5/6 btn bg-slate-600 block shadow-md"
                          >
                            <span className="font-medium text-white">
                              Sign Up
                            </span>
                          </button>
                        )}
                        <div className="flex py-3">
                          <p className="text-slate-900 font-medium">
                            Don't have an account?&nbsp;&nbsp;
                          </p>
                          <a href="/src/register">
                            <p className="text-blue-500 font-medium">
                              Sign up!
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                // <form onSubmit={handleSubmit}>
                //   <input
                // type="email"
                // name="email"
                // onChange={handleChange}
                // onBlur={handleBlur}
                // value={values.email}
                //   />
                //   {errors.email && touched.email && errors.email}
                //   <input
                // type="password"
                // name="password"
                // onChange={handleChange}
                // onBlur={handleBlur}
                // value={values.password}
                //   />
                //   {errors.password && touched.password && errors.password}
                //   <button type="submit" disabled={loading}>
                //     Submit
                //   </button>
                // </form>
              )}
            </Formik>
            <div className="hidden lg:block w-1/6 px-2" />
            <div className="hidden lg:block w-2/6 px-2 justify-center items-center flex">
              <div className="mx-10 py-10 h-12 w-5/6">
                <img src="http://localhost:3001/dist/static/twitter_outline.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
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
