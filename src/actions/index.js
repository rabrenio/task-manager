import { v4 } from 'node-uuid'
import {
    TASK_ADD,
    TASK_UPDATE,
    TASK_CHANGE_COLUMN,
    TASK_CHANGE_ORDER,
    TASK_ADD_TO_COLUMN,
    TASK_REMOVE_FROM_COLUMN,
    TASK_TRASH,
    TASK_TRASH_ALL,
    TASK_PURGE,
    MODAL_OPEN,
    MODAL_CLOSE,
    TASK_RECOVER
} from '../constants/actionType.js'

export function addTask(payload) {
    return {
        payload: { id: v4(), ...payload},
        type: TASK_ADD,
    }
}

export function updateTask(payload) {
    return {
        payload,
        type: TASK_UPDATE,
    }
}

export function changeCardColumn(id, columnId) {
    return {
        payload: {
            id,
            columnId,
        },
        type: TASK_CHANGE_COLUMN,
    }
}

export function changeCardOrder(dragIndex, dropIndex, columnId) {
    return {
        payload: {
            dragIndex,
            dropIndex,
            columnId,
        },
        type: TASK_CHANGE_ORDER,
    }
}

export function addCardToColumn(id, dropIndex, columnId) {
    return {
        payload: {
            id,
            dropIndex,
            columnId,
        },
        type: TASK_ADD_TO_COLUMN,
    }
}

export function removeCardFromColumn(id, columnId) {
    return {
        payload: {
            id,
            columnId,
        },
        type: TASK_REMOVE_FROM_COLUMN,
    }
}

export function trashCard(id) {
    return {
        id,
        type: TASK_TRASH,
    }
}

export function trashAllCards(payload) {
    return {
        payload,
        type: TASK_TRASH_ALL,
    }
}

export function purgeCards(payload) {
    return {
        payload,
        type: TASK_PURGE,
    }
}

export function recoverCard(id) {
    return {
        id,
        type: TASK_RECOVER,
    }
}

export function openModal(payload) {
    return {
        payload,
        type: MODAL_OPEN,
    }
}

export function closeModal() {
    return {
        type: MODAL_CLOSE,
    }
}