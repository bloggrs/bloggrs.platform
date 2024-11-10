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
    sidebarProps.style.background = '#1a365d';
  }

  return (
    <div className="min-h-screen flex bg-gray-50" style={{ marginTop: '3%' }}>
      <Header />
      {hideSidebar ? null : <Sidebar {...(sidebarProps || {})} />}
      <div
        style={{ ...style }}
        id={id}
        className={`flex-1 p-8 ${className || ''}`}
      >
        {children}
      </div>
    </div>
  );
};
