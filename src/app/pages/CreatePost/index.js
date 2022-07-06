import { MainPanel } from 'app/components/MainPanel';
import { PostContentEditor } from 'app/components/PostContentEditor';
import { useEffect, useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Helmet } from 'react-helmet-async';
import ContentEditable from 'react-contenteditable';
import { blogsService } from 'services/blogs.service';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from 'draft-js';
import { Loading } from 'app/components/Loading';
// import RichTextEditor from 'react-rte';

export const CreatePost = ({ match }) => {
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const titleContentEditableRef = useRef();
  const [title, setTitle] = useState(
    '15 bloggers share their advice for successful blogging',
  );
  const [editorState, setEditorState] = useState(null);
  const [blocks, setBlocks] = useState(null);
  const [categoriesQuery, setCategoriesQuery] = useState('');
  const [categories, setCategories] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(async () => {
    const { blog_id } = match.params;
    const categories = await blogsService.getBlogCategories(blog_id);
    setCategories(categories);
  }, [categoriesQuery]);

  const { id } = match.params;
  const createMode = id === 'create';

  useEffect(async () => {
    if (!categories) return;
    const { id } = match.params;
    if (createMode) return setLoading(false);
    const post = await blogsService.getPost(id);
    setTitle(post.title);
    const newSelectedCategories = post.postcategories.map(pc =>
      categories.find(cat => cat.id === pc.CategoryId),
    );
    console.log({
      newSelectedCategories,
      categories,
      postcategories: post.postcategories,
    });
    setSelectedCategories(newSelectedCategories);
    // const blocksFromHTML = convertFromHTML(post.html_content);
    // const content = ContentState.createFromBlockArray(
    //   blocksFromHTML.contentBlocks,
    //   blocksFromHTML.entityMap,
    // );
    // const editorState = await EditorState.createWithContent(content);
    // const blocks = await editorState.current.save();
    const blocks = JSON.parse(post.html_content);
    setBlocks(blocks);
    setLoading(false);
  }, [categories]);

  const onSubmit = async e => {
    e.preventDefault();
    const { blog_id: BlogId, id } = match.params;
    const transform_category = category => ({ id: category.id });
    const categories = selectedCategories.map(transform_category);
    const blocks = await editorState.current.save();
    const html_content = JSON.stringify(blocks);
    const args = {
      id,
      title,
      html_content,
      BlogId,
      categories,
    };
    console.log(args);
    const success_message = createMode
      ? `Successfully published post!`
      : `Successfully updated post!`;
    const fail_message = createMode
      ? `Failed to publish post!`
      : `Failed to update post!`;
    try {
      const fn = createMode
        ? blogsService.createBlogPost
        : blogsService.updateBlogPost;
      const post = await fn(args);
      toast.success(success_message);
      if (createMode) {
        window.location.pathname = '/blogs/' + BlogId + '/posts/' + post.id;
      }
    } catch (err) {
      toast.error(fail_message);
    }
  };

  if (loading || (!blocks && !createMode)) return <Loading />;
  const w_20_h_17_style = {};
  return (
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
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .grid-cols-24 {
              grid-template-columns: repeat(24, minmax(0, 1fr));
            }
            .col-span-13 {
              grid-column: span 13 / span 13;
            }
            .col-span-14 {
              grid-column: span 14 / span 14;
            }
            .col-span-15 {
              grid-column: span 15 / span 15;
            }
            .col-span-16 {
              grid-column: span 16 / span 16;
            }
            .col-span-17 {
              grid-column: span 17 / span 17;
            }
            .col-span-18 {
              grid-column: span 18 / span 18;
            }
            .col-span-19 {
              grid-column: span 19 / span 19;
            }
            .col-span-20 {
              grid-column: span 20 / span 20;
            }
            .col-span-21 {
              grid-column: span 21 / span 21;
            }
            .col-span-22 {
              grid-column: span 22 / span 22;
            }
            .col-span-23 {
              grid-column: span 23 / span 23;
            }
            .col-span-24 {
              grid-column: span 24 / span 24;
            }
          `,
        }}
      />
      <MainPanel>
        <div className="grid grid-cols-24">
          <div
            style={{
              gridColumn: 'span 18 / span 18',
              gridColumnStart: 1,
            }}
            className=" flex"
          >
            <div className="w-full w-6/6 lg:w-6/6 px-2">
              <div className="flex w-6/6">
                <div className="w-11/12">
                  <button
                    onClick={e => history.goBack()}
                    className=" btn-base w-32 h-8 text-sm bg-slate-600 border-2 border-slate-600 text-white rounded-full justify-center text-center"
                  >
                    <span className>Back</span>
                  </button>
                </div>
              </div>
              <h1
                editable={'true'}
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
                    defaultValue={blocks}
                    editorState={editorState}
                    onInitialize={value => {
                      setEditorState(value);
                      // console.log({ value });
                      // setEditorState(value.toString('html'));
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="m-0 right btn-base w-full h-8 text-sm bg-transparent  text-slate-600 justify-center text-center"
            style={{
              gridColumn: 'span 4 / span 4',
              top: '0px',
              minHeight: '100%',
              position: 'fixed',
              width: '25rem',
              right: 0,
              background: 'white',
              zIndex: -1,
            }}
          />
          <div
            style={{
              gridColumn: 'span 4 / span 4',
              minHeight: '100%',
              position: 'fixed',
              width: '25rem',
              right: 0,
            }}
            className="h-screen max-h-screen bg-white border-l-black center-items"
          >
            <div className="p-5">
              <button
                onClick={onSubmit}
                class="m-0 right btn-base w-full h-8 text-sm bg-transparent border-2 border-slate-600 text-slate-600 rounded-full justify-center text-center"
                style={{}}
              >
                <span>{createMode ? 'Publish' : 'Save'}</span>
              </button>
              <br />
              <br />
              <button
                class="m-0 right btn-base w-full h-8 text-sm bg-transparent border-2 border-slate-600 text-slate-600 rounded-full justify-center text-center"
                style={{}}
              >
                <span>Preview</span>
              </button>
              <br />
              <div className="d-flex">
                <h1 className="text-xl text-slate-700 font-medium py-5">
                  <span>Status:</span>
                  <select
                    style={{
                      padding: '5px',
                    }}
                    className="text-md ml-4 border-2 border-slate-300 bg-slate-100 rounded-xl"
                  >
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                </h1>
              </div>
              <hr className="bg-slate-300" />
              <hr className="bg-slate-300" />
              <div
                className="grid grid-cols-12"
                style={{ gridTemplateRows: 'repeat(2, minmax(0, 0.65fr))' }}
              >
                <div className="col-span-4 flex flex-inline flex flex-inline ">
                  <h1 className="col-span-5 text-lg text-slate-700 font-medium py-5">
                    Categories:
                  </h1>
                </div>
                <div
                  className="col-span-7 flex flex-inline flex flex-inline border-4 rounded-xl"
                  style={{ height: 40, marginTop: 25 }}
                >
                  <img
                    src="/dist/static/icons8-search-48.png"
                    className="py-2 ml-1"
                  />
                  <input
                    className="mx-5 bg-transparent w-full outline-none text-slate-900"
                    placeholder="Enter category name"
                    onChange={e => setCategoriesQuery(e.target.value)}
                  />
                </div>
                <div className="col-span-12 my-10">
                  <ul>
                    {categories.map(cat => (
                      <>
                        <input
                          id={`category_${cat.id}`}
                          // value={cat.name}
                          type="checkbox"
                          className="accent-blue-800"
                          style={w_20_h_17_style}
                          checked={selectedCategories.find(
                            scat => scat.id === cat.id,
                          )}
                          onChange={e => {
                            let prevSelectedCategories = selectedCategories;
                            const find_category_rule = pscat =>
                              pscat.id === cat.id;
                            const exists =
                              prevSelectedCategories.find(find_category_rule);
                            const remove = Boolean(exists);
                            if (remove) {
                              const filter_rule = i => !find_category_rule(i);
                              prevSelectedCategories =
                                prevSelectedCategories.filter(filter_rule);
                            } else prevSelectedCategories.push(cat);
                            setSelectedCategories(prevSelectedCategories);
                          }}
                        />
                        <label
                          style={{
                            ...w_20_h_17_style,
                            cursor: 'pointer',
                          }}
                          className="noselect"
                          htmlFor={`category_${cat.id}`}
                        >
                          {cat.name}
                        </label>
                        <br />
                      </>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <div
            id="menu_toggler"
            className="cursor-pointer w-42 absolute right-10 top-14 my-16 align-right flex"
          >
            <span className="font-medium text-slate-700">Menu</span>
            <div className="">
              <img className="w-10 h-2 mx-3" src="/dist/static/MenuLine.png" />
              <img className="w-8 h-2 mx-5" src="/dist/static/MenuLine.png" />
              <img className="w-8 h-2 mx-5" src="/dist/static/MenuLine.png" />
            </div>
          </div> */}
        </div>
      </MainPanel>
    </>
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
