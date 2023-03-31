<script>
    import Navbar from "$lib/components/Navbar.svelte";
</script>


<Navbar />

<slot></slot>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

  :root {
    --primary: #ffe5d9;
    --secondary: #fec5bb;
    --tertiary: #fefae0;
    --quaternary: #fcf7d0;
    --quinary: #f7f7f7;
    --senary: #f7f7f7;
    --septenary: #f7f7f7;
    --octonary: #f7f7f7;
    --nonary: #f7f7f7;
    --denary: #f7f7f7;
  }

    :global(body) {
        background-color: var(--tertiary);
        font-family: 'Roboto';
    }

</style>
