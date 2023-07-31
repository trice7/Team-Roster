/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { EyeFill, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import { getSingleMember, updateMember } from '../API/membersData';
// import { denyTradeRequest } from '../API/mergedData';

const TradeRow = ({ offers, rerender }) => {
  console.warn('Youre now on trade row');
  const [trade, setTrade] = useState({});

  const denyTrade = () => {
    getSingleMember(trade.firebaseKey).then(({ firebaseKey }) => {
      const theirPayload = {
        wanting: false,
        offering: false,
        offerId: '',
        firebaseKey,
      };

      updateMember(theirPayload).then(() => {
        // eslint-disable-next-line no-shadow
        getSingleMember(offers.firebaseKey).then(({ firebaseKey }) => {
          const myPayload = {
            wanting: false,
            offering: false,
            offerId: '',
            firebaseKey,
          };
          updateMember(myPayload).then(rerender);
        });
      });
    });
  };

  const approveTrade = () => {
    getSingleMember(trade.firebaseKey).then(({ firebaseKey }) => {
      const theirPayload = {
        owner: offers.owner,
        team: offers.team,
        uid: offers.uid,
        wanting: false,
        offering: false,
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
            wanting: false,
            offering: false,
            offerId: '',
            firebaseKey,
          };
          updateMember(myPayload).then(rerender);
        });
      });
    });
  };

  useEffect(() => {
    getSingleMember(offers.offerId).then(setTrade);
  }, [offers]);

  let tradeSelect;

  if (offers.wanting) {
    tradeSelect = (
      <tr>
        <td>{trade ? trade.owner : ''}</td>
        <td>{offers.memberName}</td>
        <td>{trade ? trade.memberName : ''}</td>
        <td><EyeFill type="button" /> <CheckCircleFill type="button" onClick={approveTrade} /> <XCircleFill type="button" onClick={denyTrade} /></td>
      </tr>
    );
  }

  if (offers.offering) {
    tradeSelect = (
      <tr>
        <td>{trade ? trade.owner : ''}</td>
        <td>{trade ? trade.memberName : ''}</td>
        <td>{offers.memberName}</td>
        <td> <CheckCircleFill type="button" onClick={approveTrade} /> <XCircleFill type="button" onClick={denyTrade} /></td>
      </tr>
    );
  }

  return (
    tradeSelect
  );
};

TradeRow.propTypes = {
  offers: {
    memberName: PropTypes.string,
    owner: PropTypes.string,
  }.isRequired,
};

export default TradeRow;
