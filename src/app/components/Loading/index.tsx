import React from 'react';

export const Center = ({ children, forModal }) => {
  return (
    <div
      style={{
        position: forModal ? undefined : 'absolute',
        height: forModal ? '100%' : '100vh',
        width: forModal ? '100%' : '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
};

export const Loading = props_ => {
  const default_props = {
    className: '',
    style: {
      width: 75,
    },
    src: '/waiting-icon-gif-1.jpeg',
    center: true,
  };
  const props =
    Object.keys(props_).filter(k => k !== 'forModal').length > 0
      ? props_
      : default_props;
  const Comp = (
    <img src={props.src} className={props.className} style={props.style} />
  );
  if (props.center) return <Center {...props_}>{Comp}</Center>;
  return Comp;
};
