import QueryString from 'qs';
import React from 'react';
import { Link } from 'react-router-dom';
import { MainPanel } from '../../../components/MainPanel';

export const SuccessInformational = ({ parentData }: any) => {
  console.log({ parentData });
  return (
    <MainPanel
      sidebarProps={{ collapse: true }}
      className="container max-h-full max-w-7xl py-9 px-12"
    >
      <div className="px-2">
        <div className="flex -mx-2">
          <div className="w-full w-6/6 lg:w-6/6 px-2">
            <h1 className="text-center font-normal text-5xl text-slate-700">
              DataAddict's Blog is all set up!
            </h1>
            <div className="my-20 container w-3/6 lg:w-6/6 px-2">
              <div className="flex flex-inline">
                <div className="w-6/6">
                  <div>
                    <img
                      src="/dist/static/hugo-chatbot-1.png"
                      className="py-2"
                    />
                    <div
                      onClick={() =>
                        (window.location.href =
                          window.location.origin +
                          `/blogs/${parentData['/setup-status'].id}`)
                      }
                      style={{ marginLeft: '11em' }}
                    >
                      <button className=" font-bold py-2 px-4 w-64 bg-orange-400 text-white font-normal rounded-full">
                        Manage Blog
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPanel>
  );
};
