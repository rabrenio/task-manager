import {
    MODAL_OPEN,
    MODAL_CLOSE
} from '../constants/actionType.js'


function didUserVisit() {
    try {
        const visited = JSON.parse(localStorage.getItem('visited'))
        if (!visited) {
            localStorage.setItem('visited', true)
        }
        return visited
    } catch(err) {}
}

const initialState = {
    show: !didUserVisit(),
    task: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case MODAL_OPEN:
            return { ...state, show: true, task: action.payload}
        case MODAL_CLOSE:
            return { ...state, show: false}
        default:
            return state
    }
}