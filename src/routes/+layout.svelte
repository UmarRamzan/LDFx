<script>
    import { supabase } from "$lib/supabaseClient";
    import Navbar from "$lib/components/Navbar.svelte";
    
    
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

    const handleLogin = async () => {

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {console.log(error);}
        else {console.log(data);}
    }

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {console.log(error);}
    }

</script>

<Navbar />

<slot></slot>