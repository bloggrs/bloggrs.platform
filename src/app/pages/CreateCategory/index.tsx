import React, { useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { blogCategoriesService } from '../../../services/blogCategories.service';
import { MainPanel } from 'app/components/MainPanel';

interface CreateCategoryProps {
  name: string;
  description: string;
  setName: (value: string) => void;
  setDescription: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const CreateCategory: React.FC<CreateCategoryProps> = (props) => {
  return (
    <MainPanel
      className="container max-h-full max-w-7xl py-9 px-4 md:px-12"
    >
      <div className="flex justify-center items-start min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Create New Category</h1>
          </div>
          
          <form onSubmit={props.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
                type="text"
                id="name"
                value={props.name}
                onChange={(e) => props.setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={props.description}
                onChange={(e) => props.setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                placeholder="Enter category description"
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-[#F5A353] text-white rounded-md hover:bg-[#f39635] transition-colors duration-200"
              >
                Create Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainPanel>
  );
};

