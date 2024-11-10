import * as React from 'react';
import { MainPanel } from 'app/components/MainPanel';
import { Palette, Layout, Grid, Layers } from 'lucide-react';

interface ThemeCard {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  tag: 'Popular' | 'New' | 'Premium';
}

export const ChooseBlogTheme = () => {
  const themes: ThemeCard[] = [
    {
      id: '1',
      name: 'Modern Minimal',
      description: 'Clean and minimalistic design for a professional look',
      thumbnail: '/dist/static/theme-1.png',
      tag: 'Popular',
    },
    {
      id: '2',
      name: 'Creative Portfolio',
      description: 'Perfect for showcasing your work and creativity',
      thumbnail: '/dist/static/theme-2.png',
      tag: 'New',
    },
    {
      id: '3',
      name: 'Magazine Pro',
      description: 'Rich layout ideal for content-heavy blogs',
      thumbnail: '/dist/static/theme-3.png',
      tag: 'Premium',
    },
    {
      id: '4',
      name: 'Personal Blog',
      description: 'Simple and elegant design for personal stories',
      thumbnail: '/dist/static/theme-4.png',
      tag: 'Popular',
    },
  ];

  return (
    <MainPanel className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Let's bring your ideas to life
          </h1>
          <p className="text-lg text-gray-500">
            Choose a theme that matches your style. You can customize it later.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: <Palette className="w-6 h-6" />,
              text: 'Customizable colors',
            },
            { icon: <Layout className="w-6 h-6" />, text: 'Flexible layouts' },
            { icon: <Grid className="w-6 h-6" />, text: 'Responsive design' },
            { icon: <Layers className="w-6 h-6" />, text: 'Multiple styles' },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200"
            >
              <div className="text-[#1a365d]">{feature.icon}</div>
              <span className="text-gray-700 font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map(theme => (
            <div
              key={theme.id}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-video bg-gray-100">
                <img
                  src={theme.thumbnail}
                  alt={theme.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      theme.tag === 'Popular'
                        ? 'bg-[#f4a261]/10 text-[#f4a261]'
                        : theme.tag === 'New'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {theme.tag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {theme.name}
                </h3>
                <p className="text-gray-500 mb-4">{theme.description}</p>
                <button className="w-full px-4 py-2 bg-[#1a365d] hover:bg-[#1a365d]/90 text-white rounded-lg transition-colors">
                  Select Theme
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainPanel>
  );
};
