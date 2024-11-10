import React from 'react';

export const Center = ({ children, forModal }) => {
  return (
    <div
      className={`
        flex items-center justify-center
        ${forModal ? 'h-full w-full' : 'absolute h-screen w-screen'}
      `}
    >
      {children}
    </div>
  );
};

export const Loading = props_ => {
  const default_props = {
    className: 'animate-spin',
    style: {
      width: 'clamp(40px, 8vw, 75px)',
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
      className={`${props.className} text-[#1a365d]`}
      style={props.style}
    />
  );

  if (props.center) return <Center {...props_}>{Comp}</Center>;
  return Comp;
};
