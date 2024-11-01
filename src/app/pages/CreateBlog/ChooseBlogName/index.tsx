import { MainPanel } from 'app/components/MainPanel';
import * as React from 'react';
import { useState, useEffect } from 'react';

export const ChooseBlogName = ({
  parentValue,
  sendValueToParent,
  nextStep,
}) => {
  const [name, setName] = useState('');
  const isNextDisabled = !name;
  const localNextStep = () => {
    sendValueToParent(name);
    nextStep();
  };
  const btn_color = isNextDisabled ? 'bg-orange-200' : 'bg-yellow-500';
  return (
    <MainPanel
      sidebarProps={{ collapse: true }}
      className="container max-h-full max-w-7xl p-4 md:py-9 md:px-12"
    >
      <div className="w-full">
        <h1 className="text-center font-bold text-3xl md:text-5xl text-[#1e3a8a]">
          Enter the name of your blog
        </h1>

        <div className="mt-10 md:mt-20 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-4/6">
              <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2">
                <img
                  src="/dist/static/icons8-search-48.png"
                  className="w-6 h-6"
                  alt="search"
                />
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="flex-1 ml-3 bg-transparent outline-none text-slate-900"
                  placeholder="Enter blog name"
                />
              </div>
            </div>

            <div className="w-full sm:w-2/6">
              <button
                onClick={localNextStep}
                className={`w-full sm:w-40 rounded-lg py-2 px-4 ${btn_color} text-white font-medium transition-colors`}
                disabled={isNextDisabled}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainPanel>
  );
};
