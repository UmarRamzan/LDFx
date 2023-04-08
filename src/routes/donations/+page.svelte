<script>
  //donations page
  //use csFunctions to fetch data from the database
  //use the data to populate the page

  // @ts-nocheck

  import { onMount } from "svelte";
  import { getDonationPosts,addDonationPosts,editDonationPosts,deleteDonationPosts,getUserData,getDonationComments,addDonationComment } from "$lib/api/csFunctions";
  import { user,username } from "../../routes/UserStore";
  let donationPosts = [];
  let comments = ["dummy1","dummy2"];
  let commentsPending = true;
  let commentText = ''
  let tempDonationID

  
  async function loadComments(donation_id) {
    tempDonationID = donation_id
    commentsPending = true;
    let { success, data, error } = await getDonationComments(donation_id);
    if (success) {
      comments = data;
      commentsPending = false;
    } else {
      console.log(error);
    }

  }

  const addComment = async () => {
    let response = await addDonationComment(tempDonationID,$user.id,$username,commentText);
    console.log(response);
  };



  


  onMount(async () => {
    let { success, data, error } = await getDonationPosts();
    if (success) {
      donationPosts = data;
      console.log(data)
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
    donationPosts.push({
      userID: $user.id,
      full_name: fullName,
      contact_number: contactNumber,
      email_address: emailAddress,
      related_tags: relatedTages,
      description: description,
    });
    donationPosts = donationPosts;
  };

  const editDonationPost = async () => {};

  const deleteDonationPost = async (donationPostID) => {
    console.log(donationPostID)
    let { success, data, error } = await deleteDonationPosts(donationPostID);
    if (error) {
      console.log(error);
    } else {
      donationPosts = donationPosts.filter(
        (posting) => posting.donation_posting_id != donationPostID
      );
    }
  };


  let count = 0
  let countdown = 0
</script>

<div class="content">

<div class="container mt-4">
  <div class="row align-items-center">

      <!-- Page title -->
      <div >
          <p class = "col-1">Donations</p>
      </div>
      <!-- Button trigger create posting modal -->
      {#if $user}

      <div class="col-3">
          <button class="create-posting-button btn-block-1" data-bs-toggle="modal" data-bs-target="#posting-modal">
              Create Post
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
              <input type="text" class="form-control" id="organization2" placeholder="fullname" bind:value={fullName}>
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="contact-number2" placeholder="contact number" bind:value={contactNumber}>
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="job-type2" placeholder="email" bind:value={emailAddress}>
          </div>
          <div class="mb-3">
            <textarea class="form-control" id="description2" rows="4" placeholder="relatedTags" bind:value={relatedTages}></textarea>
          </div>
          <div class="mb-3">
              <textarea class="form-control" id="description3" rows="4" placeholder="description" bind:value={description}></textarea>
          </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="cancel-button" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="create-button" id="submit-button" data-bs-dismiss="modal" on:click={createDonationPost}>Create</button>
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
          <button type="button" class="cancel-button" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="create-button" id="submit-button" data-bs-dismiss="modal" on:click={createDonationPost}>Create</button>
      </div>
      </div>
  </div>
</div>

<!-- Comments Modal -->
<div class="modal fade" id="comments-modal-donations" tabindex="-1" role="dialog">
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
  {#each donationPosts as donationPost }
  <!-- Code for each card -->
  <div class="job-posting">
  <div class="row mb-4">
      <div class="card p-4">
          <div class="row">
              <div class="col">
                  <form>
                      <div class="form-group">
                          <label for="emailAddress"><b>Email Address</b></label>
                          <input type="text" class="form-control" id="organizationName" readonly value={donationPost.email_address}>
                      </div>
                      <div class="form-group">
                          <label for="contactNumber"><b>Contact Number</b></label>
                          <input type="text" class="form-control" id="contactNumber" readonly value={donationPost.contact_number}>
                      </div>
                      <div class="form-group">
                          <label for="relatedTags"><b>Related tags</b></label>
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
                        <button class = "btn btn-light btn-block">
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
                            <p class = "col-2">{countdown}</p>
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
                  <button type="button" class="edit-button" id="edit-posting-button" data-bs-toggle="modal" data-bs-target="#edit-posting-modal" on:click={()=>{fullName = donationPost.full_name;contactNumber=donationPost.contact_number;emailAddress=donationPost.email_address;relatedTages=donationPost.related_tags;description=donationPost.description} }>
                      Edit
                  </button>
              </div>
              <div class="col w-10">
                  <button type="button" class="ecancel-button" id = "submit-button" on:click={()=>deleteDonationPost(donationPost.donation_id)}>Delete</button>
              </div>
          </div>
          {/if}
      </div>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#comments-modal-donations" on:click={()=>{loadComments(donationPost.donation_id)}}>View Comments</button>
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
    color: solid var(----senary);
  }

  .col
  {
    color: var(--quinary);
    font-family: 'Chau Philomene One';
    font-size: 20px;
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
  #create-posting-button 
  {
    background-color: #ffe5d9;
  }
  #create-posting-button:hover 
  {
    background-color: #fec5bb;
    color: black;
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
    margin-bottom: -1.5%;
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
        color: #ffffff;
        background-color: var(--septanry);
        border-radius: 20px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        font-size: 18px;
        margin-top: -3%;
        display: block;
    }
    .btn-block-1:hover 
    {
        background-color: var(--secondary);
        color: var(--quinary);
        font-family: 'Chau Philomene One';
    }
</style>