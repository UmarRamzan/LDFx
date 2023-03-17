<script>
    //get user context from layout page
    import { getContext } from 'svelte';
    let user = getContext('user');
    

</script>

<!--
  align html to center
  make text more asthetic
 -->
<h1>MAIN PAGE</h1>
{#if $user.isLoggedIn}
<p>User Logged in: {$user.email}</p>
{:else}
<p>User not logged in</p>
{/if}

<body></body>




<style>
    h1{
      text-align: center;

    }
    p{
      text-align: center;
    }
    body {
      background-image: url('https://img.freepik.com/free-photo/design-space-paper-textured-background_53876-146885.jpg?w=2000');
    }
</style>