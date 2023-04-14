<script>
// @ts-nocheck
 

  
  import { supabase } from "$lib/supabaseClient";
  import { onMount } from "svelte/internal";
  import { createEventDispatcher } from "svelte";
  import { user, username} from "../../routes/UserStore";
  import { updateUsername } from "$lib/api/csFunctions";
  import { goto } from "$app/navigation";
  import { getUserSettings, updateUserSettings } from "$lib/api/clientFunctions";
    
  const dispatch = createEventDispatcher();
    
  let email = "";
  let password = "";
  let accountType = "";
  let usernameInput = $username;
  let settings = null;

  let changesSaved = false;
  
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

const handleSave = async () => {

  let response = await updateUserSettings($user.id, settings)
  if (response.error) {console.log(response.error)}
  else {console.log(response)}

  changesSaved = true;

}

const deleteAccount = async () => {
  const { data, error } = await supabase.auth.admin.deleteUser($user.id);
  if (error) {console.log(error)}
}


  
  //this works but it should be in the updateData function
  const _updateUsername = async()=>{
      let res = await updateUsername(usernameInput,$user.id)
      username.set(res.data[0].username)
      return res.success
  }
    
  onMount( async () => {
    await getData();
    usernameInput = $username;
    console.log($user.id)
    let settingsResponse = await getUserSettings($user.id);
    console.log(settingsResponse)
    settings = settingsResponse.data[0];
    console.log(settings)
  });

  let activeTab = 0;
  
    function setActiveTab(index) {
      activeTab = index;
    }
  
  </script>

{#if !$user}

<div id="login-error">
    <i class="bi bi-arrow-left-right" id="error-icon"></i>
    <h3>You must be logged in to view settings</h3>  
</div>
    
{:else}

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

      <div class="container p-0 m-0" id="account-settings">
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
        <div class="row">
          <button type="button" class="btn btn-danger" style="width: 24%;margin-right: 4px; margin-left: 0px" on:click={()=>goto('/')}>Cancel</button>
          <button type="button" class="btn btn-primary" style="width: 25%;margin-left: 4px; background-color: light-blue; border-color: light-blue;" on:click={saveChanges}>Save Changes</button>
        </div>
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
      <div class="modal-content" id="password-modal">
        <div class="modal-header">
          <h5 class="modal-title" id="password-popup-label">Enter New Password</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <br>
          <input type="password" class="form-control w-100" placeholder="New Password" name="password" required bind:value={password}>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success w-50" data-bs-dismiss="modal" on:click={()=>{if(password.length < 6){alert("password must be greater than 6 characters")}}}>Save</button>
        </div>
      </div>
    </div>
  </div>
  
    {:else if activeTab === 1}
    
  {#if settings}
  <div class="content2">
  
      <h1 style="padding: 0px;">Notifications</h1>
      <p>Select the kinds of notifications you want to receive </p>

      <hr>
  
      <div class="form-check form-switch form-switch-md">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={settings.swaps} on:change={()=>{settings.swaps=!settings.swaps}}>
        <label class="form-check-label" for="flexSwitchCheckDefault">
          <h3>Swaps</h3>
          <p>Alerts if a swap has been found</p>
        </label>
      </div>
  
      <div class="form-check form-switch form-switch-md">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={settings.jobs} on:change={()=>{settings.jobs=!settings.jobs}}>
        <label class="form-check-label" for="flexSwitchCheckDefault">
          <h3>Job Posts</h3>
          <p>Alert if someone comments under your job posting</p>
        </label>
      </div>
  
      <div class="form-check form-switch form-switch-md">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={settings.donations} on:change={()=>{settings.donations=!settings.donations}}>
        <label class="form-check-label" for="flexSwitchCheckDefault">
          <h3>Donation Posts</h3>
          <p>Alert if someone comments under your donation request</p>
        </label>
      </div>

      <div>
      <button type="button" class="btn btn-danger" style="width: 25%; margin-right: 1px;" on:click={()=>goto('/')}>Cancel</button>
      <button type="button" class="btn btn-primary" style="width: 25%; background-color: light-blue; border-color: light-blue;" on:click={handleSave}>Save Changes</button>
      </div>

      {#if changesSaved}
      <div class="alert alert-success mt-2" role="alert">
        Changes Saved Successfully!
      </div>
      {/if}

  </div>
  {/if}
  
    {/if}
  </div>

  {/if}
  
  <style>

  @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;1,300&family=Chau+Philomene+One&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;1,300&display=swap');
    p {
      font-family: 'Chakra Petch';
    }
    h1 {
        font-family: 'Chau Philomene One';
    }

  .nav-tabs {
    width: 60%;
    margin: auto;
    margin-top: 40px;
  }

  .nav-tabs:hover {
    cursor: pointer;
  }

  #password-modal {
    padding: 50px 25px;
    border-radius: 10px;
    max-width: 450px;
    margin: 10% auto;;
    background: var(--secondary);
    border-radius: 40px;
    color: navy;
    border: 5px solid var(--other-primary);
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


  #save-button {
    width: 100%;
    background-color: var(--primary);
    color: white;
    border: 1px solid var(--primary);
    border-radius: 20px;
    padding: 10px;
    margin-top: 20px;
  }
  .form-check-input {
    height: 1.5rem;
    width: 2.75rem;
    border-radius: 20px;
    margin-right: 20px;
  }

  #login-error {
        width: 50%;
        padding: 50px;
        text-align: center;
        border: 1px solid rgba(0,0,0,0.5);
        box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #error-icon {
        font-size: 3rem;
        margin-right: 40px;
    }

  .form-check-input:checked {
    background-color: red;
  }

  .form-check {
    padding-left: 0px;
  }

  .settings-data {
    padding-left: 0px;
  }

  .form-switch {
    padding-left: 40px;
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
    
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }

  #account-type-select {
    width: 50%;
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