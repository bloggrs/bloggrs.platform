import React from 'react';
import { useNode } from '@craftjs/core';

interface BlogPreviewComponent
  extends React.ForwardRefExoticComponent<
    Omit<any, 'ref'> & React.RefAttributes<HTMLDivElement>
  > {
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
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-[#1a365d] rounded-lg w-10 h-10 flex items-center justify-center text-white text-sm font-medium">
            LOGO
          </div>
          <h1 className="text-xl font-semibold text-gray-900">
            DataAddict's Blog
          </h1>
        </div>
        <nav>
          <ul className="flex items-center space-x-8">
            {['Home', 'About Me', 'Contact'].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  ),

  BlogPost: () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="aspect-video mb-6 bg-gray-100 rounded-lg"></div>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">Lorem Ipsum Title</h2>
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>December 22, 2021</span>
        <span className="mx-2">•</span>
        <span>John Cena</span>
      </div>
      <p className="text-gray-600 mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...
      </p>
      <div className="flex items-center space-x-6">
        <button className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
          <span>824 likes</span>
        </button>
        <button className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
          <span>3 comments</span>
        </button>
      </div>
    </div>
  ),

  Sidebar: () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
      <ul className="space-y-3">
        {[
          { name: 'Food', count: 5 },
          { name: "Fashion WTF's", count: 252 },
          { name: 'T-Shirts', count: 159 },
          { name: 'New Trends', count: 5 },
          { name: "Women's Fashion", count: 45 },
        ].map((category) => (
          <li key={category.name} className="flex items-center justify-between">
            <span className="text-gray-700">{category.name}</span>
            <span className="text-gray-400">({category.count})</span>
          </li>
        ))}
      </ul>
    </div>
  ),
};

export const BlogPreview = React.forwardRef<HTMLDivElement, any>(
  (props, ref) => {
    const {
      connectors: { connect, drag },
    } = useNode();

    return (
      <div
        ref={element => {
          if (element) {
            connect(drag(element));
            if (typeof ref === 'function') ref(element);
            else if (ref) ref.current = element;
          }
        }}
      >
        {props.children}
      </div>
    );
  },
) as BlogPreviewComponent;

BlogPreview.displayName = 'BlogPreview';

BlogPreview.craft = {
  displayName: 'BlogPreview',
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => true,
  },
};
