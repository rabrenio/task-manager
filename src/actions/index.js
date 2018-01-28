import { v4 } from 'node-uuid'
import {
    TASK_ADD,
    TASK_CHANGE_ORDER,
} from '../constants/actionType.js'

export function addTask(payload) {
    return {
        type: TASK_ADD,
        payload: {...payload, id: v4()}
    }
}

export function changeCardOrder(dragIndex, hoverIndex, columnId) {
    return {
        type: TASK_CHANGE_ORDER,
        payload: {
            dragIndex,
            hoverIndex,
            columnId,
        }
    }
}