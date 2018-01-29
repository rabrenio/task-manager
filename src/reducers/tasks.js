import { combineReducers } from 'redux'
import _ from 'lodash'
import {
    TASK_ADD,
    TASK_UPDATE,
    TASK_CHANGE_COLUMN,
    TASK_CHANGE_ORDER,
    TASK_ADD_TO_COLUMN,
    TASK_REMOVE_FROM_COLUMN,
    TASK_TRASH,
    TASK_TRASH_ALL,
    TASK_PURGE
} from '../constants/actionType.js'

function createTaskCollection(name) {
    return (state = [], action) => {
        if (action.type === TASK_TRASH_ALL) {
            return []
        }
        if (action.payload && action.payload.columnId !== name) {
            return state
        }
        switch (action.type) {
            case TASK_ADD: {
                return [...state, action.payload.id]
            }
            case TASK_CHANGE_ORDER: {
                const newState = [...state]
                const { dragIndex, dropIndex } = action.payload
                const itemToMove = newState.splice(dragIndex, 1)

                return [
                    ...newState.slice(0, dropIndex),
                    itemToMove,
                    ...newState.slice(dropIndex)
                ]
            }
            case TASK_ADD_TO_COLUMN: {
                return [...state, action.payload.id]
            }
            case TASK_REMOVE_FROM_COLUMN: {
                const newState = [...state]
                newState.splice(newState.indexOf(action.payload.id), 1)
                return newState
            }
            default: {
                return state
            }
        }
    }
}

const trash = (state = [], action) => {
    switch (action.type) {
        case TASK_TRASH:
            return [...state, action.id]
        case TASK_TRASH_ALL:
            return [...state, ...action.payload]
        case TASK_PURGE:
            return []
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

        case TASK_UPDATE: {
            const { id } = action.payload
            return {
                ...state,
                [id]: {
                    ...state[id],
                    ...action.payload,
                }    
            }
        }
        case TASK_CHANGE_COLUMN: {
            const { id, columnId } = action.payload
            return {
                ...state,
                [id]: {
                    ...state[id],
                    columnId: columnId,
                }
            }
        }
        case TASK_PURGE: {
            return _.omit(state, action.payload)
        }
        default:
            return state
    }
}

export default combineReducers({
    byId,
    trash,
    backlog: createTaskCollection('backlog'),
    inProgress: createTaskCollection('inProgress'),
    done: createTaskCollection('done'),
})