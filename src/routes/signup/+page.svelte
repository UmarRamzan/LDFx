<script>
	import { sendSignInLinkToEmail } from "firebase/auth";
	import { auth } from '$lib/firebase';

	let email = '';
	let password = '';

	let user = null;

	const actionCodeSettings = {
		// URL you want to redirect back to. The domain (www.example.com) for this
		// URL must be in the authorized domains list in the Firebase Console.
		url: '',
		// This must be true.
		handleCodeInApp: true,
		iOS: {
			bundleId: 'com.example.ios'
		},
		android: {
			packageName: 'com.example.android',
			installApp: true,
			minimumVersion: '12'
		},
		dynamicLinkDomain: 'example.page.link'
	};

	const signup = () => {
	sendSignInLinkToEmail(auth, email, actionCodeSettings)
	.then(() => {
		// The link was successfully sent. Inform the user.
		// Save the email locally so you don't need to ask the user for it again
		// if they open the link on the same device.
		window.localStorage.setItem('emailForSignIn', email);
		// ...
	})
	.catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		// ...
	});
	}
	
</script>

<h1>Signup</h1>
<h1>user {user}</h1>
<input type="email" id="email" placeholder="email" bind:value={email} />
<input type="password" id="password" placeholder="password" bind:value={password} />
<button on:click={signup}>signup</button>
