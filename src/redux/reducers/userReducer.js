const INITIAL_STATE = null

const userReducer = (state = INITIAL_STATE , action) => {
    if(action.type === 'SAVE_USER_DATA'){
        return action.payload
    }else if(action.type === 'CLEAR_USER_DATA'){
        return null
    }else{
        return INITIAL_STATE
    }
}

export default userReducer


// setting reducer => function return data
// combine reducer
// setting store => store(rootreducer)
// bungkus app dengan provider


