<script>
// @ts-nocheck


  import { logIn,getUsername } from "$lib/api/csFunctions";
  import { user,username,backDropBool } from "../../routes/UserStore"

  

  let email = '';
  let password = '';

  let pending = false;
  let errorMessage = '';
  let open = true;

  const handleLogin = async () => {
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
  }

</script>


{#if open}
<!-- Login modal -->
<div class="modal fade" id="login-modal" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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

      <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal" on:click={()=>{backDropBool.set(false)}}>Cancel</button>
          <button type="button" class="btn btn-outline-dark" id="submit-button" on:click={handleLogin}>Confirm</button>
      </div>
    </div>


    
  </div>
</div>



{/if}


<style>
  #login-content {
    background-color: #ffe5d9;
  }
  #submit-button:hover {
    background-color: #fec5bb;
    color: black;
  }
  .form-control {
    background-color: #fcfbf2;
  }
</style>