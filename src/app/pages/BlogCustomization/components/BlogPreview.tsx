import React from 'react';
import { useNode } from '@craftjs/core';

interface BlogPreviewComponent extends React.ForwardRefExoticComponent<Omit<any, "ref"> & React.RefAttributes<HTMLDivElement>> {
  craft: {
    displayName: string;
    rules: {
      canDrag: () => boolean;
      canDrop: () => boolean;
      canMoveIn: () => boolean;
    };
  };
}

export const BlogPreviewConfig = {
  Header: () => (
    <header className="blog-header bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-gray-600 rounded-lg w-12 h-12 flex items-center justify-center text-white">
            LOGO
          </div>
          <h1 className="text-xl font-bold text-[#26577C]">DataAddict's Blog</h1>
        </div>
        <nav>
          <ul className="flex gap-6 text-[#26577C]">
            <li><a href="#">Home</a></li>
            <li><a href="#">About Me</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  ),

  BlogPost: () => (
    <div className="blog-post bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="post-image mb-4 bg-gray-100 h-48 rounded-lg"></div>
      <h2 className="text-xl font-semibold mb-2">Lorem Ipsum Title</h2>
      <div className="post-meta text-sm text-gray-500 mb-4">
        <span>Wednesday, December 22, 2021</span>
        <span className="mx-2">•</span>
        <span>John Cena</span>
      </div>
      <div className="post-content text-gray-700 mb-4">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry...
      </div>
      <div className="post-actions flex items-center gap-4">
        <button className="flex items-center gap-2 text-gray-500">
          <span>824 likes</span>
        </button>
        <button className="flex items-center gap-2 text-gray-500">
          <span>3 comments</span>
        </button>
      </div>
    </div>
  ),

  Sidebar: () => (
    <div className="blog-sidebar bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h3 className="font-semibold mb-4">Categories</h3>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Food</span>
            <span className="text-gray-500">(5)</span>
          </li>
          <li className="flex justify-between">
            <span>Fashion</span>
            <span className="text-gray-500">(252)</span>
          </li>
          <li className="flex justify-between">
            <span>T-Shirts</span>
            <span className="text-gray-500">(159)</span>
          </li>
          <li className="flex justify-between">
            <span>New Trends</span>
            <span className="text-gray-500">(5)</span>
          </li>
          <li className="flex justify-between">
            <span>Women's Fashion</span>
            <span className="text-gray-500">(45)</span>
          </li>
        </ul>
      </div>
    </div>
  )
};

export const BlogPreview = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const { connectors: { connect, drag } } = useNode();
  
  return (
    <div ref={(element) => {
      if (element) {
        connect(drag(element));
        if (typeof ref === 'function') ref(element);
        else if (ref) ref.current = element;
      }
    }}>
      {props.children}
    </div>
  );
}) as BlogPreviewComponent;

BlogPreview.displayName = 'BlogPreview';

BlogPreview.craft = {
  displayName: 'BlogPreview',
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => true,
  },
}; 