<script>

  import { signup } from "$lib/api/accountFunctions";

	let email = '';
	let password = '';
  let username = '';
	let accountType = 'Student';

  let pending = false;
	let linkSent = false;
  let errorMessage = '';

  const handleSignup = async () => {await signup(email, password, accountType, username)}

</script>

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
            <option value="alumni">Alumni</option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-outline-dark" id="submit-button" on:click={handleSignup}>Confirm</button>
      </div>
    </div>
  </div>
</div>

<style>
  #signup-content {
    background-color: #ffe5d9;
  }
  #submit-button:hover {
    background-color: #fec5bb;
    color: black;
  }
  .form-control, #account-type {
    background-color: #fcfbf2;
  }
</style>