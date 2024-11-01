import * as React from 'react';
import { useEffect } from 'react';
import { usePostsSlice } from './slice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, isPostsLoading } from './slice/selectors';

export const LatestPostsCard = () => {
  const dispatch = useDispatch();
  const { actions } = usePostsSlice();
  const params: any = useParams();
  const { blog_id } = params;
  const posts = useSelector(getPosts);
  const loading = useSelector(isPostsLoading);
  useEffect(() => {
    dispatch(actions.loadPosts({ id: blog_id, pageSize: 3 }));
  }, []);
  if (loading) return <>'Loading...'</>;
  return (
    <>
      {posts.slice(0, 3).map(post => (
        <div className="grid grid-cols-12 p-5">
          <div className="col-span-4 center-image-inside">
            <img src="http://localhost:3000/coming-soon.png" />
          </div>
          <div className="col-span-8 ml-4 my-1">
            <h2 className="text-lg font-bold ">{post.title}</h2>
            <h2 className="text-lg font-medium text-gray-500 my-2">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    JSON.parse(post.html_content).blocks?.length > 1
                      ? JSON.parse(post.html_content).blocks[1].data.text
                      : 'Nothing to show.',
                }}
              ></div>
            </h2>
          </div>
          <hr />
        </div>
      ))}
    </>
  );
};
