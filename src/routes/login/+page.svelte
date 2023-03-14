<script>

    import { login } from "../api/login/+server";

	let email = '';
	let password = '';

</script>

<h1>Login</h1>
<input type="email" id="email" placeholder="email" bind:value={email} />
<input type="password" id="password" placeholder="password" bind:value={password} />
<button on:click={()=>{login(email, password)}}>login</button>
