import { MainPanel } from 'app/components/MainPanel';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { blogsService } from '../../../../services/blogs.service';

export const BlogCreationStatus = ({
  sendValueToParent,
  parentData,
  nextStep,
  onSuccess,
}: any) => {
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const { username } = parentData['/choose-url'];

  useEffect(() => {
    const { name, description, thumbnail } = parentData['/'];
    const BlogCategory = parentData['/blog-category'];
    const BlogThemeId = parentData['/choose-theme'];
    const { username } = parentData['/choose-url'];
    const data = {
      name,
      description,
      thumbnail,
      BlogCategory,
      BlogThemeId,
      username,
    };
    blogsService.createBlog(data).then(blog => {
      onSuccess(blog);
      // sendValueToParent(blog);
      // nextStep();
    });
  }, []);
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h6>Setting up {username}.gjergjkadriu.com</h6>
      </div>
    </>
  );
};
