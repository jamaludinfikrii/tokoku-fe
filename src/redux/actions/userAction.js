export const saveUserData = (data) => {
    return {
        type : "SAVE_USER_DATA",
        payload : data
    }
}


export const clearUserData = () => {
    return {
        type : "CLEAR_USER_DATA"
    }
}








