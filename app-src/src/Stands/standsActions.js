import fetch from 'isomorphic-fetch';

export const REQUEST_STANDS = 'REQUEST_STANDS';
export const RECEIVE_STANDS = 'RECEIVE_STANDS';
export const INVALIDATE_STANDS = 'INVALIDATE_STANDS';

function requestStands() {
  return {
    type: REQUEST_STANDS
  }
}

function receiveStands(json) {
    if (json.ok) {
        return {
            type: RECEIVE_STANDS,
            stands: json.stands,
            receivedAt: Date.now()
        }
    } else {
        return {
            type: RECEIVE_STANDS,
            stands: null,
            receivedAt: Date.now()
        }
    }
}

function invalidateStands() {
    return {
        type: INVALIDATE_STANDS
    }
}

function fetchStands() {
  return dispatch => {
    dispatch(requestStands())
    return fetch(`/api/stand`)
      .then(response => response.json())
      .then(json => dispatch(receiveStands(json)))
  }
}

function shouldFetchStands(state) {
  if (state.stands.isFetching) {
    return false;
  } else {
    return state.stands.didInvalidate
  }
}

export function fetchStandsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchStands(getState())) {
      return dispatch(fetchStands())
    }
  }
}