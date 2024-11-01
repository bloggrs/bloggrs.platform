import { NotAuthorized } from 'app/components/NotAuthorized';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { blogsService } from 'services/blogs.service';
// import { NotAuthorized } from '';
export const EditBlog = () => {
  const match: any = useRouteMatch();
  const { blog_id } = match.params;

  const [blog, setBlog]: any = useState(null);
  const [pageId, setPageId]: any = useState('index');
  const [isAuthorized, setIsAuthorized]: any = useState(true);

  useEffect(() => {
    blogsService
      .getBlog(blog_id)
      .then(setBlog)
      .catch(error => {
        if (error.response?.status === 403) {
          setIsAuthorized(false);
        }
      });
  }, []);

  if (!isAuthorized) return <NotAuthorized />;
  if (!blog) return null;
  const { public_key } = blog;

  return (
    <>
      <div
        className="flex items-center"
        style={{
          marginLeft: '15rem',
          paddingBottom: '1.5rem',
          paddingTop: '1rem',
        }}
      >
        <select
          className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:border-blue-500"
          onChange={e => setPageId(e.target.value)}
          value={pageId}
        >
          <option value="index">Main</option>
          {blog.pages.map(page => (
            <option key={page.id} value={page.id}>
              {page.name}
            </option>
          ))}
        </select>
      </div>
      <iframe
        style={{
          position: 'fixed',
          left: '11rem',
          right: '1rem',
          bottom: '1rem',
          top: '8rem',
          width: 'auto',
          height: 'auto',
        }}
        className="border-2 border-gray-200 rounded-lg shadow-sm"
        src={
          `${process.env.REACT_APP_HOSTED_CRAFT_JS_URL}/blogs/edit/` +
          public_key +
          `/${pageId}`
        }
      />
    </>
  );
};
