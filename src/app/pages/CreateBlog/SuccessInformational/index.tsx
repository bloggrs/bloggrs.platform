import QueryString from 'qs';
import React from 'react';
import { Link } from 'react-router-dom';
import { MainPanel } from '../../../components/MainPanel';

export const SuccessInformational = ({ parentData }: any) => {
  return (
    <MainPanel
      sidebarProps={{ collapse: true }}
      className="container max-h-full max-w-7xl py-6 md:py-9 px-4 md:px-12"
    >
      <div className="flex flex-col items-center">
        <h1 className="text-center font-normal text-3xl md:text-5xl text-slate-700 mb-8 md:mb-12">
          DataAddict's Blog is all set up!
        </h1>

        <div className="w-full max-w-2xl px-4">
          <img
            src="/dist/static/hugo-chatbot-1.png"
            className="w-full h-auto rounded-lg shadow-md mb-8"
            alt="Blog setup complete"
          />

          <div className="flex justify-center">
            <button
              onClick={() =>
                (window.location.href =
                  window.location.origin +
                  `/blogs/${parentData['/setup-status'].id}`)
              }
              className="transition-all duration-200 py-3 px-8 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-full shadow-md hover:shadow-lg"
            >
              Manage Blog
            </button>
          </div>
        </div>
      </div>
    </MainPanel>
  );
};
