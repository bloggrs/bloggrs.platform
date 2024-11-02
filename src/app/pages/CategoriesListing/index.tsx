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

export const CategoriesListing = (props) => {

    
  const EditButton = ({ item }) => (
    <button
      onClick={() => {
        props.setSelectedCategory(item);
        props.setEditModalOpen(true);
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
          onClick={() => props.history.goBack()}
          className="btn-base px-6 py-2 mb-4 sm:mb-0 bg-white border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
        >
          Back
        </button>

        <Link to={`/blogs/${props.match.params.blog_id}/categories/create`}>
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
          { key: 'slug', label: 'Slug' },
        ]}
        EditButton={EditButton}
        DeleteModal={DeleteCategoryModal}
        data={props.categories || []}
        onLoadMore={(e: any) => props.setLoadMoreClicks(props.loadMoreClicks + 1)}
      />

      {props.editModalOpen && props.selectedCategory && (
        <EditCategoryModal
          category={props.selectedCategory}
          isOpen={props.editModalOpen}
          onClose={() => props.setEditModalOpen(false)}
          children={null}
        />
      )}
    </div>
  );
};
