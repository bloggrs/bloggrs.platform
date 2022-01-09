import * as React from 'react';
import { useState, useEffect } from 'react';

export const ChooseBlogName = ({ parentValue, sendValueToParent }) => {
  return (
    <>
      <h1>Enter blog name</h1>
      <input
        type="text"
        value={parentValue}
        onChange={e => sendValueToParent(e.target.value)}
        autoFocus={true}
      />
    </>
  );
};
