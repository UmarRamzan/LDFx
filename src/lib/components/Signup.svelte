<script>

	import { signup } from "$lib/api/clientFunctions";
  import { fade } from "svelte/transition";
	import { user } from "../../routes/UserStore";

	let email = '';
	let password = '';
  let username = '';
	let accountType = 'Student';

  let errorMessage = '';

  let pending = false;
	let linkSent = false;

  export let showModal = false;
  export let toggle = () => {};

  const handleClose = () => {

    toggle();

    email = '';
    password = '';
    username = '';
    accountType = 'Student';
    errorMessage = '';
    pending = false;
    linkSent = false;

  }

  const handleSignup = async () => {
    pending = true;

    if (username.length < 3) {
      errorMessage = 'Username must be at least 3 characters long';
      pending = false;
      return;
    }
    
    const {success, data, error} = await signup(email, password, accountType, username)
    
    if (error) { errorMessage = error.message}
    else {linkSent=true;}

    pending = false;
  }

  const resetError = () => {
    errorMessage = '';
    linkSent = false;
  }

  $: email, password, username, accountType, resetError();

</script>


{#if showModal}
<div class="custom-backdrop" on:click|self={handleClose} transition:fade>
  <div class="custom-modal">
    <h2>Signup</h2>

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

        <div class="mb-3">
          <div class="row gx-0">
            <div class="col-2">
              <span class="input-group-text input-icon justify-content-center" id="basic-addon1"><i class="bi bi-hash"></i></span>
            </div>
            <div class="col-10">
              <input type="text" class="form-control input-text" id="password" placeholder="Username" bind:value={username}>
            </div>
          </div>
  
        </div>

        <div class="mb-3">
          <div class="row gx-0">
            <div class="col-2">
              <span class="input-group-text input-icon justify-content-center" id="basic-addon1"><i class="bi bi-person"></i></span>
            </div>
            <div class="col-10">
              <select class="form-select input-text" id="account-type">
                <option value="student" selected>Student</option>
                <option value="alumni">Alumnus</option>
              </select>
            </div>
          </div>
  
        </div>
        
        
        
      </div>
      </div>

    {#if linkSent}
    <div class="alert alert-success" role="alert">
      Email Verification Link Sent
    </div>
    {/if}

    {#if errorMessage}
    <div class="alert alert-danger" role="alert" transition:fade>
      {errorMessage} 
    </div>
    {/if}

    <hr>

      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-outline-dark mx-2 cancel-button" on:click={handleClose}>Cancel</button>
        {#if !pending}
        <button type="button" class="btn btn-outline-success submit-button" on:click={handleSignup}>Confirm</button>
        {:else}
        <button class="btn btn-outline-success submit-button" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </button>
        {/if}
      </div>
  </div>
</div>
{/if}

<style>

  .custom-backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
  }

  .custom-modal {
    padding: 50px 25px;
    border-radius: 10px;
    max-width: 450px;
    margin: 10% auto;;
    text-align: center;
    background: var(--secondary);
    border-radius: 40px;
    color: navy;
    border: 5px solid var(--other-primary);
  }

  .btn {
    width: 100px;
  }

  .submit-button {
    background-color: var(--button-background);
    border: 0px solid;
    color: white;
  }

  .cancel-button {
    border-color: var(--button-cancel);
    background-color: var(--button-cancel);
    color: white;
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

  #signup-content {
    background-color: #ffe5d9;
  }

  .form-control, #account-type {
    background-color: #fcfbf2;
    color: navy;
  }

  .form-control::placeholder {
    color: navy;
  }
</style>