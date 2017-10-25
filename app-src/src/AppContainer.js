import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actionCreators from './appActions.js';
import App from './App';

const appStateToProps = (state) => {
    return { ...state }
}

function appDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const AppContainer = connect(
    appStateToProps,
    appDispatchToProps
)(App)

export default AppContainer