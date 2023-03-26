<script>

    let jobPostings = [{
        "job_id": 1,
        "organization_name": "LUMS",
        "contact_number": "03134350573",
        "job_type": "content writing",
        "pay_range": "20000-30000",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        "job_id": 2,
        "organization_name": "LUMS",
        "contact_number": "03134350573",
        "job_type": "content writing",
        "pay_range": "20000-30000",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }]

    let organization = '';
    let contactNumber = '';
    let jobType = '';
    let payRange = '';
    let description = '';

    const createJobPosting = () => {}

</script>


<div class="container w-50 mt-4">
    <div class="row align-items-center">

        <!-- Page title -->
        <div class="col">
            <h1>Job Postings</h1>
        </div>

        <!-- Button trigger modal -->
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
            <button type="button" class="btn btn-outline-dark" id="submit-button" on:click={createJobPosting}>Create</button>
        </div>
        </div>
    </div>
</div>
    

<div class="container w-50">

    

    {#each jobPostings as jobData (jobData.job_id)}
    <!-- Code for each card -->
    <div class="job-posting">
    <div class="row mb-4">
        <div class="card p-4">
            <div class="row">
                <div class="col">
                    <form>
                        <div class="form-group">
                            <label for="organizationName"><b>Organization Name</b></label>
                            <input type="text" class="form-control" id="organizationName" readonly value={jobData.organization_name}>
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
        </div>
    </div>
    </div>
    {/each}

</div>

<style>
    .card {
        background-color: #ffe5d9;
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