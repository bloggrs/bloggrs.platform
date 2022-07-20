import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { categoriesService } from 'services/categoriesService.service';
import Handle404, { set404 } from '../../../utils/handle404';
import * as yup from 'yup';
import { PageNavigation } from 'app/components/PageNavigation';

const schema = yup.object().shape({
  name: yup.string().min(2).required(),
  slug: yup.string().min(2).required(),
  description: yup.string(),
});

const getFeedback = (errors, key) =>
  errors[key] && (
    <span className="col form-text text-muted font-12">
      <div className="form-control-feedback" style={{ color: 'red' }}>
        {errors[key]}
      </div>
    </span>
  );
const SingleCategory = props => {
  const match: any = useRouteMatch();
  const history: any = useHistory();
  const { id: param_id } = match.params;
  const mode = param_id === 'create' ? 'create' : 'edit';

  const [value, setValue]: any = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError]: any = useState(false);

  useEffect(() => {
    const defaultValue = {
      id: 'create',
      name: '',
      description: '',
    };
    const fetchData = async () => {
      const value =
        mode === 'create'
          ? defaultValue
          : await categoriesService.getCategoryById(param_id);
      return value;
    };
    fetchData()
      .then(value => {
        setValue(value);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [param_id]);
  if (loading) return <>loading...</>;
  const modeLabel = mode === 'create' ? 'Create' : 'Edit';
  const submitButtonText = mode === 'create' ? 'Create' : 'Save';

  if (error?.code === 404) set404();

  return (
    <div className="container-fluid">
      {/* { error?.code === 404 ? <Handle404/> : null } */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <div className="row">
              <PageNavigation
                label="Categories"
                items={[
                  {
                    label: 'Categories',
                    to: '/categories',
                  },
                  {
                    label: value.name || 'Create',
                    active: true,
                  },
                ]}
              />
              <div className="col-auto align-self-center">
                <div className="btn btn-sm btn-outline-warning"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col mt-1">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">{modeLabel} category</h4>
            <p className="text-muted mb-0">
              Basic example to demonstrate Bootstrap’s form styles.
            </p>
          </div>
          <div className="card-body">
            <Formik
              initialValues={{
                name: value.name,
                slug: value.slug,
                description: value.description,
              }}
              validationSchema={schema}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                alert(JSON.stringify(values));
                const func =
                  mode === 'create'
                    ? () => categoriesService.createCategory(values)
                    : () =>
                        categoriesService.updateCategory({
                          id: param_id,
                          ...values,
                        });
                try {
                  const category = await func();
                  if (mode === 'create') {
                    history.push('/categories/' + category.id);
                  }
                  toast.success(
                    `Category '${category.name}' updated successfully!`,
                  );
                } catch (err) {
                  console.log(err);
                  toast.error(
                    `Category '${value.name || values.name}' failed to update!`,
                  );
                }
                setSubmitting(false);
              }}
              enableReinitialize={true}
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
                          style={{ margin: 'auto 2vh auto 0px' }}
                        >
                          Name
                        </label>
                        <input
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          placeholder="Personal Blog"
                          style={{ width: '50%' }}
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
                        style={{ margin: 'auto 2vh auto 0px' }}
                      />
                      <span className="form-text text-muted font-12">
                        {getFeedback(errors, 'name') ||
                          'The name is how it appears on your site.'}
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="d-flex">
                      <div className="col m-auto d-flex">
                        <label
                          className="col-1 form-label"
                          htmlFor="exampleFormControlTextarea1"
                          style={{ margin: 'auto 2vh auto 0px' }}
                        >
                          Slug
                        </label>
                        <input
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          placeholder="personal-blog"
                          style={{ width: '50%' }}
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
                        style={{ margin: 'auto 2vh auto 0px' }}
                      />
                      <span className="col form-text text-muted font-12">
                        {getFeedback(errors, 'slug') ||
                          `The “slug” is the URL-friendly version of the name. It is
                          usually all lowercase and contains only letters, numbers, and
                          hyphens.`}
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="d-flex">
                      <div className="col m-auto d-flex">
                        <label
                          className="col-1 form-label"
                          htmlFor="exampleFormControlTextarea1"
                          style={{ margin: 'auto 2vh auto 0px' }}
                        >
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          style={{ width: '50%' }}
                          name="description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                        />
                        {getFeedback(errors, 'description')}
                      </div>
                    </div>
                    <div className="col m-auto d-flex">
                      <div
                        className="col-1 form-label"
                        style={{ margin: 'auto 2vh auto 0px' }}
                      />
                      <span className=" form-text text-muted font-12">
                        The description is not prominent by default; however,
                        some themes may show it.
                      </span>
                    </div>
                  </div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn-soft-primary btn-md"
                  >
                    {submitButtonText}
                  </button>
                  <button
                    disabled={isSubmitting}
                    type="button"
                    className="btn btn-soft-danger btn-md"
                    style={{ marginLeft: 15 }}
                    onClick={() => history.push('/categories')}
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
  );
};

export { SingleCategory };
