const initialState = ""

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION': 
        return action.notification
    case 'HIDE':
        return action.notification
    default: 
        return state
  }
    
}
var timer
export const setNotification = (notification, time) => {
    clearTimeout(timer)
    return async dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            notification,
        })
    
        timer = setTimeout(() => {
            dispatch({
                type: 'HIDE',
                notification: null
            })
        }, time * 1000)
    }
}

export default notificationReducer