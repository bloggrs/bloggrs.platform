import { MainPanel } from 'app/components/MainPanel';
import { PostContentEditor } from 'app/components/PostContentEditor';
import { useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Helmet } from 'react-helmet-async';
import ContentEditable from 'react-contenteditable';
import { blogsService } from 'services/blogs.service';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export const CreatePost = ({ match }) => {
  const history = useHistory();
  const titleContentEditableRef = useRef();
  const [title, setTitle] = useState(
    '15 bloggers share their advice for successful blogging',
  );
  const [editorState, setEditorState] = useState('');
  const onSubmit = async e => {
    e.preventDefault();
    const { blog_id: BlogId } = match.params;
    const args = {
      title,
      html_content: 'editorState',
      BlogId,
    };
    try {
      const post = await blogsService.createBlogPost(args);
      toast.success('Successfully published post!');
      history.push('/blogs/' + BlogId + '/posts/' + post.id);
    } catch (err) {
      toast.error('Failed to publish post!');
    }
  };
  return (
    <MainPanel className="px-52 py-12">
      <>
        <Helmet>
          <script
            src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js"
            defer
          ></script>
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css"
            rel="stylesheet"
          />
        </Helmet>
        <div className="flex -mx-2">
          <div className="w-full w-6/6 lg:w-6/6 px-2">
            <div className="flex w-6/6">
              <div className="w-11/12">
                <button
                  onClick={e => history.goBack()}
                  className=" btn-base w-32 h-8 text-sm bg-slate-600 border-2 border-slate-600 text-white rounded-full justify-center text-center"
                >
                  <span className>Back</span>
                </button>
                <button
                  onClick={onSubmit}
                  style={{
                    marginLeft: '74em',
                  }}
                  className="m-0 right btn-base w-32 h-8 text-sm bg-transparent border-2 border-slate-600 text-slate-600 rounded-full justify-center text-center"
                >
                  <span className>Publish</span>
                </button>
              </div>
            </div>
            <h1
              editable={true}
              className="text-3xl text-slate-700 font-medium py-5"
            >
              <ContentEditable
                innerRef={titleContentEditableRef}
                html={title} // innerHTML of the editable div
                disabled={false} // use true to disable editing
                onChange={evt => {
                  setTitle(evt.target.value);
                }} // handle innerHTML change
                tagName="span" // Use a custom HTML tag (uses a div by default)
              />
            </h1>
            <div className="flex flex-inline">
              <div className=" w-11/12">
                <PostContentEditor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                />
              </div>
              <div className="cursor-pointer w-42 absolute right-10 top-14 my-16 align-right flex">
                <span className="font-medium text-slate-700">Menu</span>
                <div className="">
                  <img
                    className="w-10 h-2 mx-3"
                    src="/dist/static/MenuLine.png"
                  />
                  <img
                    className="w-8 h-2 mx-5"
                    src="/dist/static/MenuLine.png"
                  />
                  <img
                    className="w-8 h-2 mx-5"
                    src="/dist/static/MenuLine.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MainPanel>
  );
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
