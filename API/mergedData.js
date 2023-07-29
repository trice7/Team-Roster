/* eslint-disable no-shadow */
import { deleteMember, getSingleMember, updateMember } from './membersData';
import { deleteTeam } from './teamData';
import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getTeamMembers = (teamId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/members.json?orderBy="team"&equalTo="${teamId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteTeamsMembers = (teamId) => new Promise((resolve, reject) => {
  getTeamMembers(teamId).then((membersArray) => {
    const deleteMemberPromises = membersArray.map((member) => deleteMember(member.firebaseKey));

    Promise.all(deleteMemberPromises).then(() => {
      deleteTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const tradeRequestPromise = (myInfoObj, theirInfoObj) => new Promise((resolve, reject) => {
  const theirId = theirInfoObj.firebaseKey;
  const myId = myInfoObj.firebaseKey;

  getSingleMember(theirInfoObj.firebaseKey).then(({ firebaseKey }) => {
    const theirPayload = {
      wanting: true,
      offerId: myId,
      firebaseKey,
    };
    updateMember(theirPayload).then(() => {
      getSingleMember(myInfoObj.firebaseKey).then(({ firebaseKey }) => {
        const myPayload = {
          offering: true,
          offerId: theirId,
          firebaseKey,
        };
        updateMember(myPayload).then(resolve);
      });
    });
  }).catch(reject);
});

const denyTradeRequest = (memberObj) => new Promise((resolve, reject) => {
  getSingleMember(memberObj.offerId).then(({ firebaseKey }) => {
    const theirPayload = {
      wanting: false,
      offering: false,
      offerId: '',
      firebaseKey,
    };
    updateMember(theirPayload).then(() => {
      getSingleMember(memberObj.firebaseKey).then(({ firebaseKey }) => {
        const myPayload = {
          wanting: false,
          offering: false,
          offerId: '',
          firebaseKey,
        };
        updateMember(myPayload).then(resolve);
      });
    });
  }).catch(reject);
});

export {
  getTeamMembers,
  deleteTeamsMembers,
  tradeRequestPromise,
  denyTradeRequest,
};
