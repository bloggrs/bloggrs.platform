import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  getBlogCategoriesForQuery,
  selectBlogCategories,
} from '../ChooseBlogCategory/slice/selectors';
import { selectBlogThemes } from '../ChooseTheme/slice/selectors';

export const ConfirmDetails = ({
  parentData,
  STEPS,
  onPreviousClick,
  onContinueClick,
}) => {
  const { thumbnail, name, description } = parentData[STEPS[0]];

  console.log('parentData[ STEPS[1] ]', parentData[STEPS[1]]);
  const { id: blogCategoryId, name: blogCategoryName_ } = parentData[STEPS[1]];
  const blogCategories = useSelector(selectBlogCategories);
  console.log({ blogCategoryId, blogCategories });
  const blogCategoryName =
    blogCategoryName_ ||
    blogCategories.find(bc => bc.id === blogCategoryId).name;

  const { username } = parentData[STEPS[2]];

  const blogThemeId = parentData[STEPS[3]];
  const blogThemes = useSelector(selectBlogThemes);
  console.log({ blogThemeId, blogThemes });
  const blogThemeName = blogThemes.find(bc => bc.id === blogThemeId).name;

  return (
    <div className="container row" style={{ display: 'block' }}>
      <h4 className="mt-4 mb-4">Confirm details</h4>
      <div className="col-md-8 row">
        <div className="col-2" style={{ margin: 'auto' }}>
          <label className="mt-2 form-label mb-lg-0 text-end">
            Thumbnail:{' '}
          </label>
        </div>
        <div className="col-2 card-body m-auto">
          <div
            className=""
            style={{
              height: '313.993px',
              backgroundImage: `url("${thumbnail || '/640x360.png'}")`,
              border: thumbnail ? 'initial' : '0.5px dashed',
            }}
          />
        </div>
      </div>
      <div className="col-md-8 row">
        <div className="col-2" style={{ margin: 'auto' }}>
          <label className="mt-2 form-label mb-lg-0 text-end">Name: </label>
        </div>
        <div className="col-2 card-body m-auto">
          <input
            className="form-control"
            disabled={true}
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
            value={name}
          />
        </div>
      </div>
      <div className="col-md-8 row">
        <div className="col-2" style={{ margin: 'auto' }}>
          <label className="mt-2 form-label mb-lg-0 text-end">
            Description:{' '}
          </label>
        </div>
        <div className="col-2 card-body m-auto">
          <textarea
            className="form-control"
            aria-label="Example text with button addon"
            disabled={true}
            aria-describedby="button-addon1"
            value={description}
          />
        </div>
      </div>
      <div className="col-md-8 row">
        <div className="col-2" style={{ margin: 'auto' }}>
          <label className="mt-2 form-label mb-lg-0 text-end">Category: </label>
        </div>
        <div className="col-2 card-body m-auto">
          <input
            className="form-control"
            disabled={true}
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
            value={blogCategoryName}
          />
        </div>
      </div>
      <div className="col-md-8 row">
        <div className="col-2" style={{ margin: 'auto' }}>
          <label className="mt-2 form-label mb-lg-0 text-end">Theme: </label>
        </div>
        <div className="col-2 card-body m-auto">
          <input
            className="form-control"
            disabled={true}
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
            value={blogThemeName}
          />
        </div>
      </div>
      <div className="col-md-8 row">
        <div className="col-2" style={{ margin: 'auto' }}>
          <label className="mt-2 form-label mb-lg-0 text-end">URL: </label>
        </div>
        <div className="col-offset-2 col-2 card-body m-auto">
          <div className="input-group">
            <input
              className="form-control"
              disabled={true}
              aria-label="username"
              aria-describedby="basic-addon2"
              value={username}
            />
            <span className="input-group-text" id="basic-addon2">
              .gjergjkadriu.com
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: '2vh' }}>
          <div style={{ width: '50%', textAlign: 'left' }}>
            <button
              className="btn btn-outline-light"
              style={{ right: '-6vw', marginRight: '2vw' }}
              onClick={onPreviousClick()}
            >
              Previous
            </button>
          </div>
          <div style={{ width: '50%', textAlign: 'right', display: 'inline' }}>
            <button
              className="btn btn-outline-primary"
              style={{ right: '-6vw', marginRight: '0.5vw' }}
              onClick={onContinueClick()}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
