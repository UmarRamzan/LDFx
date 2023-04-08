<script>

  import { signUp } from "$lib/api/csFunctions";
  import { getContext, onMount, setContext } from "svelte";

	let email = '';
	let password = '';
  let username = '';
	let accountType = 'Student';

  let pending = false;
	let linkSent = false;
  let errorMessage = '';

  const handleSignup = async () => {
    pending = true;
    await signUp(email, password, accountType, username)
    pending = false;
    //setContext('signUpModalOpen', false);
  }

  let open = false;
  onMount(() => {
    open = getContext('signupModalOpen');
    console.log(open)
  })

  

</script>

{#if !open}
<!-- Signup modal -->
<div class="modal fade" id="signup-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  
  <div class="modal-dialog">
    <div class="modal-content" id="signup-content">
      
    <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Signup</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    
      <div class="modal-body">
        <div class="mb-3">
            <input type="email" class="form-control" id="email" placeholder="Email" bind:value={email}>
        </div>
        <div class="mb-3">
            <input type="password" class="form-control" id="password" placeholder="Password" bind:value={password}>
        </div>   
        <div class="mb-3">
          <input type="text" class="form-control" id="username" placeholder="Username" bind:value={username}>
        </div>  
        <div class="input-group mb-3">
          <label class="input-group-text" for="account-type">Account Type</label>
          <select class="form-select" id="account-type" placeholder="Hello">
            <option value="student" selected>Student</option>
            <option value="alumni">Alumnus</option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Cancel</button>
          {#if !pending}
          <button type="button" class="btn btn-outline-success" id="submit-button" on:click={handleSignup}>Confirm</button>
          {:else}
          <button class="btn btn-outline-success" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>
          {/if}
        </div>
    </div>
  </div>
</div>
{/if}

<style>
  .btn {
    width: 100px;
  }
  #signup-content {
    background-color: #ffe5d9;
  }
  .form-control, #account-type {
    background-color: #fcfbf2;
  }
</style>