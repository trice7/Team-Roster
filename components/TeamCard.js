import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import { BsFillCupHotFill } from 'bootstrap-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PencilSquare, Trash3Fill } from 'react-bootstrap-icons';
import Link from 'next/link';
// import { deleteTeam } from '../API/teamData';
import { deleteTeamsMembers } from '../API/mergedData';

const TeamCard = ({ obj, onUpdate }) => {
  console.warn('you are at the MemberCard area');

  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${obj.teamName}? This will also delete all members. This is irreversible`)) {
      deleteTeamsMembers(obj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>{obj.teamName}</Card.Header>
      <Card.Img variant="top" src={obj.image} />
      <Card.Body>
        <Card.Title>{obj.teamName}</Card.Title>
        <Card.Text>
          {obj.description}
        </Card.Text>

        <Link href={`/Teams/edit/${obj.firebaseKey}`} passHref>
          <PencilSquare type="button" />
        </Link>

        <Trash3Fill type="button" onClick={deleteThisTeam} />
      </Card.Body>
    </Card>
  );
};

TeamCard.propTypes = {
  obj: {
    teamName: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
