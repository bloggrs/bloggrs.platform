import * as React from 'react';
import { Link } from 'react-router-dom';
import { CustomizeImage } from 'app/components/FeatureImages/CustomizeImage';
import { DashboardImage } from 'app/components/FeatureImages/DashboardImage';
import { BlogImage } from 'app/components/FeatureImages/BlogImage';

export const FeaturesPage = () => {
  const features = [
    {
      title: "Customize Your Blog",
      description: "Choose from various components to enhance your blog's functionality. Add essential features like comments, categories, author bios, and social sharing to create an engaging platform for your readers.",
      component: <CustomizeImage />,
      items: [
        "Built-in blogging tools",
        "Comments system",
        "Categories and tags",
        "Author profiles",
        "Social sharing"
      ]
    },
    {
      title: "Manage Your Content",
      description: "Take control of your blog with our powerful dashboard. Create and manage posts, monitor comments, handle team members, and track your blog's performance all in one place.",
      component: <DashboardImage />,
      items: [
        "Intuitive dashboard",
        "Post management",
        "Team collaboration",
        "Analytics tracking",
        "Custom domain support"
      ]
    },
    {
      title: "Engage Your Readers",
      description: "Create an interactive blogging experience with built-in engagement tools. Let your readers comment on posts, share your content, and follow your latest updates.",
      component: <BlogImage />,
      items: [
        "Clean blog layout",
        "Responsive design",
        "Comment system",
        "Social interactions",
        "Reader-friendly interface"
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Everything you need to create a successful blog
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Powerful features to help you create, manage, and grow your blog
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 items-center`}
            >
              {/* Replace image with component */}
              <div className="w-full md:w-1/2">
                {feature.component}
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-slate-800">
                  {feature.title}
                </h2>
                <p className="text-lg text-slate-600">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-center text-slate-700">
                      <svg className="w-5 h-5 text-yellow-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-24">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">
            Ready to start your blog?
          </h2>
          <Link
            to="/blogs/create"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-8 py-3 rounded-md transition"
          >
            Create Your Blog Now
          </Link>
        </div>
      </div>
    </div>
  );
};
