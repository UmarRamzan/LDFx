<script>
    // @ts-nocheck
  
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



</script>
  

<!--
<h2>Account Information</h2>
<label>Email:<input type="email" bind:value={email} /></label>
<label>Password:<input type="password" bind:value={password} /></label>
<label>Account Type:<input type="text" bind:value={accountType} /></label>
<button on:click={updateData}>Update Account</button>

<label>Username: <input bind:value={_username}></label>
<p>THIS BUTTON SHOULD GO WITH UPDATE ACCOUNT INFO</p>
<button on:click={_updateUsername} >Upade Username</button>
-->

<main>
  <h1 class="page-heading">Settings</h1>

  <div class="container mt-4">
      <h2>Account</h2>
      <br><br>
        
        <!--<p>Email: {email}</p>
        <p>Account Type: {accountType}</p>-->
        <label class="settings-data">Email:<input type="email" bind:value={email} /></label>

        <button type="button" class="btn-outline-dark" id="change-email-button" onclick="document.getElementById('email-popup').style.display='block'">
          Change Email
        </button>

        <br>


        <label class="settings-data">Password:<input type="password" bind:value={password} /></label>

        <button type="button" class="btn-outline-dark" id="change-password-button" onclick="document.getElementById('password-popup').style.display='block'">
          Change Password
        </button>
        
        <br>


        <label class="settings-data">Account Type:<input type="text" bind:value={accountType} /></label>

        <button type="button" class="btn-outline-dark" id='change-account-button' onclick="document.getElementById('account-popup').style.display='block'">
          Change Account Type
        </button>

        <br>

        <br>
        <br>
        <button type="button" class="btn btn-danger" id='delete-button'>
            Delete Account
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
    <input type="text" placeholder="password" name="password" required>
    <br><br>
    <button onclick="document.getElementById('password-popup').style.display='none'">Submit</button>
    </div>


</main>   
  

<style>
  b{
      text-align: left;
      padding-left: 0rem;
      padding-bottom: 0.0rem;
      font-size: x-large;
      font-family: 'Chakra Petch', sans-serif;
      color: #1b2e35;
  }


  label {
      text-align: center;
      padding-left: 30rem;
      padding-bottom: 0.5rem;
      font-size: x-large;
      font-family: 'Chakra Petch', sans-serif;
      color: #1b2e35;
  }

  .popup-data {
      text-align: left;
      padding-left: 0rem;
      padding-bottom: 0.5rem;
      font-size: x-large;
      font-family: 'Chakra Petch', sans-serif;
      color: #1b2e35;
  }

  h2 {
      text-align: center;
      padding-left: 0rem;
      font-family: 'Chakra Petch', sans-serif;
      font-size: 10;
      font-weight: 900;
      color: #1b2e35;
  }

  button {
      padding: 10px 10px;
      text-align: left;
      display: block;
      margin: auto;
      font-size: 16px;
      cursor: pointer;
      border-radius: 10px;
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

</style>
