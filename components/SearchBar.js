import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { getMembers } from '../API/membersData';
import { useAuth } from '../utils/context/authContext';

const SearchBar = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    getMembers(user.uid).then(setData);
  }, [user, data]);

  const handleChange = (e) => {
    e.preventDefault();
    // const result = e.target.value;
    // setSearchInput(result);
    // console.warn(searchInput);
  };

  return (
    <>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          size="sm"
          aria-label="Search"
          onChange={handleChange}
        />
      </Form>
    </>
  );
};

// SearchBar.propTypes = {
//   searchInput: PropTypes.string.isRequired,
//   setSearchInput: PropTypes.func.isRequired,
// };

export default SearchBar;
