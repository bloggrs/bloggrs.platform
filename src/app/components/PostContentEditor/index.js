import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export class PostContentEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange: Function = editorState => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="bg-white">
        <Editor
          editorState={this.props.editorState || this.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={
            this.props.onEditorStateChange || this.onEditorStateChange
          }
          editorStyle={{
            backgroundColor: 'white',
          }}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}
