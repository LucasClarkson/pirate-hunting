import fetch from 'isomorphic-fetch';

export const REQUEST_HUNTERS = 'REQUEST_HUNTERS';
export const RECEIVE_HUNTERS = 'RECEIVE_HUNTERS';
export const INVALIDATE_HUNTERS = 'INVALIDATE_HUNTERS';

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