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
      <Helmet
        title="Bloggrs - Register"
        meta={[
          {
            name: 'description',
            content: 'Create your Bloggrs account',
          },
        ]}
      />
      <NotAuthenticatedHeader />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              {/* Form Section */}
              <div className="p-8">
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
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                          Create your account
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                          Start your blogging journey today
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <input
                            name="first_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.first_name}
                            type="first_name"
                            placeholder="First name"
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d] sm:text-sm"
                          />
                          <p className="mt-1 text-sm text-red-600">
                            {errors.first_name && touched.first_name && errors.first_name}
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
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d] sm:text-sm"
                          />
                          <p className="mt-1 text-sm text-red-600">
                            {errors.last_name && touched.last_name && errors.last_name}
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
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d] sm:text-sm"
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
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d] sm:text-sm"
                          />
                          <p className="mt-1 text-sm text-red-600">
                            {errors.password && touched.password && errors.password}
                          </p>
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={Object.keys(errors).length > 0 || loading}
                          className={`w-full flex justify-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white shadow-sm ${
                            Object.keys(errors).length > 0 || loading
                              ? 'bg-gray-300 cursor-not-allowed'
                              : 'bg-[#1a365d] hover:bg-[#2d4a7c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a365d]'
                          }`}
                        >
                          {loading ? 'Creating account...' : 'Create account'}
                        </button>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-500">
                          Already have an account?{' '}
                          <Link
                            to="/auth/login"
                            className="font-semibold text-[#1a365d] hover:text-[#2d4a7c]"
                          >
                            Sign in
                          </Link>
                        </p>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>

              {/* Image Section */}
              <div className="hidden lg:block relative">
                <img
                  src="/dist2/static/twitter_outline.png"
                  alt="Illustration"
                  className="absolute inset-0 h-full w-full object-cover"
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
