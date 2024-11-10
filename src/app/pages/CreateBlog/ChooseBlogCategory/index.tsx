import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useBlogCategoriesSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'debounce';
import {
  getBlogsForQuery,
  getLoadingForQuery,
  selectToken,
} from './slice/selectors';
import { MainPanel } from 'app/components/MainPanel';

export const ChooseBlogCategory = ({
  sendValueToParent,
  parentValue,
  nextStep,
  nextStepDisabled,
}) => {
  const { actions } = useBlogCategoriesSlice();
  const [query, setQuery] = useState('');

  const blogCategories = useSelector(getBlogsForQuery(query));
  const loading = useSelector(getLoadingForQuery(query));

  const [blogCategoryId, setBlogCategoryId] = useState(
    Number(parentValue) || -1,
  );
  const [customCategoryName, setCustomCategoryName] = useState('');

  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  useEffect(
    debounce(() => {
      dispatch(
        actions.loadBlogCategories({
          query,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
    }, 75),
    [query, token],
  );
  useEffect(() => {
    if (customCategoryName) {
      setQuery(customCategoryName);
      // sendValueToParent(customCategoryName);
    }
  }, [customCategoryName]);
  useEffect(() => {
    if (blogCategoryId && blogCategoryId !== -1 && !loading) {
      const bg = blogCategories.find(bg => bg.id == blogCategoryId);
      if (!bg) return;
      setQuery(bg.name);
      if (parentValue !== blogCategoryId) sendValueToParent(blogCategoryId);
    }
  }, [loading, blogCategoryId]);

  const handleSubmit = e => {
    e.preventDefault();
    sendValueToParent(blogCategoryId);
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
      className="container max-h-full max-w-7xl py-9 px-12"
      sidebarProps={{ collapse: true }}
    >
      <div className="max-w-5xl mx-auto" style={{ marginTop: '7%' }}>
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-12">
          What kind of blog are you creating?
        </h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Search and Next Button Row */}
          <div className="flex items-center justify-between space-x-4 mb-6">
            <div className="relative flex-1">
              <div className="relative">
                <input
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                  placeholder="Search for your business or blog type"
                  value={query}
                  onChange={e => {
                    setCustomCategoryName(e.target.value);
                    setQuery(e.target.value);
                  }}
                />
                <img
                  src="/dist/static/icons8-search-48.png"
                  className="w-5 h-5 absolute left-3 top-2.5"
                  alt="Search"
                />
              </div>
            </div>
            <button
              onClick={e => !nextStepDisabled && nextStep()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                nextStepDisabled
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#f4a261] hover:bg-[#e76f51] text-white'
              }`}
            >
              Next
            </button>
          </div>

          {/* Results Area */}
          <div className="mt-4">
            {query ? (
              <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-[#f4a261] scrollbar-track-gray-100 rounded-lg">
                {loading ? (
                  <div className="p-4 text-gray-500">Loading...</div>
                ) : (
                  blogCategories?.map(bg => (
                    <div
                      key={bg.id}
                      onClick={() => setBlogCategoryId(bg.id)}
                      className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                        blogCategoryId === bg.id
                          ? 'text-[#1a365d] font-medium'
                          : 'text-gray-600'
                      }`}
                    >
                      {bg.name}
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  Examples
                </h3>
                {['Personal Blog', 'Portfolio', 'Travel', 'Food'].map(
                  category => (
                    <div
                      key={category}
                      onClick={() => setCustomCategoryName(category)}
                      className={`p-3 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors ${
                        customCategoryName === category
                          ? 'text-[#1a365d] font-medium'
                          : 'text-gray-600'
                      }`}
                    >
                      {category}
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainPanel>
  );
};
