import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../API/membersData';

const initialState = {
  memberName: '',
  role: '',
  image: '',
  wildcard: '',
};

const MemberForm = ({ obj }) => {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Add a useState for teams so that I can list them on the form.

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
      updateMember(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/');
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
          name="wildcard"
          value={formInput.wildcard}
          onChange={handleChange}
        />
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