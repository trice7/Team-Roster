/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getMembers } from '../API/membersData';
import MemberCard from '../components/MemberCard';
import { useAuth } from '../utils/context/authContext';

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();

  const getAllMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {members.map((item) => (
        <MemberCard key={item.firebaseKey} obj={item} onUpdate={getAllMembers} />
      ))}
    </div>
  );
};

export default MembersPage;
