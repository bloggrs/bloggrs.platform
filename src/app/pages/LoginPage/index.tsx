import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Formik } from 'formik';
import { connect, useDispatch, useSelector } from 'react-redux';
import { authActions } from 'features/auth/index';
import { authUserSelector, isAuthLoading } from 'features/auth/selectors';
import { Link, Redirect } from 'react-router-dom';
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
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        title="Bloggrs - Login"
        meta={[{ name: "description", content: "A Boilerplate application LoginPage" }]}
      />
      <NotAuthenticatedHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
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
              <form onSubmit={handleSubmit} className="w-full lg:w-1/2 px-4">
                <div>
                  <h1 className="text-4xl font-bold text-slate-900 mb-4">
                    Log in
                  </h1>
                  <h2 className="text-xl text-slate-600 mb-6">
                    What are you waiting for? Get
                    <br />
                    blogging already!
                  </h2>
                  <hr className="mb-8" />

                  <div className="space-y-6">
                    <div>
                      <input
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        type="email"
                        placeholder="E-Mail"
                        className="w-full p-3 border border-slate-300 rounded-md focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email && touched.email && errors.email}
                      </p>
                    </div>

                    <div>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Password"
                        className="w-full p-3 border border-slate-300 rounded-md focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password && touched.password && errors.password}
                      </p>
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-3 rounded-md shadow-md ${
                        Object.keys(errors).length
                          ? 'bg-slate-200 text-slate-900'
                          : 'bg-slate-600 text-white'
                      }`}
                    >
                      Sign In
                    </button>

                    <div className="flex items-center justify-center space-x-2">
                      <p className="text-slate-900">Don't have an account?</p>
                      <Link
                        to="/auth/register"
                        className="text-blue-500 font-medium"
                      >
                        Sign up!
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>

          <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
            <div className="w-4/5">
              <img
                src="/dist2/static/twitter_outline.png"
                alt="Decorative"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
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
