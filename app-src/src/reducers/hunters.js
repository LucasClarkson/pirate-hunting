const hunters = (state = {
    byId: [],
    byHash: {}
}, action) => {
    switch (action.type) {

        case 'HUNTER_DATA_RECEIVED':
            const newArr = [...state.byId, action.hunter.id];
            return {
                byId: [...new Set(newArr)],
                byHash: {
                    ...state.byHash,
                    [action.hunter.id]: action.hunter
                }
            }

        default:
            return { ...state };

    }

}

export default hunters;