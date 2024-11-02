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
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loadMoreClicks, setLoadMoreClicks] = useState(0);

  const categories = useSelector(getCategories);
  const loading = useSelector(isCategoriesLoading);

  useEffect(() => {
    dispatch(actions.loadCategories({ id: blog_id }));
  }, [dispatch, blog_id]);

  const EditButton = ({ item }) => (
    <button
      onClick={() => {
        setSelectedCategory(item);
        setEditModalOpen(true);
      }}
      className="btn-base m-2 bg-transparent border-2 border-yellow-800 text-yellow-800 rounded-md"
    >
      Edit
    </button>
  );

  return (
    <div className="flex flex-col p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <button
          onClick={() => history.goBack()}
          className="btn-base px-6 py-2 mb-4 sm:mb-0 bg-white border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
        >
          Back
        </button>

        <Link to={`/blogs/${blog_id}/categories/create`}>
          <button className="btn-base px-8 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition-colors shadow-sm">
            Add Category
          </button>
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl text-slate-700 font-medium">
            Categories
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Quick search..."
              className="w-full sm:w-64 px-4 py-2 pl-10 bg-gray-50 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </div>
      </div>

      <Table
        type="category"
        fields={[
          { key: 'id', label: '#' },
          { key: 'name', label: 'Name' },
          { key: 'slug', label: 'slug' },
        ]}
        EditButton={EditButton}
        DeleteModal={DeleteCategoryModal}
        data={categories.map(category => ({
          ...category.categories,
          id: category.categories.id,
        }))}
        onLoadMore={(e: any) => setLoadMoreClicks(loadMoreClicks + 1)}
      />

      {editModalOpen && selectedCategory && (
        <EditCategoryModal
          category={selectedCategory}
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          children={null}
        />
      )}
    </div>
  );
};
