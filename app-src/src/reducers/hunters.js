import {
  INVALIDATE_HUNTERS,
  REQUEST_HUNTERS,
  RECEIVE_HUNTERS,
  NEW_HUNTER_CREATED
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
        case NEW_HUNTER_CREATED:
            const newArr = [...state.items, action.hunter];
            return Object.assign({}, state, {
                items: [...new Set(newArr)]
            })

        default:
            return { ...state };

    }

}

export default hunters;