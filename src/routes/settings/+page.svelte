<script>
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte/internal";

    let email = '';
    let accountType = '';

    const getData = async () => {
        const { data, error } = await supabase.auth.getSession()
        if (error) {console.log(error);}
        else {
            if (data.session) {
                let user = data.session.user;
                email = user.email;
                accountType = user.user_metadata.accountType;
            }
        }
    }

    onMount(getData);
    
</script>

<h2>Account Information</h2>
<p>Email: {email}</p>
<p>Account Type: {accountType}</p>
