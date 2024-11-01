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
    sidebarProps.style.background = '#1B4B6B';
  }

  return (
    <div className="main-layout">
      <Header />
      {hideSidebar ? null : <Sidebar {...(sidebarProps || {})} />}
      <div
        style={{
          marginLeft: hideSidebar ? '0' : '80px',
          padding: '20px',
          minHeight: '100vh',
          backgroundColor: '#F5F7FA',
          ...style,
        }}
        id={id}
        className={`main-content ${className || ''}`}
      >
        {children}
      </div>
    </div>
  );
};
