import { MainPanel } from 'app/components/MainPanel';
import * as React from 'react';

export const InformationalStep1 = ({ nextStep }) => {
  return (
    <>
      <MainPanel
        className="container max-h-full max-w-7xl py-9 px-12"
        sidebarProps={{ collapse: true }}
      >
        <div className="px-2">
          <div className="flex">
            <div className="w-full w-6/6 lg:w-6/6 px-2">
              <h1 className="text-center font-bold text-5xl text-slate-700">
                Let's bring your ideas to life.
              </h1>
              <h2 className="my-10 text-center font-medium text-2xl text-slate-600">
                Answer some questions to get the best tools for what
                <br /> you're creating.
              </h2>
              <div className="text-center">
                <button
                  onClick={nextStep}
                  className="  w-40 rounded-md h-12 bg-yellow-500 text-white font-medium"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </MainPanel>
    </>
  );
};
