<script>
// @ts-nocheck

  import { logIn,getUsername,resetPassword } from "$lib/api/csFunctions";
	import { onMount } from "svelte";
  import { user,username} from "../../routes/UserStore"

  let email = '';
  let password = '';

  let pending = false;

  let errorMessage = '';
  let open = true;
  let successMessage = '';

  onMount(() => {
    pending = false;
    email = '';
    password = '';
    errorMessage = '';
    successMessage = '';
  })

  const handleLogin = async () => {
    pending = true;
    const { success, data, error } = await logIn(email, password)
    if (error) {console.log(error); errorMessage = error;}
    else {
      user.set(data.user)
      let res = await getUsername(data.user.id)
      if (res.success) {
        open = false
        backDropBool.set(false)
        username.set(res.data[0].username)
      }
    }
    pending = false;
  }

  const handleResetPassword = async () => {
    const { success, data, error } = await resetPassword(email)
    if (error) {console.log(error); errorMessage = error;}
    else {
      console.log(data)
      successMessage = "Password reset email sent!"
    }
  }

</script>

<!-- Login modal -->
<div class="modal fade" id="login-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" id="login-content">

    <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Login</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={()=>{backDropBool.set(false)}}></button>
    </div>
    
    <div class="modal-body">
        <div class="mb-3">
            <input type="email" class="form-control" id="email" placeholder="Email" bind:value={email}>
        </div>
        <div class="mb-3">
            <input type="password" class="form-control" id="password" placeholder="Password" bind:value={password}>
        </div>
      </div>

      {#if errorMessage}
        <div class="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      {/if}

      <a href="" data-bs-toggle="modal" data-bs-target="#forgot-password-modal">Forgot Password</a>

      <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Cancel</button>
          {#if !pending}
          <button type="button" class="btn btn-outline-success" id="submit-button" on:click={handleLogin}>Confirm</button>
          {:else}
          <button class="btn btn-outline-success" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>
          {/if}
        </div>
    </div>


    
  </div>
</div>


<!--forgot password modal-->
<div class="modal fade" id="forgot-password-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" id="login-content">

      <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Forgot Password</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={()=>{backDropBool.set(false)}}></button>
      </div>
    
      <div class="modal-body">
          <div class="mb-3">
              <input type="email" class="form-control" id="email" placeholder="Email" bind:value={email}>
          </div>
      </div>

      {#if errorMessage}
        <div class="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      {/if}

      {#if successMessage}
        <div class="alert alert-success" role="alert">
          {successMessage}
        </div>
      {/if}


        <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal" on:click={()=>{backDropBool.set(false)}}>Cancel</button>
            <button type="button" class="btn btn-outline-success" id="submit-button" on:click={handleResetPassword}>Confirm</button>
        </div>
    </div>
  </div>
</div>
  




<style>
  .btn {
    width: 100px;
  }
  #login-content {
    background-color: #ffe5d9;
  }
  .form-control {
    background-color: #fcfbf2;
  }
</style>