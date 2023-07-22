/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { getTeams } from '../../API/teamData';
import TeamCard from '../../components/TeamCard';
import { useAuth } from '../../utils/context/authContext';

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();

  const getAllTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {teams.map((item) => (
        <TeamCard key={item.firebaseKey} obj={item} onUpdate={getAllTeams} />
      ))}
    </div>
  );
};

export default TeamsPage;
