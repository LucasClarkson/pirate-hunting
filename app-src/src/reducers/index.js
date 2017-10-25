import { combineReducers } from 'redux'
import appState from './appState'
import hunters from './hunters'
import stands from './stands'
import hunts from './hunts'

import optimist from 'redux-optimist';

const pirateHuntingApp = optimist(combineReducers({
    appState,
    hunters,
    stands,
    hunts
}));

export default pirateHuntingApp;