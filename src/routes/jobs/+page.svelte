<script>

    // @ts-nocheck

    import { 
        getUserData,
        addJobPost,
        getJobPost,
        editJobPost,
        deleteJobPost,
    } from "$lib/api/clientFunctions";

    import { getJobComments,addJobComment,getJobLikes,addJobLike,editJobLike } from "$lib/api/csFunctions";


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
            jobPostings = data
            //get job likes
            let res = await getJobLikes();
            if (res.success) {
                //get the disabled likes and dislikes dictionary from local storage
                let temp = JSON.parse(localStorage.getItem("jobDisableState"));

                if (temp && temp.userid === currentUser.id) {
                    disableLikes = temp.states.disableLikes;
                    disableDislikes = temp.states.disableDislikes;
                }

                for (let i = 0; i < res.data.length; i++) {
                    const { job_id } = res.data[i];
                    disableLikes[job_id] = disableLikes[job_id] ?? false;
                    disableDislikes[job_id] = disableDislikes[job_id] ?? false;
                    postLikes[job_id] = res.data[i];
                }
            } else {
                console.log(res.error.message)
            }
        } else {
            console.log(error)
        }
    
    })

    let organization = '';
    let contactNumber = '';
    let jobType = '';
    let payRange = '';
    let description = '';

    const resetValues = () => {
        organization = '';
        contactNumber = '';
        jobType = '';
        payRange = '';
        description = '';
    }

    let currentPostId = null;

    const createJobPosting = async () => {
        let response = await addJobPost(currentUser.id, organization, contactNumber, jobType, payRange, description)
        console.log(response)

        let newPost = {user_id: currentUser.id, organization: organization, contact_number: contactNumber, job_type: jobType, pay_range: payRange, description: description}
        jobPostings = [newPost, ...jobPostings]
    }

    const openEditModal = (postId) => {

        currentPostId = postId;

        // find the post in the array
        let post = jobPostings.find((post) => {
            return post.job_posting_id == postId;
        });

        // update the values
        organization = post.organization;
        contactNumber = post.contact_number;
        jobType = post.job_type;
        payRange = post.pay_range;
        description = post.description;

    }

    const handleEdit = async (postId) => {

        
    let response = await editJobPost(
        organization,
        contactNumber,
        payRange,
        jobType,
        description,
        currentPostId
    );

    // edit the post in the array
    jobPostings = jobPostings.map((post) => {
        if (post.job_posting_id == currentPostId) {
            post.contact_number = contactNumber;
            post.organization = organization;
            post.pay_range = payRange;
            post.job_type = jobType;
            post.description = description;
        }
        return post;
    });

    if (response.error) {console.log(error)}

    console.log(response);
  };

    //save the disabled likes and dislikes dictionary to local storage with user id as key
    const saveDisabledState = () => {
        const temp = {userid:currentUser.id, states:{disableLikes,disableDislikes}}
        localStorage.setItem("jobDisableState",JSON.stringify(temp))
    }

    const deleteJobPosting = async (jobPostingID) => {
        jobPostings = jobPostings.filter((posting) => {posting.job_posting_id != jobPostingID})
        let { success, data, error } = deleteJobPost(jobPostingID)
        if (error) {console.log(error)}
    }

    let postLikes = {}
    let disableLikes = {}
    let disableDislikes = {}

    const likePost = async (job_id) => {
        if (disableLikes[job_id]) {
        return
        }
        disableLikes[job_id] = true;
        saveDisabledState();

        
        if (postLikes[job_id]) {
            postLikes[job_id].likes += 1;
        
        //update database
            let res = await editJobLike(job_id,postLikes[job_id].likes,postLikes[job_id].dislikes)
            if (res.success) {
                console.log(res.data)
            } else {
                console.log(res.error);
            }

        } else {
            //add row to database then update postLikes
            let res = await addJobLike(job_id,1,0)
            if (res.success) {
                console.log(res.data)
                postLikes[job_id] = res.data;
            } else {
                console.log(res.error);
            }
        }
        console.log(postLikes);
    };


    
    const dislikePost = async (job_id) => {
        if (disableDislikes[job_id]) {
        return
        }
        disableDislikes[job_id] = true;
        saveDisabledState();
        
        if (postLikes[job_id]) {
            postLikes[job_id].dislikes += 1;
        
        //update database
            let res = await editJobLike(job_id,postLikes[job_id].likes,postLikes[job_id].dislikes)
            if (res.success) {
                console.log(res.data)
            } else {
                console.log(res.error);
            }

        } else {
            //add row to database then update postLikes
            let res = await addJobLike(job_id,0,1)
            if (res.success) {
                console.log(res.data)
                postLikes[job_id] = res.data;
            } else {
                console.log(res.error);
            }
        }
        console.log(postLikes);
    };

