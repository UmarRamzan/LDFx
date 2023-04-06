<script>
    import Navbar from "$lib/components/Navbar.svelte";
</script>


<Navbar />

<slot></slot>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

  :root {
  
    --primary: #fefae0;
    --secondary: #ffe5d9;
    --tertiary: #fefae0;
    --quaternary: #fcf7d0;

    --links-primary: navy;
    --links-hover: blue;
    --links-hover-background: rgb(200, 200, 255);

    --button-primary: white;
    --button-background: blue;

    /*
    --primary: white;
    --secondary: black;

    --links-primary: green;
    --links-hover: rgb(0, 200, 0);
    --links-hover-background: rgb(200, 255, 200);
    */
  }

    :global(body) {
        background-color: var(--tertiary);
        font-family: 'Roboto';
        color: black;
    }


</style>