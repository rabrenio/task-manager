import { combineReducers } from 'redux'
import {
    TASK_ADD,
    TASK_CHANGE_ORDER
} from '../constants/actionType.js'

const backlog = (state = [], action) => {
    if(action.payload && action.payload.columnId !== 'backlog') {
        return state
    }

    switch (action.type) {
        case TASK_ADD:
            return [...state, action.payload.id]
        case TASK_CHANGE_ORDER:
            const newState = [...state]
            const { dragIndex, hoverIndex } = action.payload
            // console.log(dragIndex, hoverIndex)
            const item = newState.splice(dragIndex, 1)
            // column = column.slice(0, newIndex).concat(item).concat(column.slice(newIndex))
            return newState.slice(0, hoverIndex).concat(item).concat(newState.slice(hoverIndex))
        default:
            return state
    }
}

const inProgress = (state = [], action) => {
    if (action.payload && action.payload.columnId !== 'inProgress') {
        return state
    }
    switch (action.type) {
        case TASK_ADD:
            return [...state, action.payload.id]
        default:
            return state
    }
}

const done = (state = [], action) => {        
    if (action.payload && action.payload.columnId !== 'done') {
        return state
    }
    switch (action.type) {
        case TASK_ADD:
            return [...state, action.payload.id]
        default:
            return state
    }
}

const byId = (state = {}, action) => {
    switch (action.type) {
        case TASK_ADD: 
            const { id } = action.payload
            return {
                ...state,
                [id]: {
                    ...action.payload
                }
            }
        default:
            return state
    }
}

export default combineReducers({
    byId,
    backlog,
    inProgress,
    done,
})