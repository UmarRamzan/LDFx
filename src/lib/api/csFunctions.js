// @ts-nocheck
//API FUNCTIONS FOR CLIENT SIDE
import { supabase } from "../supabaseClient";
import { user } from "../../routes/UserStore";
let redirectLink = "http://localhost:5173/emailVerified"

// get the current user session, if one exists
export const getUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user;
}

export const resetPassword =  async (email) => {
    let success = false
    let data = null
    let error = null

    const {data:passResetData, error:passResetError} = await supabase.auth.resetPasswordForEmail(email, {redirectTo: 'http://localhost:5173/resetPassword',})
    
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

export const updatePass = async (new_password)=>{
    let success = false
    let data = null
    let error = null

    const {data:passResetData,error:passResetError} = await supabase.auth.updateUser({password: new_password})
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
    const {data:reviewData, error} = await supabase.from('reviews').update({review_text: review, rating: rating}).eq('review_id', review_id).select()
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
    const {data:reviewData, error} = await supabase.from('reviews').update({deleted: true}).eq('review_id', review_id).select()
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
/*
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
*/

// api function to view Jobs posts
export const getJobPost = async () => {

    let success = false
    let data = null

    const {data: jobData, error} = await supabase.from('job_posting').select().eq('deleted', false||null)

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
export const editJobPost = async (organizationName, contactNumber, payRange, emailAddress, jobType, description_job, job_id) => {
    let success = false
    let data = null
    const {data:jobData, error} = await supabase.from('jobposting').update({description: description_job, organization_name: organizationName, contact_number: contactNumber, email_address: emailAddress, pay_range: payRange, job_type: jobType}).eq('id', job_id).select()
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

// donoation posts api functions by Ayza

export const getDonationPosts = async () => {
    let success = false
    let data = null

    const {data: donationData, error} = await supabase.from('donationposting').select('*').eq('deleted', false)

    // sort by date
    donationData.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
    })

    if (error) {console.log(error)}
    else {success = true, data = donationData}
    console.log("Get Donation Posts: ", data)

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
    const {data:donationData, error} = await supabase.from('donationposting').update({full_name: fullName, contact_number: contactNumber, email_address: emailAddress, related_tags: relatedTags, description: descriptionDon}).eq('donation_id', donation_id).select()
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
    const {data:donationData, error} = await supabase.from('donationposting').update({deleted: true}).eq('donation_id', donation_id).select()
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


export const getDonationComments = async (donation_id) => {
    let success = false
    let data = null

    const {data: donationData, error} = await supabase.from('commentsDonations').select('*').eq('donation_id', donation_id)

    if (error) {console.log(error)}
    else {success = true, data = donationData}
    console.log("Get Donation Comments: ", data)

    return {success: success, data: data, error: error}
}

export const addDonationComment = async (poster_id, donation_id, user_id, username, comment) => {
    let success = false
    let data = null

    const {data: donationData, error} = await supabase.from('commentsDonations').insert([{donation_id: donation_id,text: comment, username:username, user_id:user_id}]).select('*')
    if(error){
        console.log(error)
    }
    else{
        console.log("Add Donation Comment: ", donationData)
        success = true
        data = donationData

        // check settings for this user
        const { data:settingsDataOne, error:settingsErrorOne } = await supabase
        .from('settings')
        .select('*')
        .eq('user_id', user_id)

        if (settingsErrorOne) {console.log(settingsErrorOne)}
        else {console.log(settingsDataOne)}

        if (settingsDataOne[0].donations) {

        //update notification table
        const {data: notificationData, error} = await supabase.from('notifications').insert([{user_id: poster_id, type: "comment", text: "Comment on your donation post", type: "comment-donations"}]).select('*')
        if (error) {console.log(error)}

        }
    }
    return {success: success, data: data, error: error}
}


export const getJobComments = async (job_id) => {
    let success = false
    let data = null

    const {data: donationData, error} = await supabase.from('commentsJobs').select('*').eq('job_id', job_id)

    if (error) {console.log(error)}
    else {success = true, data = donationData}
    console.log("Get job Comments: ", data)

    return {success: success, data: data, error: error}
}

export const addJobComment = async (poster_id, job_id, user_id, username, comment) => {
    let success = false
    let data = null

    const {data: donationData, error} = await supabase.from('commentsJobs').insert([{job_id: job_id,text: comment, username:username, user_id:user_id}]).select('*')
    if(error){
        console.log(error)
    }
    else{
        console.log("Add Job Comment: ", donationData)
        success = true
        data = donationData

        // check settings for this user
        const { data:settingsDataOne, error:settingsErrorOne } = await supabase
        .from('settings')
        .select('*')
        .eq('user_id', user_id)

        if (settingsErrorOne) {console.log(settingsErrorOne)}
        else {console.log(settingsDataOne)}

        if (settingsDataOne[0].jobs) {

            //update notification table
            const {data: notificationData, error} = await supabase.from('notifications').insert([{user_id: poster_id, type: "comment", text: "Comment on your job post", type: "comment-jobs"}]).select('*')
            if (error) {console.log(error)}
        }
    }
    return {success: success, data: data, error: error}
}

//get all likes for donation posts

export const getDonationLikes = async () => {
    let success = false
    let data = null

    const {data: donationData, error} = await supabase.from('likesDonations').select('*')

    if (error) {console.log(error)}
    else {success = true, data = donationData}
    console.log("Get Donation Likes: ", data)

    return {success: success, data: data, error: error}
}

//insert a like for a donation post
export const addDonationLike = async (donation_id,likes,dislikes) => {
    let success = false
    let data = null

    const {data: donationData, error} = await supabase.from('likesDonations').insert([{donation_id: donation_id,likes: likes,dislikes:dislikes}]).select('*')
    if(error){
        console.log(error)
    }
    else{
        console.log("Add Donation Like: ", donationData)
        success = true
        data = donationData
    }
    return {success: success, data: data, error: error}

}

//update a like for a donation post
export const editDonationLike = async (donation_id,likes,dislikes) => {
    let success = false
    let data = null

    const {data: donationData, error} = await supabase.from('likesDonations').update({likes: likes,dislikes:dislikes}).eq('donation_id', donation_id).select('*')
    if(error){
        console.log(error)
    }
    else{
        console.log("Edit Donation Like: ", donationData)
        success = true
        data = donationData
    }
    return {success: success, data: data, error: error}

}

//get all likes for job posts
export const getJobLikes = async () => {
    let success = false
    let data = null

    const {data: donationData, error} = await supabase.from('likesJobs').select('*')

    if (error) {console.log(error)}
    else {success = true, data = donationData}
    console.log("Get Job Likes: ", data)

    return {success: success, data: data, error: error}
}

//insert a like for a job post
export const addJobLike = async (job_id,likes,dislikes) => {
    let success = false
    let data = null

    const {data: donationData, error} = await supabase.from('likesJobs').insert([{job_id: job_id,likes: likes,dislikes:dislikes}]).select('*')
    if(error){
        console.log(error)
    }
    else{
        console.log("Add Job Like: ", donationData)
        success = true
        data = donationData
    }
    return {success: success, data: data, error: error}

}

//update a like for a job post
export const editJobLike = async (job_id,likes,dislikes) => {
    let success = false
    let data = null

    const {data: donationData, error} = await supabase.from('likesJobs').update({likes: likes,dislikes:dislikes}).eq('job_id', job_id).select('*')
    if(error){
        console.log(error)
    }
    else{
        console.log("Edit Job Like: ", donationData)
        success = true
        data = donationData
    }
    return {success: success, data: data, error: error}

}
