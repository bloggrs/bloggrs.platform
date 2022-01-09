import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { blogsService } from '../../../../services/blogs.service';

export const BlogCreationStatus = ({ parentData }: any) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    alert(JSON.stringify(parentData));
    const {
      '/blog-category': BlogCategoryId,
      '/blog-logo': logo_url,
      '/blog-name': name,
    } = parentData;
    blogsService
      .createBlog({
        BlogCategoryId,
        logo_url: logo_url.slice(0, 100),
        name,
        description: '',
      })
      .then(blog => {
        window.location.href = window.location.origin + '/blogs/' + blog.id;
      });
  }, []);
  return (
    <>
      <h1>Let's bring your ideas to life</h1>
    </>
  );
};
