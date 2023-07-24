import { deleteMember } from './membersData';
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

export {
  getTeamMembers,
  deleteTeamsMembers,
};
