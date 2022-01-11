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
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {f.label}
                </th>
              ))}
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {!data.length && `No ${plural_name || 'items'} to show`}
            {/* {data.slice(...sliceRule).map(d => ( */}
            {data.map(d => (
              <tr>
                {fields.map(field => (
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                    {d[field.key]}
                  </th>
                ))}
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <Link to={window.location.pathname + '/' + d.id}>
                    <button className="btn-base  w-full bg-transparent border-2 border-slate-600 rounded-md">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
