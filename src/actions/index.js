import {
    TASK_ADD,
    CARD_CHANGE_ORDER
} from '../constants/actionType.js'

export function addTask(payload) {
    return {
        type: TASK_ADD,
        payload,
    }
}