import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createTeam, updateTeam } from '../../API/teamData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  teamName: '',
  description: '',
  image: '',
  isPrivate: true,
};

const TeamForm = ({ obj }) => {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
    console.warn(obj);
    console.warn(obj.firebaseKey);
  }, [obj, user]);

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
      updateTeam(formInput).then(() => router.push('/Teams/Teams'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeam(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeam(patchPayload).then(() => {
          router.push('/Teams/Teams');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{obj.firebaseKey ? 'Update' : 'Create'} Team</h2>

      <FloatingLabel controlId="floatingInput1" label=" Enter the Teams Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter teams name"
          name="teamName"
          value={formInput.teamName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Enter An Image URL" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Enter a team description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a team description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team</Button>
    </Form>
  );
};

TeamForm.propTypes = {
  obj: {
    teamName: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  },
};

TeamForm.defaultProps = {
  obj: initialState,
};

export default TeamForm;
