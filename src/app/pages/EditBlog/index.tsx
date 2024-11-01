import { NotAuthorized } from 'app/components/NotAuthorized';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { blogsService } from 'services/blogs.service';
import { Editor } from '@tinymce/tinymce-react';
import { strapiService } from '../../../services/strapi.service';

interface EditBlogProps {
  initialData?: any;  // Add proper type instead of any
  onSave?: (updatedConfig: any) => Promise<void>;
  onCancel?: () => void;
}

export const EditBlog = ({ initialData, onSave, onCancel }: EditBlogProps) => {
  const match: any = useRouteMatch();
  const { blog_id } = match.params;

  const [blog, setBlog]: any = useState(initialData || null);
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

  const handleEditorChange = (content: string) => {
    if (onSave) {
      onSave({ ...blog, content });
    }
  };

  if (!isAuthorized) return <NotAuthorized />;
  if (!blog) return null;

  return (
    <div className="p-4 ml-60">
      <div className="mb-4">
        <select
          className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:border-blue-500"
          onChange={e => setPageId(e.target.value)}
          value={pageId}
        >
          <option value="index">Main</option>
          {blog.pages?.map(page => (
            <option key={page.id} value={page.id}>
              {page.name}
            </option>
          ))}
        </select>
      </div>
      
      <Editor
        initialValue={blog.content}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};
