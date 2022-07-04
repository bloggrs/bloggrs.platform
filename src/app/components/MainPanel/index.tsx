import React from 'react';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

export const MainPanel = ({
  children,
  className,
  sidebarProps,
  id,
  style,
  hideSidebar,
}: any) => {
  if (!sidebarProps) sidebarProps = {};
  if (!sidebarProps.style) sidebarProps.style = {};
  if (!sidebarProps.style.background) {
    sidebarProps.style.background = '#1C5881 0% 0% no-repeat padding-box';
  }
  return (
    <>
      <Header />
      {hideSidebar ? null : <Sidebar {...(sidebarProps || {})} />}
      <br />
      <div
        style={{
          position: 'absolute',
          maxWidth: '-webkit-fill-available',
          marginLeft: '8vw',
          marginRight: '6vw',
          ...style,
        }}
        id={id}
        className={className || 'container'}
      >
        {children}
      </div>
    </>
  );
};
