import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Pagination = styled.div`
  display: inline-block;
  a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
  }
  a.selected {
    font-weight: bold;
  }
  margin: 0 auto;
  margin-left: 1em;
  margin-top: 1em;
`;

const get_field_href = (field, context) => {
  const { href } = field;
  if (href === undefined) return false;
  const t = typeof href;
  switch (t) {
    case 'function':
      return href(context);
    default:
      return href;
  }
};

const TableContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.2s ease;
`;

const TableRow = styled.tr`
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #f8fafc;
  }
`;

const getNestedValue = (obj, path) => {
  return path
    .split('.')
    .reduce((current, key) => (current ? current[key] : undefined), obj);
};

export const Table = ({
  fields = [],
  data = [],
  page,
  pageSize,
  onLoadMore,
  plural_name,
  type,
  EditModal,
  DeleteModal,
  EditButton,
}: any) => {
  const history = useHistory();

  if (!fields || !data) {
    return (
      <div className="bg-white rounded-xl shadow-sm">
        <p className="p-12 text-center text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {fields.map((f, index) => (
                <th
                  key={`header-${index}`}
                  className="pb-4 text-left text-sm font-medium text-gray-500"
                >
                  {f.label}
                </th>
              ))}
              <th className="pb-4 text-left text-sm font-medium text-gray-500">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, rowIndex) => (
              <tr
                key={d.id || `row-${rowIndex}`}
                className="group hover:bg-gray-50"
              >
                {fields.map((field, colIndex) => {
                  const href = get_field_href(field, d[field.key]);
                  const className =
                    href !== false
                      ? 'cursor-pointer text-blue-600 hover:text-blue-800'
                      : '';
                  const onClick =
                    href !== false ? () => history.push(href) : undefined;

                  const value = getNestedValue(d, field.key);
                  const content = field.render ? field.render(value) : value;

                  return (
                    <td key={`cell-${rowIndex}-${colIndex}`} className="py-3">
                      <div
                        className={`${className} font-medium text-gray-900`}
                        onClick={onClick}
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: 425,
                        }}
                      >
                        {content}
                      </div>
                    </td>
                  );
                })}
                <td className="py-3 pr-4">
                  <div className="flex items-center space-x-2">
                    <Link to={window.location.pathname + '/' + d.id}>
                      <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors">
                        View
                      </button>
                    </Link>
                    {EditButton ? <EditButton item={d} /> : null}
                    {EditModal && (
                      <EditModal {...{ [type]: d }}>
                        <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-yellow-700 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-lg transition-colors">
                          Edit
                        </button>
                      </EditModal>
                    )}
                    {DeleteModal && (
                      <DeleteModal {...{ [type]: d }}>
                        <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors">
                          Delete
                        </button>
                      </DeleteModal>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!data.length && (
          <div className="p-12 text-center text-gray-500">
            No {plural_name || 'items'} to show
          </div>
        )}
      </div>
    </div>
  );
};
