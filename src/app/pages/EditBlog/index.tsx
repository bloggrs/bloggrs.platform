import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { blogsService } from 'services/blogs.service';

export const EditBlog = () => {
  const match: any = useRouteMatch();
  const { blog_id } = match.params;

  const [blog, setBlog]: any = useState(null);
  const [pageId, setPageId]: any = useState('index');

  useEffect(() => {
    blogsService.getBlog(blog_id).then(setBlog);
  }, []);

  if (!blog) return null;
  const { public_key } = blog;

  return (
    <>
      <div
        className=""
        style={{
          marginLeft: '15rem',
          paddingBottom: '1rem',
        }}
      >
        <select
          className="paging-select"
          onChange={e => setPageId(e.target.value)}
          value={pageId}
        >
          <option value="index">Main</option>
          {blog.pages.map(page => (
            <option value={page.id}>{page.name}</option>
          ))}
        </select>
      </div>
      <iframe
        style={{
          position: 'absolute',
          left: '11rem',
          width: "80vw"
        }}
        className="h-screen border-2 border-dashed border-slate-700 p-5"
        src={
          `${process.env.REACT_APP_HOSTED_CRAFT_JS_URL}/blogs/edit/` +
          public_key +
          `/${pageId}`
        }
      />
    </>
  );
};
