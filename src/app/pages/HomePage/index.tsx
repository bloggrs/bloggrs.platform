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
    <MainPanel
      sidebarProps={{ collapse: true }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8">
            Select your blog
          </h1>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <img
                        src="/dist/static/icons8-search-48.png"
                        className="h-5 w-5 text-gray-400"
                        alt="Search"
                      />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
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
                <div className="flex-shrink-0">
                  {query && blogs?.length === 0 ? (
                    <Link
                      to="/blogs/create"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      Create New Blog
                    </Link>
                  ) : (
                    <button
                      onClick={e => !blogId && nextStep()}
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                        blogId
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
                      }`}
                    >
                      Continue
                    </button>
                  )}
                </div>
              </div>

              {/* Search Results */}
              {query && (
                <div className="mt-4">
                  <div className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                    {blogs.map(bg => (
                      <div
                        key={bg.id}
                        onClick={() => setBlogId(bg.id)}
                        className={`cursor-pointer p-4 hover:bg-gray-50 transition ${
                          blogId === bg.id ? 'bg-yellow-50' : ''
                        }`}
                      >
                        <p className={`text-sm ${
                          blogId === bg.id ? 'text-yellow-600 font-medium' : 'text-gray-900'
                        }`}>
                          {bg.name}
                        </p>
                      </div>
                    ))}
                    {loading && (
                      <div className="p-4 text-sm text-gray-500">Loading...</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainPanel>
  );
};
