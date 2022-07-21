import { API_URL } from 'config';
import { useMediasSlice } from 'features/medias';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import fetch from 'services/fetch';

const UploadButton = ({}) => {
  const [file, setFile]: any = React.useState(undefined);
  const [fileSource, setFileSource]: any = React.useState(undefined);

  const inputRef: any = useRef();
  const dispatch = useDispatch();
  const { actions } = useMediasSlice();

  return (
    <>
      <button
        onClick={e => inputRef.current?.click()}
        type="button"
        className="btn btn-outline-warning btn-sm color-logo-orange"
        style={{ marginRight: 'auto' }}
      >
        Upload
      </button>
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        id="input-file-now-custom-2"
        className="dropify"
        data-height={500}
        onChange={async (event: any) => {
          const file = event.target.files[0];
          const formData = new FormData()
          console.log({ file });
          formData.append('image', file)

          const res = await window.fetch(API_URL + "/api/v1/files/upload", {
            // headers: {
            //   "content-type": "multipart/form-data"
            // },
            headers: {
              "x-bloggrs-id": localStorage.getItem('__bloggrs__::select_blog_id'),
            },
            method: "POST",
            body: formData,
          } as any)
          const data = await res.json();
          const { media } = data.data;
          dispatch(actions.addMedia(media));
        }}
      />

    </>
  );
};

export { UploadButton };
