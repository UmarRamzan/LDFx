<script>
// @ts-nocheck

    import { updatePass } from "$lib/api/csFunctions";
    import { goto } from "$app/navigation";

    let password = "";
    let errorMessage = "";


    const handlePasswordUpdate = async () => {
        const { success, data, error } = await updatePass(password);
        if (error) {
            console.log(error);
            errorMessage = error;
        } else {
            console.log(data);
            goto("/");
        }
    };

</script>


<div class="container" id="content">
    <div>
        <h1>Reset Password</h1>
        <div class="mb-3">
            <input type="password" class="form-control" id="password" placeholder="New Password" bind:value={password}>
        </div>

        {#if errorMessage}
            <div class="alert alert-danger" role="alert">
                {errorMessage}
            </div>
        {/if}

        <button class="btn btn-primary" on:click={handlePasswordUpdate}>Confirm</button>
    </div>
</div>

<style>
    #content {
        width: 50%;
        margin: auto;
        margin-top: 40px;
        border: 0px solid #000000;
        border-radius: 40px;
        background-color: var(--primary);
        background-color: var(--tertiary);
        padding: 40px;
        box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.2);
    }
</style>
