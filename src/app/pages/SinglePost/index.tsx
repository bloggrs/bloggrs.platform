import { UploadFile } from 'app/components/UploadFile';
import React, { useState } from 'react';
import { PostContentEditor } from '../../components/PostContentEditor';
import { SelectCategories } from './Features/SelectCategories';
import { SelectTags } from './Features/SelectTags';
import { SelectStatus } from './SelectStatus';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { SaveButton } from './Features/SaveButton';

const SinglePost = props => {
  const [editorState, setEditorState]: any = useState(null);
  const [status, setStatus]: [
    'NONE' | 'ARCHIVE' | 'DRAFT' | 'PUBLISHED',
    Function,
  ] = useState('NONE');
  const [thumbnail, setThumbnail]: any = React.useState(undefined);
  const [thumbnailFile, setThumbnailFile]: any = React.useState(undefined);

  const [categories, setCategories]: any = React.useState([]);
  const [tags, setTags]: any = React.useState([]);
  console.log('OKI', { status, categories, tags, thumbnail, thumbnailFile });
  const getData = async e => {
    e.preventDefault();
    console.log(await editorState.save());
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    return {
      status,
      categories,
      tags,
      thumbnail,
      thumbnailFile,
      markup,
    };
  };
  return (
    <div className="row" style={{ marginRight: '-1vw' }}>
      <div className="col-md-9">
        <PostContentEditor
          defaultValue={{
            time: 1654197988988,
            blocks: [
              {
                id: 'sheNwCUP5A',
                type: 'header',
                data: { text: 'Editor.js', level: 2 },
              },
              {
                id: '12iM3lqzcm',
                type: 'paragraph',
                data: {
                  text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.',
                },
              },
              {
                id: 'fvZGuFXHmK',
                type: 'header',
                data: { text: 'Key features', level: 3 },
              },
              {
                id: 'xnPuiC9Z8M',
                type: 'list',
                data: {
                  style: 'unordered',
                  items: [
                    'It is a block-styled editor',
                    'It returns clean data output in JSON',
                    'Designed to be extendable and pluggable with a simple API',
                  ],
                },
              },
              {
                id: '-MhwnSs3Dw',
                type: 'header',
                data: {
                  text: 'What does it mean «block-styled editor»',
                  level: 3,
                },
              },
              {
                id: 'Ptb9oEioJn',
                type: 'paragraph',
                data: {
                  text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
                },
              },
              {
                id: '-J7nt-Ksnw',
                type: 'paragraph',
                data: {
                  text: 'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.',
                },
              },
              {
                id: 'SzwhuyoFq6',
                type: 'header',
                data: { text: 'What does it mean clean data output', level: 3 },
              },
              {
                id: 'x_p-xddPzV',
                type: 'paragraph',
                data: {
                  text: 'Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below',
                },
              },
              {
                id: '6W5e6lkub-',
                type: 'paragraph',
                data: {
                  text: 'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.',
                },
              },
              {
                id: 'eD2kuEfvgm',
                type: 'paragraph',
                data: {
                  text: 'Clean data is useful to sanitize, validate and process on the backend.',
                },
              },
              { id: 'N8bOHTfUCN', type: 'delimiter', data: {} },
              {
                id: 'IpKh1dMyC6',
                type: 'paragraph',
                data: {
                  text: "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
                },
              },
              {
                id: 'FF1iyF3VwN',
                type: 'image',
                data: {
                  file: {
                    url: 'https://codex.so/public/app/img/external/codex2x.png',
                  },
                  caption: '',
                  withBorder: false,
                  stretched: false,
                  withBackground: false,
                },
              },
            ],
            version: '2.23.2',
          }}
          onInitialize={value => {
            setEditorState(value.current);
            // console.log({ value });
            // setEditorState(value.toString('html'));
          }}
        />
      </div>
      <div
        className="col-md-3"
        style={{
          margin: 0,
          padding: 0,
          marginLeft: 'auto',
        }}
      >
        <div
          className="card posts-rightbar"
          style={{
            height: '95vh',
            position: 'fixed',
          }}
        >
          <div className="card-body">
            <div
              className="button-items"
              style={{ display: 'inline-grid', width: '100%' }}
            >
              <SaveButton
                status={status}
                categories={categories}
                tags={tags}
                thumbnailFile={thumbnailFile}
                editorState={editorState}
              />
              <button
                type="button"
                style={{ width: '100%' }}
                className="btn btn-outline-secondary"
              >
                Preview
              </button>
              <SelectStatus initialValue={status} onChange={setStatus} />
              <div>
                <label className="mt-2 col form-label mb-lg-0 text-end">
                  Thumbnail:{' '}
                </label>
                <UploadFile
                  className="card-body m-auto"
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  onChange={({ file, fileSource }) => {
                    setThumbnail(fileSource);
                    setThumbnailFile(file);
                  }}
                />
              </div>
            </div>
            <hr />
            <SelectCategories
              initialValue={categories}
              onChange={setCategories}
            />
            <SelectTags initialValue={tags} onChange={setTags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { SinglePost };
