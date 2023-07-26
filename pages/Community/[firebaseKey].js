/* eslint-disable no-unneeded-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getMembers, getSingleMember } from '../../API/membersData';
import { useAuth } from '../../utils/context/authContext';
import MemberCard from '../../components/MemberCard';

// const placeholder = {
//   memberName: 'No member selected',
//   role: 'Choose a member from the list below',
//   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpsMFBs6lDTUd-f3a0EYqhIuUR_4r3FVA5kw&usqp=CAU',
//   wildcard: '',
// };

const TradeInfo = () => {
  const [myInfo, setMyInfo] = useState('');
  const [theirInfo, setTheirInfo] = useState('');
  const [myMembers, setMyMembers] = useState([]);

  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  const requestedMember = (item) => {
    getSingleMember(firebaseKey).then(item);
  };

  const allMyMembers = () => {
    getMembers(user.uid).then(setMyMembers);
  };

  // const tradeEnabled = () => {
  //   console.warn('enabled trade on this card');
  // };

  const handleTrade = () => {
    if (myInfo) {
      console.warn('trade will succeed');
    } else {
      console.warn('trade will fail');
    }
  };

  const handleRemove = () => {
    setMyInfo('');
  };

  const handleSelect = (obj) => {
    getSingleMember(obj.firebaseKey).then(setMyInfo);
  };

  useEffect(() => {
    requestedMember(setTheirInfo);
    allMyMembers();
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap">
        {theirInfo ? (<MemberCard key={theirInfo.firebaseKey} obj={theirInfo} />) : ''}
        {/* {myInfo ? <Image className="trade-image" src="https://www.pngmart.com/files/17/Trade-PNG-File.png" /> : ''} */}
        {myInfo ? (<MemberCard obj={myInfo} tradeX={handleRemove} />) : <h3>Choose a member to exchange for {theirInfo.memberName}</h3>}
      </div>
      <div>
        <Button type="button" onClick={handleTrade}>Submit this trade</Button>
      </div>
      <div className="d-flex flex-wrap">
        {myMembers ? myMembers.map((item) => (
          <MemberCard key={item.firebaseKey} obj={item} onUpdate={allMyMembers} tradeCheck={() => handleSelect(item)} />
        )) : 'No Members Available for Trade'}
      </div>
    </>
  );
};

export default TradeInfo;
