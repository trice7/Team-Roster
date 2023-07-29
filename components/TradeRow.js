/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { EyeFill, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import { getSingleMember, updateMember } from '../API/membersData';
import { denyTradeRequest } from '../API/mergedData';

const TradeRow = ({ offers }) => {
  console.warn('Youre now on trade row');
  const [trade, setTrade] = useState({});
  const [reload, setReload] = useState(true);

  const denyTrade = () => {
    denyTradeRequest(offers.firebaseKey).then();
  };

  const approveTrade = () => {
    getSingleMember(trade.firebaseKey).then(({ firebaseKey }) => {
      const theirPayload = {
        owner: offers.owner,
        team: offers.team,
        uid: offers.uid,
        wanting: '',
        offering: '',
        offerId: '',
        firebaseKey,
      };

      updateMember(theirPayload).then(() => {
        // eslint-disable-next-line no-shadow
        getSingleMember(offers.firebaseKey).then(({ firebaseKey }) => {
          const myPayload = {
            owner: trade.owner,
            team: trade.team,
            uid: trade.uid,
            wanting: '',
            offering: '',
            offerId: '',
            firebaseKey,
          };
          updateMember(myPayload).then();
        });
      });
    });
  };

  useEffect(() => {
    getSingleMember(offers.offerId).then(setTrade);
  }, [offers, reload]);

  return (
    <tr>
      <td>{trade ? trade.owner : ''}</td>
      <td>{offers.memberName}</td>
      <td>{trade ? trade.memberName : ''}</td>
      <td><EyeFill type="button" /> <CheckCircleFill type="button" onClick={approveTrade} /> <XCircleFill type="button" onClick={denyTrade} /></td>
    </tr>
  );
};

TradeRow.propTypes = {
  offers: {
    memberName: PropTypes.string,
    owner: PropTypes.string,
  }.isRequired,
};

export default TradeRow;
