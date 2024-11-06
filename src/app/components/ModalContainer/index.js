import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export function ModalContainer({ setOpen, data, setData }) {
  const [localData, setLocalData] = useState(data);
  const { clicks } = localData;

  function close() {
    setOpen(false);
  }

  function submit() {
    setData({
      clicks,
    });
    close();
  }

  return ReactDOM.createPortal(
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-70 z-40"
        onClick={close} 
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-lg shadow-lg z-50 flex flex-col max-h-[90vh] sm:max-h-[80vh]">
        <div className="bg-[#1a365d] text-white px-5 py-4 rounded-t-lg font-medium">
          Edit Clicks
        </div>
        <div className="overflow-auto min-h-[200px] px-10 pb-20">
          <p className="mb-4">
            Edit the clicks below by clicking on the number input or typing in your own value.
          </p>
          <label className="flex items-center">
            Clicks
            <input
              value={clicks}
              type="number"
              onChange={e => setLocalData({ clicks: e.target.value })}
              className="ml-4 w-[200px] px-3 py-2 border border-gray-200 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
            />
          </label>
        </div>
        <div className="border-t shadow-lg flex justify-center h-[60px]">
          <button
            onClick={submit}
            className="m-2.5 px-5 h-10 min-w-[120px] bg-[#1a365d] hover:bg-[#2a5494] text-white rounded-lg transition-colors flex items-center justify-center"
          >
            Submit
          </button>
        </div>
      </div>
    </>,
    document.getElementById('app-modal'),
  );
}
