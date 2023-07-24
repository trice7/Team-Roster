import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTeam } from '../../../API/teamData';
import TeamForm from '../../../components/Forms/TeamForm';

const EditMember = () => {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditItem);
    console.warn(firebaseKey);
  }, [firebaseKey]);

  return (<TeamForm obj={editItem} />);
};

export default EditMember;
