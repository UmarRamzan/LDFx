<script>
	import { supabase } from "$lib/supabaseClient";

	let email = '';
	let password = '';
	let accountType = '';

	let linkSent = false;

	const handleSignup = async () => {

		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					accountType: accountType
				},
				emailRedirectTo: 'http://localhost:5173/emailVerified'
			}
		})

		if (error) {console.log(error);}
		else {console.log(data); linkSent=true;}
	}

</script>

<input type="email" bind:value={email} placeholder="email">
<input type="password" bind:value={password} placeholder="password">
<input type="text" bind:value={accountType} placeholder="account type">
<button on:click={handleSignup}>sign up</button>

{#if linkSent}
<p>email verification link has been sent</p>
{/if}