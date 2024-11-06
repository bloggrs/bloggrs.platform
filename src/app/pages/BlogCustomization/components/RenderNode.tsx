import React from 'react';
import { useNode } from '@craftjs/core';

export const RenderNode = ({ render }) => {
  const { actions, selected } = useNode(state => ({
    selected: state.events.selected,
  }));

  return (
    <div 
      className={`
        relative rounded-lg border border-gray-200 shadow-sm
        ${selected ? 'ring-2 ring-[#1a365d] border-transparent' : 'hover:border-gray-300'}
        transition-all duration-200
      `}
    >
      {render}
    </div>
  );
};
