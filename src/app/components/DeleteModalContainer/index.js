import React from 'react';
import ReactDOM from 'react-dom';

export function ModalContainer({
  close,
  onDelete,
  name = 'Name',
  type = 'category',
}) {
  return ReactDOM.createPortal(
    <>
      {/* Modal Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-70 z-40"
        onClick={close}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-lg shadow-lg z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Delete '{name}' {type}
          </h3>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[200px]">
          <p className="text-gray-700">
            Are you sure you want to delete this {type}?
            <br />
            <br />
            This action cannot be reversed.
          </p>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete
          </button>
          <button
            onClick={close}
            className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </>,
    document.getElementById('app-modal'),
  );
}
