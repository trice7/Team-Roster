import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import { BsFillCupHotFill } from 'bootstrap-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  PencilSquare,
  Trash3Fill,
  ArrowRepeat,
  Check2Circle,
  XCircleFill,
} from 'react-bootstrap-icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { deleteMember } from '../API/membersData';
import { getSingleTeam } from '../API/teamData';
import { useAuth } from '../utils/context/authContext';

const initialTeam = {
  teamName: '',
};

const MemberCard = ({
  obj,
  onUpdate,
  tradeCheck,
  tradeX,
}) => {
  console.warn('you are at the MemberCard area');
  const [teams, setTeams] = useState(initialTeam);
  const { user } = useAuth();

  const deleteThisMember = () => {
    if (window.confirm(`Delete ${obj.memberName}? This is irreversible`)) {
      deleteMember(obj.firebaseKey).then(() => onUpdate());
    }
  };

  const getMemberTeam = (team) => {
    getSingleTeam(team).then(setTeams);
  };

  useEffect(() => {
    getMemberTeam(obj.team);
  }, [obj]);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>{obj.memberName}</Card.Header>
      <Card.Img className="member-img" variant="top" src={obj.image} />
      <Card.Body>
        <Card.Title>{obj.role}</Card.Title>
        <Card.Text>
          {obj.wildcard}
        </Card.Text>

        {user.uid === obj.uid ? (
          <Link href={`/Members/edit/${obj.firebaseKey}`} passHref>
            <PencilSquare type="button" />
          </Link>
        ) : ''}

        {user.uid === obj.uid ? (<Trash3Fill type="button" onClick={deleteThisMember} />) : ''}
        {user.uid !== obj.uid ? (
          <Link href={`/Community/${obj.firebaseKey}`} passHref>
            <ArrowRepeat type="button" />
          </Link>
        ) : ''}

        {tradeCheck ? (<Check2Circle type="button" onClick={tradeCheck} />) : ''}
        {tradeX ? (<XCircleFill type="button" onClick={tradeX} />) : ''}
      </Card.Body>
      {teams.teamName ? (<Card.Footer> Member of the {teams.teamName}</Card.Footer>) : ''}
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
  onUpdate: PropTypes.func.isRequired,
  tradeCheck: PropTypes.func.isRequired,
  tradeX: PropTypes.func.isRequired,
};

export default MemberCard;
