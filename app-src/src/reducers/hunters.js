import {
  INVALIDATE_HUNTERS,
  REQUEST_HUNTERS,
  RECEIVE_HUNTERS
} from '../Hunters/huntersActions';

const hunters = (state = {
    isFetching: false,
    didInvalidate: true,
    items: []
}, action) => {
    switch (action.type) {
        case INVALIDATE_HUNTERS:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_HUNTERS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_HUNTERS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.hunters,
                lastUpdated: action.receivedAt
            })

        default:
            return { ...state };

    }

}

export default hunters;