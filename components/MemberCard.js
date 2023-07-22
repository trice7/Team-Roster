import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MemberCard = ({ obj }) => {
  console.warn('you are at the MemberCard area');
  console.warn(obj);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>{obj.memberName}</Card.Header>
      <Card.Img variant="top" src={obj.image} />
      <Card.Body>
        <Card.Title>{obj.role}</Card.Title>
        <Card.Text>
          {obj.wildcard}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

MemberCard.propTypes = {
  obj: {
    memberName: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
    wildcard: PropTypes.string,
  }.isRequired,
};

export default MemberCard;
