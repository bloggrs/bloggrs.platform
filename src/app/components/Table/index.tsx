import React from 'react';
import { Link } from 'react-router-dom';
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

export const Table = ({
  fields,
  data,
  page,
  pageSize,
  onLoadMore,
  plural_name,
  type,
  EditModal,
  DeleteModal,
  EditButton,
}: any) => {
  // page = page || 1;
  // pageSize = pageSize || 3;

  // const sliceRule1 = (page - 1) * pageSize;
  // const sliceRule = [sliceRule1, sliceRule1 + pageSize];
  // console.log(sliceRule);
  return (
    <>
      <div className="block w-full overflow-x-auto bg-white">
        <table className="items-center bg-transparent w-full border-collapse ">
          <thead>
            <tr>
              {fields.map(f => (
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {f.label}
                </th>
              ))}
              <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {data.slice(...sliceRule).map(d => ( */}
            {data.map(d => (
              <tr>
                {fields.map(field => (
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-slate-700">
                    <div style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 425
                    }}>
                      {d[field.key]}
                    </div>
                  </th>
                ))}
                <td
                  style={{
                    display: 'inline-flex',
                  }}
                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4"
                >
                  <Link to={window.location.pathname + '/' + d.id}>
                    <button className="btn-base m-2 bg-transparent border-2 border-slate-600 rounded-md">
                      View
                    </button>
                  </Link> 
                  {EditButton ? <EditButton item={d} /> : null}
                  {EditModal && (
                    <EditModal {...{ [type]: d }}>
                      <button className="btn-base m-2 bg-transparent border-2 border-yellow-800 text-yellow-800 rounded-md">
                        Edit
                      </button>
                    </EditModal>
                  )}
                  {DeleteModal && (
                    <DeleteModal {...{ [type]: d }}>
                      <button className="btn-base m-2 bg-transparent border-2 border-red-800 text-red-800 rounded-md">
                        Delete
                      </button>
                    </DeleteModal>
                  )}
                  {/* <Link to={window.location.pathname + '/' + d.id}>
                    <button className="btn-base m-2 bg-transparent border-2 border-red-800 text-red-800 rounded-md">
                      Edit
                    </button>
                  </Link> */}
                  {/* <Link to={window.location.pathname + '/' + d.id}>
                    <button className="btn-base m-2 bg-transparent border-2 border-red-800 text-red-800 rounded-md">
                      Delete
                    </button>
                  </Link> */}
                </td>
                {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                  <Link to={window.location.pathname + '/' + d.id}>
                    <button className="btn-base  w-full bg-transparent border-2 border-red-800 text-red-800 rounded-md">
                      Delete
                    </button>
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <p className='ml-10 my-10'>
          {!data.length && `No ${plural_name || 'items'} to show`}
        </p>
      </div>
      <br />
      {/* <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          <li>
            <a href="#" className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
          </li>
          <li>
            <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
          </li>
          <li>
            <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
          </li>
          <li>
            <a href="#" aria-current="page" className="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
          </li>
          <li>
            <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
          </li>
          <li>
            <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
          </li>
          <li>
            <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
          </li>
        </ul>
      </nav> */}

      <br />
      {/* <h3 className="cursor-pointer" onClick={onLoadMore}>
        Load More
      </h3> */}
      {/* <Pagination>
        <a href="#">&laquo;</a>
        <a className="selected" href="#">
          1
        </a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">&raquo;</a>
      </Pagination> */}
    </>
  );
};
