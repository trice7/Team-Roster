import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import { BsFillCupHotFill } from 'bootstrap-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PencilSquare, Trash3Fill } from 'react-bootstrap-icons';
import Link from 'next/link';

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

        <Link href={`/Members/edit/${obj.firebaseKey}`} passHref>
          <PencilSquare type="button" />
        </Link>

        <Trash3Fill type="button" />
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
