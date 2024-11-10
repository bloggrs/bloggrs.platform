import * as React from 'react';
import { useEffect, useState } from 'react';
import { useCategoriesSlice } from './slice';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, isCategoriesLoading } from './slice/selectors';
import { Table } from 'app/components/Table';
import { DeleteCategoryModal } from './DeleteCategoryModal/Loadable';
import { EditCategoryModal } from './EditCategoryModal';
import { NotAuthorized } from 'app/components/NotAuthorized';
import { Category } from './slice/types';

interface RootState {
  auth: {
    user?: any;
    token?: string;
    loading: boolean;
    error?: any;
  };
  categoriesListing: {
    categories: {
      error?: Error;
      loading: boolean;
      categories: any[];
      deleteLoading: boolean;
      isAuthorized?: boolean;
    };
  };
}

export const CategoriesListing = () => {
  const { actions } = useCategoriesSlice();
  const dispatch = useDispatch();
  const history = useHistory();
  const { blog_id } = useParams<{ blog_id: string }>();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [loadMoreClicks, setLoadMoreClicks] = useState(0);

  const categories = useSelector(getCategories);
  const loading = useSelector(isCategoriesLoading);

  useEffect(() => {
    dispatch(actions.loadCategories({ id: blog_id }));
  }, [dispatch, blog_id]);

  const EditButton = ({ item }) => (
    <Link to={`/blogs/${blog_id}/categories/${item.id}`}>
      <button className="btn-base m-2 bg-transparent border-2 border-yellow-800 text-yellow-800 rounded-md">
        Edit
      </button>
    </Link>
  );

  return (
    <div className="min-h-screen flex bg-gray-50" style={{ marginTop: '3%' }}>
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => history.goBack()}
                className="flex items-center text-[#f4a261] hover:text-[#e76f51] transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>
              <h1 className="text-2xl font-semibold text-gray-800">
                Categories
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-64 pl-10 pr-4 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <Link to={`/blogs/${blog_id}/categories/create`}>
                <button className="px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] text-white rounded-lg transition-colors">
                  Add Category
                </button>
              </Link>
            </div>
          </div>

          {/* Categories Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <Table
              type="category"
              fields={[
                { key: 'id', label: '#' },
                { key: 'name', label: 'Name' },
                { key: 'slug', label: 'Slug' },
              ]}
              EditButton={EditButton}
              DeleteModal={DeleteCategoryModal}
              data={categories.map(category => ({
                ...category.categories,
                id: category.categories.id,
              }))}
              onLoadMore={(e: any) => setLoadMoreClicks(loadMoreClicks + 1)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
