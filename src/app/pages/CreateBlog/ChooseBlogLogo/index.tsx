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
      <div
        className="min-h-[80vh] bg-gray-50 px-4 py-8"
        style={{ marginTop: '1%' }}
      >
        <div className="mx-auto max-w-3xl">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose your blog logo
          </h1>
          <p className="mt-2 text-center text-lg leading-8 text-gray-600">
            Upload an image that represents your blog's identity
          </p>

          <div className="mt-10 rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-900/5">
            <div className="mx-auto max-w-xl">
              <div className="group relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <img
                    className="mx-auto h-12 w-12 text-gray-300"
                    src="/dist/static/icons8-upload-100.png"
                    style={{ opacity: src ? 1 : 0.5 }}
                    alt="Upload icon"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <FileInput
                      onChange={onChange}
                      value={value}
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    />
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>

              {src && (
                <div className="mt-6">
                  <div className="rounded-lg border border-gray-200 p-2">
                    <img
                      src={src}
                      alt="Preview"
                      className="mx-auto max-h-48 object-contain"
                    />
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  disabled={!src}
                  onClick={next}
                  className="rounded-md bg-yellow-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPanel>
  );
};
