<script> 

  
  import { supabase } from "$lib/supabaseClient";
  import { onMount } from "svelte/internal";
  import { createEventDispatcher } from "svelte";
  import { username,user } from "../../routes/UserStore";
  import { updateUsername } from "$lib/api/csFunctions";
    
  const dispatch = createEventDispatcher();
    
  let email = "";
  let password = "";
  let accountType = "";
  let _username = $username;
  
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
    
  const updateData = async () => {
      console.log("Updating account...")
      const { data, error } = await supabase.auth.updateUser({
          attributes: {
              email,
              password,
              data: { accountType }
          },
          options: { redirectTo: "http://localhost:5000" }
      });
        if (error) {
          console.log(error);
        } else {
          dispatch("success", "Account updated successfully!");
        }
  };
  
  //this works but it should be in the updateData function
  const _updateUsername = async()=>{
      _username = await updateUsername(_username,$user.user.id)
      _username = _username.data[0].username
      username.set(_username)
  }
    
  onMount(getData);
  
  let activeTab = 0;
  
    function setActiveTab(index) {
      activeTab = index;
    }
  
  
  </script>
  
  <div>
    <br>

      <div class="container justify-content-center">
        <button type="button" class="Tab-button" id='account-button' on:click={() => setActiveTab(0)} class:selected={activeTab === 0}>
          Account Settings
        </button>
  
        <button type="button" class="Tab-button" id='account-button' on:click={() => setActiveTab(1)} class:selected={activeTab === 1}>
          Notification Settings
        </button>
      </div>
    
        
    
    {#if activeTab === 0}
    <div class="content">
  
      <h1>User Information</h1>
      <br>
      <p>Here you can edit public and account related information of yourself. The changes wil be displayed for other users within 5 minutes</p>
      <br>
        
        <label class="settings-data"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email: </b><input type="email" bind:value={email} /></label>
  
        <button type="button" class="btn-outline-dark" id="change-email-button" onclick="document.getElementById('email-popup').style.display='block'">
          Change Email
        </button>
  
        <br>
  
        <label class="settings-data"><b>&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp; Password: </b><input type="password" bind:value={password} /></label>
        <button type="button" class="btn-outline-dark" id="change-password-button" onclick="document.getElementById('password-popup').style.display='block'">
          Change Password
        </button>
        
        <br>
  
        <label class="settings-data"><b>Account Type: </b><input type="text" bind:value={accountType} /></label>
        <button type="button" class="btn-outline-dark" id='change-account-button' onclick="document.getElementById('account-popup').style.display='block'">
          Change Account Type
        </button>
  
        <br>
  
        <br>
        <button type="button" class="submit-button" id='submit-button'>
          Submit
        </button>
        <br>
        <button type="button" class="cancel-button" id='cancel-button'>
            Cancel
        </button>
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
  
  <div class="popup" id="password-popup">
    <label class="popup-data" for="password"><b>Enter New Password</b></label>
    <br>
    <input type="text" placeholder="new password" name="password" required>
    <br><br>
  
    <label class="popup-data" for="password"><b>Confirm New Password</b></label>
    <br>
    <input type="text" placeholder="confirm password" name="password" required>
    <br><br>
    <button onclick="document.getElementById('password-popup').style.display='none'">Submit</button>
    </div>
  
    {:else if activeTab === 1}
    
  
  <div class="content2">
  
      <h1>Notifications</h1>
      <br>
      <p>Select the kinds of notifications you want to receive </p>
      <br>
  
      <div class="form-check form-switch form-switch-md">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
        <label class="form-check-label" for="flexSwitchCheckDefault">
          <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Swaps</h3>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alerts if swap found or not</p>
        </label>
      </div>
  
      <div class="form-check form-switch form-switch-md">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
        <label class="form-check-label" for="flexSwitchCheckDefault">
          <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Job Posts</h3>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alerts if job offer posted</p>
        </label>
      </div>
  
      <div class="form-check form-switch form-switch-md">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
        <label class="form-check-label" for="flexSwitchCheckDefault">
          <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Donation Posts</h3>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alerts if Donation request posted</p>
        </label>
      </div>
  
      <div class="form-check form-switch form-switch-md">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
        <label class="form-check-label" for="flexSwitchCheckDefault">
          <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comments</h3>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comments on your posts and replies to comments</p>
        </label>
      </div>
  
      <div class="form-check form-switch form-switch-md">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
        <label class="form-check-label" for="flexSwitchCheckDefault">
          <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User Research</h3>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Get Invvolved in our beta testing program</p>
        </label>
      </div>
  </div>
  
  
  
    {/if}
  </div>
  
  <style>
  
  .content{
    width: 60%;
    margin: auto;
    margin-top: 40px;
    border: 2px solid #000000;
    border-radius: 10px;
    background-color: var(--primary);
    padding: 20px;
    box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
  }
  
  .content2{
    width: 60%;
    margin: auto;
    margin-top: 40px;
    border: 2px solid #000000;
    border-radius: 10px;
    background-color: var(--primary);
    padding: 20px;
    box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
  }
  
  h1 {
      text-align: left;
      padding-left: 2rem;
      font-weight: 500;
      color: black;
  }
  
  p{
    font-size: 5;
  }
  
  .form-check-input {
    clear: left;
  }
  
  .form-switch.form-switch-md {
    margin-bottom: 1rem; 
  }
  
  .form-switch.form-switch-md .form-check-input {
    height: 1.5rem;
    width: calc(2rem + 0.75rem);
    border-radius: 3rem;
  }
  
  .content label {
        text-align: center;
        padding-left: 8rem;
        padding-bottom: 0.5rem;
        font-size: x-large;
        font-family: 'Chakra Petch', sans-serif;
        color: #1b2e35;
    }
    
    .btn-outline-dark {
        padding: 10px 10px;
        text-align: left;
        display: block;
        margin: auto;
        font-size: 16px;
        cursor: pointer;
        border-radius: 10px;
        background-color: var(--primary);
    }
  
    .Tab-button{
        padding: 10px 10px;
        text-align: left;
        margin: auto;
        font-size: 16px;
        cursor: pointer;
        border-radius: 10px;
        background-color: var(--secondary);
    }
  
    .submit-button{
      display: block;
      text-align: left;
      margin: auto;
      border-radius: 10px;
      font-size: 26px;
      background-color: purple;
      color: white;
    }
    .cancel-button{
      display: block;
      text-align: left;
      margin: auto;
      border-radius: 10px;
      font-size: 16px;
      background-color: red;
      color: white;
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