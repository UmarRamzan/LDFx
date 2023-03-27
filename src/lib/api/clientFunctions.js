// @ts-nocheck

import { supabase } from "$lib/supabaseClient";
import { user } from "../../routes/UserStore";

let redirectLink = "http://localhost:5173/emailVerified"

export const signup = async (email, password, accountType, username) => {

    let success = false
    let data = null
    let error = null

    const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {accountType: accountType},
        },
        emailRedirectTo: redirectLink
    })
    
    if (signupError) {
        console.log(signupError)
        error = signupError
    }
    else{
        console.log(signupData)
        success = true
        data = signupData

        //set username and userid in username table
        const { data: usernameData, error: usernameError} = await supabase.from('usernames').insert([
            {user_id: signupData.user.id, username: username}])
        if (usernameError) {
            console.log(usernameError)
            error = usernameError
            success = false
        }
    }

    return {success: success, data: data, error: error}
}

export const login = async (email, password) => {

    let success = false
    let data = null

    const {data:loginData , error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    if (error) {console.log(error)}
    else{
        console.log(loginData)
        success = true
        data = loginData
    }

    return {success: success, data: data, error: error}
}

export const logout = async () => {
    const { error } = await supabase.auth.signOut()
    user.set(null);
    if (error) {console.log(error)}
}

//api function to get username from the usernames table
export const getUsername = async (userId) => {

    let success = false
    let data = null

    const {data:usernameData, error} = await supabase.from('usernames').select('username').eq('user_id', userId)

    if (error) {console.log(error)}
    else{
        console.log("getUsername: ", usernameData)
        success = true
        data = usernameData
    }
    return {success: success, data: data, error: error}
}

// get the current user session, if one exists
export const getUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user;
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

//api function to get reviews from course id
export const getReviews = async (courseId) => {
    let success = false
    let data = null
    const {data:reviewData, error} = await supabase.from('reviews').select('*').eq('course_id', courseId)
    if(error){
        console.log(error)
    }
    else{
        console.log("getReviews: ",reviewData)
        success = true
        data = reviewData
    }
    return {success: success, data: data, error: error}
}

//api function to add review to the reviews table with (review,rating,userid,courseid)
export const addReview = async (courseId, userId, review, rating) => {
    let success = false
    let data = null
    const {data:reviewData, error} = await supabase.from('reviews').insert([
        {review_text: review, rating: rating, user_id: userId, course_id: courseId}]).select('*')
    if(error){
        console.log(error)
    }
    else{
        console.log("addReview: ",reviewData)
        success = true
        data = reviewData
    }
    return {success: success, data: data, error: error}
}

//api function to edit reviews in reviews table with (review_id)
export const editReview = async (review_id, review, rating) => {
    let success = false
    let data = null
    const {data:reviewData, error} = await supabase.from('reviews').update({review_text: review, rating: rating}).eq('id', review_id)
    if(error){
        console.log(error)
    }
    else{
        console.log("editReview: ",reviewData)
        success = true
        data = reviewData
    }
    return {success: success, data: data, error: error}
}

//api function to delete reviews in reviews table with (review_id) by setting deleted to true
export const deleteReview = async (review_id) => {
    let success = false
    let data = null
    const {data:reviewData, error} = await supabase.from('reviews').update({deleted: true}).eq('id', review_id)
    if(error){
        console.log(error)
    }
    else{
        console.log("deleteReview: ",reviewData)
        success = true
        data = reviewData
    }
    return {success: success, data: data, error: error}
}

// api function to view Jobs posts
export const getJobPost = async () => {

    let success = false
    let data = null

    const {data: jobData, error} = await supabase.from('job_posting').select().eq('deleted', false)

    if (error) {console.log(error)}
    else {success = true, data = jobData}

    return {success: success, data: data, error: error}
}

// add a new job posting
export const addJobPost = async (userID, organization, contactNumber, jobType, payRange, description) => {

    let success = false;
    let data = null

    const {data: jobData, error} = await supabase.from('job_posting').insert([
        {user_id: userID, organization: organization, contact_number: contactNumber, job_type: jobType, pay_range: payRange, description: description}
    ])

    if (error) {console.log(error)}
    else {success = true; data = jobData}

    return {success: success, data: data, error: error}
}

// edit an existing job posting
export const editJobPost = async (organizationName, contactNumber, payRange, emailAddress, jobType, description_job, job_id) => {
    let success = false
    let data = null
    const {data:jobData, error} = await supabase.from('jobposting').update({description: description_job, organization_name: organizationName, contact_number: contactNumber, email_address: emailAddress, pay_range: payRange, job_type: jobType}).eq('id', job_id)
    if(error){
        console.log(error)
    }
    else{
        console.log("Edit Job Post: ", jobData)
        success = true
        data = jobData
    }
    return {success: success, data: data, error: error}
}

// delete an existing job posting
export const deleteJobPost = async (job_posting_id) => {

    let success = false
    let data = null

    const { data: jobData, error } = await supabase.from('job_posting').update({deleted: true}).eq('job_posting_id', job_posting_id)
    
    if (error) {console.log(error)}
    else {success = true, data = jobData}

    return {success: success, data: data, error: error}
}