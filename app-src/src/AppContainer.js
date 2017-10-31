import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actionCreators from './appActions.js';
import { fetchHuntersIfNeeded } from './Hunters/huntersActions';
import App from './App';

const appStateToProps = (state) => {
    return { ...state }
}

function appDispatchToProps(dispatch) {
    return bindActionCreators({...actionCreators, fetchHuntersIfNeeded}, dispatch);
}

const AppContainer = connect(
    appStateToProps,
    appDispatchToProps
)(App)

export default AppContainer