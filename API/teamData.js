import { clientCredentials } from '../utils/client';
// API CALLS FOR MEMBERS

const endpoint = clientCredentials.databaseURL;

const getTeams = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teams.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getCommunityTeams = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teams.json?orderBy="isPrivate"&equalTo=${false}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteTeam = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teams/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teams/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application.json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createTeam = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teams.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTeam = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teams/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application.json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getTeams,
  getCommunityTeams,
  getSingleTeam,
  updateTeam,
  deleteTeam,
  createTeam,
};
