import fetch from 'isomorphic-fetch';

export const REQUEST_HUNTS = 'REQUEST_HUNTS';
export const RECEIVE_HUNTS = 'RECEIVE_HUNTS';
export const INVALIDATE_HUNTS = 'INVALIDATE_HUNTS';

function requestHunts() {
  return {
    type: REQUEST_HUNTS
  }
}

function receiveHunts(json) {
    if (json.ok) {
        return {
            type: RECEIVE_HUNTS,
            hunts: json.hunts,
            receivedAt: Date.now()
        }
    } else {
        return {
            type: RECEIVE_HUNTS,
            hunts: null,
            receivedAt: Date.now()
        }
    }
}

function invalidateHunts() {
    return {
        type: INVALIDATE_HUNTS
    }
}

function fetchHunts() {
  return dispatch => {
    dispatch(requestHunts())
    return fetch(`/api/hunt`)
      .then(response => response.json())
      .then(json => dispatch(receiveHunts(json)))
  }
}

function shouldFetchHunts(state) {
  if (state.hunts.isFetching) {
    return false;
  } else {
    return state.hunts.didInvalidate
  }
}

export function fetchHuntsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchHunts(getState())) {
      return dispatch(fetchHunts())
    }
  }
}