// @ts-nocheck
// @ts-nocheck

import { supabase } from "$lib/supabaseClient";
import { user } from "../../routes/UserStore";

let redirectLink = "http://localhost:5174//emailVerified"

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
            {user_id: signupData.user.id, username: username, email: email}])
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

// obtain the username for a given user id
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

// obtain the email for a given user id
export const getEmail = async (userId) => {

    let success = false

    const {data:emailData, error} = await supabase.from('usernames').select('email').eq('user_id', userId)

    return { success:success, data:emailData, error:error}
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
    const {data:usernameData, error} = await supabase.from('usernames').update({username: username}).eq('user_id', userId).select()
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

export const resetPassword =  async (email) => {
    let success = false
    let data = null
    let error = null

    const {data:passResetData, error:passResetError} = await supabase.auth.resetPasswordForEmail(email, {redirectTo: 'http://localhost:5174/resetPassword',})
    
    if(passResetError){
        console.log(passResetError)
        error = passResetError
    }
    else{
        console.log(passResetData)
        success = true
        data = passResetData
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
    const {data:reviewData, error} = await supabase.from('reviews').update({review_text: review, rating: rating}).eq('id', review_id).select()
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
    const {data:reviewData, error} = await supabase.from('reviews').update({deleted: true}).eq('id', review_id).select()
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

    // sort by date
    jobData.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
    })

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
    ]).select()

    if (error) {console.log(error)}
    else {success = true; data = jobData}

    return {success: success, data: data, error: error}
}

// edit an existing job posting
export const editJobPost = async (organization, contactNumber, payRange, jobType, description, job_id) => {
    let success = false
    let data = null
    const {data:jobData, error} = await supabase.from('job_posting').update({organization: organization, contact_number: contactNumber, job_type: jobType, pay_range: payRange, description: description}).eq('job_posting_id', job_id).select()
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

    const { data: jobData, error } = await supabase.from('job_posting').update({deleted: true}).eq('job_posting_id', job_posting_id).select()
    
    if (error) {console.log(error)}
    else {success = true, data = jobData}

    return {success: success, data: data, error: error}
}

// fetch all swap requests for a given user
export const getSwapRequests = async (userID) => {

    let success = false;

    let swapTableData = []

    const { data:swapData, error } = await supabase
    .from('swaps')
    .select()
    .match({user_id: userID, deleted: false})

    for (const swap of swapData) {

        // obtain the have courses for this swap request
        const { data:haveList, error:haveError } = await supabase
        .from('have')
        .select('course_id, course_title')
        .eq('swap_id', swap.swap_id)

        // obtain the want courses for this swap request
        const { data:wantList, error:wantError } = await supabase
        .from('want')
        .select('course_id, course_title')
        .eq('swap_id', swap.swap_id)

        swapTableData.push({swap_id:swap.swap_id, haveList:haveList, wantList:wantList, status:swap.status})
        console.log(swapTableData)
    }

    if (error) {console.log(error)}
    else {success = true}

    return { success:success, data:swapTableData, error:error }
}

// create a new swap request
export const addSwapRequest = async (userID, haveList, wantList) => {
    
    // add a new entry into the swaps table
    let success = false;
    
    const { data, error } = await supabase
    .from('swaps')
    .insert({ user_id: userID })
    .select()

    if (error) {console.log(error)}

    // add each course in the haveList as a seperate row to the have table
    haveList.forEach(async course => {
        const { error } = await supabase
        .from('have')
        .insert({ swap_id: data[0].swap_id, course_id: course.course_id, course_title: course.course_title })
    });

    // add each course in the wantList as a seperate row to the want table
    wantList.forEach(async course => {
        const { error } = await supabase
        .from('want')
        .insert({ swap_id: data[0].swap_id, course_id: course.course_id, course_title: course.course_title})
    })

    // check if a valid swap currently exists
    const {success: swapSuccess, data: swapData, error: swapError} = await checkSwap(data[0].swap_id, userID)

    return {success: success, data: data, error: error}

}

