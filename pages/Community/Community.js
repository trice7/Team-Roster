import React, { useEffect, useState } from 'react';
import { getCommunityTeams } from '../../API/teamData';
import TeamCard from '../../components/TeamCard';

const CommunityPage = () => {
  console.warn('Community Page');

  const [teams, setTeams] = useState([]);
  // const { user } = useAuth();

  const getAllTeams = () => {
    getCommunityTeams().then(setTeams);
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {teams.length > 0 ? teams.map((item) => (
        <TeamCard key={item.firebaseKey} obj={item} onUpdate={getAllTeams} />
      )) : (<h3>No teams available</h3>)}
    </div>
  );
};

export default CommunityPage;
