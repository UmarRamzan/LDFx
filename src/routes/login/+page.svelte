<script>
	import { supabase } from "$lib/supabaseClient";

	let email = '';
	let password = '';

	const handleLogin = async () => {

		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		})

		if (error) {console.log(error);}
		else {console.log(data);}
	}

</script>

<input type="email" bind:value={email} placeholder="email">
<input type="password" bind:value={password} placeholder="password">
<button on:click={handleLogin}>login</button>