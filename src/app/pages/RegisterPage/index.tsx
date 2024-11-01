import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Formik } from 'formik';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useUsersSlice } from 'features/users';
import { isRegisterLoading } from 'features/users/selectors';
import { Link, Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { authUserSelector } from 'features/auth/selectors';
import { NotAuthenticatedHeader } from '../../components/NotAuthenticatedHeader';

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
        <title>Bloggrs - Register</title>
        <meta name="description" content="Create your Bloggrs account" />
      </Helmet>
      <NotAuthenticatedHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form Section */}
            <div className="w-full lg:w-2/3">
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
                  <form onSubmit={handleSubmit} className="w-full max-w-xl">
                    <div className="mb-8">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Create Account
                      </h1>
                      <p className="text-gray-600">
                        Start your blogging journey today
                      </p>
                    </div>

                    {/* Input fields with updated styling */}
                    <div className="space-y-4">
                      <div>
                        <input
                          name="first_name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.first_name}
                          type="first_name"
                          placeholder="First name"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        <p className="text-red-500 text-sm mt-1">
                          {errors.first_name &&
                            touched.first_name &&
                            errors.first_name}
                        </p>
                      </div>
                      <div>
                        <input
                          name="last_name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.last_name}
                          type="last_name"
                          placeholder="Last name"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        <p className="text-red-500 text-sm mt-1">
                          {errors.last_name &&
                            touched.last_name &&
                            errors.last_name}
                        </p>
                      </div>
                      <div>
                        <input
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          type="email"
                          placeholder="E-Mail"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </p>
                      </div>
                    </div>

                    {/* Submit button */}
                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={Object.keys(errors).length > 0 || loading}
                        className={`w-full py-3 rounded-lg font-medium ${
                          Object.keys(errors).length > 0
                            ? 'bg-gray-100 text-gray-500'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {loading ? 'Creating account...' : 'Sign Up'}
                      </button>
                    </div>

                    {/* Sign in link */}
                    <div className="mt-4 text-center">
                      <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link
                          to="/auth/login"
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </form>
                )}
              </Formik>
            </div>

            {/* Right side image/illustration */}
            <div className="hidden lg:flex lg:w-1/3 items-center justify-center">
              <div className="w-full max-w-sm">
                <img
                  src="/dist2/static/twitter_outline.png"
                  alt="Illustration"
                  className="w-full h-auto"
                />
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

export const RegisterPage = connect(mapStateToProps)(RegisterPage_);
