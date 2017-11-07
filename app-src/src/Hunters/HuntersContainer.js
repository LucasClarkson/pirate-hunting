import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actionCreators from './huntersActions.js';
import Hunters from './Hunters';

const appStateToProps = (state) => {
    return { 
        hunters: state.hunters.items,
        hunts: state.hunts.byHunter,
        stands: state.stands.byId
     }
}

function appDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const HuntersContainer = connect(
    appStateToProps,
    appDispatchToProps
)(Hunters)

export default HuntersContainer