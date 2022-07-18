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
  username: Yup.string()
    .min(4, 'Username must be at least 4 characters.')
    .required('Username is required.'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters.')
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
      {/* <NotAuthenticatedHeader /> */}
      <div className="container">
            <div className="row vh-100 d-flex justify-content-center">
            <div className="col-12 align-self-center">
                <div className="row">
                <div className="col-lg-5 mx-auto">
                    <div className="card">
                    <div className="card-body p-0 auth-header-box">
                        <div className="text-center p-3">
                        <Link to="/"  className="logo logo-admin">
                            <img src="/dist/static/image1.png" height={50} alt="logo" className="auth-logo" />
                        </Link>
                        <h4 className="mt-3 mb-1 fw-semibold text-white font-18">Let's Get Started Dastone</h4>   
                        <p className="text-muted  mb-0">Sign in to continue to Dastone.</p>  
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <ul className="nav-border nav nav-pills" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active fw-semibold" data-bs-toggle="tab" href="#LogIn_Tab" role="tab">Log In</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-semibold" data-bs-toggle="tab" href="#Register_Tab" role="tab">Register</a>
                        </li>
                        </ul>
                        {/* Tab panes */}
                        <div className="tab-content">
                        <div className="tab-pane active p-3">
            <div className="flex">
              <Formik
                initialValues={{ username: '', password: '' }}
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
                    <form onSubmit={handleSubmit} className="form-horizontal auth-form" action="index.html">
                        <div className="form-group mb-2">
                        <label className="form-label" htmlFor="username">Username</label>
                        <div className="input-group">                                                                                         
                            <input 
                                className="form-control"
                                type="text"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                            />
                        </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label" htmlFor="userpassword">Password</label>                                            
                            <div className="input-group">
                                <input 
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                            </div>
                        </div>
                        <div className="form-group row my-3">
                        <div className="col-sm-6">
                            <div className="custom-control custom-switch switch-success">
                            <input type="checkbox" className="custom-control-input" id="customSwitchSuccess" />
                            <label className="form-label text-muted" htmlFor="customSwitchSuccess">Remember me</label>
                            </div>
                        </div>
                        <div className="col-sm-6 text-end">
                            <a href="auth-recover-pw.html" className="text-muted font-13"><i className="dripicons-lock" /> Forgot password?</a>                                    
                        </div>
                        </div>
                        <div className="form-group mb-0 row">
                        <div className="col-12">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100 waves-effect waves-light">Log In <i className="fas fa-sign-in-alt ms-1" /></button>
                        </div>
                        </div>                           
                    </form>
                )}
              </Formik>
        
        </div>
        </div></div></div>
        </div></div></div>
        </div></div></div>
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
