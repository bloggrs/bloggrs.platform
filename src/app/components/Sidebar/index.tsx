import * as React from 'react';
import styled from 'styled-components';

const CenteredImage = styled.img`
  margin-left: auto;
  margin-right: auto;
`;
export const Sidebar = ({ collapse }) => {
  if (collapse)
    return (
      <div className="absolute h-screen max-h-screen max-w-10 w-5 py-5 bg-slate-700" />
    );
  return (
    <div
      className={
        'fixed h-screen max-h-screen max-w-52 w-24 py-5 bg-slate-700 center-items'
      }
    >
      <CenteredImage
        className="py-3 cursor-pointer"
        src="/dist/static/sidebar/icons8-dashboard-80.png"
      />
      <CenteredImage
        className="py-3 cursor-pointer"
        src="/dist/static/sidebar/icons8-page-80.png"
      />
      <CenteredImage
        className="py-3 cursor-pointer"
        src="/dist/static/sidebar/icons8-chat-bubble-80.png"
      />
      <CenteredImage
        className="py-3 cursor-pointer"
        src="/dist/static/sidebar/icons8-team-80.png"
      />
      <CenteredImage
        className="py-3 cursor-pointer"
        src="/dist/static/sidebar/icons8-settings-80.png"
      />
      <div className="fixed bottom-0 bg-white h-24 py-5 w-24 bg-slate-900">
        <div className="cursor-pointer align-middle w-14 h-14 m-auto py-4 mx-5 rounded-full bg-slate-700 text-center ">
          <span className="py-4 font-medium text-white">GK</span>
        </div>
      </div>
    </div>
  );
};
