<script>
    import Navbar from "$lib/components/Navbar.svelte";
</script>


<Navbar />

<slot></slot>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

  :root {
    --primary: #ffe5d9;
    --secondary: #fec5bb;
    --tertiary: #fefae0;
    --quaternary: #fcf7d0;

    --primary: #fefae0;
    --secondary: #ffe5d9;

    --links-primary: navy;
    --links-hover: blue;
    --links-hover-background: rgb(200, 200, 255);

    --button-primary: white;
    --button-background: blue;
  }

    :global(body) {
        background-color: var(--tertiary);
        font-family: 'Roboto';
        color: black;
    }


</style>