import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const CreatePost = () => {
  const [editorState, setEditorState] = useState('');
  const [title, setTitle] = useState('');
  const onSubmit = e => {
    e.preventDefault();
  };
  return (
    <>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={onSubmit}>Publish</button>
      <br />
      <hr />
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setEditorState}
      />
    </>
  );
};
