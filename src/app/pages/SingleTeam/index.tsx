import { AddTeamMemberModal } from "app/components/AddTeamMemberModal";
import React from "react";

const SingleTeam = ({ }) => {
    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-sm-12">
            <div className="page-title-box">
                <div className="row">
                <div className="col">
                    <h4 className="page-title">Teams</h4>
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="javascript:void(0);">Dastone</a>
                    </li>
                    <li className="breadcrumb-item active">Teams</li>
                    </ol>
                </div>
                <div className="col-auto align-self-center">
                    <a
                    href="#"
                    className="btn btn-sm btn-outline-primary"
                    id="Dash_Date"
                    >
                    <span className="day-name" id="Day_Name">
                        Today:
                    </span>
                    &nbsp;<span id="Select_date">Jul 12</span>
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
                </div>
            </div>
            </div>
        </div>
        <div className="container row">
            <h4 className="mt-4 mb-4">General</h4>
            <div className="col-md-8 row">
            <div className="col-2" style={{ margin: "auto" }}>
                <label className="mt-2 form-label mb-lg-0 text-end">Name: </label>
            </div>
            <div className="col-2 card-body m-auto">
                <input
                type="text"
                className="form-control"
                placeholder="Enter blog name.."
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                />
            </div>
            </div>
            <div className="col-md-8 row">
            <div className="col-2" style={{ margin: "auto" }}>
                <label className="mt-2 form-label mb-lg-0 text-end">
                Description:{" "}
                </label>
            </div>
            <div className="col-2 card-body m-auto">
                <textarea
                className="form-control"
                placeholder="Enter blog description.."
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                defaultValue={""}
                />
            </div>
            </div>
            <div>
            <h5 className="menu-label my-2">Team members</h5>
            <div className="row">
                <div className="col-lg-3">
                <div className="card">
                    <div className="card-body">
                    <div className="row">
                        <div className="col">
                        <div className="media">
                            <img
                            src="/assets/images/users/user-1.jpg"
                            alt="user"
                            className="rounded-circle thumb-lg align-self-center"
                            />
                            <div className="media-body ms-3 align-self-center">
                            <h5 className="mt-0 mb-1">Wendy Keen</h5>
                            <p className="mb-0 text-muted">Freelance Developer</p>
                            </div>
                        </div>
                        </div>
                        <div className="col-auto align-self-center">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                            <a href="#" className="me-1 contact-icon">
                                <i className="fas fa-phone" />
                            </a>
                            <a href="#" className="contact-icon">
                                <i className="far fa-envelope" />
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-3">
                <div className="card">
                    <div className="card-body">
                    <div className="row">
                        <div className="col">
                        <div className="media">
                            <img
                            src="/assets/images/users/user-2.jpg"
                            alt="user"
                            className="rounded-circle thumb-lg align-self-center"
                            />
                            <div className="media-body ms-3 align-self-center">
                            <h5 className="mt-0 mb-1">Jeff Beck</h5>
                            <p className="mb-0 text-muted">Freelance Developer</p>
                            </div>
                        </div>
                        </div>
                        <div className="col-auto align-self-center">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                            <a href="#" className="me-1 contact-icon">
                                <i className="fas fa-phone" />
                            </a>
                            <a href="#" className="contact-icon">
                                <i className="far fa-envelope" />
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-3">
                <div className="card">
                    <div className="card-body">
                    <div className="row">
                        <div className="col">
                        <div className="media">
                            <img
                            src="/assets/images/users/user-3.jpg"
                            alt="user"
                            className="rounded-circle thumb-lg align-self-center"
                            />
                            <div className="media-body ms-3 align-self-center">
                            <h5 className="mt-0 mb-1">David Gilmour</h5>
                            <p className="mb-0 text-muted">Freelance Developer</p>
                            </div>
                        </div>
                        </div>
                        <div className="col-auto align-self-center">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                            <a href="#" className="me-1 contact-icon">
                                <i className="fas fa-phone" />
                            </a>
                            <a href="#" className="contact-icon">
                                <i className="far fa-envelope" />
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-3">
                <div className="card">
                    <div className="card-body">
                    <div className="row">
                        <div className="col">
                        <div className="media">
                            <img
                            src="/assets/images/users/user-4.jpg"
                            alt="user"
                            className="rounded-circle thumb-lg align-self-center"
                            />
                            <div className="media-body ms-3 align-self-center">
                            <h5 className="mt-0 mb-1">Sarah Woods</h5>
                            <p className="mb-0 text-muted">Freelance Developer</p>
                            </div>
                        </div>
                        </div>
                        <div className="col-auto align-self-center">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                            <a href="#" className="me-1 contact-icon">
                                <i className="fas fa-phone" />
                            </a>
                            <a href="#" className="contact-icon">
                                <i className="far fa-envelope" />
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3">
                <div className="card">
                    <div className="card-body">
                    <div className="row">
                        <div className="col">
                        <div className="media">
                            <img
                            src="/assets/images/users/user-1.jpg"
                            alt="user"
                            className="rounded-circle thumb-lg align-self-center"
                            />
                            <div className="media-body ms-3 align-self-center">
                            <h5 className="mt-0 mb-1">Wendy Keen</h5>
                            <p className="mb-0 text-muted">Freelance Developer</p>
                            </div>
                        </div>
                        </div>
                        <div className="col-auto align-self-center">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                            <a href="#" className="me-1 contact-icon">
                                <i className="fas fa-phone" />
                            </a>
                            <a href="#" className="contact-icon">
                                <i className="far fa-envelope" />
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-3">
                <div className="card">
                    <div className="card-body">
                    <div className="row">
                        <div className="col">
                        <div className="media">
                            <img
                            src="/assets/images/users/user-2.jpg"
                            alt="user"
                            className="rounded-circle thumb-lg align-self-center"
                            />
                            <div className="media-body ms-3 align-self-center">
                            <h5 className="mt-0 mb-1">Jeff Beck</h5>
                            <p className="mb-0 text-muted">Freelance Developer</p>
                            </div>
                        </div>
                        </div>
                        <div className="col-auto align-self-center">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                            <a href="#" className="me-1 contact-icon">
                                <i className="fas fa-phone" />
                            </a>
                            <a href="#" className="contact-icon">
                                <i className="far fa-envelope" />
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-3">
                <div className="card">
                    <div className="card-body">
                    <div className="row">
                        <div className="col">
                        <div className="media">
                            <img
                            src="/assets/images/users/user-3.jpg"
                            alt="user"
                            className="rounded-circle thumb-lg align-self-center"
                            />
                            <div className="media-body ms-3 align-self-center">
                            <h5 className="mt-0 mb-1">David Gilmour</h5>
                            <p className="mb-0 text-muted">Freelance Developer</p>
                            </div>
                        </div>
                        </div>
                        <div className="col-auto align-self-center">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                            <a href="#" className="me-1 contact-icon">
                                <i className="fas fa-phone" />
                            </a>
                            <a href="#" className="contact-icon">
                                <i className="far fa-envelope" />
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <AddTeamMemberModal />
            </div>
            </div>
            <div>
            <h5 className="menu-label my-2">Access to blogs:</h5>
            <div className="row">
                <div className="col-lg-3">
                <div className="card">
                    <div className="card-body">
                    <div className="row">
                        <div className="col">
                        <div className="media">
                            <img
                            src="/assets/images/users/user-1.jpg"
                            alt="user"
                            className="rounded-circle thumb-lg align-self-center"
                            />
                            <div className="media-body ms-3 align-self-center">
                            <h5 className="mt-0 mb-1">Gjergj's Blog</h5>
                            <p className="mb-0 text-muted">
                                https://gblog.gjergjkadriu.com/
                            </p>
                            </div>
                        </div>
                        </div>
                        <div
                        className="col-auto align-self-center"
                        style={{ display: "none" }}
                        >
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                            <a href="#" className="me-1 contact-icon">
                                <i className="fas fa-phone" />
                            </a>
                            <a href="#" className="contact-icon">
                                <i className="far fa-envelope" />
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-3">
                <div className="card">
                    <div className="card-body">
                    <div className="row">
                        <div className="col">
                        <div className="media">
                            <img
                            src="/assets/images/users/user-2.jpg"
                            alt="user"
                            className="rounded-circle thumb-lg align-self-center"
                            />
                            <div className="media-body ms-3 align-self-center">
                            <h5 className="mt-0 mb-1">Gjergj's Blog</h5>
                            <p className="mb-0 text-muted">
                                https://gblog.gjergjkadriu.com/
                            </p>
                            </div>
                        </div>
                        </div>
                        <div
                        className="col-auto align-self-center"
                        style={{ display: "none" }}
                        >
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                            <a href="#" className="me-1 contact-icon">
                                <i className="fas fa-phone" />
                            </a>
                            <a href="#" className="contact-icon">
                                <i className="far fa-envelope" />
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-3">
                <div className="card">
                    <div className="card-body">
                    <div className="row">
                        <div className="col">
                        <div className="media">
                            <img
                            src="/assets/images/users/user-3.jpg"
                            alt="user"
                            className="rounded-circle thumb-lg align-self-center"
                            />
                            <div className="media-body ms-3 align-self-center">
                            <h5 className="mt-0 mb-1">Gjergj's Blog</h5>
                            <p className="mb-0 text-muted">
                                https://gblog.gjergjkadriu.com/
                            </p>
                            </div>
                        </div>
                        </div>
                        <div
                        className="col-auto align-self-center"
                        style={{ display: "none" }}
                        >
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                            <a href="#" className="me-1 contact-icon">
                                <i className="fas fa-phone" />
                            </a>
                            <a href="#" className="contact-icon">
                                <i className="far fa-envelope" />
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-3">
                <div className="card">
                    <div className="card-body">
                    <div className="row">
                        <div className="col">
                        <div className="media">
                            <img
                            src="/assets/images/users/user-4.jpg"
                            alt="user"
                            className="rounded-circle thumb-lg align-self-center"
                            />
                            <div className="media-body ms-3 align-self-center">
                            <h5 className="mt-0 mb-1">Gjergj's Blog</h5>
                            <p className="mb-0 text-muted">
                                https://gblog.gjergjkadriu.com/
                            </p>
                            </div>
                        </div>
                        </div>
                        <div
                        className="col-auto align-self-center"
                        style={{ display: "none" }}
                        >
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                            <a href="#" className="me-1 contact-icon">
                                <i className="fas fa-phone" />
                            </a>
                            <a href="#" className="contact-icon">
                                <i className="far fa-envelope" />
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3">
                <div className="card">
                    <div className="card-body">
                    <div className="row">
                        <div className="col">
                        <div className="media">
                            <img
                            src="/assets/images/users/user-1.jpg"
                            alt="user"
                            className="rounded-circle thumb-lg align-self-center"
                            />
                            <div className="media-body ms-3 align-self-center">
                            <h5 className="mt-0 mb-1">Gjergj's Blog</h5>
                            <p className="mb-0 text-muted">
                                https://gblog.gjergjkadriu.com/
                            </p>
                            </div>
                        </div>
                        </div>
                        <div
                        className="col-auto align-self-center"
                        style={{ display: "none" }}
                        >
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                            <a href="#" className="me-1 contact-icon">
                                <i className="fas fa-phone" />
                            </a>
                            <a href="#" className="contact-icon">
                                <i className="far fa-envelope" />
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-3">
                <div className="card">
                    <div className="card-body">
                    <div className="row">
                        <div className="col">
                        <div className="media">
                            <img
                            src="/assets/images/users/user-2.jpg"
                            alt="user"
                            className="rounded-circle thumb-lg align-self-center"
                            />
                            <div className="media-body ms-3 align-self-center">
                            <h5 className="mt-0 mb-1">Gjergj's Blog</h5>
                            <p className="mb-0 text-muted">
                                https://gblog.gjergjkadriu.com/
                            </p>
                            </div>
                        </div>
                        </div>
                        <div
                        className="col-auto align-self-center"
                        style={{ display: "none" }}
                        >
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                            <a href="#" className="me-1 contact-icon">
                                <i className="fas fa-phone" />
                            </a>
                            <a href="#" className="contact-icon">
                                <i className="far fa-envelope" />
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-3">
                <div className="card">
                    <div className="card-body">
                    <div className="row">
                        <div className="col">
                        <div className="media">
                            <img
                            src="/assets/images/users/user-3.jpg"
                            alt="user"
                            className="rounded-circle thumb-lg align-self-center"
                            />
                            <div className="media-body ms-3 align-self-center">
                            <h5 className="mt-0 mb-1">Gjergj's Blog</h5>
                            <p className="mb-0 text-muted">
                                https://gblog.gjergjkadriu.com/
                            </p>
                            </div>
                        </div>
                        </div>
                        <div
                        className="col-auto align-self-center"
                        style={{ display: "none" }}
                        >
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                            <a href="#" className="me-1 contact-icon">
                                <i className="fas fa-phone" />
                            </a>
                            <a href="#" className="contact-icon">
                                <i className="far fa-envelope" />
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-3">
                {" "}
                    <div className="" style={{ marginLeft: 10 }}>
                        <div className="img-group">
                        <a href="" className="avatar-box thumb-md align-self-center">
                            <span className="avatar-title bg-soft-info rounded-circle font-weight-normal">
                            <i className="las la-plus" />
                            </span>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export { SingleTeam };