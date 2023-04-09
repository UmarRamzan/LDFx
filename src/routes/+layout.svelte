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
    --tertiary: var(--primary);
    --quaternary: #fbf4cc;

    --links-primary: navy;
    --links-hover: blue;
    --links-hover-background: #d9d9d9;

    --button-primary: white;
    --button-background: blue;

    --font-primary: "Chau Philomene One";
    
    --quinary: #1B2E35;
    --senary: #D9D9D9;
    --septanry: #4C4DCD;
    --octonary: #C62828; 

    /*
    --primary: white;
    --secondary: black;

    --links-primary: green;
    --links-hover: rgb(0, 200, 0);
    --links-hover-background: rgb(200, 255, 200);
    */
  }

    :global(body) {
        background-color: var(--primary);
        font-family: 'Roboto';
        color: black;
    }


</style>