import React, { useState } from 'react';

const InfoTabModalBody = props => {
  return (
    <div className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="card">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="col">
                <h4 className="card-title">Personal Information</h4>
              </div>
              {/*end col*/}
            </div>{' '}
            {/*end row*/}
          </div>
          {/*end card-header*/}
          <div className="card-body">
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                First Name
              </label>
              <div className="col-lg-9 col-xl-8">
                <input
                  className="form-control"
                  type="text"
                  defaultValue="Rosa"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                Last Name
              </label>
              <div className="col-lg-9 col-xl-8">
                <input
                  className="form-control"
                  type="text"
                  defaultValue="Dodson"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                Display name
              </label>
              <div className="col-lg-9 col-xl-8">
                <input
                  className="form-control"
                  type="text"
                  defaultValue="Ros"
                />
                <span className="form-text text-muted font-12">
                  The name displayed to the users.
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                Email Address
              </label>
              <div className="col-lg-9 col-xl-8">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="las la-at" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="rosa.dodson@demo.com"
                    placeholder="Email"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                Contact Phone
              </label>
              <div className="col-lg-9 col-xl-8">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="las la-phone" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                Website Link
              </label>
              <div className="col-lg-9 col-xl-8">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="la la-globe" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue=" https://Bloggrs.com/"
                    placeholder="Email"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                USA
              </label>
              <div className="col-lg-9 col-xl-8">
                <select className="form-select">
                  <option>London</option>
                  <option>India</option>
                  <option>USA</option>
                  <option>Canada</option>
                  <option>Thailand</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-9 col-xl-8 offset-lg-3">
                <button
                  type="submit"
                  className="btn btn-sm btn-outline-primary"
                >
                  Submit
                </button>
                <button type="button" className="btn btn-sm btn-outline-danger">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
      {/*end col*/}
      <div className="col-lg-6 col-xl-6">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Change Password</h4>
          </div>
          {/*end card-header*/}
          <div className="card-body">
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                Current Password
              </label>
              <div className="col-lg-9 col-xl-8">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                />
                <a href="#" className="text-primary font-12">
                  Forgot password ?
                </a>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                New Password
              </label>
              <div className="col-lg-9 col-xl-8">
                <input
                  className="form-control"
                  type="password"
                  placeholder="New Password"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                Confirm Password
              </label>
              <div className="col-lg-9 col-xl-8">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Re-Password"
                />
                <span className="form-text text-muted font-12">
                  Never share your password.
                </span>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-9 col-xl-8 offset-lg-3">
                <button
                  type="submit"
                  className="btn btn-sm btn-outline-primary"
                >
                  Change Password
                </button>
                <button type="button" className="btn btn-sm btn-outline-danger">
                  Cancel
                </button>
              </div>
            </div>
          </div>
          {/*end card-body*/}
        </div>
        {/*end card*/}
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Other Settings</h4>
          </div>
          {/*end card-header*/}
          <div className="card-body">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="Email_Notifications"
              />
              <label className="form-check-label" htmlFor="Email_Notifications">
                Email Notifications
              </label>
              <span className="form-text text-muted font-12 mt-0">
                Do you need them?
              </span>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="API_Access"
              />
              <label className="form-check-label" htmlFor="API_Access">
                API Access
              </label>
              <span className="form-text text-muted font-12 mt-0">
                Enable/Disable access
              </span>
            </div>
          </div>
          {/*end card-body*/}
        </div>
        {/*end card*/}
      </div>{' '}
      {/* end col */}
    </div>
  );
};

