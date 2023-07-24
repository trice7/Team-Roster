import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../API/membersData';
import { getTeams } from '../../API/teamData';

const initialState = {
  memberName: '',
  role: '',
  image: '',
  wildcard: '',
  team: '',
};

const MemberForm = ({ obj }) => {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);

    if (obj.firebaseKey) setFormInput(obj);
    console.warn(obj);
    console.warn(obj.firebaseKey);
  }, [obj, user]);

  console.warn('Clicked on MemberForm');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput).then(() => router.push('/Members/Members'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/Members/Members');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{obj.firebaseKey ? 'Update' : 'Create'} Member</h2>

      <FloatingLabel controlId="floatingInput1" label=" Enter Members Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter members name"
          name="memberName"
          value={formInput.memberName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label=" Enter Members Role or Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter members role or title"
          name="role"
          value={formInput.role}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Enter An Image URL" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="OPTIONAL: Enter Misc Info" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Misc Info"
          aria-label="Enter Misc Info"
          name="wildcard"
          value={formInput.wildcard}
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Team">
        <Form.Select
          aria-label="team"
          name="team"
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Select a Team</option>
          {
            teams.map((item) => (
              <option
                key={item.firebaseKey}
                value={item.firebaseKey}
              >
                {item.teamName}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>
    </Form>
  );
};

MemberForm.propTypes = {
  obj: {
    memberName: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    wildcard: PropTypes.string,
  },
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
