import { MainPanel } from 'app/components/MainPanel';
import * as React from 'react';
import { useState } from 'react';
import { Search } from 'lucide-react';

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

  return (
    <MainPanel
      sidebarProps={{ collapse: true }}
      className="container max-h-full max-w-7xl p-4 md:py-9 md:px-12"
    >
      <div className="w-full" style={{marginTop: "7%"}}>
        <h1 className="text-center font-semibold text-3xl md:text-4xl text-gray-900">
          Enter the name of your blog
        </h1>

        <div className="mt-16 md:mt-24 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-4/6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="block w-full rounded-lg border-0 py-3 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1a365d] sm:text-sm sm:leading-6"
                  placeholder="Enter blog name"
                />
              </div>
            </div>

            <div className="w-full sm:w-2/6">
              <button
                onClick={localNextStep}
                className={`w-full sm:w-40 rounded-lg py-3 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 ${
                  isNextDisabled
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-[#1a365d] hover:bg-[#2d4a7c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a365d]'
                }`}
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
