import React from 'react';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

export const MainPanel = ({
  children,
  className,
  sidebarProps,
  id,
  style,
}: any) => {
  return (
    <>
      <Header />
      <Sidebar {...(sidebarProps || {})} />
      <br />
      <div style={style} id={id} className={className || 'container'}>
        {children}
      </div>
    </>
  );
};