// check if a valid swap exists for a given swap request
export const checkSwap = async (swapID, userID) => {

    let success = false;

    // obtain the have courses for this swap request
    const { data:haveList, error:haveError } = await supabase
    .from('have')
    .select()
    .eq('swap_id', swapID)

    // obtain the want courses for this swap request
    const { data:wantList, error:wantError } = await supabase
    .from('want')
    .select()
    .eq('swap_id', swapID)

    // scan the have table to find all matches with our want list
    const { data:matchList, error:matchError } = await supabase
    .from('have')
    .select()
    .in('course_id', wantList.map(course => course.course_id))

    console.log("Matches", matchList)

    // for all matches, obtain their want list
    matchList.forEach(async match => {

        // obtain the user id of the match
        const { data:matchData, error:matchError } = await supabase
        .from('swaps')
        .select('user_id')
        .eq('swap_id', match.swap_id)

        let match_user_id = matchData[0].user_id
        console.log(match_user_id)
        console.log(userID)

        // if the match is our own swap request, skip it
        if (match_user_id == userID) {return}

        const { data:matchWantList, error:matchWantError } = await supabase
        .from('want')
        .select()
        .eq('swap_id', match.swap_id)

        console.log("Want List: ", matchWantList)

        // check if any of the courses in the match's want list are in our have list
        matchWantList.forEach(wantCourse => {
            
            haveList.forEach(async haveCourse => {
                if (haveCourse.course_id == wantCourse.course_id) {
                    success = true;

                    // set status of both swaps to 'found'
                    const { data:swapData, error:swapError } = await supabase
                    .from('swaps')
                    .update({ status: 'Found' })
                    .in('swap_id', [swapID, match.swap_id])
                    .select()

                    if (swapError) {console.log(swapError)}
                    else {console.log(swapData)}

                    // store the match in the swap_matches table
                    const { data:matchData, error:matchError } = await supabase
                    .from('swap_matches')
                    .insert({ user_id_one: userID, user_id_two: match_user_id, swap_id_one: swapID, swap_id_two: match.swap_id, course_id_one: haveCourse.course_id, course_id_two: match.course_id })

                    // add notifications to both users
                    const { data:notificationData, error:notificationError } = await supabase
                    .from('notifications')
                    .insert([{ user_id: userID, text: "A swap has been found", type: "swap" }, { user_id: match_user_id, text: "A swap has been found", type: "swap" }])

                    if (notificationError) {console.log(notificationError)}
                    if (matchError) {console.log(matchError)}

                    return;
                }
            })
        })
    })

    return {success: success, data: null, error: null}
}

// set 'deleted' to true for a given swap request
export const deleteSwap = async (swapID) => {
    
        let success = false;
    
        const { data, error } = await supabase
        .from('swaps')
        .update({ deleted: true })
        .eq('swap_id', swapID)
        .select()

        // delete all rows in the have table for this swap request
        const { data:haveData, error:haveError } = await supabase
        .from('have')
        .delete()
        .eq('swap_id', swapID)

        // delete all rows in the want table for this swap request
        const { data:wantData, error:wantError } = await supabase
        .from('want')
        .delete()
        .eq('swap_id', swapID)

        if (haveError) {console.log(haveError)}
    
        if (error) {console.log(error)}
        else {success = true}
    
        return {success: success, data: data, error: error}
}

export const getSwapMatch = async (swapID) => {

    let success = false;
    let data = null;

    // get swap match data where either swap_id_one or swap_id_two is equal to the given swapID
    const { data:matchDataOne, error:matchErrorOne } = await supabase
    .from('swap_matches')
    .select()
    .eq('swap_id_one', swapID)

    const { data:matchDataTwo, error:matchErrorTwo } = await supabase
    .from('swap_matches')
    .select()
    .eq('swap_id_two', swapID)

    data = matchDataOne.concat(matchDataTwo)

    if (matchErrorOne) {console.log(matchErrorOne)}
    if (matchErrorTwo) {console.log(matchErrorTwo)}
    else {success = true}

    return {success: success, data: data, error: matchErrorOne}

}

// fetch a list containing all information present within the courses table
export const getCourses = async () => {

    let success = false
    let data = null

    const {data:courseData, error} = await supabase
    .from('courses')
    .select('*')

    if(error){
        console.log(error)
    }
    else{
        success = true
        data = courseData
    }

    return {success: success, data: data, error: error}
}

// fetch a list container course title for a given course id
export const getCourseTitle = async (courseID) => {

    let success = false
    let data = null

    const {data:courseData, error} = await supabase
    .from('courses')
    .select('course_title')
    .eq('course_id', courseID)

    if(error){
        console.log(error)
    }
    else{
        success = true
        data = courseData
    }

    return {success: success, data: data, error: error}
}

// get all notifications for a given user
export const getNotifications = async (userID) => {
    
        let success = false
        let data = null
    
        const {data:notificationData, error} = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userID)
    
        if(error){
            console.log(error)
        }
        else{
            success = true
            // sort by date
            notificationData.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1)
            data = notificationData
        }
    
        return {success: success, data: data, error: error}
}