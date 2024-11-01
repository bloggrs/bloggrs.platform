import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center font-bold text-3xl md:text-4xl lg:text-5xl text-slate-700 mb-12">
          Select one of your blogs to continue on the platform
        </h1>

        <div className="w-full max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="w-full md:w-2/3">
              <div className="flex items-center border-b-2 border-slate-800">
                <img
                  src="/dist/static/icons8-search-48.png"
                  className="w-6 h-6"
                  alt="Search"
                />
                <input
                  className="w-full px-4 py-2 bg-transparent outline-none text-slate-900"
                  placeholder="Search your blogs"
                  value={query}
                  onChange={e => {
                    setCustomBlogName(e.target.value);
                    setQuery(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="w-full md:w-1/3">
              {query && blogs?.length === 0 ? (
                <Link to="/blogs/create" className="block w-full">
                  <button className="w-full rounded-md py-2 px-4 text-white font-medium bg-yellow-500 hover:bg-yellow-600 transition">
                    Create
                  </button>
                </Link>
              ) : (
                <button
                  onClick={e => !blogId && nextStep()}
                  className={`w-full rounded-md py-2 px-4 text-white font-medium transition ${
                    blogId
                      ? 'bg-orange-200'
                      : 'bg-yellow-500 hover:bg-yellow-600'
                  }`}
                >
                  <Link to="/blogs/create">Next</Link>
                </button>
              )}
            </div>
          </div>

          {/* Search Results */}
          {query && (
            <div className="mt-4 w-full bg-white rounded-lg shadow-lg">
              <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-orange-100">
                {blogs.map(bg => (
                  <p
                    key={bg.id}
                    onClick={() => setBlogId(bg.id)}
                    className={`cursor-pointer px-4 py-3 hover:bg-slate-50 transition ${
                      blogId !== bg.id
                        ? 'text-slate-600'
                        : 'text-yellow-500 font-medium'
                    }`}
                  >
                    {bg.name}
                  </p>
                ))}
                {loading && (
                  <div className="px-4 py-3 text-slate-500">Loading...</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
