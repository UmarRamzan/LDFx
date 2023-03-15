<script>
	import { supabase } from "$lib/supabaseClient";

	let email = '';
	let password = '';

	const handleSignup = async () => {
		
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				emailRedirectTo: 'http://localhost:5173/emailVerified'
			}
		})

		if (error) {console.log(error);}
		else {console.log(data);}
	}

</script>

<input type="email" bind:value={email} placeholder="email">
<input type="password" bind:value={password} placeholder="password">
<button on:click={handleSignup}>sign up</button>