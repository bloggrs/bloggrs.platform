import React from 'react';
import { Link } from 'react-router-dom';

const PageNavigation = ({ label, items }) => {
  const items_ = [
    {
      label: 'Bloggrs',
      to: '/',
    },
    ...items,
  ];
  const ITEMS = items_.map(({ label, active, to }) => {
    const className = active ? 'breadcrumb-item active' : 'breadcrumb-item';
    const LinkOrNone: any = active ? ({ children }) => <>{children}</> : Link;
    return (
      <li className={className}>
        <LinkOrNone to={to}>{label}</LinkOrNone>
      </li>
    );
  });
  return (
    <div className="col">
      <h4 className="page-title">{label}</h4>
      <ol className="breadcrumb">{ITEMS}</ol>
    </div>
  );
};

export { PageNavigation };
