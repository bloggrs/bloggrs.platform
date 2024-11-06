'use client'

import React, { useState } from 'react'
import { ClipboardCopy, X, Check } from 'lucide-react'

interface ToastProps {
  message: string
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 flex items-center bg-white rounded-lg shadow-lg border border-gray-100 p-4 animate-slide-down">
    <Check className="w-5 h-5 text-green-500 mr-2" />
    <span className="text-gray-700">{message}</span>
    <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">
      <X className="w-4 h-4" />
    </button>
  </div>
)

export const EditBlog = () => {
  const [showToast, setShowToast] = useState(false)

  const sqlCode = `-- Table to store JavaScript files
CREATE TABLE js_files (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store JavaScript code blocks
CREATE TABLE js_code_blocks (
    id SERIAL PRIMARY KEY,
    file_id INTEGER REFERENCES js_files(id) ON DELETE CASCADE,
    block_type VARCHAR(50) NOT NULL, -- e.g., 'function', 'class', 'variable', 'import', 'export'
    block_name VARCHAR(255),
    content TEXT NOT NULL,
    start_line INTEGER NOT NULL,
    end_line INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store function parameters
CREATE TABLE js_function_params (
    id SERIAL PRIMARY KEY,
    code_block_id INTEGER REFERENCES js_code_blocks(id) ON DELETE CASCADE,
    param_name VARCHAR(255) NOT NULL,
    param_type VARCHAR(50),
    default_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store class properties
CREATE TABLE js_class_properties (
    id SERIAL PRIMARY KEY,
    code_block_id INTEGER REFERENCES js_code_blocks(id) ON DELETE CASCADE,
    property_name VARCHAR(255) NOT NULL,
    property_type VARCHAR(50),
    is_static BOOLEAN DEFAULT FALSE,
    visibility VARCHAR(20) DEFAULT 'public', -- 'public', 'private', 'protected'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store class methods
CREATE TABLE js_class_methods (
    id SERIAL PRIMARY KEY,
    code_block_id INTEGER REFERENCES js_code_blocks(id) ON DELETE CASCADE,
    method_name VARCHAR(255) NOT NULL,
    is_static BOOLEAN DEFAULT FALSE,
    visibility VARCHAR(20) DEFAULT 'public', -- 'public', 'private', 'protected'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store variable declarations
CREATE TABLE js_variables (
    id SERIAL PRIMARY KEY,
    code_block_id INTEGER REFERENCES js_code_blocks(id) ON DELETE CASCADE,
    variable_name VARCHAR(255) NOT NULL,
    variable_type VARCHAR(50),
    is_const BOOLEAN DEFAULT FALSE,
    initial_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store import statements
CREATE TABLE js_imports (
    id SERIAL PRIMARY KEY,
    file_id INTEGER REFERENCES js_files(id) ON DELETE CASCADE,
    import_source VARCHAR(255) NOT NULL,
    import_type VARCHAR(50) NOT NULL, -- 'default', 'named', 'namespace', 'side-effect'
    imported_name VARCHAR(255),
    alias VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store export statements
CREATE TABLE js_exports (
    id SERIAL PRIMARY KEY,
    file_id INTEGER REFERENCES js_files(id) ON DELETE CASCADE,
    export_type VARCHAR(50) NOT NULL, -- 'default', 'named'
    exported_name VARCHAR(255),
    alias VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store comments
CREATE TABLE js_comments (
    id SERIAL PRIMARY KEY,
    code_block_id INTEGER REFERENCES js_code_blocks(id) ON DELETE CASCADE,
    comment_type VARCHAR(20) NOT NULL, -- 'inline', 'block', 'jsdoc'
    content TEXT NOT NULL,
    start_line INTEGER NOT NULL,
    end_line INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store dependencies
CREATE TABLE js_dependencies (
    id SERIAL PRIMARY KEY,
    file_id INTEGER REFERENCES js_files(id) ON DELETE CASCADE,
    dependency_name VARCHAR(255) NOT NULL,
    version VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlCode).then(() => {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {showToast && (
        <Toast message="Code copied to clipboard!" onClose={() => setShowToast(false)} />
      )}
      
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="flex items-center justify-between p-4 bg-[#1a365d] text-white">
            <h2 className="text-xl font-semibold">SQL Schema</h2>
            <button
              onClick={copyToClipboard}
              className="flex items-center bg-[#f4a261] hover:bg-[#e76f51] text-white px-4 py-2 rounded-md transition-colors duration-200"
              aria-label="Copy SQL code to clipboard"
            >
              <ClipboardCopy className="w-4 h-4 mr-2" />
              Copy Code
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <pre className="p-4 text-sm leading-relaxed">
              <code className="font-mono">
                {sqlCode.split('\n').map((line, index) => (
                  <div key={index} className="flex">
                    <span className="select-none text-gray-400 w-12 pr-4 text-right border-r border-gray-200 mr-4">
                      {index + 1}
                    </span>
                    <span className={`
                      ${line.trim().startsWith('--') ? 'text-green-600' : ''}
                      ${line.includes('CREATE TABLE') ? 'text-[#1a365d] font-bold' : ''}
                      ${line.includes('PRIMARY KEY') || line.includes('REFERENCES') ? 'text-[#2a4365]' : ''}
                      ${line.includes('VARCHAR') || line.includes('TEXT') || line.includes('TIMESTAMP') || line.includes('BOOLEAN') || line.includes('INTEGER') ? 'text-[#f4a261]' : ''}
                    `}>
                      {line}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}