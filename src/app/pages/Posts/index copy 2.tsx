import React from 'react';

const Posts = ({}) => {
  return (
    <div>
      {/* Page-Title */}
      <div className="row">
        <div className="col-sm-12">
          <div className="page-title-box">
            <div className="row">
              <div className="col">
                <h4 className="page-title">Blogs</h4>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="javascript:void(0);">Dastone</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="javascript:void(0);">Pages</a>
                  </li>
                  <li className="breadcrumb-item active">Blogs</li>
                </ol>
              </div>
              {/*end col*/}
              <div className="col-auto align-self-center">
                <a
                  href="#"
                  className="btn btn-sm btn-outline-primary"
                  id="Dash_Date"
                >
                  <span className="day-name" id="Day_Name">
                    Today:
                  </span>
                  &nbsp;
                  <span id="Select_date">Jul 12</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-calendar align-self-center icon-xs ms-1"
                  >
                    <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
                    <line x1={16} y1={2} x2={16} y2={6} />
                    <line x1={8} y1={2} x2={8} y2={6} />
                    <line x1={3} y1={10} x2={21} y2={10} />
                  </svg>
                </a>
                <a href="#" className="btn btn-sm btn-outline-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-download align-self-center icon-xs"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1={12} y1={15} x2={12} y2={3} />
                  </svg>
                </a>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
          </div>
          {/*end page-title-box*/}
        </div>
        {/*end col*/}
      </div>
      {/*end row*/}
      {/* end page title end breadcrumb */}
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="blog-card">
                <img
                  src="/assets/images/small/img-1.jpg"
                  alt=""
                  className="img-fluid rounded"
                />
                <span className="badge badge-purple px-3 py-2 bg-soft-primary fw-semibold mt-3">
                  Photography
                </span>
                <h4 className="my-3">
                  <a href="#">There are many variations of passages of Lorem</a>
                </h4>
                <p className="text-muted">
                  The standard chunk of Lorem Ipsum used since the 1500s is
                  reproduced below for those interested. Cum sociis natoque
                  penatibus et magnis.
                </p>
                <hr className="hr-dashed" />
                <div className="d-flex justify-content-between">
                  <div className="meta-box">
                    <div className="media">
                      <img
                        src="/assets/images/users/user-5.jpg"
                        alt=""
                        className="thumb-sm rounded-circle me-2"
                      />
                      <div className="media-body align-self-center text-truncate">
                        <h6 className="m-0 text-dark">Donald Gardner</h6>
                        <ul className="p-0 list-inline mb-0">
                          <li className="list-inline-item">26 mars 2020</li>
                          <li className="list-inline-item">
                            by <a href="#">admin</a>
                          </li>
                        </ul>
                      </div>
                      {/*end media-body*/}
                    </div>
                  </div>
                  {/*end meta-box*/}
                  <div className="align-self-center">
                    <a href="#" className="text-dark">
                      Read more <i className="fas fa-long-arrow-alt-right" />
                    </a>
                  </div>
                </div>
              </div>
              {/*end blog-card*/}
            </div>
            {/*end card-body*/}
          </div>
          {/*end card*/}
        </div>{' '}
        {/*end col*/}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="blog-card">
                <img
                  src="/assets/images/small/img-2.jpg"
                  alt=""
                  className="img-fluid rounded"
                />
                <span className="badge badge-purple px-3 py-2 bg-soft-primary fw-semibold mt-3">
                  Fruit
                </span>
                <h4 className="my-3">
                  <a href="#">The standard chunk of Lorem Ipsum used since</a>
                </h4>
                <p className="text-muted">
                  The standard chunk of Lorem Ipsum used since the 1500s is
                  reproduced below for those interested. Cum sociis natoque
                  penatibus et magnis.
                </p>
                <hr className="hr-dashed" />
                <div className="d-flex justify-content-between">
                  <div className="meta-box">
                    <div className="media">
                      <img
                        src="/assets/images/users/user-4.jpg"
                        alt=""
                        className="thumb-sm rounded-circle me-2"
                      />
                      <div className="media-body align-self-center text-truncate">
                        <h6 className="m-0 mb-1 text-dark">Susan Brady</h6>
                        <ul className="p-0 list-inline mb-0">
                          <li className="list-inline-item">01 Feb 2020</li>
                          <li className="list-inline-item">
                            by <a href="#">admin</a>
                          </li>
                        </ul>
                      </div>
                      {/*end media-body*/}
                    </div>
                  </div>
                  {/*end meta-box*/}
                  <div className="align-self-center">
                    <a href="#" className="text-dark">
                      Read more <i className="fas fa-long-arrow-alt-right" />
                    </a>
                  </div>
                </div>
              </div>
              {/*end blog-card*/}
            </div>
            {/*end card-body*/}
          </div>
          {/*end card*/}
        </div>{' '}
        {/*end col*/}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="blog-card">
                <img
                  src="/assets/images/small/img-3.jpg"
                  alt=""
                  className="img-fluid rounded"
                />
                <span className="badge badge-purple px-3 py-2 bg-soft-primary fw-semibold mt-3">
                  Safari
                </span>
                <h4 className="my-3">
                  <a href="#">Contrary to popular belief, Lorem Ipsum is</a>
                </h4>
                <p className="text-muted">
                  The standard chunk of Lorem Ipsum used since the 1500s is
                  reproduced below for those interested. Cum sociis natoque
                  penatibus et magnis.
                </p>
                <hr className="hr-dashed" />
                <div className="d-flex justify-content-between">
                  <div className="meta-box">
                    <div className="media">
                      <img
                        src="/assets/images/users/user-3.jpg"
                        alt=""
                        className="thumb-sm rounded-circle me-2"
                      />
                      <div className="media-body align-self-center text-truncate">
                        <h6 className="m-0 mb-1 text-dark">Brandon Perez</h6>
                        <ul className="p-0 list-inline mb-0">
                          <li className="list-inline-item">15 March 2020</li>
                          <li className="list-inline-item">
                            by <a href="#">admin</a>
                          </li>
                        </ul>
                      </div>
                      {/*end media-body*/}
                    </div>
                  </div>
                  {/*end meta-box*/}
                  <div className="align-self-center">
                    <a href="#" className="text-dark">
                      Read more <i className="fas fa-long-arrow-alt-right" />
                    </a>
                  </div>
                </div>
              </div>
              {/*end blog-card*/}
            </div>
            {/*end card-body*/}
          </div>
          {/*end card*/}
        </div>{' '}
        {/*end col*/}
      </div>
      {/*end row*/}
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="blog-card">
                <img
                  src="/assets/images/small/img-4.jpg"
                  alt=""
                  className="img-fluid rounded"
                />
                <span className="badge badge-purple px-3 py-2 bg-soft-primary fw-semibold mt-3">
                  Food
                </span>
                <h4 className="my-3">
                  <a href="#">Many desktop publishing packages web</a>
                </h4>
                <p className="text-muted">
                  The standard chunk of Lorem Ipsum used since the 1500s is
                  reproduced below for those interested. Cum sociis natoque
                  penatibus et magnis.
                </p>
                <hr className="hr-dashed" />
                <div className="d-flex justify-content-between">
                  <div className="meta-box">
                    <div className="media">
                      <img
                        src="/assets/images/users/user-7.jpg"
                        alt=""
                        className="thumb-sm rounded-circle me-2"
                      />
                      <div className="media-body align-self-center text-truncate">
                        <h6 className="m-0 mb-1 text-dark">Jen Harting</h6>
                        <ul className="p-0 list-inline mb-0">
                          <li className="list-inline-item">12 Dec 2020</li>
                          <li className="list-inline-item">
                            by <a href="#">admin</a>
                          </li>
                        </ul>
                      </div>
                      {/*end media-body*/}
                    </div>
                  </div>
                  {/*end meta-box*/}
                  <div className="align-self-center">
                    <a href="#" className="text-dark">
                      Read more <i className="fas fa-long-arrow-alt-right" />
                    </a>
                  </div>
                </div>
              </div>
              {/*end blog-card*/}
            </div>
            {/*end card-body*/}
          </div>
          {/*end card*/}
        </div>{' '}
        {/*end col*/}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="blog-card">
                <img
                  src="/assets/images/small/img-5.jpg"
                  alt=""
                  className="img-fluid rounded"
                />
                <span className="badge badge-purple px-3 py-2 bg-soft-primary fw-semibold mt-3">
                  Drink
                </span>
                <h4 className="my-3">
                  <a href="#">words which don't look even slightly</a>
                </h4>
                <p className="text-muted">
                  The standard chunk of Lorem Ipsum used since the 1500s is
                  reproduced below for those interested. Cum sociis natoque
                  penatibus et magnis.
                </p>
                <hr className="hr-dashed" />
                <div className="d-flex justify-content-between">
                  <div className="meta-box">
                    <div className="media">
                      <img
                        src="/assets/images/users/user-1.jpg"
                        alt=""
                        className="thumb-sm rounded-circle me-2"
                      />
                      <div className="media-body align-self-center text-truncate">
                        <h6 className="m-0 mb-1 text-dark">Charles Woodall</h6>
                        <ul className="p-0 list-inline mb-0">
                          <li className="list-inline-item">26 June 2020</li>
                          <li className="list-inline-item">
                            by <a href="#">admin</a>
                          </li>
                        </ul>
                      </div>
                      {/*end media-body*/}
                    </div>
                  </div>
                  {/*end meta-box*/}
                  <div className="align-self-center">
                    <a href="#" className="text-dark">
                      Read more <i className="fas fa-long-arrow-alt-right" />
                    </a>
                  </div>
                </div>
              </div>
              {/*end blog-card*/}
            </div>
            {/*end card-body*/}
          </div>
          {/*end card*/}
        </div>{' '}
        {/*end col*/}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="blog-card">
                <img
                  src="/assets/images/small/img-6.jpg"
                  alt=""
                  className="img-fluid rounded"
                />
                <span className="badge badge-purple px-3 py-2 bg-soft-primary fw-semibold mt-3">
                  Fashion
                </span>
                <h4 className="my-3">
                  <a href="#">
                    It is a long established fact that a reader will be
                  </a>
                </h4>
                <p className="text-muted">
                  The standard chunk of Lorem Ipsum used since the 1500s is
                  reproduced below for those interested. Cum sociis natoque
                  penatibus et magnis.
                </p>
                <hr className="hr-dashed" />
                <div className="d-flex justify-content-between">
                  <div className="meta-box">
                    <div className="media">
                      <img
                        src="/assets/images/users/user-8.jpg"
                        alt=""
                        className="thumb-sm rounded-circle me-2"
                      />
                      <div className="media-body align-self-center text-truncate">
                        <h6 className="m-0 mb-1 text-dark">Donald Gardner</h6>
                        <ul className="p-0 list-inline mb-0">
                          <li className="list-inline-item">26 mars 2020</li>
                          <li className="list-inline-item">
                            by <a href="#">admin</a>
                          </li>
                        </ul>
                      </div>
                      {/*end media-body*/}
                    </div>
                  </div>
                  {/*end meta-box*/}
                  <div className="align-self-center">
                    <a href="#" className="text-dark">
                      Read more <i className="fas fa-long-arrow-alt-right" />
                    </a>
                  </div>
                </div>
              </div>
              {/*end blog-card*/}
            </div>
            {/*end card-body*/}
          </div>
          {/*end card*/}
        </div>{' '}
        {/*end col*/}
      </div>
      {/*end row*/}
    </div>
  );
};

export { Posts };
