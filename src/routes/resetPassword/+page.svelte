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


<div class="container">
    <div>
        <h1>Reset Password</h1>
        <div class="mb-3">
            <input type="password" class="form-control" id="password" placeholder="Password" bind:value={password}>
        </div>

        {#if errorMessage}
            <div class="alert alert-danger" role="alert">
                {errorMessage}
            </div>
        {/if}

        <button class="btn btn-primary" on:click={handlePasswordUpdate}>Reset Password</button>
    </div>
</div>


