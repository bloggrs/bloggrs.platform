import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

interface CustomCSSProps {
  value: string;
  onChange: (css: string) => void;
  isEnabled?: boolean;
}

export const CustomCSS: React.FC<CustomCSSProps> = ({
  value,
  onChange,
  isEnabled = true
}) => {
  const [isValid, setIsValid] = useState(true);

  const validateCSS = (css: string) => {
    try {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
      document.head.removeChild(style);
      setIsValid(true);
      return true;
    } catch (e) {
      setIsValid(false);
      return false;
    }
  };

  const handleChange = (css: string | undefined) => {
    if (!css) return;
    if (validateCSS(css)) {
      onChange(css);
    }
  };

  return (
    <div className="space-y-4 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Custom CSS</h3>
        <div className="flex items-center space-x-3">
          <span className={`text-sm font-medium ${isValid ? 'text-green-500' : 'text-red-500'}`}>
            {isValid ? 'Valid CSS' : 'Invalid CSS'}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isEnabled}
              className="sr-only peer"
              onChange={(e) => onChange(e.target.checked ? value : '')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1a365d] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1a365d]"></div>
          </label>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Editor
          height="300px"
          defaultLanguage="css"
          value={value}
          onChange={handleChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
          }}
          theme="vs-dark"
        />
      </div>
    </div>
  );
}; 