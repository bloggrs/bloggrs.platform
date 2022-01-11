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
    <>
      <MainPanel
        sidebarProps={{ collapse: true }}
        className="container max-h-full max-w-7xl py-9 px-12"
      >
        <div className="px-2">
          <div className="flex -mx-2">
            <div className="w-full w-6/6 lg:w-6/6 px-2">
              <h1 className="text-center font-bold text-5xl text-slate-700">
                Enter the name of your blog
              </h1>
              <div className="my-20 container w-3/6 lg:w-6/6 px-2">
                <div className="flex flex-inline">
                  <div className="w-4/6">
                    <div className="flex flex-inline">
                      <img
                        src="/dist/static/icons8-search-48.png"
                        className="py-2"
                      />
                      <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mx-5 bg-transparent w-full outline-none text-slate-900"
                        placeholder="Enter blog name"
                      />
                    </div>
                    <hr className="h-1 border-1 bg-slate-800" />
                  </div>
                  <div className="w-2/6">
                    <button
                      onClick={localNextStep}
                      className={` w-40 rounded-md h-10 mx-10 ${btn_color} text-white font-medium`}
                    >
                      Next
                    </button>
                  </div>
                </div>
                {/* <div class="flex flex-inline">
                <div class="w-4/6 bg-white overflow-y-scroll h-60 scrollbar-rounded scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-orange-100 h-32 overflow-y-scroll">
                  <p class="mx-10 my-2 text-blue-500">Travel</p>
                  <p class="mx-10 my-2 text-slate-500">Travel blog</p>
                  <p class="mx-10 my-2 text-slate-500">Travel tickets store</p>
                  <p class="mx-10 my-2 text-slate-500">Travel tickets subscriptions</p>
                  <p class="mx-10 my-2 text-slate-500">Online Travel Show</p>
                  <p class="mx-10 my-2 text-slate-500">Travel blog</p>
                  <p class="mx-10 my-2 text-slate-500">Travel tickets store</p>
                  <p class="mx-10 my-2 text-slate-500">Travel tickets subscriptions</p>
                  <p class="mx-10 my-2 text-slate-500">Online Travel Show</p>
                  <p class="mx-10 my-2 text-slate-500">Travel blog</p>
                  <p class="mx-10 my-2 text-slate-500">Travel tickets store</p>
                  <p class="mx-10 my-2 text-slate-500">Travel tickets subscriptions</p>
                  <p class="mx-10 my-2 text-slate-500">Online Travel Show</p>
                  <p class="mx-10 my-2 text-slate-500">Travel accessories</p>
                  <p class="mx-10 my-2 text-slate-500">Online Travel Accessories Shop</p>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </MainPanel>
    </>
  );
};
