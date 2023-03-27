<script>
    import Navbar from "$lib/components/Navbar.svelte";
</script>


<Navbar />

<slot></slot>

<style>
    :global(body) {
        background-color: #fefae0;
        font-style: Garamond;
    }
</style>
