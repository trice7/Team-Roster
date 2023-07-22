import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMember } from '../../../API/membersData';
import MemberForm from '../../../components/Forms/MemberForm';

const EditMember = () => {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setEditItem);
    console.warn(firebaseKey);
  }, [firebaseKey]);

  return (<MemberForm obj={editItem} />);
};

export default EditMember;
