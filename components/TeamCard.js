import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import { BsFillCupHotFill } from 'bootstrap-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  PencilSquare,
  Trash3Fill,
  LockFill,
  UnlockFill,
  CardList,
} from 'react-bootstrap-icons';
import Link from 'next/link';
// import { deleteTeam } from '../API/teamData';
import { deleteTeamsMembers } from '../API/mergedData';
import { getSingleTeam, updateTeam } from '../API/teamData';
import { useAuth } from '../utils/context/authContext';

const TeamCard = ({ obj, onUpdate }) => {
  const { user } = useAuth();

  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${obj.teamName}? This will also delete all members. This is irreversible`)) {
      deleteTeamsMembers(obj.firebaseKey).then(() => onUpdate());
    }
  };

  const changePrivate = () => {
    getSingleTeam(obj.firebaseKey).then(({ firebaseKey }) => {
      const priv = obj.isPrivate;
      const patchedPayload = { isPrivate: !priv, firebaseKey };

      updateTeam(patchedPayload).then(onUpdate());
    });
  };

  let privateIcon;
  if (obj.isPrivate) {
    privateIcon = (<LockFill type="button" onClick={changePrivate} />);
  } else {
    privateIcon = (<UnlockFill type="button" onClick={changePrivate} />);
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>{obj.teamName}</Card.Header>
      <Card.Img variant="top" src={obj.image} />
      <Card.Body>
        <Card.Title>{obj.teamName}</Card.Title>
        <Card.Text>
          {obj.description}
        </Card.Text>

        {user.uid === obj.uid ? (
          <Link href={`/Teams/edit/${obj.firebaseKey}`} passHref>
            <PencilSquare type="button" />
          </Link>
        ) : ''}

        {user.uid === obj.uid ? (<Trash3Fill type="button" onClick={deleteThisTeam} />) : ''}

        {user.uid === obj.uid ? privateIcon : ''}

        <Link href={`/Members/Group/${obj.firebaseKey}`} passHref>
          <CardList type="button" />
        </Link>
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
