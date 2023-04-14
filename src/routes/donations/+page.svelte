<script>
  //donations page
  //use csFunctions to fetch data from the database
  //use the data to populate the page

  // @ts-nocheck

  import { onMount } from "svelte";
  import { getDonationPosts,addDonationPosts,editDonationPosts,deleteDonationPosts,getUserData,getDonationComments,addDonationComment,getDonationLikes,addDonationLike,editDonationLike } from "$lib/api/csFunctions";
  import { user,username } from "../../routes/UserStore";
  import { fade } from "svelte/transition";

  let donationPosts = [];
  let comments = [];
  let commentsPending = true;
  let commentText = ''
  let tempDonationID
  let currentUser
  let currentPostId

  let posterID = null;

  
  async function loadComments(donation_id) {
    tempDonationID = donation_id
    commentsPending = true;
    let { success, data, error } = await getDonationComments(donation_id);
    if (success) {
      comments = data;
      console.log(comments)
      commentsPending = false;
    } else {
      console.log(error);
    }

  }

  const addComment = async () => {
    let response = await addDonationComment(posterID, tempDonationID,$user.id,$username,commentText);
    console.log(response);
  };



  


  onMount(async () => {
    let user = await getUserData();
    if (user) { currentUser = user }

    let { success, data, error } = await getDonationPosts();
    if (success) {
      donationPosts = data;
      //get donation likes
      let res = await getDonationLikes();
      if (res.success) {
        //get local storage for disabled state
        let temp = JSON.parse(localStorage.getItem("donationDisableState"))
        if (temp && temp.userid == currentUser.id) {
          disableLike = temp.states.disableLike
          disableDislike = temp.states.disableDislike
        }
        for (let i = 0; i < res.data.length; i++) {
          const { donation_id } = res.data[i];
          disableLike[donation_id] = disableLike[donation_id] ?? false;
          disableDislike[donation_id] = disableDislike[donation_id] ?? false;
          postLikes[donation_id] = res.data[i];
        
        }

      } else {
        console.log(res.error);
      }
      
    } else {
      console.log(error);
    }

  });

  let fullName = "";
  let contactNumber = "";
  let emailAddress = "";
  let relatedTages = "";
  let description = "";

  const createDonationPost = async () => {

    let response = await addDonationPosts(
      fullName,
      contactNumber,
      emailAddress,
      relatedTages,
      description,
      $user.id
    );

    console.log(response);

    let newPost = {
      donation_id: response.data[0].donation_id,
      user_id: $user.id,
      full_name: fullName,
      contact_number: contactNumber,
      email_address: emailAddress,
      related_tags: relatedTages,
      description: description,
    }
    donationPosts = [newPost, ...donationPosts]

  };

  const handleEdit = async () => {
    let response = await editDonationPosts(
      fullName,
      contactNumber,
      emailAddress,
      relatedTages,
      description,
      currentPostId
    );

    // edit the post in the array
    donationPosts = donationPosts.map((post) => {
      if (post.donation_id == currentPostId) {
        post.full_name = fullName;
        post.contact_number = contactNumber;
        post.email_address = emailAddress;
        post.related_tags = relatedTages;
        post.description = description;
        
      }
      return post;
    });

    if (response.error) {console.log(error)}

    console.log(response);
  };

  const deleteDonationPost = async (donationPostID) => {
    console.log(donationPostID)
    let { success, data, error } = await deleteDonationPosts(donationPostID);
    if (error) {
      console.log(error);
    } else {
      donationPosts = donationPosts.filter(
        (posting) => posting.donation_id != donationPostID
      );
    }
  };

  const saveDisabledState = () => {
        const temp = {userid:currentUser.id, states:{disableLike,disableDislike}}
        localStorage.setItem("donationDisableState",JSON.stringify(temp))
    }

  let postLikes = {}
  let disableLike = {}
  let disableDislike = {}

  const likePost = async (donation_id) => {
    if (disableLike[donation_id]) {
      return
    }
    disableLike[donation_id] = true;
    saveDisabledState();
    
    if (postLikes[donation_id]) {
      postLikes[donation_id].likes += 1;
      
      //update database
      let res = await editDonationLike(donation_id,postLikes[donation_id].likes,postLikes[donation_id].dislikes)
      if (res.success) {
        console.log(res.data)
      } else {
        console.log(res.error);
      }

    } else {
      //add row to database then update postLikes
      let res = await addDonationLike(donation_id,1,0)
      if (res.success) {
        console.log(res.data)
        postLikes[donation_id] = res.data;
      } else {
        console.log(res.error);
      }
    }

    console.log(postLikes);
  };

  
  const dislikePost = async (donation_id) => {
    if (disableDislike[donation_id]) {
      return
    }
    disableDislike[donation_id] = true;
    saveDisabledState();
    
    if (postLikes[donation_id]) {
      postLikes[donation_id].dislikes += 1;
      
      //update database
      let res = await editDonationLike(donation_id,postLikes[donation_id].likes,postLikes[donation_id].dislikes)
      if (res.success) {
        console.log(res.data)
      } else {
        console.log(res.error);
      }

    } else {
      //add row to database then update postLikes
      let res = await addDonationLike(donation_id,0,1)
      if (res.success) {
        console.log(res.data)
        postLikes[donation_id] = res.data;
      } else {
        console.log(res.error);
      }
    }

    console.log(postLikes);
  };

