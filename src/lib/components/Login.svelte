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
      successMessage = "Password Reset Email Sent!"
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

    <div class="container">
    <div class="mb-3">
      <div class="row mb-3 gx-0">
        <div class="col-2">
          <span class="input-group-text input-icon justify-content-center" id="basic-addon1"><i class="bi bi-envelope"></i></span>
        </div>
        <div class="col-10">
          <input type="email" class="form-control input-text" id="email" placeholder="Email" bind:value={email}>
        </div>
      </div>

      <div class="mb-3">
        <div class="row gx-0">
          <div class="col-2">
            <span class="input-group-text input-icon justify-content-center" id="basic-addon1"><i class="bi bi-key"></i></span>
          </div>
          <div class="col-10">
            <input type="password" class="form-control input-text" id="password" placeholder="Password" bind:value={password}>
          </div>
        </div>

      </div>
      
      
    </div>

    {#if errorMessage}
      <div class="alert alert-danger" role="alert" in:fade>
        {errorMessage}
      </div>
    {/if}

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="password-links" on:click={()=>{resetingPassword=true; resetError(); email=''; password=''}}>Forgot Password</div>

    <hr>

    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-outline-dark mx-2 cancel-button" on:click={handleClose}>Cancel</button>
      {#if !pending}
      <button type="button" class="btn btn-outline-success submit-button" id="submit-button" on:click={handleLogin}>Confirm</button>
      {:else}
      <button class="btn btn-outline-success submit-button" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      </button>
      {/if}
    </div>

    
    </div>
    {:else}
    <h2>Reset Password</h2>
    <hr>

    <div class="mb-3">
      <div class="row mb-3 gx-0">
        <div class="col-2">
          <span class="input-group-text input-icon justify-content-center" id="basic-addon1"><i class="bi bi-envelope"></i></span>
        </div>
        <div class="col-10">
          <input type="email" class="form-control input-text" id="email" placeholder="Email" bind:value={email}>
        </div>
      </div>
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

    <div class="password-links" on:click={()=>{resetingPassword=false; resetError()}}>Back to Login</div>

    <hr>

    <div class="d-flex justify-content-end">
    <button type="button" class="btn btn-outline-dark mx-2 cancel-button" on:click={handleClose}>Cancel</button>
    {#if !pending}
    <button type="button" class="btn btn-outline-success submit-button" on:click={handleResetPassword}>Confirm</button>
    {:else}
    <button class="btn btn-outline-success submit-button" type="button" disabled>
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
    padding: 50px 25px;
    border-radius: 10px;
    max-width: 450px;
    margin: 10% auto;
    text-align: center;
    background: var(--secondary);
    border-radius: 40px;
    border: 5px solid var(--other-primary);
    color: navy;

  }

  .btn {
    width: 100px;
  }
  #login-content {
    background-color: #ffe5d9;
  }
  .form-control {
    background-color: #fcfbf2;
    color: navy;
  }

  .form-control::placeholder {
    color: navy;
  }

  .input-icon {
    background-color: #faf8eb;
    font-size: 20px;
    border-radius: 10px 0px 0px 10px;
  }

  .input-text {
    height: 100%;
    border-radius: 0px 10px 10px 0px;
  }

  .password-links {
    text-decoration: underline;
    cursor: pointer;
  }

  .submit-button {
    background-color: var(--button-background);
    color: white;
  }

  .submit-button:hover {
    background-color: var(--button-hover-primary);
  }

  .cancel-button {
    border-color: var(--button-cancel);
    background-color: var(--button-cancel);
    color: white;
  }

  .cancel-button:hover {
    background-color: var(--button-hover-cancel);
  }
</style>