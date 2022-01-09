import * as React from 'react';
import { useState, useEffect } from 'react';
import { FileInput } from '../../../components/FileInput';

export const ChooseBlogLogo = ({ sendValueToParent }) => {
  const defaultFile = new File([''], 'default.png');
  const [value, setValue] = useState(defaultFile);
  const [src, setSrc] = useState('');
  const onChange = file => {
    setValue(file);
    console.log(file);
    if (file.type && !file.type.startsWith('image/')) {
      console.log('File is not an image.', file.type, file);
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      const { result } = event.target;
      setSrc(result);
      sendValueToParent(result);
      console.log(result);
    });
    reader.readAsDataURL(file);
  };
  return (
    <>
      <h1>Let's bring your ideas to life {typeof value}</h1>
      <FileInput onChange={onChange} value={value} />
      <img src={src} />
    </>
  );
};
