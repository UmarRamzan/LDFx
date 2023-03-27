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
export const addReview = async (review, rating, courseId,userId) => {
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


// api function to view Jobs posts:

export const getJobPosts = async () => {
    let success = false
    let data = null
    const {data:jobData, error} = await supabase.from('jobposting').select()
    if(error){
        console.log(error)
    }
    else{
        console.log("Get Job Posts: ",jobData)
        success = true
        data = jobData
    }
    return {success: success, data: data, error: error}
}

// api function to add Job posts:
export const addJobPosts = async (organizationName, contactNumber, payRange, emailAddress, jobType, description_job, userID) => {
    let success = false
    let data = null
    const {data:jobData, error} = await supabase.from('jobposting').insert([
        {description: description_job, organization_name: organizationName, contact_number: contactNumber, email_address: emailAddress, pay_range: payRange, job_type: jobType, user_id: userID}]).select('*')
    if(error){
        console.log(error)
    }
    else{
        console.log("Add Job Post: ",jobData)
        success = true
        data = jobData
    }
    return {success: success, data: data, error: error}
}

// api function to edit job posts:
export const editJobPosts = async (organizationName, contactNumber, payRange, emailAddress, jobType, description_job, job_id) => {
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

// api function to delete job posts:

export const deleteJobPosts = async (job_id) => {
    let success = false
    let data = null
    const {data:jobData, error} = await supabase.from('jobposting').update({deleted: true}).eq('id', job_id)
    if(error){
        console.log(error)
    }
    else{
        console.log("Delete Job Post: ",jobData)
        success = true
        data = jobData
    }
    return {success: success, data: data, error: error}
}


// donoation posts api functions by Ayza

export const getDonationPosts = async () => {
    let success = false
    let data = null
    const {data:donationData, error} = await supabase.from('donationposting').select()
    if(error){
        console.log(error)
    }
    else{
        console.log("Get Donation Posts: ", donationData)
        success = true
        data = donationData
    }
    return {success: success, data: data, error: error}
}

//api function to add review to the reviews table with (review,rating,userid,courseid)
export const addDonationPosts = async (fullName, contactNumber, emailAddress, relatedTags, descriptionDon, userID) => {
    let success = false
    let data = null
    const {data:donationData, error} = await supabase.from('donationposting').insert([
        {full_name: fullName, contact_number: contactNumber, user_id: userID, email_address: emailAddress, related_tags: relatedTags, description: descriptionDon}]).select('*')
    if(error){
        console.log(error)
    }
    else{
        console.log("Add Donation Posts: ", donationData)
        success = true
        data = donationData
    }
    return {success: success, data: data, error: error}
}

//api function to edit reviews in reviews table with (review_id)
export const editDonationPosts = async (fullName, contactNumber, emailAddress, relatedTags, descriptionDon, donation_id) => {
    let success = false
    let data = null
    const {data:donationData, error} = await supabase.from('donationposting').update({full_name: fullName, contact_number: contactNumber, email_address: emailAddress, related_tags: relatedTags, description: descriptionDon}).eq('id', donation_id)
    if(error){
        console.log(error)
    }
    else{
        console.log("Edit Donation Posts: ", donationData)
        success = true
        data = donationData
    }
    return {success: success, data: data, error: error}
}

//api function to delete reviews in reviews table with (review_id) by setting deleted to true
export const deleteDonationPosts = async (donation_id) => {
    let success = false
    let data = null
    const {data:donationData, error} = await supabase.from('donationposting').update({deleted: true}).eq('id', donation_id)
    if(error){
        console.log(error)
    }
    else{
        console.log("Delete Donation Posts: ", donationData)
        success = true
        data = donationData
    }
    return {success: success, data: data, error: error}
}