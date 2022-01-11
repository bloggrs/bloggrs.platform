import { MainPanel } from 'app/components/MainPanel';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { FileInput } from '../../../components/FileInput';

export const ChooseBlogLogo = ({ sendValueToParent, nextStep }) => {
  const defaultFile = new File([''], 'default.png');
  const [value, setValue] = useState(defaultFile);
  const [src, setSrc] = useState('');

  const next = () => {
    sendValueToParent(src);
    nextStep();
  };
  const onChange = file => {
    setValue(file);
    console.log(file);
    if (file.type && !file.type.startsWith('image/')) {
      console.log('File is not an image.', file.type, file);
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      const { result } = event.target;
      setSrc(result);
      console.log(result);
    });
    reader.readAsDataURL(file);
  };
  return (
    <MainPanel
      sidebarProps={{ collapse: true }}
      className="container max-h-full max-w-7xl py-9 px-12"
    >
      <div className="px-2">
        <div className="flex -mx-2">
          <div className="w-full w-6/6 lg:w-6/6 px-2">
            <h1 className="text-center font-bold text-5xl text-slate-700">
              Enter the logo of your blog
            </h1>
            <div className="my-20 container w-2/6 lg:w-6/6 px-2 h-250 bg-white ">
              <h1 className="text-center py-3 font-bold text-slate-500 text-2xl">
                Upload File
              </h1>
              <div className="my-32 container center">
                <div className=" w-5/6 lg:w-6/6 px-2 h-44 bg-transparent border-slate-200 border-2 border-dashed">
                  <img
                    className="my-3"
                    src="/dist/static/icons8-upload-100.png"
                    style={{ opacity: src ? 1 : 0.3 }}
                  />
                  <h6 className="my-2">
                    {/* Drag and drop here <br />
                    or <br />
                    <span className='text-blue-500'>browse</span> */}
                    <FileInput onChange={onChange} value={value} />
                  </h6>
                </div>
                <button
                  disabled={!src}
                  onClick={next}
                  className="my-5  w-40 rounded-md h-10 mx-10 border-2 border-yellow-500 text-yellow-500 font-medium"
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
    </MainPanel>
  );
  return (
    <>
      <h1>Let's bring your ideas to life {typeof value}</h1>
      <FileInput onChange={onChange} value={value} />
      <img src={src} />
      <button disabled={!src} onClick={next}>
        Next
      </button>
    </>
  );
};
