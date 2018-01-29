const key = 'task-manager-state'

export const loadState = () => {
    console.log('load state')
    try {
        const serializedState = localStorage.getItem(key)
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (error) {
        return undefined
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem(key, serializedState)
    } catch (error) {
        //ignore for now
    }
}