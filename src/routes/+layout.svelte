<script>
    import { supabase } from "$lib/supabaseClient";

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {console.log(error);}
    }
</script>

<a href="/">home</a>
<a href="/signup">signup</a>
<a href="/login">login</a>
<a href="/settings">settings</a>
<a href="/reviews">reviews</a>

<button on:click={handleLogout}>log out</button>

<slot></slot>