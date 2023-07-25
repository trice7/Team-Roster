import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getTeamMembers } from '../../../API/mergedData';
import MemberCard from '../../../components/MemberCard';
import { getSingleTeam } from '../../../API/teamData';

const DisplayGroupMembers = () => {
  const [team, setTeam] = useState({});
  const [squad, setSquad] = useState('');
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getSquad = () => {
    getTeamMembers(firebaseKey).then(setTeam);
    getSingleTeam(firebaseKey).then(setSquad);
  };

  console.warn(team);

  useEffect(() => {
    getSquad();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {team.length > 0 ? team.map((item) => (
        <MemberCard key={item.firebaseKey} obj={item} onUpdate={getSquad} />
      )) : (<h2>The {squad.teamName} have no members</h2>)}
    </div>
  );
};

export default DisplayGroupMembers;
