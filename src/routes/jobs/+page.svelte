<script>
    import { Card, CardBody } from 'sveltestrap';

    let jobData = {
        "organization_name": "LUMS",
        "contact_number": "03134350573",
        "job_type": "content writing",
        "pay_range": "20000-30000",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
</script>

<div class="page-content">

<h1 class="row justify-content-center pt-4 pb-4">Job Postings</h1>

<div class="container">
    <div class="row justify-content-center">
        <Card class="w-50 p-4 mb-4">
            <div class="row">
                <div class="col align-middle">
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
                    <label><b>Description:</b></label>
                    {jobData.description}
                </div>
            </div>
        </Card> 
    </div>
<div class="row justify-content-center">
    <Card class="w-50">
        <div class="row">
            <div class="col align-middle">
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
                {jobData.description}
            </div>
        </div>
    </Card>
    
</div>
</div>
</div>

<style>

.page-content {
    background-color: #fefae0;
    color: #000;
}

.form-group {
    margin-top: 10px;
}

</style>