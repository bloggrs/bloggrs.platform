import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
import { categoriesService } from "services/categoriesService.service";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().min(2).required(),
  slug: yup.string().min(2).required(),
  description: yup.string(),
})

const getFeedback = (errors, key) => (                            
    errors[key] && (
        <div className="form-control-feedback" style={{ color: "red" }}>
            { errors[key] }
        </div>
    )
)
export const SingleCategory = props => {
  const match: any = useRouteMatch();
  const { id: param_id } = match.params;
  const mode = param_id === "create" ? "create" : "edit";

  const [ value, setValue ] = useState(false);
  const [ loading, setLoading ] = useState(true);

  /* ignore */
  useEffect(() => {
    const defaultValue = {
      id: "create",
      name: "",
      description: "",
    }
    const fetchData = async () => {
      const value = mode === "create" ? defaultValue : await categoriesService.getCategoryById(param_id)
      return value;
    }
    fetchData().then(value => {
      setValue(value);
      setLoading(false);
    })
  }, [])
  if (loading) return <>loading...</>;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="page-title-box">
            <div className="row">
              <div className="col">
                <h4 className="page-title">#1 - Personal Blog</h4>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="javascript:void(0);">Bloggrs</a>
                  </li>
                  <li className="breadcrumb-item active">Categories</li>
                  <li className="breadcrumb-item active">#1</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col mt-1">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Edit category</h4>
            <p className="text-muted mb-0">
              Basic example to demonstrate Bootstrap’s form styles.
            </p>
          </div>
          <div className="card-body">
              <Formik
                initialValues={{ name: "", slug: "", description: "" }}
                validationSchema={schema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    alert(JSON.stringify(values))
                    try {
                        await props.onDelete()
                    } catch(err) {
                        console.log(err);
                    }
                    setSubmitting(false);
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
                    <div className="form-group">
                      <div className="d-flex">
                        <div className="col m-auto d-flex">
                          <label
                            className="col-1 form-label"
                            htmlFor="exampleFormControlTextarea1"
                            style={{ margin: "auto 2vh auto 0px" }}
                          >
                            Name
                          </label>
                          <input
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            placeholder="Personal Blog"
                            style={{ width: "50%" }}
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                          />
                        </div>
                      </div>
                      <div className="col m-auto d-flex">
                        <div
                          className="col-1 form-label"
                          style={{ margin: "auto 2vh auto 0px" }}
                          />
                        <span className="form-text text-muted font-12">
                          { getFeedback(errors, "name")  || "The name is how it appears on your site." }
                        </span>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="d-flex">
                        <div className="col m-auto d-flex">
                          <label
                            className="col-1 form-label"
                            htmlFor="exampleFormControlTextarea1"
                            style={{ margin: "auto 2vh auto 0px" }}
                          >
                            Slug
                          </label>
                          <input
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            placeholder="personal-blog"
                            style={{ width: "50%" }}
                            name="slug"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.slug}
                          />
                        </div>
                      </div>
                      <div className="col m-auto d-flex">
                        <div
                          className="col-1 form-label"
                          style={{ margin: "auto 2vh auto 0px" }}
                        />
                        <span className="col form-text text-muted font-12">
                        { getFeedback(errors, "slug")  || `The “slug” is the URL-friendly version of the name. It is
                          usually all lowercase and contains only letters, numbers, and
                          hyphens.` }
                        </span>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="d-flex">
                        <div className="col m-auto d-flex">
                          <label
                            className="col-1 form-label"
                            htmlFor="exampleFormControlTextarea1"
                            style={{ margin: "auto 2vh auto 0px" }}
                          >
                            Description
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            style={{ width: "50%" }}
                            name="description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                          />
                          { getFeedback(errors, "description") }
                        </div>
                      </div>
                      <div className="col m-auto d-flex">
                        <div
                          className="col-1 form-label"
                          style={{ margin: "auto 2vh auto 0px" }}
                        />
                        <span className=" form-text text-muted font-12">
                          The description is not prominent by default; however, some
                          themes may show it.
                        </span>
                      </div>
                    </div>
                    <button disabled={isSubmitting} type="submit" className="btn btn-soft-primary btn-md">
                      Save
                    </button>
                    <button 
                      disabled={isSubmitting}
                      type="button"
                      className="btn btn-soft-danger btn-md"
                      style={{ marginLeft: 15 }}
                    >
                      Cancel
                    </button>
                  </form>    
                )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}