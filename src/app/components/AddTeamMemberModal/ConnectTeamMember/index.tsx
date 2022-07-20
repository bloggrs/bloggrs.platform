import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'debounce';
import { useUsersSlice } from './slice';
import { getPaginatedUsers } from './slice/selectors';

const ConnectTeamMember = ({
  initialValue = [],
  onAdd: onParentAdd,
  onClose,
}) => {
  const [values, setValues]: any = useState(initialValue);
  const { actions } = useUsersSlice();

  const [query, setQuery] = React.useState('');
  const onQueryChange = e => {
    e.preventDefault();
    const { value } = e.target;
    setQuery(value);
  };

  const users = useSelector(getPaginatedUsers({ query }));

  const [init, setInit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  useEffect(
    () =>
      debounce(() => {
        dispatch(actions.loadUsers({ query }));
      }, 75),
    [query, init],
  );
  useEffect(() => setInit(true), []);

  const onAdd = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    await onParentAdd(values);
    setIsSubmitting(false);
  };
  const UserItems = users.map((user, i) => {
    const { id, first_name, email, phone_number } = user;
    const checked = values.find(value => value.id === id);
    const onChange = e => {
      // e.preventDefault();
      const { value: str_value } = e.target;
      const value = Number(str_value);
      const checked = values.find(value => value.id === id);
      const newValues = !checked
        ? [...values, { id: value }]
        : values.filter(val => val.id !== value);
      setValues(newValues);
    };
    return (
      <tr>
        <td>
          <img
            src="/assets/images/users/user-3.jpg"
            alt=""
            className="rounded-circle thumb-xs me-1"
          />{' '}
          {first_name}
        </td>
        <td>{email}</td>
        <td>{phone_number}</td>
        <td className="text-end">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`teamMemberInput_${i}`}
              onChange={onChange}
              value={id}
              checked={checked}
            />
          </div>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="card-body">
        <div className="input-group col-sm-8 mt-2 col form-label">
          <label className="col-sm-3 mt-2 col form-label">Search: </label>
          <button
            className="btn btn-secondary"
            type="button"
            id="button-addon1"
          >
            <i className="fas fa-search" />
          </button>
          <input
            type="text"
            className="form-control"
            placeholder="Search users.."
            value={query}
            onChange={onQueryChange}
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
          />
        </div>

        <div className="table-responsive py-2">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact No</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>{UserItems}</tbody>
          </table>
          {/*end /table*/}
        </div>
        {/*end /tableresponsive*/}
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-soft-info btn-sm"
          disabled={isSubmitting}
          onClick={onAdd}
        >
          Add
        </button>
        <button
          type="button"
          className="btn btn-soft-secondary btn-sm"
          data-bs-dismiss="modal"
          disabled={isSubmitting}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </>
  );
};

export { ConnectTeamMember };
