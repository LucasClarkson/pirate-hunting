import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actionCreators from './appActions.js';
import { fetchHuntersIfNeeded } from './Hunters/huntersActions';
import { fetchHuntsIfNeeded } from './Hunts/huntsActions';
import { fetchStandsIfNeeded } from './Stands/standsActions';
import App from './App';

const appStateToProps = (state) => {
    return { ...state }
}

function appDispatchToProps(dispatch) {
    return bindActionCreators({...actionCreators, fetchHuntersIfNeeded, fetchHuntsIfNeeded, fetchStandsIfNeeded}, dispatch);
}

const AppContainer = connect(
    appStateToProps,
    appDispatchToProps
)(App)

export default AppContainer