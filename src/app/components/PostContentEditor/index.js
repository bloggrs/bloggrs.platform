import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import { createReactEditorJS } from 'react-editor-js';

import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
import { API_URL } from 'config';

// Add custom styles configuration for EditorJS
const EDITOR_THEME = {
  holder: 'editorjs-container',
  tools: {
    header: {
      config: {
        levels: [2, 3],
        defaultLevel: 2,
      },
    },
  },
};

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: `${API_URL}/api/v1/files/upload`,
        byUrl: `${API_URL}/api/v1/files/url`,
      },
    },
  },
  raw: Raw,
  header: {
    class: Header,
    config: {
      placeholder: 'Enter a header',
      levels: [2, 3],
      defaultLevel: 2,
    },
  },
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};

const ReactEditorJS = createReactEditorJS({
  readOnly: true,
  minHeight: 0,
});

export const PostContentEditor = ({ onInitialize, defaultValue }) => {
  const editorCore = React.useRef(null);

  const handleInitialize = React.useCallback(instance => {
    editorCore.current = instance;
    editorCore.current.readOnly = true;
    console.log({ editorCore });
    if (onInitialize) onInitialize(editorCore);
  }, []);

  const handleSave = React.useCallback(async () => {
    const savedData = await editorCore.current.save();
    console.log({ savedData });
  }, []);

  return (
    <div className="editor-wrapper">
      <ReactEditorJS
        onInitialize={handleInitialize}
        tools={EDITOR_JS_TOOLS}
        defaultValue={defaultValue}
        holder="editorjs-container"
        className="bloggrs-editor"
      />
      <style jsx global>{`
        .editor-wrapper {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          margin: 10px 0;
        }
        .bloggrs-editor {
          max-width: 100%;
          min-height: 100px;
        }

        .ce-block__content {
          max-width: 100%;
          padding: 0 20px;
        }

        .ce-toolbar__content {
          max-width: calc(100% - 50px);
        }

        /* Match the theme colors */
        .ce-block--selected .ce-block__content {
          background: #f8f9fa;
        }

        .codex-editor__redactor {
          padding-bottom: 100px !important;
        }
      `}</style>
    </div>
  );
};
