import React, { Component, PropTypes } from 'react';
import RichTextEditor from 'react-rte';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';

export class PostContentEditor extends Component {
  render() {
    const { editorState, onEditorStateChange } = this.props;
    return (
      <div className="bg-white">
        <RichTextEditor value={editorState} onChange={onEditorStateChange} />
        {/* <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
          editorStyle={{
            backgroundColor: 'white',
          }}
        /> */}
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}
