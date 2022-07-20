import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useBlogThemesSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'debounce';
import { getBlogsForQuery, getLoadingForQuery } from './slice/selectors';
import { MainPanel } from 'app/components/MainPanel';
import slugify from 'slugify';

export const ChooseTheme = ({
  sendValueToParent,
  parentValue: parentValue_,
  nextStep,
}) => {
  const { actions } = useBlogThemesSlice();

  const query = '';

  const blogThemes = useSelector(getBlogsForQuery(query));
  const loading = useSelector(getLoadingForQuery(query));

  const parentValue = parentValue_ || '';

  const [blogThemeId, setBlogThemeId] = useState(parentValue);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.loadBlogThemes({ query }));
  }, []);

  const onSelectClick = e => {
    e.preventDefault();
    const { blogthemeindex: index } = e.target.dataset;
    const id = blogThemes[index].id;
    const value = Number(id);
    const same = value === blogThemeId;
    if (same) setBlogThemeId(null!);
    else setBlogThemeId(value);
  };

  console.log({ blogThemeId, blogThemes });

  if (loading) return <></>;

  const defaultBlogThemeId = blogThemes[blogThemes.length - 1].id;

  const handleSubmit = e => {
    e.preventDefault();
    sendValueToParent(blogThemeId || defaultBlogThemeId);
    nextStep();
  };

  const selectedBlogThemeId = blogThemeId || defaultBlogThemeId;
  const blogTheme = blogThemes.find(bt => bt.id === selectedBlogThemeId);
  const i = blogThemes.findIndex(bt => bt.id === selectedBlogThemeId);
  const previousDisabled = i < 1;
  const nextDisabled = i > blogThemes.length - 2;

  return (
    <div className="container row" style={{ display: 'block' }}>
      <h4 className="mt-4 mb-4">Choose the theme of your blog</h4>
      <p className="mt-4 mb-4">You can change this later anytime.</p>
      <div className="row">
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <div className="blog-card">
                <img
                  src={blogTheme.image_url || '/assets/images/small/img-1.jpg'}
                  alt=""
                  className="img-fluid rounded"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <div className="blog-card">
                <h4 className="mt-4 mb-4">{blogTheme.name}</h4>
                <p className="mt-4 mb-4">Version: 1.0.0</p>
                <p className="mt-10 mb-10">{blogTheme.description}</p>
              </div>
            </div>

            <div className="card-footer" style={{ borderTop: 'none' }}>
              <div style={{ display: 'flex', marginTop: '2vh' }}>
                <div style={{ width: '50%', textAlign: 'left' }}>
                  <button
                    className="btn btn-outline-light"
                    style={{ right: '-6vw', marginRight: '2vw' }}
                    disabled={previousDisabled}
                    data-blogthemeindex={i - 1}
                    onClick={onSelectClick}
                  >
                    Previous
                  </button>
                </div>
                <div
                  style={{
                    width: '50%',
                    textAlign: 'right',
                    display: 'inline',
                  }}
                >
                  <button
                    className="btn btn-primary"
                    style={{ right: '-6vw', marginRight: '0.5vw' }}
                    disabled={nextDisabled}
                    data-blogthemeindex={i + 1}
                    onClick={onSelectClick}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <button
              className="btn btn-primary col-3"
              style={{
                right: '-6vw',
                marginLeft: 'auto',
                marginRight: '0.7vw',
              }}
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