</script>

<div class="container-md content" in:fade>

<div class="mt-4">
  <div class="row align-items-center">

      <!-- Page title -->
      <div >
          <p class = "col-1">Donations</p>
      </div>
      <!-- Button trigger create posting modal -->
      {#if $user}

      <div class="col-3">
          <button class="create-posting-button btn-block-1" data-bs-toggle="modal" data-bs-target="#posting-modal">
              <h6 class = "col-5">Create Post</h6>
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
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body">
          <div class="mb-3">
              <input type="text" class="form-control-1" id="organization2" placeholder="fullname" bind:value={fullName}>
          </div>
          <div class="mb-3">
              <input type="text" class="form-control-1" id="contact-number2" placeholder="contact number" bind:value={contactNumber}>
          </div>
          <div class="mb-3">
              <input type="text" class="form-control-1" id="job-type2" placeholder="email" bind:value={emailAddress}>
          </div>
          <div class="mb-3">
            <textarea class="form-control-1" id="description2" rows="4" placeholder="relatedTags" bind:value={relatedTages}></textarea>
          </div>
          <div class="mb-3">
              <textarea class="form-control-1" id="description3" rows="4" placeholder="description" bind:value={description}></textarea>
          </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="cancel-button" data-bs-dismiss="modal"><h6>Cancel</h6></button>
          <button type="button" class="create-button" id="submit-button" data-bs-dismiss="modal" on:click={createDonationPost}><h6>Create</h6></button>
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
          <input type="text" class="form-control-1" id="organization" placeholder="fullname" bind:value={fullName}>
        </div>
        <div class="mb-3">
            <input type="text" class="form-control-1" id="contact-number" placeholder="contact number" bind:value={contactNumber}>
        </div>
        <div class="mb-3">
            <input type="text" class="form-control-1" id="job-type" placeholder="email" bind:value={emailAddress}>
        </div>
        <div class="mb-3">
          <textarea class="form-control-1" id="description" rows="4" placeholder="relatedTags" bind:value={relatedTages}></textarea>
        </div>
        <div class="mb-3">
            <textarea class="form-control-1" id="description" rows="4" placeholder="description" bind:value={description}></textarea>
        </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="cancel-button" data-bs-dismiss="modal"><h6>Cancel</h6></button>
          <button type="button" class="create-button" id="submit-button" data-bs-dismiss="modal" on:click={handleEdit}><h6>Create</h6></button>
      </div>
      </div>
  </div>
</div>

<!-- Comments Modal -->
<div class="modal fade" id="comments-modal-donations" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">
          <p class = "col-4">Comments</p>
        </div>
        <button type="button" class = "btn-close" data-bs-dismiss="modal" aria-label="Close">
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
  {#each donationPosts as donationPost }
  <!-- Code for each card -->
  <div class="job-posting">
  <div class="row mb-4">
      <div class="card p-4">
          <div class="row">
              <div class="col">
                  <form>
                      <div class="form-group">
                          <label for="emailAddress"><h5>Email Address</h5></label>
                          <input type="text" class="form-control" id="organizationName" readonly value={donationPost.email_address}>
                      </div>
                      <div class="form-group">
                          <label for="contactNumber"><h5>Contact Number</h5></label>
                          <input type="text" class="form-control" id="contactNumber" readonly value={donationPost.contact_number}>
                      </div>
                      <div class="form-group">
                          <label for="relatedTags"><h5>Related tags</h5></label>
                          <input type="text" class="form-control" id="jobType" readonly value={donationPost.related_tags}>
                      </div>
                  </form>
              </div>       
              <div class="col">
                <div class = "row gx-5">
                  <div class = "form-control">
                    <label for="description" class = "col-3"><b>Description</b></label>
                    <input type="text" class="form-control" id="jobDescription" readonly value = {donationPost.description}>
                    <div class = "d-flex gap-3 mb-2">
                      <div class = "icon-1">
                        <button class = "btn btn-light btn-block" data-bs-toggle="modal" data-bs-target="#comments-modal-donations" on:click={()=>{loadComments(donationPost.donation_id); posterID=donationPost.user_id}}>
                          <div class = "icon"> 
                            <i class="bi bi-chat-square"></i>
                          </div>
                            <p class = "col-2">Comment</p>
                        </button>
                      </div>
                      <div class = "icon-1">
                          <button class = "btn btn-light btn-block" on:click={() => {likePost(donationPost.donation_id)} } disabled={disableLike[donationPost.donation_id]}>
                            <div class = "icon"> 
                              <i class="bi bi-hand-thumbs-up" ></i>
                            </div>
                            {#if disableLike[donationPost.donation_id]}
                              <p class = "col-2">Liked</p>
                            {:else}
                              <p class = "col-2">Like</p>
                            {/if}
                            
                            {#if postLikes[donationPost.donation_id]}
                              <p class = "col-2">{postLikes[donationPost.donation_id].likes}</p>
                            {:else}
                              <p class = "col-2">0</p>
                            {/if}

                          </button> 
                      </div>
                      <div class = "icon-1">
                        <button class = "btn btn-light btn-block" on:click={() => {dislikePost(donationPost.donation_id)}} disabled={disableDislike[donationPost.donation_id]}>
                          <div class = "icon"> 
                            <i class="bi bi-hand-thumbs-down" ></i>
                          </div>
                            {#if disableDislike[donationPost.donation_id]}
                              <p class = "col-2">Disliked</p>
                            {:else}
                              <p class = "col-2">Dislike</p>
                            {/if}
                            
                            {#if postLikes[donationPost.donation_id]}
                              <p class = "col-2">{postLikes[donationPost.donation_id].dislikes}</p>
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
          
          {#if $user && $user.id == donationPost.user_id}
          <div class="row mt-3">
              <div class="col w-10">
                  <button type="button" class="edit-button" id="edit-posting-button" data-bs-toggle="modal" data-bs-target="#edit-posting-modal" on:click={()=>{fullName = donationPost.full_name;contactNumber=donationPost.contact_number;emailAddress=donationPost.email_address;relatedTages=donationPost.related_tags;description=donationPost.description; currentPostId = donationPost.donation_id} }>
                      <h6>Edit</h6>
                  </button>
              </div>
              <div class="col w-10">
                  <button type="button" class="ecancel-button" id = "submit-button" on:click={()=>deleteDonationPost(donationPost.donation_id)}><h6>Delete</h6></button>
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

  .col-1
  {
    color: var(--quinary);
    font-family: 'Chau Philomene One';
    font-size: 30px;
    margin-bottom: -10px;
    margin-top: -2%;
    margin-left: 1%;
  }
  .hor
  {
    margin-bottom: 25px;
    color: solid var(--senary);
  }

  .col
  {
    color: var(--quinary);
    font-family: 'Chau Philomene One';
    font-size: 20px;
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
  .bi-chat-square 
    {
        font-size: 1.5rem;
        color: var(--quinary);
    }
    .bi-chat-square:hover {
        color: blue;
    }
    .bi-hand-thumbs-up {
        font-size: 1.5rem;
        color: var(--quinary);
    }
    .bi-hand-thumbs-up:hover {
        color: green;
    }
    .bi-hand-thumbs-down {
        font-size: 1.5rem;
        color: var(--quinary);
    }
    .bi-hand-thumbs-down:hover {
        color: red;
    }
  #create-posting-content 
  {
    background-color: var(--secondary);
    font-family: "Chakra Petch";
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
    margin-left: -16%;
    position: absolute;
    width: 107%;
    height: auto;
    margin-top : -1.5%;
  }

  .col-2
  {
    font-family: 'Chau Philomene One';
    display: inline;
    font-size: 12px;
    color: var(--quinary);
  }
  .col-3
  {
    width: 120%;
    font-family: 'Chau Philomene One';
  }
  .icon
  {
    margin-left: 15%;
    color: var(--quinary);
  }
  .mb-2
  {
    padding-top: 18%;
    padding-bottom: 1%;
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
  .btn-block-1
    {
        margin-left: 80%;
        width: 12%;
        font-family: 'Chau Philomene One';
        border: None;
        /* color: red; */
        background-color: var(--septanry);
        border-radius: 20px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        font-size: 18px;
        margin-top: -3%;
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
  .col-5
  {
    font-family: 'Chau Philomene One';
    display: inline;
    font-size: 15px;
    color: #ffffff;
    /* width: 100%; */
    /* margin: 0 auto; */
    /* padding: 3%; */
    margin-bottom: 2px;
    /* padding-right: 200px; */
  }
  .col-5:hover
  {
    color: var(--quinary);
  }
  .icon-1
  {
    margin-left: -3%;
  }
  
</style>