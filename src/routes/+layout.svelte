<script>
  import Navbar from "$lib/components/Navbar.svelte";
</script>


<Navbar />

<slot></slot>

<style>

@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;1,300&family=Chau+Philomene+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;1,300&display=swap');


    :global(h2) {
        font-family: 'Chau Philomene One';
    }

    :global(p) {
        font-family: 'Chakra Petch';
    }

:root {

  --primary: #fefae0;
  --secondary: #ffe5d9;
  --tertiary: var(--primary);
  --quaternary: #fbf4cc;

  --links-primary: navy;
  --links-hover: blue;
  --links-hover-background: rgb(200, 200, 255);

  --font-main: navy;

  --button-primary: white;
  --button-background: #4c4dcd;
  --button-cancel: #c62828;
  --button-hover-primary: rgb(58, 58, 175);
  --button-hover-cancel: #ba0202;

  --font-primary: "Chau Philomene One";
  
    --pink: #FFC0CB;
    --lightpink: #FFB6C1;
    --hotpink: #FF69B4;
    --deeppink:  #FF1493;
    --blugray: #88c1f9;
    --links-primary: navy;
    --links-hover: blue;
    --links-hover-background: rgb(200, 200, 255);
   

  /*
  --primary: white;
  --secondary: black;

  --links-primary: green;
  --links-hover: rgb(0, 200, 0);
  --links-hover-background: rgb(200, 255, 200);
  */
  --quinary: #1B2E35;
  --senary: #D9D9D9;
  --septanry: #4C4DCD;
  --octonary: #C62828; 
  --other-primary: #FEC5BB;
  --other-secondary: #FFE5D5;
}

  :global(body) {
      background-color: var(--primary);
      font-family: var(--font-primary);
      color: black;

  }


</style>