import { MainPanel } from 'app/components/MainPanel';
import * as React from 'react';

export const InformationalStep1 = ({ nextStep }) => {
  return (
    <MainPanel
      className="container max-h-full max-w-7xl py-9 px-4 md:px-12"
      sidebarProps={{ collapse: true }}
    >
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#1a365d] sm:text-5xl md:text-6xl">
            Let's bring your ideas to life.
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
            Answer some questions to get the best tools for what you're
            creating.
          </p>
          <div className="mt-10">
            <button
              onClick={nextStep}
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-[#1a365d] hover:bg-[#2a4a7f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a365d] transition-all duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </MainPanel>
  );
};
