<script>
    import { getContext } from "svelte";
    const user = getContext("user")
    console.log($user)
</script>


<h1>MAIN PAGE</h1>
{#if user}
    <p>{$user}</p>
{:else}
    <p>Loading...</p>
{/if}
