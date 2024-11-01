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
      <div className="px-2">
        <div className="flex">
          <div className="w-full w-6/6 lg:w-6/6 px-2">
            <h1 className="text-center font-bold text-5xl text-slate-700">
              What kind of blog are you creating?
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
                      placeholder="Search for your business or blog type"
                      value={query}
                      onChange={e => {
                        setCustomCategoryName(e.target.value);
                        setQuery(e.target.value);
                      }}
                    />
                  </div>
                  <hr className="h-1 border-1 bg-slate-800" />
                </div>
                <div className="w-2/6">
                  <button
                    onClick={e => !nextStepDisabled && nextStep()}
                    className={`w-40 rounded-md h-10 mx-10 text-white font-medium ${
                      nextStepDisabled ? 'bg-orange-200' : 'bg-yellow-500'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="flex flex-inline">
                {query && (
                  <div className="w-4/6 bg-white overflow-y-scroll h-60 scrollbar-rounded scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-orange-100 h-32 overflow-y-scroll">
                    {blogCategories &&
                      blogCategories.map(bg => (
                        <p
                          key={bg.id}
                          onClick={() => setBlogCategoryId(bg.id)}
                          className={
                            'cursor-pointer mx-10 my-2 ' +
                            (blogCategoryId !== bg.id
                              ? 'text-slate-500'
                              : 'text-blue-500')
                          }
                        >
                          {bg.name}
                        </p>
                      ))}
                    {loading && <div>Loading</div>}
                  </div>
                )}
                <div className={`w-4/6 ${query ? 'hidden' : ''}`}>
                  <p className="mx-10 my-2 text-slate-500">Examples</p>
                  <p
                    onClick={() => setCustomCategoryName('Personal Blog')}
                    className={
                      'cursor-pointer mx-10 my-2 ' +
                      (customCategoryName !== 'Personal Blog'
                        ? 'text-slate-500'
                        : 'text-blue-500')
                    }
                  >
                    Personal Blog
                  </p>
                  <p
                    onClick={() => setCustomCategoryName('Portfolio')}
                    className={
                      'cursor-pointer mx-10 my-2 ' +
                      (customCategoryName !== 'Portfolio'
                        ? 'text-slate-500'
                        : 'text-blue-500')
                    }
                  >
                    Portfolio
                  </p>
                  <p
                    onClick={() => setCustomCategoryName('Travel')}
                    className={
                      'cursor-pointer mx-10 my-2 ' +
                      (customCategoryName !== 'Travel'
                        ? 'text-slate-500'
                        : 'text-blue-500')
                    }
                  >
                    Travel
                  </p>
                  <p
                    onClick={() => setCustomCategoryName('Food')}
                    className={
                      'cursor-pointer mx-10 my-2 ' +
                      (customCategoryName !== 'Food'
                        ? 'text-slate-500'
                        : 'text-blue-500')
                    }
                  >
                    Food
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPanel>
  );
};