</script>

<div class="container-md content">

<div class="mt-4">
    <div class="row align-items-center">

        <!-- Page title -->
        <div>
            <p class = "col-1">Job Posts</p>
        </div>

        {#if $user}
        <!-- Button trigger create posting modal -->
        <div class="col-3">
            <button class="create-posting-button btn-block-1" data-bs-toggle="modal" data-bs-target="#posting-modal">
                <p class = "col-5">Create Post</p>
            </button>
        </div>
        {/if}
        
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
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:abort={resetValues}></button>
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
            <button type="button" class="cancel-button" data-bs-dismiss="modal"><h6>Cancel</h6></button>
            <button type="button" class="create-button" id="submit-button" data-bs-dismiss="modal" on:click={createJobPosting}><h6>Create</h6></button>
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
            <button type="button" class="cancel-button" data-bs-dismiss="modal"><h6>Cancel</h6></button>
            <button type="button" class="create-button" id="submit-button" data-bs-dismiss="modal" on:click={handleEdit}><h6>Create</h6></button>
        </div>
        </div>
    </div>
</div>

<!-- Comments modal -->
<div class="modal fade" id="comments-modal-jobs" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
            <div class="modal-title">
                <p class = "col-4">Comments</p>
              </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {#if commentsPending}
          <p style="margin: auto;">Loading...</p>
        {:else}
          <div class="modal-body">
            {#each comments as comment}
                <div>
                    <p class="comment-user">{comment.username}</p>
                    <p class = "form-control-user">{comment.text}</p>
                </div>
            {/each}
          </div>
        {/if}
        <div class="modal-footer">
          <button type="button" class="close-button" data-bs-dismiss="modal"><h6>Close</h6></button>
          <button type="button" class="comment-button" data-bs-toggle="modal" data-bs-target="#comment-posting-modal" data-bs-dismiss="modal"><h6>Add Comment</h6></button>
        </div>
      </div>
    </div>
  </div>

  <!-- Add comment modal -->
<div class="modal fade" id="comment-posting-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" id="create-posting-content">
  
        <div class="modal-header">
            <div class="modal-title fs-5" id="staticBackdropLabel">
                <p class="col-4">Add Comment</p>
              </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        
        <div class="modal-body">
            <div class="mb-3">
                <input type="text" class="form-control" id="commentID" placeholder="comment text" bind:value={commentText}>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="cancel-button" data-bs-dismiss="modal"><h6>Cancel</h6></button>
            <button type="button" class="create-button" id="submit-button" data-bs-dismiss="modal" on:click={addComment}><h6>Create</h6></button>
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
                            <label for="organizationName"><h5>Organization Name</h5></label>
                            <input type="text" class="form-control" id="organizationName" readonly value={jobData.organization}>
                        </div>
                        <div class="form-group">
                            <label for="contactNumber"><h5>Contact Number</h5></label>
                            <input type="text" class="form-control" id="contactNumber" readonly value={jobData.contact_number}>
                        </div>
                        <div class="form-group">
                            <label for="jobType"><h5>Job Type</h5></label>
                            <input type="text" class="form-control" id="jobType" readonly value={jobData.job_type}>
                        </div>
                        <div class="form-group">
                            <label for="payRange"><h5>Pay Range</h5></label>
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
                                <button class = "btn btn-light btn-block" data-bs-toggle="modal" data-bs-target="#comments-modal-jobs" on:click={()=>{loadComments(jobData.job_posting_id)}}>
                                  <div class = "icon"> 
                                    <i class="bi bi-chat-square"></i>
                                  </div>
                                    <p class = "col-2">Comment</p>
                                </button>
                              </div>

                              <div class = "icon-1">
                                <button class = "btn btn-light btn-block" on:click={() => {likePost(jobData.job_posting_id)}} disabled={disableLikes[jobData.job_posting_id]}>
                                  <div class = "icon"> 
                                    <i class="bi bi-hand-thumbs-up" ></i>
                                  </div>
                                    {#if disableLikes[jobData.job_posting_id]}
                                      <p class = "col-2">Liked</p>
                                    {:else}
                                      <p class = "col-2">Like</p>
                                    {/if}
                                    
                                    {#if postLikes[jobData.job_posting_id]}
                                        <p class = "col-2">{postLikes[jobData.job_posting_id].likes}</p>
                                    {:else}
                                        <p class = "col-2">0</p>
                                    {/if}
                                </button> 
                            </div>



                            <div class = "icon-1">
                                <button class = "btn btn-light btn-block" on:click={() => {dislikePost(jobData.job_posting_id)}} disabled={disableDislikes[jobData.job_posting_id]}>
                                  <div class = "icon"> 
                                    <i class="bi bi-hand-thumbs-down" ></i>
                                  </div>
                                    {#if disableDislikes[jobData.job_posting_id]}
                                        <p class = "col-2">Disliked</p>
                                    {:else}
                                        <p class = "col-2">Dislike</p>
                                    {/if}
                                    
                                    {#if postLikes[jobData.job_posting_id]}
                                        <p class = "col-2">{postLikes[jobData.job_posting_id].dislikes}</p>
                                    {:else}
                                        <p class = "col-2">0</p>
                                    {/if}
                                  </button> 
                              </div>     
                        </div>
                    </div>
                </div>
            </div>     
            </div>

            {#if $user && $user.id == jobData.user_id}
            <div class="row mt-3">
                <div class="col w-10">
                    <button type="button" class="edit-button" id="edit-posting-button" data-bs-toggle="modal" data-bs-target="#edit-posting-modal" on:click={()=>openEditModal(jobData.job_posting_id)}>
                        <h6>Edit</h6>
                    </button>
                </div>
                <div class="col w-10">
                    <button type="button" class="ecancel-button" id="submit-button" on:click={()=>deleteJobPosting(jobData.job_posting_id)}><h6>Delete</h6></button>
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



    .col-5
  {
    font-family: 'Chau Philomene One';
    /* display: inline; */
    font-size: 15px;
    /* color: #ffffff; */
    width: auto;
    margin: 2%;
    margin-top: -1%;
    /* margin: 0 auto; */
    /* padding: 3%; */
    /* padding-right: 200px; */
  }
  .col-5:hover
  {
    color: var(--quinary);
  }
     .hor
    {
        margin-bottom: 25px;
        color: solid var(--senary);
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
        max-width: 1000px;
        margin: auto;
        margin-top: 40px;
        border: None;
        border-radius: 40px;
        background-color: var(--secondary);
        padding-top: 20px;
        padding-bottom: 20px;
        box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
        font-family: 'Chau Philomene One';
    }
    .card 
    {
        background-color: var(--other-primary);
        border-radius: 20px;
        border: None;     
        width: 98%;
        margin-left: 1%;
    }
    #create-posting-content 
    {
        background-color: var(--secondary);
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
        padding-top: 2%;
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
        padding-top: 2%;
    }
    .create-button:hover 
    {
        background-color: var(--other-primary);
        color: var(--quinary);
        font-family: 'Chau Philomene One';
    }
    .cancel-button:hover
    {
        background-color: var(--other-primary);
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
        width: 30%;
        margin-top: 3%;
        font-size: 16px;
        margin-left: 8%;
        padding-top: 2%;
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
        width: 32%;
        font-size: 15px;
        margin-left: 50%;
        margin-top: 3%;
        padding-top: 2%;
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
        width: 30%;
        padding-bottom: -100%;
        font-family: 'Chau Philomene One';
        border: None;
        color: #ffffff;
        background-color: var(--septanry);
        border-radius: 20px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        justify-content: top;
        padding-top: 1%;
        /* padding-bottom: 2%; */
        font-size: 18px;
        margin-top: -8%;
        display: block;
    }
    .btn-block-1:hover 
    {
        background-color: var(--other-primary);
        color: var(--quinary);
        font-family: 'Chau Philomene One';
    }
    #comments-modal-donations
    {
      color: var(----quinary);
    }
    .modal-content
    {
      background-color: var(--secondary);
    }
    .comment-button
    {
      font-family: 'Chau Philomene One';
      border: None;
      color: #ffffff;
      background-color: var(--septanry);
      border-radius: 20px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      width: 35%;
      padding-top: 10px;
    }
    .comment-button:hover
    {
      background-color: var(--other-primary);
      color: var(--quinary);
      font-family: 'Chau Philomene One';
    }
    .close-button
    {
      font-family: 'Chau Philomene One';
      border: None;
      background-color: var(--octonary); 
      color: #ffffff;
      border-radius: 20px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      width: 20%;
      width: 35%;
      padding-top: 10px;
    }
    .close-button:hover
    {
      background-color: var(--other-primary);
      color: var(--octonary);
      font-family: 'Chau Philomene One';
    }
    .comment-user
    {
      font-family: 'Chau Philomene One';
      font-size: 20px;
      color: var(--quinary);
    }
    .form-control-user
    {
      background-color: var(--senary);
      border-radius: 15px;
      width: 100%;
      color: var(--quinary);
      font-family: 'Chakra Petch';
      margin-left: 1%;
      border: None;
      margin-top: -1%;
      margin-bottom: 1%;
      font-size: 17px;
      padding-left: 2%;
   }
   .icon-1
  {
    margin-left: -3%;
  }
</style>