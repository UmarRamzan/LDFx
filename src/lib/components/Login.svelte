<script>

  // @ts-nocheck

  import { login, getUsername, resetPassword } from "$lib/api/clientFunctions";
  import { user,username} from "../../routes/UserStore"
  import { fade } from "svelte/transition";

  let email = '';
  let password = '';

  let errorMessage = '';
  let successMessage = '';

  let pending = false;
  let resetingPassword = false;
  
  export let showModal = false;
  export let toggle = () => {};

  const handleClose = () => {

    toggle();

    email = '';
    password = '';
    errorMessage = '';
    successMessage = '';
    pending = false;
    resetingPassword = false;

  }

  const handleLogin = async () => {

    pending = true;
    const { success, data, error } = await login(email, password)

    if (error) {errorMessage = error.message;}
    else {
      user.set(data.user)

      let res = await getUsername(data.user.id)
      if (res.success) {
        username.set(res.data[0].username)
        handleClose();
      } else {
        errorMessage = res.error.message
      }
    }
    pending = false;
  }

  const handleResetPassword = async () => {

    pending = true;
    const { success, data, error } = await resetPassword(email)
    pending = false;

    if (error) {errorMessage = error.message;}
    else {
      successMessage = "Password reset email sent!"
    }
  }

  const resetError = () => {
    errorMessage = '';
    successMessage = '';
  }

  $: email, password, resetError();

</script>

{#if showModal}
<div class="custom-backdrop" on:click|self={handleClose} transition:fade>
  <div class="custom-modal">
    {#if !resetingPassword}
    <h2>Login</h2>

    <hr>

    <div class="mb-3">
      <input type="email" class="form-control" id="email" placeholder="Email" bind:value={email}>
    </div>
    <div class="mb-3">
      <input type="password" class="form-control" id="password" placeholder="Password" bind:value={password}>
    </div>


    {#if errorMessage}
      <div class="alert alert-danger" role="alert" in:fade>
        {errorMessage}
      </div>
    {/if}

    <div class="password-links" on:click={()=>{resetingPassword=true}}>Forgot Password</div>

    <hr>

    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-outline-dark mx-2" on:click={handleClose}>Cancel</button>
      {#if !pending}
      <button type="button" class="btn btn-outline-success" id="submit-button" on:click={handleLogin}>Confirm</button>
      {:else}
      <button class="btn btn-outline-success" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      </button>
      {/if}
    </div>

    

    {:else}
    <h2>Reset Password</h2>
    <hr>
    <div class="mb-3">
        <input type="email" class="form-control" id="email" placeholder="Email" bind:value={email}>
    </div>

    {#if errorMessage}
      <div class="alert alert-danger" role="alert" in:fade>
        {errorMessage}
      </div>
    {/if}

    {#if successMessage}
      <div class="alert alert-success" role="alert" in:fade>
        {successMessage}
      </div>
    {/if}

    <div class="password-links" on:click={()=>{resetingPassword=false}}>Back to Login</div>

    <hr>

    <div class="d-flex justify-content-end">
    <button type="button" class="btn btn-outline-dark mx-2" on:click={handleClose}>Cancel</button>
    {#if !pending}
    <button type="button" class="btn btn-outline-success" id="submit-button" on:click={handleResetPassword}>Confirm</button>
    {:else}
    <button class="btn btn-outline-success" type="button" disabled>
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    </button>
    {/if}
  </div>
    {/if}
  </div>
</div>
{/if}
  
<style>

  .custom-backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,0.5);
    z-index: 999;
  }

  .custom-modal {
    padding: 25px;
    border-radius: 10px;
    max-width: 400px;
    margin: 10% auto;;
    text-align: center;
    background: var(--secondary);
    z-index: 1000;
  }

  .btn {
    width: 100px;
  }
  #login-content {
    background-color: #ffe5d9;
  }
  .form-control {
    background-color: #fcfbf2;
  }

  .password-links {
    text-decoration: underline;
    cursor: pointer;
  }
</style>