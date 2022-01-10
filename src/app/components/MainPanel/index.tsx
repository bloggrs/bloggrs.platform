import React from 'react';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

export const MainPanel = ({ children, className, sidebarProps }: any) => {
  return (
    <>
      <Header />
      <Sidebar {...(sidebarProps || {})} />
      <br />
      <div className={className || 'container'}>{children}</div>
    </>
  );
};
