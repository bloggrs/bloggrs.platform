/* eslint-disable */

import { MainPanel } from 'app/components/MainPanel';
import { Formik } from 'formik';
import * as React from 'react';
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().min(4).required(),
  description: yup.string()
})

export const GeneralDetails = ({ 
  nextStep, onContinueClick, 
  onPreviousClick, sendValueToParent,
  parentValue: parentValue_
}) => {
  const [ thumbnail, setThumbnail ] = React.useState(parentValue_.thumbnail);
  const [ thumbnailFile, setThumbnailFile ] = React.useState(parentValue_.thumbnailFile);

  const getFeedback = (errors, key) => (                            
    errors[key] && (
      <div className="form-control-feedback">
        { errors[key] }
      </div>
    )
  )

  return (
    <div className="card-body">
        <Formik
          initialValues={{ name: parentValue_.name, description: parentValue_.description }}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            const data = {
              thumbnail, thumbnailFile,
              ...values
            }
            if (onContinueClick) onContinueClick(data)()
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
            id="form-horizontal"
            className="form-horizontal form-wizard-wrapper wizard clearfix"
            role="application"
            onSubmit={handleSubmit}
          >
            <div className="container-fluid" style={{ display: "block" }}>
              <div className="container row">
                <h4 className="mt-4 mb-4">General details</h4>
                <div className="col-md-8 row">
                  <div className="col-2" style={{ margin: "auto" }}>
                    <label className="mt-2 form-label mb-lg-0 text-end">
                      Thumbnail:{" "}
                    </label>
                  </div>
                  <div className="col-2 card-body m-auto">
                    <div
                      className={ "dropify-wrapper " + (thumbnail ? "hide-children" : "") }
                      style={{ 
                        height: "313.993px",
                        backgroundImage: `url(${thumbnail})`
                      }}
                    >
                      <div className="dropify-message">
                        <span className="file-icon">
                          {" "}
                          <p>Drag and drop a file here or click</p>
                        </span>
                        <p className="dropify-error">
                          Ooops, something wrong appended.
                        </p>
                      </div>
                      <div className="dropify-loader" />
                      <div className="dropify-errors-container">
                        <ul />
                      </div>
                      <input
                        type="file"
                        id="input-file-now-custom-2"
                        className="dropify"
                        data-height={500}
                        onChange={ (event: any) => {
                          setThumbnailFile(event.target.files[0]);
                          let reader: any = new FileReader();
                          let file = event.target.files[0];
                          reader.onload = () => {
                            console.log(reader.result)
                            setThumbnail(reader.result);
                          };
                          reader.readAsDataURL(file);
                          
                        }}
                      />
                      <button type="button" className="dropify-clear">
                        Remove
                      </button>
                      <div className="dropify-preview">
                        <span className="dropify-render" />
                        <div className="dropify-infos">
                          <div className="dropify-infos-inner">
                            <p className="dropify-filename">
                              <span className="file-icon" />{" "}
                              <span className="dropify-filename-inner" />
                            </p>
                            <p className="dropify-infos-message">
                              Drag and drop or click to replace
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={"col-md-8 row " + (errors.name ? "has-error" : "")}>
                  <div className="col-2" style={{ margin: "auto" }}>
                    <label className="mt-2 form-label mb-lg-0 text-end">
                      Name:{" "}
                    </label>
                  </div>
                  <div className="col-2 card-body m-auto">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter blog name.."
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      />
                      { getFeedback(errors, "name") }
                  </div>
                </div>
                <div className={"col-md-8 row " + (errors.description ? "has-error" : "")}>
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
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                    { getFeedback(errors, "description") }
                  </div>
                  <div style={{ display: "flex", marginTop: "2vh" }}>
                    <div style={{ width: "50%", textAlign: "left" }}>
                      <button
                        className="btn btn-outline-light"
                        style={{ right: "-6vw", marginRight: "2vw" }}
                        disabled={!onPreviousClick}
                        onClick={onPreviousClick && onPreviousClick({ thumbnail, thumbnailFile, ...values })}
                      >
                        Previous
                      </button>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        textAlign: "right",
                        display: "inline"
                      }}
                    >
                      <button
                        className="btn btn-outline-primary"
                        style={{ right: "-6vw", marginRight: "0.5vw" }}
                        disabled={!onContinueClick || isSubmitting}
                        type="submit"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          )}
        </Formik>
    </div>
  );
};