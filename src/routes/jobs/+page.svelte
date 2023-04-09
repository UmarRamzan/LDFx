<script>

    // @ts-nocheck

    import { 
        getUserData,
        addJobPost,
        getJobPost,
        editJobPost,
        deleteJobPost,
    } from "$lib/api/clientFunctions";

    import { getJobComments,addJobComment } from "$lib/api/csFunctions";


    import { onMount } from "svelte";
    import { user,username } from "../../routes/UserStore";

    let currentUser = null;
    let jobPostings = []
    let comments = ["dummy1","dummy2"];
    let commentsPending = true;
    let commentText = ''
    let tempJobID
  
    async function loadComments(job_id) {
        tempJobID = job_id
        commentsPending = true;
        let { success, data, error } = await getJobComments(job_id);
        if (success) {
        comments = data;
        commentsPending = false;
        } else {
        console.log(error);
        }
    }

    const addComment = async () => {
        let response = await addJobComment(tempJobID,$user.id,$username,commentText);
        console.log(response);
    };

    onMount( async () => {
        let user = await getUserData();
        if (user) { currentUser = user } 

        let { success, data, error } = await getJobPost();

        if (success) {
            jobPostings = data;
            console.log(data)
        } else {
            console.log(error)
        }
    
    })

    let organization = '';
    let contactNumber = '';
    let jobType = '';
    let payRange = '';
    let description = '';

    const createJobPosting = async () => {
        let response = await addJobPost(currentUser.id, organization, contactNumber, jobType, payRange, description)
        console.log(response)
        jobPostings.push({userID: currentUser.id, organization: organization, contact_number: contactNumber, job_type: jobType, pay_range: payRange, description: description})
        jobPostings = jobPostings;
    }

    const editJobposting = async () => {

    }

    const deleteJobPosting = async (jobPostingID) => {
        let { success, data, error } = deleteJobPost(jobPostingID)
        if (error) {console.log(error)}
        else {
            jobPostings = jobPostings.filter((posting) => {posting.job_posting_id != jobPostingID})
        }
    }

    let postLikes = []
    let postDislikes = []

    const likePost = (donation_id) => {
        const postLikeIndex = postLikes.findIndex((like) => like.id === donation_id);

        if (postLikeIndex !== -1) {
        postLikes[postLikeIndex].likes += 1;
        } else {
        postLikes.push({ id: donation_id, likes: 1 });
        }

        console.log(postLikes);
        console.log(postLikes.find((like) => like.id === donation_id).likes);
    };

    
    const dislikePost = (donation_id) => {
        const postDisLikeIndex = postDislikes.findIndex((dislikes) => dislikes.id === donation_id);

        if (postDisLikeIndex !== -1) {
        postDislikes[postDisLikeIndex].dislikes += 1;
        } else {
        postDislikes.push({ id: donation_id, dislikes: 1 });
        }

    };

</script>

<div class="content">

<div class="container mt-4">
    <div class="row align-items-center">

        <!-- Page title -->
        <div>
            <p class = "col-1">Job Posts</p>
        </div>
        <!-- Button trigger create posting modal -->
        <div class="col-3">
            <button class="create-posting-button btn-block-1" data-bs-toggle="modal" data-bs-target="#posting-modal">
                Create Post
            </button>
        </div>
        
    </div>
    <hr class = "hor">
</div>


<!-- Create posting modal -->
<div class="modal fade" id="posting-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" id="create-posting-content">

        <div class="modal-header">
            <div class="modal-title fs-5" id="staticBackdropLabel">
                <p class = "col-4">Create Post</p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        
        <div class="modal-body">
            <div class="mb-3">
                <input type="text" class="form-control-1" id="organization" placeholder="Organization" bind:value={organization}>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control-1" id="contact-number" placeholder="Contact Number" bind:value={contactNumber}>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control-1" id="job-type" placeholder="Job Type" bind:value={jobType}>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control-1" id="pay-range" placeholder="Pay Range" bind:value={payRange}>
            </div>
            <div class="mb-3">
                <textarea class="form-control-1" id="description" rows="4" placeholder="Job Description" bind:value={description}></textarea>
            </div>
        </div>

        <div class="modal-footer">
            <button type="button" class="cancel-button" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="create-button" id="submit-button" data-bs-dismiss="modal" on:click={createJobPosting}>Create</button>
        </div>
        </div>
    </div>
</div>

