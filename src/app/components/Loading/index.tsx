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
      width: 'clamp(40px, 8vw, 75px)',
      filter:
        'invert(31%) sepia(93%) saturate(1111%) hue-rotate(182deg) brightness(91%) contrast(101%)',
    },
    src: '/spinner.svg',
    center: true,
  };
  const props =
    Object.keys(props_).filter(k => k !== 'forModal').length > 0
      ? { ...default_props, ...props_ }
      : default_props;
  const Comp = (
    <img
      alt="Loading..."
      src={props.src}
      className={props.className}
      style={props.style}
    />
  );
  if (props.center) return <Center {...props_}>{Comp}</Center>;
  return Comp;
};
