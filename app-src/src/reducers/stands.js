import {
  INVALIDATE_STANDS,
  REQUEST_STANDS,
  RECEIVE_STANDS
} from '../Stands/standsActions';

const stands = (state = {
    isFetching: false,
    didInvalidate: true,
    items: [],
    byId: {}
}, action) => {
    switch (action.type) {
        case INVALIDATE_STANDS:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_STANDS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_STANDS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.stands,
                byId: action.stands.reduce(function (r, a) {
                    r[a.standId] = a;
                    return r;
                }, {}),
                lastUpdated: action.receivedAt
            })

        default:
            return { ...state };

    }

}

export default stands;