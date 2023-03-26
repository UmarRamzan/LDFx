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
  
<h2>Account Information</h2>
<label>Email:<input type="email" bind:value={email} /></label>
<label>Password:<input type="password" bind:value={password} /></label>
<label>Account Type:<input type="text" bind:value={accountType} /></label>
<button on:click={updateData}>Update Account</button>

<label>Username: <input bind:value={_username}></label>
<p>THIS BUTTON SHOULD GO WITH UPDATE ACCOUNT INFO</p>
<button on:click={_updateUsername} >Upade Username</button>