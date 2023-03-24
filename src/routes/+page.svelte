<script>
  import { getContext } from "svelte";
  const user = getContext("user")
  console.log($user)
</script>

<main>
  <body>
      {#if user}
          <p>{$user}</p>
      {:else}
          <div class="homepage bx--content">
              <div class="triangle-right"></div>
              <div class="circle"></div>
              
              <div class="title">
                  <h1>Swap Courses <br> with Ease</h1>
                  <button class="primary">See More</button>
              </div>
              
              <div class="image">
                  <img src="src\routes\Homepage.png" alt="Homepage" class="responsive">
              </div>
          </div>
      {/if}
  </body>
</main>

<!-- <h1>MAIN PAGE</h1>
{#if user}
  <p>{$user}</p>
{:else}
  <p>Loading...</p>
{/if} -->

<style>
  @import url('https://fonts.googleapis.com/css2?family=Chau+Philomene+One&display=swap');
  
  .bx--content {
      padding: 0!important ;
  }
  
  body {
      background-color: #fefae0;
      overflow-x: hidden;
      padding-bottom: 2rem;
  }

  h1 {
      font-size: 90px;
      padding-top: 14rem;
      text-align: center;
      padding-left: 5rem;
      /* padding-top: 10rem; */
      font-weight: lighter;
      line-height: normal;
  }

  button {
      border: 0;
      cursor: pointer;
      border-radius: 15px;
      padding: 10px 24px;
      font-size: 20px;
      font-weight: lighter;
      box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
      position: absolute;
      margin-left: 16rem;
      margin-top: 1.5rem;
  }

  button:hover {
      background-color: #1f21c0;
  }

  .primary {
      background: #4c4dcd;
      color: white;
  }

  /* .polygons {
      position: relative;
      text-align: center;
  } */

  .homepage {
      position: relative;
      margin: 0;
  }

  .image {
      height: 100%;
      width: 100%;
      object-fit: cover;  
  }

  .responsive {
      width: 50%;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      float: right;
      padding-top: 17rem;
      padding-right: 3rem;
  }

  .title {
      font-size: 3.125em;
      font-family: 'Chau Philomene One', sans-serif;
      text-align: left;
      padding-inline-start: 5ch;
      color: #1b2e35;
      display: inline-block;
      position: absolute;
      z-index: 3;
  }

  .triangle-right {
      /* border: #ffe5d5;
      border-width: 3px 3px 3px 0;
      content: '';
      display: inline-block;
      padding: 10px; */

      width: 0;
      height: 0;
      border-style: solid;
      border-width: 25em 64em 0 0;
      border-color: #ffe5d5 transparent transparent transparent;
      margin-top: 0;
      margin-bottom: 0;
      position: absolute;
      top: 0;
      bottom: 150px;
      z-index: 2;
    /* border-top: 25px solid transparent; */
    /* border-left: 50px solid;
    border-bottom: 25px solid transparent; */
  }

  .circle {
      width: 65.625em;
      height: 34.375em;
      border-radius: 50%;
      background: #fec5bb;
      position: absolute;
      top: -300px;
      left: 600px;
      bottom: 1000px;
      rotate: 10deg;
      overflow: hidden;
      z-index: 1;
      /* clip-path: polygon(0 100%, 50% 100%, 50% 50%, 0% 50%); */
  }

  /* #overlap {
      width: 10x;
      height: 60px;
      background: purple;
      position: relative;
  } */

</style>