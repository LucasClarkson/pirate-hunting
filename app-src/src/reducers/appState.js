const appState = (state = {
    entityDataReady: false,
    showHome: false,
    showPlanner: false,
    showHunts: false,
    showHunters: true,
    showStands: false
}, action) => {
    switch (action.type) {

        case 'SHOW_ADD_HUNTER':
            return {
                ...state,
                showHome: false,
                showPlanner: false,
                showHunts: false,
                showHunters: true,
                showStands: false
            };

        default: return { ...state };
    }
}

export default appState;