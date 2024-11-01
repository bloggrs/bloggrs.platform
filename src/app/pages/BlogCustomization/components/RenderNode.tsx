import React from 'react';
import { useNode } from '@craftjs/core';

export const RenderNode = ({ render }) => {
  const { actions, selected } = useNode((state) => ({
    selected: state.events.selected,
  }));

  return (
    <div className={`craft-node ${selected ? 'selected' : ''}`}>
      {render}
    </div>
  );
}; 