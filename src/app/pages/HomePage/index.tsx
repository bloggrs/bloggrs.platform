import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useBlogsSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'debounce';
import { getBlogsForQuery, getLoadingForQuery } from './slice/selectors';
import { MainPanel } from 'app/components/MainPanel';

export const HomePage = ({ parentValue }) => {
  const history = useHistory();
  const { actions } = useBlogsSlice();
  const [query, setQuery] = useState('');

  const blogs = useSelector(getBlogsForQuery(query));
  const loading = useSelector(getLoadingForQuery(query));

  const [blogId, setBlogId] = useState(Number(parentValue) || -1);
  const [customBlogName, setCustomBlogName] = useState('');

  const dispatch = useDispatch();

  useEffect(
    debounce(() => {
      dispatch(actions.loadBlogs({ query }));
    }, 75),
    [query],
  );
  useEffect(() => {
    if (customBlogName) {
      setQuery(customBlogName);
      // sendValueToParent(customBlogName);
    }
  }, [customBlogName]);
  useEffect(() => {
    if (blogId && blogId !== -1 && !loading) {
      const bg = blogs.find(bg => bg.id == blogId);
      if (!bg) return;
      setQuery(bg.name);
      if (parentValue !== blogId) sendValueToParent();
    }
  }, [loading, blogId]);

  const sendValueToParent = () => {
    history.push('/blogs/' + blogId);
  };
  const nextStep = sendValueToParent;
  const nextStepDisabled = false;

  const handleSubmit = e => {
    e.preventDefault();
    sendValueToParent();
    nextStep();
  };
  // const examples = [
  //   <p className="cursor-pointer mx-10 my-2 text-slate-500">Personal Blog</p>,
  //   <p className="cursor-pointer mx-10 my-2 text-slate-500">Portfolio</p>,
  //   <p className="cursor-pointer mx-10 my-2 text-blue-500">Travel</p>,
  //   <p className="cursor-pointer mx-10 my-2 text-slate-500">Food</p>,
  // ];
  return (
    <div className="px-2">
      <div className="flex">
        <div className="w-full w-6/6 lg:w-6/6 px-2">
          <h1 className="text-center font-bold text-5xl text-slate-700">
            Select one of your blogs to continue on the platform
          </h1>
          <div className="my-20 container w-3/6 lg:w-6/6 px-2">
            <div className="flex flex-inline">
              <div className="w-4/6">
                <div className="flex flex-inline">
                  <img
                    src="/dist/static/icons8-search-48.png"
                    className="py-2"
                  />
                  <input
                    className="mx-5 bg-transparent w-full outline-none text-slate-900"
                    placeholder="Search your blogs"
                    value={query}
                    onChange={e => {
                      setCustomBlogName(e.target.value);
                      setQuery(e.target.value);
                    }}
                  />
                </div>
                <hr className="h-1 border-1 bg-slate-800" />
              </div>
              <div className="w-2/6">
                <button
                  onClick={e => !blogId && nextStep()}
                  className={`w-40 rounded-md h-10 mx-10 text-white font-medium ${
                    blogId ? 'bg-orange-200' : 'bg-yellow-500'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
            <div className="flex flex-inline">
              {query && (
                <div className="w-4/6 bg-white overflow-y-scroll h-60 scrollbar-rounded scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-orange-100 h-32 overflow-y-scroll">
                  {blogs.map(bg => (
                    <p
                      onClick={() => setBlogId(bg.id)}
                      className={
                        'cursor-pointer mx-10 my-2 ' +
                        (blogId !== bg.id ? 'text-slate-500' : 'text-blue-500')
                      }
                    >
                      {bg.name}
                    </p>
                  ))}
                  {loading && <div>Loading</div>}
                </div>
              )}
            </div>
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
          {blogs.map(bg => (
            <li
              style={{
                fontWeight: blogId === bg.id ? 'bold' : '',
              }}
              onClick={() => setBlogId(bg.id)}
            >
              #{bg.id} - {bg.name}
            </li>
          ))}
        </ul>
      </form>
    </>
  );
};
