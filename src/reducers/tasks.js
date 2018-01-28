import {
    TASK_ADD,
    CARD_CHANGE_ORDER
} from '../constants/actionType.js'

const initialState = {
    byId: {},
    backlog: [],
    in_progress: [],
    done: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TASK_ADD:
        case CARD_CHANGE_ORDER:
            return state
        default:
            return state
    }
}