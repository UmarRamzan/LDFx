<script>
	import { signup } from "../api/signup/+server";

	let email = '';
	let password = '';
	let accountType = '';
	
</script>

<h1>Signup [temp]</h1>
<p>This needs to be in a modal aswell as the login</p>
<input type="email" id="email" placeholder="email" bind:value={email} />
<input type="password" id="password" placeholder="password" bind:value={password} />
<button on:click={()=>{signup(email, password, accountType)}}>signup</button>
