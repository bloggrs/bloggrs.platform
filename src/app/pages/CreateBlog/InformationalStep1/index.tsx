import { MainPanel } from 'app/components/MainPanel';
import * as React from 'react';

export const InformationalStep1 = ({ nextStep }) => {
  return (
    <MainPanel
      className="container max-h-full max-w-7xl py-9 px-4 md:px-12"
      sidebarProps={{ collapse: true }}
    >
      <div className="px-2">
        <div className="flex">
          <div className="w-full px-2">
            <h1 className="text-center font-bold text-3xl md:text-4xl lg:text-5xl text-[#1e4d78]">
              Let's bring your ideas to life.
            </h1>
            <h2 className="my-6 md:my-10 text-center font-medium text-xl md:text-2xl text-gray-600">
              Answer some questions to get the best tools for what you're
              creating.
            </h2>
            <div className="text-center">
              <button
                onClick={nextStep}
                className="w-40 rounded-md h-12 bg-[#1e4d78] hover:bg-[#2a6aa8] transition-colors text-white font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainPanel>
  );
};
