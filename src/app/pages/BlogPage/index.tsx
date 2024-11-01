import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

interface ImageState {
  isLoading: boolean;
  error: boolean;
}

export const BlogPage = () => {
  const featuredPosts: BlogPost[] = [
    {
      id: 1,
      title: 'How to Grow Your Blog Audience in 2024',
      excerpt: 'Learn the latest strategies and techniques to expand your blog\'s reach and engage with more readers.',
      author: 'Content Team',
      date: 'March 15, 2024',
      readTime: '8 min read',
      category: 'Growth',
      image: '/dist/static/blog/audience-growth.jpg'
    },
    {
      id: 2,
      title: 'The Ultimate Guide to SEO for Bloggers',
      excerpt: 'Master the fundamentals of SEO to improve your blog\'s visibility and attract organic traffic.',
      author: 'SEO Expert',
      date: 'March 12, 2024',
      readTime: '12 min read',
      category: 'SEO',
      image: '/dist/static/blog/seo-guide.jpg'
    },
    {
      id: 3,
      title: 'Monetization Strategies for Your Blog',
      excerpt: 'Discover various ways to generate income from your blog while maintaining authenticity.',
      author: 'Business Team',
      date: 'March 10, 2024',
      readTime: '10 min read',
      category: 'Monetization',
      image: '/dist/static/blog/monetization.jpg'
    }
  ];

  const categories = [
    'All Posts',
    'Getting Started',
    'Tips & Tricks',
    'Case Studies',
    'Platform Updates',
    'Success Stories'
  ];

  const [imageStates, setImageStates] = useState<Record<number, ImageState>>(
    featuredPosts.reduce((acc, post) => ({
      ...acc,
      [post.id]: { isLoading: true, error: false }
    }), {})
  );

  const handleImageLoad = (postId: number) => {
    setImageStates(prev => ({
      ...prev,
      [postId]: { isLoading: false, error: false }
    }));
  };

  const handleImageError = (postId: number) => {
    setImageStates(prev => ({
      ...prev,
      [postId]: { isLoading: false, error: true }
    }));
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Resources to Help You Succeed
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Discover tips, guides, and insights to create and grow your perfect blog
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/blogs/create"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md font-medium transition"
              >
                Start Your Blog
              </Link>
              <a
                href="#latest"
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-md font-medium transition"
              >
                Read Latest Posts
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full text-sm font-medium transition
                  ${index === 0 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredPosts.map(post => (
            <article 
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group"
            >
              <div className="relative aspect-w-16 aspect-h-9 overflow-hidden">
                {/* Loading Skeleton */}
                {imageStates[post.id]?.isLoading && (
                  <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                )}
                
                {/* Error Fallback */}
                {imageStates[post.id]?.error && (
                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                    <div className="text-center">
                      <svg 
                        className="w-12 h-12 mx-auto text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="mt-2 text-sm text-slate-500">Failed to load image</p>
                    </div>
                  </div>
                )}

                {/* Main Image */}
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    onLoad={() => handleImageLoad(post.id)}
                    onError={() => handleImageError(post.id)}
                    className={`
                      object-cover w-full h-full
                      transition-all duration-300 ease-in-out
                      group-hover:scale-105
                      ${imageStates[post.id]?.isLoading ? 'opacity-0' : 'opacity-100'}
                    `}
                  />
                  {/* Overlay on Hover */}
                  <div className="
                    absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20
                    transition-all duration-300 ease-in-out
                  "/>
                  {/* Category Badge */}
                  <div className="
                    absolute top-4 left-4 px-3 py-1 
                    bg-yellow-500 text-white text-sm font-medium
                    rounded-full shadow-lg
                  ">
                    {post.category}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-yellow-500 font-medium">
                    {post.category}
                  </span>
                  <span className="text-sm text-slate-500">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-3">
                  {post.title}
                </h2>
                <p className="text-slate-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    By {post.author} • {post.date}
                  </div>
                  <button className="text-yellow-500 hover:text-yellow-600 font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Stay Updated
            </h2>
            <p className="text-slate-600 mb-6">
              Get the latest blogging tips and platform updates delivered directly to your inbox
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-yellow-500"
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md font-medium transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Need Help?
          </h2>
          <p className="text-slate-600 mb-6">
            Our support team is here to assist you with any questions
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/support"
              className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium"
            >
              Visit Help Center
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 