const HistoryTabModalBody = props => {
  return (
    <div className="col-lg-9">
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body  report-card">
              <div className="row d-flex justify-content-center">
                <div className="col">
                  <p className="text-dark mb-1 fw-semibold">Views</p>
                  <h3 className="my-2 font-24 fw-bold">24k</h3>
                  <p className="mb-0 text-truncate text-muted">
                    <i className="ti ti-bell text-warning font-18" />
                    <span className="text-dark fw-semibold">1500</span> New
                    subscribers this week
                  </p>
                </div>
                <div className="col-auto align-self-center">
                  <div className="d-flex justify-content-center align-items-center thumb-xl bg-light-alt rounded-circle mx-auto">
                    <i className="ti ti-eye font-30 align-self-center text-muted" />
                  </div>
                </div>
              </div>
            </div>
            {/*end card-body*/}
          </div>{' '}
          {/*end card*/}
        </div>
        {/*end col*/}
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body  report-card">
              <div className="row d-flex justify-content-center">
                <div className="col">
                  <p className="text-dark mb-1 fw-semibold">Comments</p>
                  <h3 className="my-2 font-24 fw-bold">24k</h3>
                  <p className="mb-0 text-truncate text-muted">
                    <i className="ti ti-thumb-up text-success font-18" />
                    <span className="text-dark fw-semibold">854</span> New likes
                    this week
                  </p>
                </div>
                <div className="col-auto align-self-center">
                  <div className="d-flex justify-content-center align-items-center thumb-xl bg-light-alt rounded-circle mx-auto">
                    <i className="ti ti-brand-hipchat font-30 align-self-center text-muted" />
                  </div>
                </div>
              </div>
            </div>
            {/*end card-body*/}
          </div>{' '}
          {/*end card*/}
        </div>
        {/*end col*/}
      </div>
      {/*end row*/}
      <div className="card">
        <div className="card-body">
          <img src="assets/images/widgets/1.jpg" alt="" className="img-fluid" />
          <div className="post-title mt-4">
            <div className="row">
              <div className="col">
                <span className="badge badge-soft-primary">Natural</span>
              </div>
              {/*end col*/}
              <div className="col-auto">
                <span className="text-muted">
                  <i className="far fa-calendar me-1" />
                  02 July 2020
                </span>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
            <h5 className="font-20 fw-bold d-block mt-3 mb-4">
              There is nothing more beautiful than nature.
            </h5>
            <span className="font-15 bg-light py-2 px-3 rounded">
              Taking pictures is savouring life intensely.
            </span>
            <p className="font-15 mt-4">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy.
            </p>
            <blockquote className="blockquote border-start ps-4">
              <p className="font-18">
                <i>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer posuere erat a ante."
                </i>
              </p>
              <footer className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
            <p className="font-15">
              Taking pictures is savouring life intensely, every hundredth of a
              second – Marc Riboud. Joy in looking and comprehending is nature’s
              most beautiful gift.
            </p>
            <p className="font-15 mb-0">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy.
            </p>
          </div>
        </div>
        <div className="card-body pt-0">
          <div className="row mb-3">
            <div className="col">
              <p className="text-dark fw-semibold mb-0">Artical tags</p>
            </div>
          </div>
          <span className="badge bg-soft-dark px-3 py-2 fw-semibold">
            Music
          </span>
          <span className="badge bg-soft-dark px-3 py-2 fw-semibold">
            Animals
          </span>
          <span className="badge bg-soft-dark px-3 py-2 fw-semibold">
            Natural
          </span>
          <span className="badge bg-soft-dark px-3 py-2 fw-semibold">Food</span>
          <span className="badge bg-soft-dark px-3 py-2 fw-semibold">
            Fashion
          </span>
          <span className="badge bg-soft-dark px-3 py-2 fw-semibold">
            Helth
          </span>
          <span className="badge bg-soft-dark px-3 py-2 fw-semibold">
            Charity
          </span>
        </div>
      </div>
      <div className="card">
        <div className="card-body pb-0">
          <div className="row">
            <div className="col">
              <p className="text-dark fw-semibold mb-0">Comments (205)</p>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end card-body*/}
        <div className="card-body border-bottom-dashed">
          <ul className="list-unstyled mb-0">
            <li>
              <div className="row">
                <div className="col-auto">
                  <img
                    src="assets/images/users/user-2.jpg"
                    alt=""
                    className="thumb-md rounded-circle"
                  />
                </div>
                {/*end col*/}
                <div className="col">
                  <div className="comment-body ms-n2 bg-light-alt p-3">
                    <div className="row">
                      <div className="col">
                        <p className="text-dark fw-semibold mb-2">
                          Martin Luther
                        </p>
                      </div>
                      {/*end col*/}
                      <div className="col-auto">
                        <span className="text-muted">
                          <i className="far fa-clock me-1" />
                          30 min ago
                        </span>
                      </div>
                      {/*end col*/}
                    </div>
                    {/*end row*/}
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using 'Content here, content here', making it
                      look like readable English.
                    </p>
                    <a href="#" className="text-primary">
                      <i className="fas fa-reply me-1" />
                      Replay
                    </a>
                  </div>
                </div>
                {/*end col*/}
              </div>
              {/*end row*/}
              <ul className="list-unstyled ms-5">
                <li>
                  <div className="row mt-3">
                    <div className="col-auto">
                      <img
                        src="assets/images/logo-sm.png"
                        alt=""
                        className="thumb-md rounded-circle"
                      />
                    </div>
                    {/*end col*/}
                    <div className="col">
                      <div className="comment-body ms-n2 bg-light-alt p-3">
                        <div className="row">
                          <div className="col">
                            <p className="text-dark fw-semibold mb-2">
                              Dastone Author
                            </p>
                          </div>
                          {/*end col*/}
                          <div className="col-auto">
                            <span className="text-muted">
                              <i className="far fa-clock me-1" />
                              37 min ago
                            </span>
                          </div>
                          {/*end col*/}
                        </div>
                        {/*end row*/}
                        <p>
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout.
                        </p>
                        <p className="mb-0">Thank you</p>
                      </div>
                    </div>
                    {/*end col*/}
                  </div>
                  {/*end row*/}
                </li>
              </ul>
            </li>
            <li className="mt-3">
              <div className="row">
                <div className="col-auto">
                  <img
                    src="assets/images/users/user-1.jpg"
                    alt=""
                    className="thumb-md rounded-circle"
                  />
                </div>
                {/*end col*/}
                <div className="col">
                  <div className="comment-body ms-n2 bg-light-alt p-3">
                    <div className="row">
                      <div className="col">
                        <p className="text-dark fw-semibold mb-2">
                          Joseph Rust
                        </p>
                      </div>
                      {/*end col*/}
                      <div className="col-auto">
                        <span className="text-muted">
                          <i className="far fa-clock me-1" />
                          40 min ago
                        </span>
                      </div>
                      {/*end col*/}
                    </div>
                    {/*end row*/}
                    <p>
                      Is it a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout?
                    </p>
                    <a href="#" className="text-primary">
                      <i className="fas fa-reply me-1" />
                      Replay
                    </a>
                  </div>
                </div>
                {/*end col*/}
              </div>
              {/*end row*/}
            </li>
            <li className="mt-3">
              <div className="row">
                <div className="col-auto">
                  <img
                    src="assets/images/users/user-5.jpg"
                    alt=""
                    className="thumb-md rounded-circle"
                  />
                </div>
                {/*end col*/}
                <div className="col">
                  <div className="comment-body ms-n2 bg-light-alt p-3">
                    <div className="row">
                      <div className="col">
                        <p className="text-dark fw-semibold mb-2">
                          Matt Rosales
                        </p>
                      </div>
                      {/*end col*/}
                      <div className="col-auto">
                        <span className="text-muted">
                          <i className="far fa-clock me-1" />
                          40 min ago
                        </span>
                      </div>
                      {/*end col*/}
                    </div>
                    {/*end row*/}
                    <p>
                      Is it a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout?
                    </p>
                    <a href="#" className="text-primary">
                      <i className="fas fa-reply me-1" />
                      Replay
                    </a>
                  </div>
                </div>
                {/*end col*/}
              </div>
              {/*end row*/}
              <ul className="list-unstyled ms-5">
                <li>
                  <div className="row mt-3">
                    <div className="col-auto">
                      <img
                        src="assets/images/logo-sm.png"
                        alt=""
                        className="thumb-md rounded-circle"
                      />
                    </div>
                    {/*end col*/}
                    <div className="col">
                      <div className="comment-body ms-n2 bg-light-alt p-3">
                        <div className="row">
                          <div className="col">
                            <p className="text-dark fw-semibold mb-2">
                              Dastone Author
                            </p>
                          </div>
                          {/*end col*/}
                          <div className="col-auto">
                            <span className="text-muted">
                              <i className="far fa-clock me-1" />
                              37 min ago
                            </span>
                          </div>
                          {/*end col*/}
                        </div>
                        {/*end row*/}
                        <p>
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout.
                        </p>
                        <p className="mb-0">Thank you</p>
                      </div>
                    </div>
                    {/*end col*/}
                  </div>
                  {/*end row*/}
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {/*end card-body*/}
        <div className="card-body">
          <div className="row">
            <div className="col">
              <p className="text-dark fw-semibold mb-0">Leave a comment</p>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end card-body*/}
        <div className="card-body pt-0">
          <form>
            <div className="form-group">
              <textarea
                className="form-control"
                rows={5}
                id="leave_comment"
                placeholder="Message"
                defaultValue={''}
              />
            </div>
            <div className="row">
              <div className="col-sm-12 text-end">
                <button
                  type="submit"
                  className="btn btn-sm btn-outline-primary px-4"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
        {/*end card-body*/}
      </div>{' '}
      {/*end card*/}
    </div>
  );
};
export const MyProfile = props => {
  const [tab, setTab] = ['', a => a]; // useState("INFO")
  const Comp = tab === 'INFO' ? InfoTabModalBody : HistoryTabModalBody;
  const modal_body = <></>; ///<Comp />

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="dastone-profile">
                  <div className="row">
                    <div className="col-lg-4 align-self-center mb-3 mb-lg-0">
                      <div className="dastone-profile-main">
                        <div className="dastone-profile-main-pic">
                          <img
                            src="assets/images/users/user-4.jpg"
                            alt=""
                            height={110}
                            className="rounded-circle"
                          />
                          <span className="dastone-profile_main-pic-change">
                            <i className="fas fa-camera" />
                          </span>
                        </div>
                        <div className="dastone-profile_user-detail">
                          <h5 className="dastone-user-name">Rosa Dodson</h5>
                          <p className="mb-0 dastone-user-name-post">
                            UI/UX Designer, India
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 ms-auto align-self-center">
                      <ul className="list-unstyled personal-detail mb-0">
                        <li className="">
                          <i className="ti ti-mobile me-2 text-secondary font-16 align-middle" />{' '}
                          <b> phone </b> : +91 23456 78910
                        </li>
                        <li className="mt-2">
                          <i className="ti ti-email text-secondary font-16 align-middle me-2" />{' '}
                          <b> Email </b> : mannat.theme@gmail.com
                        </li>
                        <li className="mt-2">
                          <i className="ti ti-world text-secondary font-16 align-middle me-2" />{' '}
                          <b> Website </b> :
                          <a
                            href="https://Bloggrs.com"
                            className="font-14 text-primary"
                          >
                            https://Bloggrs.com
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-4 align-self-center">
                      <div className="row">
                        <div className="col-auto text-end border-end">
                          <button
                            type="button"
                            className="btn btn-soft-primary btn-icon-circle btn-icon-circle-sm mb-2"
                          >
                            <i className="fab fa-facebook-f" />
                          </button>
                          <p className="mb-0 fw-semibold">Facebook</p>
                          <h4 className="m-0 fw-bold">
                            25k{' '}
                            <span className="text-muted font-12 fw-normal">
                              Followers
                            </span>
                          </h4>
                        </div>
                        <div className="col-auto">
                          <button
                            type="button"
                            className="btn btn-soft-info btn-icon-circle btn-icon-circle-sm mb-2"
                          >
                            <i className="fab fa-twitter" />
                          </button>
                          <p className="mb-0 fw-semibold">Twitter</p>
                          <h4 className="m-0 fw-bold">
                            58k{' '}
                            <span className="text-muted font-12 fw-normal">
                              Followers
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{' '}
          </div>
        </div>
        <div className="pb-4">
          <ul
            className="nav-border nav nav-pills mb-4"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="settings_detail_tab"
                data-bs-toggle="pill"
                href="#Profile_Settings"
              >
                Info
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="Profile_Post_tab"
                data-bs-toggle="pill"
                href="#Profile_Post"
              >
                History
              </a>
            </li>
          </ul>
          <div className="row">
            <div className="col-lg-6 col-xl-6">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h4 className="card-title">Personal Information</h4>
                    </div>
                  </div>{' '}
                </div>
                <div className="card-body">
                  <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                      First Name
                    </label>
                    <div className="col-lg-9 col-xl-8">
                      <input
                        className="form-control"
                        type="text"
                        defaultValue="Rosa"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                      Last Name
                    </label>
                    <div className="col-lg-9 col-xl-8">
                      <input
                        className="form-control"
                        type="text"
                        defaultValue="Dodson"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                      Display name
                    </label>
                    <div className="col-lg-9 col-xl-8">
                      <input
                        className="form-control"
                        type="text"
                        defaultValue="Ros"
                      />
                      <span className="form-text text-muted font-12">
                        The name displayed to the users.
                      </span>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                      Email Address
                    </label>
                    <div className="col-lg-9 col-xl-8">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="las la-at" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          aria-describedby="basic-addon1"
                          defaultValue="rosa.dodson@demo.com"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                      Contact Phone
                    </label>
                    <div className="col-lg-9 col-xl-8">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="las la-phone" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                      Website Link
                    </label>
                    <div className="col-lg-9 col-xl-8">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="la la-globe" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          aria-describedby="basic-addon1"
                          defaultValue=" https://Bloggrs.com/"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                      USA
                    </label>
                    <div className="col-lg-9 col-xl-8">
                      <select className="form-select">
                        <option>London</option>
                        <option>India</option>
                        <option>USA</option>
                        <option>Canada</option>
                        <option>Thailand</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-9 col-xl-8 offset-lg-3">
                      <button
                        type="submit"
                        className="btn btn-sm btn-outline-primary"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>{' '}
            <div className="col-lg-6 col-xl-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Change Password</h4>
                </div>
                <div className="card-body">
                  <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                      Current Password
                    </label>
                    <div className="col-lg-9 col-xl-8">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                      />
                      <a href="#" className="text-primary font-12">
                        Forgot password ?
                      </a>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                      New Password
                    </label>
                    <div className="col-lg-9 col-xl-8">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="New Password"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
                      Confirm Password
                    </label>
                    <div className="col-lg-9 col-xl-8">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Re-Password"
                      />
                      <span className="form-text text-muted font-12">
                        Never share your password.
                      </span>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-9 col-xl-8 offset-lg-3">
                      <button
                        type="submit"
                        className="btn btn-sm btn-outline-primary"
                      >
                        Change Password
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Other Settings</h4>
                </div>
                <div className="card-body">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="Email_Notifications"
                      defaultValue=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="Email_Notifications"
                    >
                      Email Notifications
                    </label>
                    <span className="form-text text-muted font-12 mt-0">
                      Do you need them?
                    </span>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="API_Access"
                      defaultValue=""
                    />
                    <label className="form-check-label" htmlFor="API_Access">
                      API Access
                    </label>
                    <span className="form-text text-muted font-12 mt-0">
                      Enable/Disable access
                    </span>
                  </div>
                </div>
              </div>
            </div>{' '}
          </div>
        </div>
      </div>
    </>
  );
};
