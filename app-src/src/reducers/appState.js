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
        
        case 'CHANGE_PAGE':
            return {
                ...state,
                showHome: action.page == 'home',
                showPlanner: action.page == 'planner',
                showHunts: action.page == 'hunts',
                showHunters: action.page == 'hunters',
                showStands: action.page == 'stands'
            }

        default: return { ...state };
    }
}

export default appState;