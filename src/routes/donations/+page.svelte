<script>
  //donations page
  //use csFunctions to fetch data from the database
  //use the data to populate the page

  // @ts-nocheck

  import { onMount } from "svelte";
  import { getDonationPosts,addDonationPosts,editDonationPosts,deleteDonationPosts,getUserData } from "$lib/api/csFunctions";
  import { user } from "../../routes/UserStore";
  let donationPosts = [];



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


</script>

<div class="content">

<div class="container mt-4">
  <div class="row align-items-center">

      <!-- Page title -->
      <div class="col">
          <h1>Donations</h1>
      </div>

      <!-- Button trigger create posting modal -->
      {#if $user}
      <div class="col-3">
          <button type="button" class="btn btn-outline-dark" id="create-posting-button" data-bs-toggle="modal" data-bs-target="#posting-modal">
              Create Posting
          </button>
      </div>
      {/if}

  </div>

  <hr>
</div>



<!-- Create posting modal -->
<div class="modal fade" id="posting-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
      <div class="modal-content" id="create-posting-content">

      <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Create Posting</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body">
          <div class="mb-3">
              <input type="text" class="form-control" id="organization" placeholder="fullname" bind:value={fullName}>
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="contact-number" placeholder="contact number" bind:value={contactNumber}>
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="job-type" placeholder="email" bind:value={emailAddress}>
          </div>
          <div class="mb-3">
            <textarea class="form-control" id="description" rows="4" placeholder="relatedTags" bind:value={relatedTages}></textarea>
          </div>
          <div class="mb-3">
              <textarea class="form-control" id="description" rows="4" placeholder="description" bind:value={description}></textarea>
          </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-outline-dark" id="submit-button" data-bs-dismiss="modal" on:click={createDonationPost}>Create</button>
      </div>
      </div>
  </div>
</div>

<!-- Edit posting modal -->
<div class="modal fade" id="edit-posting-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
      <div class="modal-content" id="create-posting-content">

      <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Posting</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body">
        <div class="mb-3">
          <input type="text" class="form-control" id="organization" placeholder="fullname" bind:value={fullName}>
        </div>
        <div class="mb-3">
            <input type="text" class="form-control" id="contact-number" placeholder="contact number" bind:value={contactNumber}>
        </div>
        <div class="mb-3">
            <input type="text" class="form-control" id="job-type" placeholder="email" bind:value={emailAddress}>
        </div>
        <div class="mb-3">
          <textarea class="form-control" id="description" rows="4" placeholder="relatedTags" bind:value={relatedTages}></textarea>
        </div>
        <div class="mb-3">
            <textarea class="form-control" id="description" rows="4" placeholder="description" bind:value={description}></textarea>
        </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-outline-dark" id="submit-button" data-bs-dismiss="modal" on:click={createDonationPost}>Create</button>
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
                  <label for="desciption"><b>Description:</b></label>
                  {donationPost.description}
              </div>
          </div>
          {#if $user && $user.id == donationPost.user_id}
          <div class="row mt-3">
              <div class="col w-10">
                  <button type="button" class="btn btn-outline-dark" id="edit-posting-button" data-bs-toggle="modal" data-bs-target="#edit-posting-modal" on:click={()=>{fullName = donationPost.full_name;contactNumber=donationPost.contact_number;emailAddress=donationPost.email_address;relatedTages=donationPost.related_tags;description=donationPost.description} }>
                      Edit
                  </button>
              </div>
              <div class="col w-10">
                  <button type="button" class="btn btn-outline-danger" id="submit-button" on:click={()=>deleteDonationPost(donationPost.donation_id)}>Delete</button>
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

.content {
    width: 60%;
    margin: auto;
    margin-top: 40px;
    border: 2px solid #000000;
    border-radius: 10px;
    background-color: var(--primary);
    padding: 20px;
    box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
  }
  
  .card {
      background-color: var(--secondary);
  }

  #create-posting-content {
      background-color: #ffe5d9;
  }

  .form-control {
      margin-top: 10px;
      background-color: #fcfbf2;
  }

  #create-posting-button {
      background-color: #ffe5d9;
  }

  #create-posting-button:hover, #submit-button:hover {
      background-color: #fec5bb;
      color: black;
  }
</style>