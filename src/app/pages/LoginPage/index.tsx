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
        meta={[
          {
            name: 'description',
            content: 'A Boilerplate application LoginPage',
          },
        ]}
      />
      <NotAuthenticatedHeader />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                  <form onSubmit={handleSubmit} className="w-full lg:w-1/2 p-8">
                    <div>
                      <h1 className="text-2xl font-semibold text-gray-900">
                        Log in
                      </h1>
                      <h2 className="mt-2 text-sm text-gray-600">
                        What are you waiting for? Get blogging already!
                      </h2>
                      <div className="mt-8 space-y-6">
                        <div>
                          <input
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            type="email"
                            placeholder="E-Mail"
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                          />
                          <p className="mt-1 text-sm text-red-600">
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
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                          />
                          <p className="mt-1 text-sm text-red-600">
                            {errors.password && touched.password && errors.password}
                          </p>
                        </div>

                        <button
                          type="submit"
                          className={`w-full py-2.5 px-4 rounded-lg shadow-sm text-sm font-medium ${
                            Object.keys(errors).length
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-[#1a365d] text-white hover:bg-[#2d4a7c] transition-colors'
                          }`}
                        >
                          Sign In
                        </button>

                        <div className="text-center">
                          <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link
                              to="/auth/register"
                              className="font-medium text-[#1a365d] hover:text-[#2d4a7c]"
                            >
                              Sign up!
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>

              <div className="hidden lg:flex lg:w-1/2 bg-gray-50 items-center justify-center p-12">
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
