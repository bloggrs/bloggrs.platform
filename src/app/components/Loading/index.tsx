import React from 'react';

export const Center = ({ children }) => {
  return <div style={{
    position: 'absolute',
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}>{children}</div>
}

export const Loading = (props_) => {
  const default_props = {
    className: "",
    style: {
      width: 75
    },
    src: "/waiting-icon-gif-1.jpeg",
    center: true
  }
  const props = Object.keys(props_).length > 0 ? props_ : default_props;  
  const Comp = <img 
    src={props.src}
    className={props.className}
    style={props.style}
  />
  if (props.center) return <Center>{Comp}</Center>
  return Comp
};
