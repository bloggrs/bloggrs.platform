import React, { useState } from 'react';
import { blogCategoriesService } from '../../../services/blogCategories.service';
import { MainPanel } from 'app/components/MainPanel';
import { ChevronLeft } from 'lucide-react';

export const CreateCategory: React.FC = () => {
  return <CreateCategoryContent />;
};

const CreateCategoryContent: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const blog_id = window.location.pathname
        .split('/blogs/')[1]
        ?.split('/')[0];
      await blogCategoriesService.createBlogPostCategory({
        blog_id,
        name,
        description,
        parentCategoryId: null,
      });
      window.location.href = `/blogs/${blog_id}/categories`;
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50" style={{marginTop: "3%"}}>
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-[#f4a261] hover:text-[#e76f51] transition-colors">
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>
              <h1 className="text-2xl font-semibold text-gray-800">Create New Category</h1>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
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
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent min-h-[100px]"
                  placeholder="Enter category description"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] text-white rounded-lg transition-colors"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
