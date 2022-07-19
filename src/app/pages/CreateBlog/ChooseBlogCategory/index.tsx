import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useBlogCategoriesSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'debounce';
import { getBlogCategoriesForQuery, getLoadingForQuery, selectBlogCategories } from './slice/selectors';
import { MainPanel } from 'app/components/MainPanel';
import slugify from 'slugify';


const getParentValue = val => {
  const isObject = typeof(val) === "object";
  if (!isObject) return val || 0
  const keys = [ "name", "id" ];
  for (let key of keys) if (val[key]) return val[key];
  return 0
}

const getQuery = val => {
  if (val && val.name) return val.name;
  return "";
}

export const ChooseBlogCategory = ({
  sendValueToParent,
  parentValue: parentValue_,
  nextStep,
  nextStepDisabled,
}) => {
  const { actions } = useBlogCategoriesSlice();
  const [query, setQuery] = useState(getQuery(parentValue_));

  const blogCategories = useSelector(getBlogCategoriesForQuery(query));
  const allBlogCategories = useSelector(selectBlogCategories);
  const loading = useSelector(getLoadingForQuery(query));

  const parentValue = getParentValue(parentValue_);

  const [blogCategoryId, setBlogCategoryId] = useState(
    parentValue
  );

  const onSelectClick = e => {
    e.preventDefault();
    const { blogcategoryid: value } = e.target.dataset;
    const same = String(value) === String(blogCategoryId)
    if (same) setBlogCategoryId(null!);
    else setBlogCategoryId(String(value))
  }

  console.log({ blogCategoryId })
  const dispatch = useDispatch();

  useEffect(
    debounce(() => {
      dispatch(actions.loadBlogCategories({ query }));
    }, 75),
    [query],
  );

  const exception = query.length && !blogCategories.length && !loading
  const handleSubmit = e => {
    e.preventDefault();
    const value = exception ? query : blogCategoryId
    const is_id = !isNaN(value);
    const key = is_id ? "id" : "name";
    const data = { [key]: is_id ? Number(value) : value };
    console.log(data);
    sendValueToParent(data);
    nextStep();
  };

  const disabled = !Boolean(blogCategoryId) && !exception

  const createBlogCategory = str => ({
    id: str,
    name: str,
    slug: slugify(str).toLowerCase()
  })
  
  let blogCategories_ = [ ...blogCategories ]
  if (blogCategoryId){ 
    const found = allBlogCategories.find(bc => bc.id == blogCategoryId)
    console.log({ found })
    if (found) {
      blogCategories_ = blogCategories_.filter(bc => bc.id != found.id);
      blogCategories_ = [ found, ...blogCategories_ ]
    } else {
      blogCategories_ = blogCategories_.filter(bc => bc.name != blogCategoryId)
      blogCategories_ = [ createBlogCategory(blogCategoryId), ...blogCategories_ ]
    }
  }
  return (
    <div className="container row">
      <h4 className="mt-4 mb-4">Blog Category</h4>
      <div className="col-9">
        <div className="card-body">
          <div className="input-group col-sm-8 mt-2 col form-label">
            <label className="col-sm-3 mt-2 col form-label" style={{ textAlign: "center" }}>Search: </label>
            <button className="btn btn-primary" type="button" id="button-addon1">
              <i className="fas fa-search" />
            </button>
            <input
              type="text"
              className="form-control"
              placeholder="Search categories.."
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <div
              style={{ marginLeft: "1.5vw" }}
            >
              <button
                className="btn btn-primary"
                style={{ position: "absolute", right: "-6vw" }}
                disabled={disabled}
                onClick={handleSubmit}
              >
                Continue
              </button>
            </div>
          </div>
          <div className="table-responsive py-2" style={{ marginLeft: "25%" }}>
            <table className="table table-striped mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>URL</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {
                  selectedBlogCategory ? 
                    <tr>
                      <td>{selectedBlogCategory.name}</td>
                      <td>
                        <a href="https://gblog.gjergjkadriu.com/" target="_blank">
                          https://gblog.gjergjkadriu.com/{slugify(selectedBlogCategory.name).toLowerCase()}
                        </a>
                      </td>
                      <td className="text-end">
                        <div className="form-check">
                          <button
                            className="btn btn-link"
                            id="flexCheckDefault"
                            onClick={onSelectClick}
                            data-blogcategoryid={selectedBlogCategory.id}
                          >
                            { String(blogCategoryId) === String(selectedBlogCategory.id) ? "Selected" : "Select"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  : null
                } */}
                {
                  blogCategories_.map(blogCategory => (
                    <tr>
                      <td>{blogCategory.name}</td>
                      <td>
                        <a href="https://gblog.gjergjkadriu.com/" target="_blank">
                          https://gblog.gjergjkadriu.com/{slugify(blogCategory.name).toLowerCase()}
                        </a>
                      </td>
                      <td className="text-end">
                        <div className="form-check">
                          <button
                            className="btn btn-link"
                            id="flexCheckDefault"
                            onClick={onSelectClick}
                            data-blogCategoryId={blogCategory.id}
                          >
                            { String(blogCategoryId) === String(blogCategory.id) ? "Selected" : "Select"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
                {
                  !blogCategories.length && (blogCategoryId !== query) ? 
                  <tr>
                  <td>{query}</td>
                  <td>
                    <a href="https://gblog.gjergjkadriu.com/" target="_blank">
                      https://gblog.gjergjkadriu.com/{slugify(query).toLowerCase()}
                    </a>
                  </td>
                  <td className="text-end">
                    <div className="form-check">
                      <button
                        className="btn btn-link"
                        id="flexCheckDefault"
                        onClick={onSelectClick}
                        data-blogCategoryId={query}
                      >
                        { String(blogCategoryId) === query ? "Selected" : "Select" }
                      </button>
                    </div>
                  </td>
                </tr>
                  : null
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <h1>Choose blog category</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName"></label>
        <input
          id="search"
          name="search"
          type="text"
          onChange={e => setQuery(e.target.value)}
          value={query}
        />

        <button type="submit">Submit</button>
        <ul>
          {blogCategories.map(bg => (
            <li
              style={{
                fontWeight: blogCategoryId === bg.id ? 'bold' : '',
              }}
              onClick={() => setBlogCategoryId(bg.id)}
            >
              #{bg.id} - {bg.name}
            </li>
          ))}
        </ul>
      </form>
    </>
  );
};
