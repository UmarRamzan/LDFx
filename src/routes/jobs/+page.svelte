<script>

    // @ts-nocheck

    import { 
        getUserData,
        addJobPost,
        getJobPost,
        editJobPost,
        deleteJobPost
    } from "$lib/api/clientFunctions";


    import { onMount } from "svelte";

    let currentUser = null;
    let jobPostings = []

    onMount( async () => {
        let user = await getUserData();
        if (user) { currentUser = user } 

        let { success, data, error } = await getJobPost();

        if (success) {
            jobPostings = data
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

</script>

<div class="content">

<div class="container mt-4">
    <div class="row align-items-center">

        <!-- Page title -->
        <div class="col">
            <h1>Job Postings</h1>
        </div>

        <!-- Button trigger create posting modal -->
        <div class="col-3">
            <button type="button" class="btn btn-outline-dark" id="create-posting-button" data-bs-toggle="modal" data-bs-target="#posting-modal">
                Create Posting
            </button>
        </div>

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
                <input type="text" class="form-control" id="organization" placeholder="Organization" bind:value={organization}>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" id="contact-number" placeholder="Contact Number" bind:value={contactNumber}>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" id="job-type" placeholder="Job Type" bind:value={jobType}>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" id="pay-range" placeholder="Pay Range" bind:value={payRange}>
            </div>
            <div class="mb-3">
                <textarea class="form-control" id="description" rows="4" placeholder="Job Description" bind:value={description}></textarea>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-outline-dark" id="submit-button" data-bs-dismiss="modal" on:click={createJobPosting}>Create</button>
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
                <input type="text" class="form-control" id="organization" placeholder="Organization" bind:value={organization}>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" id="contact-number" placeholder="Contact Number" bind:value={contactNumber}>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" id="job-type" placeholder="Job Type" bind:value={jobType}>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" id="pay-range" placeholder="Pay Range" bind:value={payRange}>
            </div>
            <div class="mb-3">
                <textarea class="form-control" id="description" rows="4" placeholder="Job Description" bind:value={description}></textarea>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-outline-dark" id="submit-button" data-bs-dismiss="modal" on:click={createJobPosting}>Create</button>
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
                    <label for="desciption"><b>Description:</b></label>
                    {jobData.description}
                </div>
            </div>
            {#if currentUser && currentUser.id == jobData.user_id}
            <div class="row mt-3">
                <div class="col w-10">
                    <button type="button" class="btn btn-outline-dark" id="edit-posting-button" data-bs-toggle="modal" data-bs-target="#edit-posting-modal">
                        Edit
                    </button>
                </div>
                <div class="col w-10">
                    <button type="button" class="btn btn-outline-danger" id="submit-button" on:click={()=>deleteJobPosting(jobData.job_posting_id)}>Delete</button>
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
        border: 1px solid black;
        box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
    }
    .form-group {
        margin-top: 10px;
    }
    #create-posting-content {
        background-color: #ffe5d9;
    }
    .form-control {
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