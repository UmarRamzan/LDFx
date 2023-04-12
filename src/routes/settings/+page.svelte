<script>
// @ts-nocheck
 

  
  import { supabase } from "$lib/supabaseClient";
  import { onMount } from "svelte/internal";
  import { createEventDispatcher } from "svelte";
  import { user, username} from "../../routes/UserStore";
  import { updateUsername } from "$lib/api/csFunctions";
  import { goto } from "$app/navigation";
    
  const dispatch = createEventDispatcher();

    
  let email = "";
  let password = "";
  let accountType = "";
  let usernameInput = $username;
  
  const getData = async () => {

      const { data, error } = await supabase.auth.getSession();
      if (error) {
          console.log(error);
      } else {
          if (data.session) {
            let user = data.session.user;
            email = user.email;
            accountType = user.user_metadata.accountType;
          }
        }
  };

const saveChanges = async () => {
  console.log("Saving changes...");
  let attributes = {
    email,
    data: { accountType }
  };
  if (password) {
    attributes.password = password;
  }
  const { data, error } = await supabase.auth.updateUser({
    attributes,
    options: { redirectTo: "http://localhost:5000" }
  });
  //update username too
  let updatedUsername = await _updateUsername();
  if (error || !updatedUsername) {
    console.log(error);
    console.log("username :", updatedUsername);
  } else {
    dispatch("success", "Account updated successfully!");
    alert("Account updated successfully!");
    goto("/");
  }
};

  
  //this works but it should be in the updateData function
  const _updateUsername = async()=>{
      let res = await updateUsername(usernameInput,$user.id)
      username.set(res.data[0].username)
      return res.success
  }
    
  onMount(() => {getData();usernameInput = $username;});
  
  let activeTab = 0;
  
    function setActiveTab(index) {
      activeTab = index;
    }
  
  </script>

  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link " id="account-tab" href="#account-tab" on:click={()=>{setActiveTab(0)}}>Account</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id="notification-tab" href="#notification-tab" on:click={()=>{setActiveTab(1)}}>Notification</a>
    </li>
  </ul>
  
  <div>
    <br>
    
        
    
    {#if activeTab === 0}
    <div class="content">
  
      <h1 style="padding-left: 0px;">User Information</h1>
      <p>Edit information regarding your account</p>

      <hr>

      <div class="container" id="account-settings">
        <div class="row">
          <label class="settings-data"><b>Username </b></label>
          <input type="text" bind:value={usernameInput} />
        </div>
        <div class="row">
          <label class="settings-data"><b>Email </b></label>
          <input type="email" bind:value={email} />
        </div>
        
        <div class="row" id="account-type-select">
          <div class="input-group m-0 p-0">
            <label class="input-group-text" for="account-type">Account Type</label>
            <select class="form-select" id="account-type">
              <option value="student" selected>Student</option>
              <option value="alumni">Alumnus</option>
            </select>
          </div>
        </div>
        <div class="row">
          <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#password-popup">Change Password</button>
        </div>

        <!-- <div class="row">
          <button type="button" class="btn btn-danger">Delete Account</button>
        </div> -->
      </div>

        <div class="d-flex">
          <button type="button" class="btn btn-danger" style="margin-right: 200px;">Cancel</button>
          <button type="button" class="btn btn-primary" style="background-color: light-blue; border-color: light-blue;" on:click={saveChanges}>Save Changes</button>
        </div>

        
    </div>
  
  <div class="popup" id="email-popup">
      <label class="popup-data" for="email"><b>Enter New Email</b></label>
      <br>
      <input type="text" placeholder="email" name="email" required>
      <br><br>
  <button onclick="document.getElementById('email-popup').style.display='none'">Submit</button>
  </div>
  
  <div class="popup" id="account-popup">
      <label class="popup-data" for="account-type"><b>Enter New Account Type</b></label>
      <br>
      <input type="text" placeholder="Account Type" name="Account Type" required>
      <br><br>
      <button onclick="document.getElementById('account-popup').style.display='none'"> Submit </button>
  </div>
  
  <div class="modal fade" id="password-popup" tabindex="-1" aria-labelledby="password-popup-label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="password-popup-label">Enter New Password</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label class="popup-data" for="password"><b>New Password</b></label>
          <br>
          <input type="password" class="form-control" placeholder="New Password" name="password" required bind:value={password}>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal" on:click={()=>{if(password.length < 6){alert("password must be greater than 6 characters")}}}>Save</button>
        </div>
      </div>
    </div>
  </div>
  
    {:else if activeTab === 1}
    
  
  <div class="content2">
  
      <h1 style="padding: 0px;">Notifications</h1>
      <p>Select the kinds of notifications you want to receive </p>

      <hr>
  
      <div class="form-check form-switch form-switch-md">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
        <label class="form-check-label" for="flexSwitchCheckDefault">
          <h3>Swaps</h3>
          <p>Alerts if swap found or not</p>
        </label>
      </div>
  
      <div class="form-check form-switch form-switch-md">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
        <label class="form-check-label" for="flexSwitchCheckDefault">
          <h3>Job Posts</h3>
          <p>Alerts if job offer posted</p>
        </label>
      </div>
  
      <div class="form-check form-switch form-switch-md">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
        <label class="form-check-label" for="flexSwitchCheckDefault">
          <h3>Posts</h3>
          <p>Alerts if Donation request posted</p>
        </label>
      </div>
  
      <div class="form-check form-switch form-switch-md">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
        <label class="form-check-label" for="flexSwitchCheckDefault">
          <h3>Comments</h3>
          <p>Comments on your posts and replies to comments</p>
        </label>
      </div>

  </div>
  
  
  
    {/if}
  </div>
  
  <style>

  .nav-tabs {
    width: 60%;
    margin: auto;
    margin-top: 40px;
  }

  .nav-tabs:hover {
    cursor: pointer;
  }
  
  .content, .content2{
    width: 60%;
    margin: auto;
    border: 0px solid #000000;
    border-radius: 20px;
    background-color: var(--primary);
    padding: 30px 50px;
    box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }

  .form-check-input {
    height: 1.5rem;
    width: 2.75rem;
    border-radius: 20px;
    margin-right: 20px;
  }

  .form-check-input:checked {
    background-color: red;
  }

  .settings-data {
    padding-left: 0px;
  }

  h1 {
      text-align: left;
      font-weight: 500;
      color: black;
  }
  
  p{
    font-size: 5;
    font-style: italic;
  }

  #account-settings {
    font-size: 20px;
    margin-left: 0px;
  }

  #account-settings .row {
    margin-bottom: 20px;
  }

  #account-settings .btn {
    width: 50%;
  }

  input {
    width: 50%;
    padding: 5px 15px;
    margin: 10px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }

  #account-type-select {
    width: 50%;
    margin: 0px;
  }
  
    .popup {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      background-color: #fff;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      z-index: 9999;
    }
  
    .popup-data {
        text-align: left;
        padding-left: 0rem;
        padding-bottom: 0.5rem;
        font-size: x-large;      
        color: #1b2e35;
    }
  
  
  
  </style>