<!-- Edit posting modal -->
<div class="modal fade" id="edit-posting-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" id="create-posting-content">

        <div class="modal-header">
            <div class="modal-title fs-5" id="staticBackdropLabel">
                <p class = "col-4">Edit Post</p>
              </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        
        <div class="modal-body">
            <div class="mb-3">
                <input type="text" class="form-control-1" id="organization" placeholder="Organization" bind:value={organization}>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control-1" id="contact-number" placeholder="Contact Number" bind:value={contactNumber}>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control-1" id="job-type" placeholder="Job Type" bind:value={jobType}>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control-1" id="pay-range" placeholder="Pay Range" bind:value={payRange}>
            </div>
            <div class="mb-3">
                <textarea class="form-control-1" id="description" rows="4" placeholder="Job Description" bind:value={description}></textarea>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="cancel-button" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="create-button" id="submit-button" data-bs-dismiss="modal" on:click={createJobPosting}>Create</button>
        </div>
        </div>
    </div>
</div>
<!-- Comments modal -->
<div class="modal fade" id="comments-modal-jobs" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Comments</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {#if commentsPending}
          <p>Loading...</p>
        {:else}
          <div class="modal-body">
            {#each comments as comment}
              <div class="comment">
                <p>{comment.username} : {comment.text}</p>
              </div>
            {/each}
          </div>
        {/if}
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#comment-posting-modal" data-bs-dismiss="modal">Add Comment</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Add comment modal -->
<div class="modal fade" id="comment-posting-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" id="create-posting-content">
  
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Comment</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        
        <div class="modal-body">
            <div class="mb-3">
                <input type="text" class="form-control" id="commentID" placeholder="comment text" bind:value={commentText}>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-outline-dark" id="submit-button" data-bs-dismiss="modal" on:click={addComment}>Create</button>
        </div>
        </div>
    </div>
  </div>
    

<div class="container">
    {#each jobPostings as jobData (jobData.job_posting_id)}
    <!-- Code for each card -->
    <div class="job-posting">
    <div class="row mb-4">
        <div class="card p-4">
            <div class="row">
                <div class="col">
                    <form>
                        <div class="form-group">
                            <label for="organizationName"><b>Organization Name</b></label>
                            <input type="text" class="form-control" id="organizationName" readonly value={jobData.organization}>
                        </div>
                        <div class="form-group">
                            <label for="contactNumber"><b>Contact Number</b></label>
                            <input type="text" class="form-control" id="contactNumber" readonly value={jobData.contact_number}>
                        </div>
                        <div class="form-group">
                            <label for="jobType"><b>Job Type</b></label>
                            <input type="text" class="form-control" id="jobType" readonly value={jobData.job_type}>
                        </div>
                        <div class="form-group">
                            <label for="payRange"><b>Pay Range</b></label>
                            <input type="text" class="form-control" id="payRange" readonly value={jobData.pay_range}>
                        </div>
                    </form>
                </div>
                    
                    <div class="col">
                        <div class = "row gx-5">
                          <div class = "form-control">
                            <label for="description" class = "col-3"><b>Description</b></label>
                            <input type="text" class="form-control" id="jobDescription" readonly value = {jobData.description}>
                            <div class = "d-flex gap-3 mb-2">
                              <div class = "icon-1">
                                <button class = "btn btn-light btn-block" data-bs-toggle="modal" data-bs-target="#comments-modal-donations" on:click={()=>{loadComments(donationPost.donation_id)}}>
                                  <div class = "icon"> 
                                    <i class="bi bi-chat-square"></i>
                                  </div>
                                    <p class = "col-2">Comment</p>
                                </button>
                              </div>
                              <div class = "icon-1">
                                <button class = "btn btn-light btn-block" on:click={() => {count+=1} }>
                                  <div class = "icon"> 
                                    <i class="bi bi-hand-thumbs-up" ></i>
                                  </div>
                                    <p class = "col-2">Like</p>
                                    <p class = "col-2">{count}</p>
                                </button> 
                            </div>
                            <div class = "icon-1">
                                <button class = "btn btn-light btn-block" on:click={() => {countdown+=1}}>
                                  <div class = "icon"> 
                                    <i class="bi bi-hand-thumbs-down" ></i>
                                  </div>
                                    <p class = "col-2">Dislike</p>
                                    <p class = "col-2">{postDislikes.find((dislikes) => dislikes.id === donationPost.donation_id)?.dislikes || 0}</p>
                                  </button> 
                              </div>     
                        </div>
                    </div>
                </div>
            </div>     
            </div>

            {#if currentUser && currentUser.id == jobData.user_id}
            <div class="row mt-3">
                <div class="col w-10">
                    <button type="button" class="edit-button" id="edit-posting-button" data-bs-toggle="modal" data-bs-target="#edit-posting-modal">
                        Edit
                    </button>
                </div>
                <div class="col w-10">
                    <button type="button" class="ecancel-button" id="submit-button" on:click={()=>deleteJobPosting(jobData.job_posting_id)}>Delete</button>
                </div>
            </div>
            {/if}
        </div>
    </div>
    </div>
    {/each}
</div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;1,300&family=Chau+Philomene+One&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;1,300&display=swap');
    @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css');

     .hor
    {
        margin-bottom: 25px;
        color: solid var(----senary);
    }
    .col-1
    {
        color: var(--quinary);
        font-family: 'Chau Philomene One';
        font-size: 40px;
        margin-bottom: -15px;
        margin-top: -2%;
        margin-left: 1%;
        width: 100%;

    }
    .content 
    {
        width: 80%;
        margin: auto;
        margin-top: 40px;
        border: None;
        border-radius: 40px;
        background-color: var(--primary);
        padding-top: 20px;
        padding-bottom: 20px;
        box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
        font-family: 'Chau Philomene One';
    }
    .card 
    {
        background-color: var(--secondary);
        border-radius: 20px;
        border: None;     
        width: 98%;
        margin-left: 1%;
    }
    #create-posting-content 
    {
        background-color: #ffe5d9;
        font-family: 'Chakra Petch';
    }
    .form-control 
    {
        margin-top: 15px;
        background-color: var(--senary);
        border-radius: 20px;
        margin-bottom: 20px;
        width: 60%;
        color: var(--quinary);
        font-family: 'Chakra Petch';
        padding-left: 2%;
        border: None;
    }
    .gx-5
    {
        margin-left: -18%;
        position: absolute;
        width: 108%;
        height: auto;
        margin-top : -1.5%;
    }
    .icon
    {
        margin-left: 15%;
        color: var(--quinary);
    }
    .mb-2
    {
        padding-top: 29%;
        padding-left: 2%;
        display: flex;
        margin-right: 20px;
    }
    .btn-light
    {
        background-color: var(--senary);
        border: None;
        display: block;
    }
    .col-3
    {
        width: 50%;
        font-family: 'Chau Philomene One';
    }
    .col-2
    {
        font-family: 'Chau Philomene One';
        display: inline;
        font-size: 12px;
        color: var(--quinary);
    }
    .col-4
    {
        color: var(--quinary);
        font-family: 'Chau Philomene One';
        /* font-weight: 400; */
        font-size: 30px;
        margin-bottom: -10px;
        margin-top: -2%;
        margin-left: 1%;
        width: 100%;
    }
    .form-control-1
    { 
        background-color: var(--senary);
        border-radius: 20px;
        width: 100%;
        color: var(--quinary);
        font-family: 'Chakra Petch';
        padding-left: 2%;
        border: None;
        margin-top: 1%;
        margin-bottom: -5%;
    }
    .modal-footer
    {
        border: None;
        margin-bottom: 2%;
    }
    .create-button
    {
        font-family: 'Chau Philomene One';
        border: None;
        color: #ffffff;
        background-color: var(--septanry);
        border-radius: 20px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        width: 20%;
    }
    .cancel-button
    {
        font-family: 'Chau Philomene One';
        border: None;
        background-color: var(--octonary); 
        color: #ffffff;
        border-radius: 20px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        width: 20%;
    }
    .create-button:hover 
    {
        background-color: var(--secondary);
        color: var(--quinary);
        font-family: 'Chau Philomene One';
    }
    .cancel-button:hover
    {
        background-color: var(--secondary);
        color: var(--octonary);
        font-family: 'Chau Philomene One';
    }
    ::placeholder 
    { 
        font-family: 'Chau Philomene One';
    }
    .modal-content
    {
        border-radius: 25px;
        border: None;
    }
    .edit-button
    {
        font-family: 'Chau Philomene One';
        border: None;
        color: #ffffff;
        background-color: var(--septanry);
        border-radius: 20px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        width: 20%;
        margin-left: 8%;
    }
    .edit-button:hover 
    {
        background-color: var(--primary);
        color: var(--quinary);
        font-family: 'Chau Philomene One';
    }
    .ecancel-button
    {
        font-family: 'Chau Philomene One';
        border: None;
        background-color: var(--octonary); 
        color: #ffffff;
        border-radius: 20px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        width: 20%;
        margin-left: 70%;
    }
    .ecancel-button:hover
    {
        background-color: var(--primary);
        color: var(--octonary);
        font-family: 'Chau Philomene One';
    }
    .btn-block-1
    {
        margin-left: 170%;
        width: 20%;
        padding-bottom: -100%;
        font-family: 'Chau Philomene One';
        border: None;
        color: #ffffff;
        background-color: var(--septanry);
        border-radius: 20px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        justify-content: top;
        padding-top: 2%;
        padding-bottom: 2%;
        font-size: 18px;
        margin-top: -8%;
        display: block;
    }
    .btn-block-1:hover 
    {
        background-color: var(--secondary);
        color: var(--quinary);
        font-family: 'Chau Philomene One';
    }
</style>