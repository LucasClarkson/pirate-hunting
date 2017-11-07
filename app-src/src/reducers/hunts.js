import {
  INVALIDATE_HUNTS,
  REQUEST_HUNTS,
  RECEIVE_HUNTS
} from '../Hunts/huntsActions';

const hunts = (state = {
    isFetching: false,
    didInvalidate: true,
    items: [],
    byHunter: {},
    byStand: {}
}, action) => {
    switch (action.type) {
        case INVALIDATE_HUNTS:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_HUNTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_HUNTS:
            let _byHunter = {};
            let _byStand = {};
            action.hunts.forEach(function (hunt) {
                if (_byHunter[hunt.hunterId]) {
                    _byHunter[hunt.hunterId].push(hunt);
                } else {
                    _byHunter[hunt.hunterId] = [hunt];
                }

                if (_byStand[hunt.standId]) {
                    _byStand[hunt.standId].push(hunt);
                } else {
                    _byStand[hunt.standId] = [hunt];
                }
            });

            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.hunts,
                byHunter: _byHunter,
                byStand: _byStand,
                lastUpdated: action.receivedAt
            })

        default:
            return { ...state };

    }

}

export default hunts;