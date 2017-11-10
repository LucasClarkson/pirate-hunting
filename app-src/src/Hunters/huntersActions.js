import fetch from 'isomorphic-fetch';

export const REQUEST_HUNTERS = 'REQUEST_HUNTERS';
export const RECEIVE_HUNTERS = 'RECEIVE_HUNTERS';
export const INVALIDATE_HUNTERS = 'INVALIDATE_HUNTERS';
export const CREATE_NEW_HUNTER = 'CREATE_NEW_HUNTER';
export const NEW_HUNTER_CREATED = 'NEW_HUNTER_CREATED';
export const ERROR_CREATING_HUNTER = 'ERROR_CREATING_HUNTER';

function requestHunters() {
  return {
    type: REQUEST_HUNTERS
  }
}

function receiveHunters(json) {
    if (json.ok) {
        return {
            type: RECEIVE_HUNTERS,
            hunters: json.hunters,
            receivedAt: Date.now()
        }
    } else {
        return {
            type: RECEIVE_HUNTERS,
            hunters: null,
            receivedAt: Date.now()
        }
    }
}

function invalidateHunters() {
    return {
        type: INVALIDATE_HUNTERS
    }
}

function createNewHunter() {
  return {
    type: CREATE_NEW_HUNTER
  }
}

function errorCreatingHunter(reason) {
  return {
    type: ERROR_CREATING_HUNTER,
    errMsg: reason
  }
}

function newHunterCreated(json) {
  console.log(json.ok);
  if (json.ok) {
    return {
      type: NEW_HUNTER_CREATED,
      hunter: json.hunter
    }
  } else {
    return errorCreatingHunter(json.why);
  }
}

export function addHunter(hunter) {
  return dispatch => {
    dispatch(createNewHunter());
    return fetch('/api/hunter', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': "application/json"
        },
        mode: "cors",
        body: JSON.stringify(hunter)
    }).then(response => response.json())
    .then(json => dispatch(newHunterCreated(json)))
  }
}

function fetchHunters() {
  return dispatch => {
    dispatch(requestHunters())
    return fetch(`/api/hunter`)
      .then(response => response.json())
      .then(json => dispatch(receiveHunters(json)))
  }
}

function shouldFetchHunters(state) {
  if (state.hunters.isFetching) {
    return false;
  } else {
    return state.hunters.didInvalidate
  }
}

export function fetchHuntersIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchHunters(getState())) {
      return dispatch(fetchHunters())
    }
  }
}