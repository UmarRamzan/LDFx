// @ts-nocheck
//API FUNCTIONS FOR CLIENT SIDE
import { supabase } from "../supabaseClient";
let redirectLink = "http://localhost:5173/emailVerified"

export const signUp = async (email, password, accountType, username) => {
    let success = false
    let data = null
    let error = null
    const {data:signupData, error:signupError} = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {accountType: accountType},
        },
        emailRedirectTo: redirectLink
    })
    if(signupError){
        console.log(signupError)
        error = signupError
    }
    else{
        console.log(signupData)
        success = true
        data = signupData

        //set username and userid in username table
        const {data:usernameData, error:usernameError} = await supabase.from('usernames').insert([
            {user_id: signupData.user.id, username: username}])
        if(usernameError){
            console.log(usernameError)
            error = usernameError
            success = false
        }

    }


    return {success: success, data: data, error: error}

}


export const logIn = async (email, password) => {
    let success = false
    let data = null
    const {data:loginData , error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    if(error){
        console.log(error)
    }
    else{
        console.log(loginData)
        success = true
        data = loginData
    }
    return {success: success, data: data, error: error}
}


//api function to get username from the usernames table
export const getUsername = async (userId) => {
    let success = false
    let data = null
    const {data:usernameData, error} = await supabase.from('usernames').select('username').eq('user_id', userId)
    if(error){
        console.log(error)
    }
    else{
        console.log("getUsername: ", usernameData)
        success = true
        data = usernameData
    }
    return {success: success, data: data, error: error}
}

//api function to update username in the usernames table
//note that userid is obtained from the session
export const updateUsername = async (username, userId) => {
    let success = false
    let data = null
    const {data:usernameData, error} = await supabase.from('usernames').update({username: username}).eq('user_id', userId)
    if(error){
        console.log(error)
    }
    else{
        console.log("updateUsername: ",usernameData)
        success = true
        data = usernameData
    }
    return {success: success, data: data, error: error}
}